// `node tools/readme.mjs [--check]`: the parts of the READMEs that come from the packs' maps, written
// from them: each pack's facts (size, source, its instruments, a kit's pads) below the words written
// for it in packs/<id>/README.md, and the catalog in README.md (every instrument by family, every pack
// at a glance). --check changes nothing and fails if any is out of date (CI runs it).
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const repo = join(import.meta.dirname, '..');
const packsDir = join(repo, 'packs');

/** Where a pack's own words end and what this writes begins. */
export const MARK = '<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->';
const BEGIN = '<!-- catalog: written from the maps by `node tools/readme.mjs` -->';
const END = '<!-- end of catalog -->';

/** The families instruments are found by, in the order the catalog lists them. */
const FAMILIES = [
  'Pianos and keys',
  'Drum kits',
  'Percussion',
  'Tuned percussion',
  'Strings',
  'Bass',
  'Guitars and plucked strings',
  'Woodwinds',
  'Brass',
  'Other',
];

const LICENCES = {
  'CC0-1.0': ['CC0 1.0', 'https://creativecommons.org/publicdomain/zero/1.0/'],
  'CC-BY-4.0': ['CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'],
};

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
/** A key's name, middle C (60) being C4. */
const note = (key) => `${NOTES[((key % 12) + 12) % 12]}${Math.floor(key / 12) - 1}`;
const mb = (bytes) => (bytes >= 1e9 ? `${(bytes / 1e9).toFixed(1)} GB` : `${Math.round(bytes / 1e6)} MB`);
const cell = (s) => String(s).replace(/\|/g, '\\|');

export function licence(pack, link = true) {
  const known = LICENCES[pack.license];
  // a licence of its own, in a word or two in a table ("Free to use without restriction")
  if (!known) return link ? pack.license : pack.license.replace(/\s*\(.*\)$/, '');
  return link ? `[${known[0]}](${known[1]})` : known[0];
}

/** Which family an instrument is found in. */
export function family(i) {
  if (i.pads?.length) return 'Drum kits';
  switch (i.category) {
    case 'Piano':
    case 'Keys':
      return 'Pianos and keys';
    case 'Drums':
    case 'Percussion':
      return i.pitched === false ? 'Percussion' : 'Tuned percussion';
    case 'Strings':
      return 'Strings';
    case 'Bass':
      return 'Bass';
    case 'Guitar':
    case 'Plucked':
      return 'Guitars and plucked strings';
    case 'Woodwinds':
      return 'Woodwinds';
    case 'Brass':
      return 'Brass';
    default:
      return 'Other';
  }
}

/** The zones a key or velocity plays (not release samples). */
const played = (i) => i.zones.filter((z) => !z.trigger);

/** How many velocity layers the instrument has where it has the most. */
function layers(i) {
  let most = 0;
  const zones = played(i);
  for (let key = 0; key < 128; key++) {
    const at = new Set(zones.filter((z) => z.lo <= key && key <= z.hi).map((z) => `${z.lovel}-${z.hivel}`));
    most = Math.max(most, at.size);
  }
  return most;
}

/** How many takes of one note and velocity take turns (round robins), at most. */
function takes(i) {
  const n = new Map();
  for (const z of played(i)) {
    const k = `${z.lo}-${z.hi}-${z.lovel}-${z.hivel}`;
    n.set(k, (n.get(k) ?? 0) + 1);
  }
  return Math.max(1, ...n.values());
}

/** What its keys play: its sampled notes, its pads, or its one sound. */
function range(i) {
  if (i.pads?.length) return `${i.pads.length} pads`;
  if (i.pitched === false) return 'one sound';
  const roots = played(i).map((z) => Math.round(z.root));
  const lo = Math.min(...roots);
  const hi = Math.max(...roots);
  return lo === hi ? note(lo) : `${note(lo)}–${note(hi)}`;
}

/** What else it does that's worth knowing. */
function traits(i) {
  const out = [];
  if (i.zones.some((z) => z.trigger)) out.push('release samples');
  if (i.undamped) out.push(`undamped from ${note(i.undamped)}`);
  if (played(i).some((z) => z.loopEnd > 0)) out.push('looped sustains');
  if (played(i).some((z) => z.offBy)) out.push('chokes (a closed hi-hat stops the open one)');
  return out.join(', ');
}

/**
 * Instruments of a pack in groups: one sound and its other ways of playing (Violins: Pizzicato…). A
 * variant is named after its sound (violins_pizz, grand-light, bassoon_iowa_stac): its sound is the
 * instrument whose name is the longest part of its own, up to a _ or -.
 */
export function groups(pack) {
  const byName = new Map(pack.instruments.map((i) => [i.name, i]));
  const rootOf = (i) => {
    let at = i;
    for (;;) {
      const cut = Math.max(at.name.lastIndexOf('_'), at.name.lastIndexOf('-'));
      let up = null;
      for (let n = cut; n > 0 && !up; n = Math.max(at.name.lastIndexOf('_', n - 1), at.name.lastIndexOf('-', n - 1)))
        up = byName.get(at.name.slice(0, n)) ?? null;
      if (!up) return at;
      at = up;
    }
  };
  /** What a variant's title says beyond its sound's ("Steinway D Grand, Light" → "Light"). */
  const beyond = (title, base) => {
    const core = base.replace(/\s*\([^)]*\)\s*$/, '');
    let rest = title.startsWith(base) ? title.slice(base.length) : title.startsWith(core) ? title.slice(core.length) : title;
    rest = rest.replace(/^[\s,]+/, '').trim();
    return /^\([^()]*\)$/.test(rest) ? rest.slice(1, -1) : rest;
  };
  const out = new Map();
  for (const i of pack.instruments) {
    const root = rootOf(i);
    if (!out.has(root)) out.set(root, { main: root, also: [] });
    if (root !== i) out.get(root).also.push(beyond(i.title, root.title));
  }
  return [...out.values()];
}

/** Where a pack's files come from, in a few lines. */
function source(pack, hasRecipe) {
  const s = pack.source;
  const recipe = hasRecipe ? ' [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.' : '';
  switch (s.kind) {
    case 'git': {
      const url = s.url.replace(/\.git$/, '');
      return `Taken as published from [${url.replace('https://github.com/', '')}](${url}) at commit [\`${s.commit.slice(0, 7)}\`](${url}/tree/${s.commit}): an install checks out only the files this map plays.`;
    }
    case 'mix': {
      const bases = Object.values(s.bases ?? {}).map((b) => {
        const m = /raw\.githubusercontent\.com\/([^/]+\/[^/]+)\/([0-9a-f]{40})\//.exec(b);
        return m ? `[${m[1]}](https://github.com/${m[1]}/tree/${m[2]}) at \`${m[2].slice(0, 7)}\`` : `<${encodeURI(b)}>`;
      });
      return (
        `Made from ${Object.keys(s.downloads ?? {}).length} recordings, fetched from ${bases.join(' and ')}. ` +
        `Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit ` +
        `mixed from its microphones), the same in every install, so every install makes the same bytes, ` +
        `each checked against \`files.sha256\`.${recipe}`
      );
    }
    case 'cut':
      return `Cut from ${Object.keys(s.downloads ?? {}).length} downloads at <${encodeURI(s.base)}>: each note is cut from its run as it is, but for a ${Math.round((s.fade / s.rate) * 1000)} ms fade at each end.${recipe}`;
    case 'archive':
      return `Decoded from the published archive <${encodeURI(s.url)}> (sha256 \`${s.sha256.slice(0, 12)}…\`): each note from its FLAC, written as the WAV it was first made as.${recipe}`;
    default:
      return 'Taken from files you have (install it with `--from`).';
  }
}

/** The part of a pack's README this writes. */
export function packFacts(id, pack) {
  const hasRecipe = existsSync(join(packsDir, id, 'recipe.mjs'));
  const files = new Set(pack.instruments.flatMap((i) => i.zones.map((z) => z.file))).size;
  const lines = [
    MARK,
    '',
    '## At a glance',
    '',
    '| | |',
    '|---|---|',
    `| Id | \`${id}\` |`,
    `| Licence | ${licence(pack)} |`,
    `| Credit | ${cell(pack.credit)} |`,
    `| Size | ${mb(pack.bytes)} on disk, ${files} sample files |`,
    `| Instruments | ${pack.instruments.length} |`,
    `| Install | the studio's Library, **More packs → ${cell(pack.name)}**, or \`pnpm packs install ${id}\` |`,
    '',
    '## Where its files come from',
    '',
    source(pack, hasRecipe),
    '',
    '## Instruments',
    '',
    '| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |',
    '|---|---|---|---|---|---|---|',
  ];
  for (const i of pack.instruments) {
    lines.push(
      `| ${cell(i.title)} | \`${id}/${i.name}\` | ${family(i)} | ${range(i)} | ${layers(i)} | ${takes(i)} | ${traits(i)} |`,
    );
  }
  for (const i of pack.instruments.filter((x) => x.pads?.length)) {
    lines.push('', `## ${i.title}'s pads`, '', 'Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.', '');
    lines.push('| Key | Note | Pad |', '|---|---|---|');
    for (const p of [...i.pads].sort((a, b) => a.key - b.key)) lines.push(`| ${p.key} | ${note(p.key)} | ${cell(p.name)} |`);
  }
  return `${lines.join('\n')}\n`;
}

/** The catalog in README.md. */
export function catalog(packs) {
  const lines = [BEGIN, '', '### Every pack', ''];
  lines.push('| Pack | Families | Instruments | Size | Licence |', '|---|---|---|---|---|');
  for (const [id, pack] of [...packs].sort((a, b) => a[1].name.localeCompare(b[1].name))) {
    const fams = FAMILIES.filter((f) => pack.instruments.some((i) => family(i) === f));
    lines.push(
      `| [${cell(pack.name)}](packs/${id}/) | ${fams.join(', ')} | ${pack.instruments.length} | ${mb(pack.bytes)} | ${licence(pack, false)} |`,
    );
  }
  for (const f of FAMILIES) {
    const rows = [];
    for (const [id, pack] of packs)
      for (const g of groups(pack)) if (family(g.main) === f) rows.push({ id, pack, g });
    if (!rows.length) continue;
    rows.sort((a, b) => a.g.main.title.localeCompare(b.g.main.title) || a.pack.name.localeCompare(b.pack.name));
    lines.push('', `### ${f}`, '', '| Instrument | Also played as | Pack |', '|---|---|---|');
    for (const { id, pack, g } of rows)
      lines.push(`| ${cell(g.main.title)} | ${cell(g.also.join(', '))} | [${cell(pack.name)}](packs/${id}/) |`);
  }
  lines.push('', END);
  return lines.join('\n');
}

/** Every README as it should be: [path, text]. */
export function readmes() {
  const packs = readdirSync(packsDir)
    .sort()
    .filter((id) => existsSync(join(packsDir, id, 'pack.json')))
    .map((id) => [id, JSON.parse(readFileSync(join(packsDir, id, 'pack.json'), 'utf8'))]);
  const out = [];
  for (const [id, pack] of packs) {
    const file = join(packsDir, id, 'README.md');
    const had = existsSync(file) ? readFileSync(file, 'utf8') : `# ${pack.name}\n\n`;
    const own = had.includes(MARK) ? had.slice(0, had.indexOf(MARK)) : `${had.trimEnd()}\n\n`;
    out.push([file, `${own}${packFacts(id, pack)}`]);
  }
  const top = join(repo, 'README.md');
  const text = readFileSync(top, 'utf8');
  const a = text.indexOf(BEGIN);
  const b = text.indexOf(END);
  if (a < 0 || b < a) throw new Error(`README.md has no catalog (${BEGIN} … ${END})`);
  out.push([top, `${text.slice(0, a)}${catalog(packs)}${text.slice(b + END.length)}`]);
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename) {
  const check = process.argv.includes('--check');
  let stale = 0;
  for (const [file, text] of readmes()) {
    const now = existsSync(file) ? readFileSync(file, 'utf8') : '';
    if (now === text) continue;
    stale++;
    if (check) console.error(`${file.slice(repo.length + 1)} is out of date: node tools/readme.mjs`);
    else {
      writeFileSync(file, text);
      console.log(`wrote ${file.slice(repo.length + 1)}`);
    }
  }
  if (check && stale) process.exit(1);
}
