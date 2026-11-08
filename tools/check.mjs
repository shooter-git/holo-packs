// `node tools/check.mjs [ID…]`: every pack checked with HO[LO] Desk's own code, as CI runs it.
//
// - Its map parses, is a holo-pack map named after its folder, and says whose samples it plays and
//   under what licence: one that lets anyone share them (CC0, CC BY 3.0 or 4.0, CC BY-SA 3.0 or 4.0, public domain, the
//   Unlicense, the Artistic License 2.0, or free to use without restriction).
// - Every file its instruments and spaces name has a checksum (what an install and an experience's
//   build check each sample against). A palette has no files: source "none", and a files.sha256 of one
//   comment line (GitHub's raw host can refuse an empty file).
// - A kit's pads each play the one piece their name says, every piece has one, and the kick, snare
//   and hi-hats sit where General MIDI has them. Any other set of sounds on pads (a tabla's strokes,
//   a collection's hits: a category other than Drums) has pads too, each its own piece, without
//   General MIDI's kit.
// - Every other instrument is played by pitch, or is one sound whose one pad is named by it.
// - A palette's sounds each play a synth or an effect HO[LO] Desk has, with knobs it has, set within
//   their ranges, and an instrument of a pack it requires (which must be here). A sound waiting for a
//   piece that isn't in HO[LO] Desk or here yet is marked "coming".
// - A multi-microphone instrument's microphones are well formed, and every hit has one zone a
//   microphone, all of them alike but for their file, microphone and pan (they sound as one hit).
// - No pack is someone's own (imported from their files, or made from files only they have).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { holo, repo } from './holo.mjs';
import { privateReason } from './private.mjs';
import { FREE, LICENCES } from './readme.mjs';

const { packPaths, parseChecksums, pinPack, withRequired } = await holo('packages/music/src/packs.ts');
const { checkSound, soundPacks, soundSampler } = await holo('packages/session/src/palettes.ts');
const { padsFor, playsHits } = await holo('apps/web/src/ui/pads.ts');

const only = process.argv.slice(2);
const packsDir = join(repo, 'packs');
const opts = { wide: false, octave: 3, middleC: 'C4' };
const KINDS = new Set(['git', 'cut', 'archive', 'mix']);
const ids = readdirSync(packsDir)
  .filter((x) => existsSync(join(packsDir, x, 'pack.json')))
  .sort();
/** Every pack's map, for a palette's sounds to be checked against (null when one doesn't parse). */
const maps = new Map(
  ids.map((x) => {
    try {
      return [x, JSON.parse(readFileSync(join(packsDir, x, 'pack.json'), 'utf8'))];
    } catch {
      return [x, null];
    }
  }),
);
const notes = [];
// a piece's folder words that its pad's name must have (by letters and digits)
const WORDS = { 'hat-three-quarter': ['hat', '¾'] };
const flat = (s) => s.toLowerCase().replace(/[^a-z0-9¾]/g, '');
const MIC_ID = /^[a-z0-9][a-z0-9-]*$/;
const inRange = (x, lo, hi) => typeof x === 'number' && Number.isFinite(x) && x >= lo && x <= hi;

/** What's wrong with an instrument's microphones and how its zones use them (none for most). */
function micProblems(m) {
  const out = [];
  const at = `${m.name}:`;
  const played = (m.zones ?? []).filter((z) => !z.trigger);
  for (const z of m.zones ?? [])
    if (z.pan !== undefined && !inRange(z.pan, -1, 1)) out.push(`${at} ${z.file}'s pan ${z.pan} isn't -1 to 1`);
  if (m.mics === undefined) {
    const named = played.find((z) => z.mic !== undefined);
    if (named) out.push(`${at} ${named.file} names mic "${named.mic}", but the instrument declares no mics`);
    return out;
  }
  if (!Array.isArray(m.mics) || !m.mics.length) return [...out, `${at} its "mics" isn't a list of microphones`];
  const ids = new Set();
  for (const mic of m.mics) {
    const id = mic?.id;
    if (typeof id !== 'string' || !MIC_ID.test(id))
      out.push(`${at} mic id "${id}" isn't lowercase letters, digits and -`);
    else if (ids.has(id)) out.push(`${at} mic "${id}" is declared twice`);
    ids.add(id);
    if (typeof mic?.name !== 'string' || !mic.name.trim()) out.push(`${at} mic "${id}" has no name`);
    if (mic?.level !== undefined && !inRange(mic.level, Number.NEGATIVE_INFINITY, 12))
      out.push(`${at} mic "${id}"'s level ${mic.level} isn't a dB of 12 or less`);
    if (mic?.pan !== undefined && !inRange(mic.pan, -1, 1))
      out.push(`${at} mic "${id}"'s pan ${mic.pan} isn't -1 to 1`);
  }
  // every zone a hit plays is one microphone's, and every microphone has zones
  const unmiked = played.filter((z) => !ids.has(z.mic));
  if (unmiked.length)
    out.push(
      `${at} ${unmiked.length} zone(s) have no declared mic, e.g. ${unmiked[0].file} (${
        unmiked[0].mic === undefined ? 'no mic' : `mic "${unmiked[0].mic}"`
      })`,
    );
  const used = new Set(played.map((z) => z.mic));
  const idle = [...ids].filter((id) => !used.has(id));
  if (idle.length) out.push(`${at} no zone is recorded with ${idle.map((id) => `"${id}"`).join(', ')}`);
  // a hit sounds one zone of each microphone, together: one a microphone, all alike
  const slots = new Map();
  for (const z of played) {
    const key = `${z.lo}-${z.hi} vel ${z.lovel}-${z.hivel} rr ${z.rr ?? '-'}`;
    if (!slots.has(key)) slots.set(key, []);
    slots.get(key).push(z);
  }
  for (const [key, zs] of slots) {
    const twice = zs.map((z) => z.mic).filter((id, i, a) => a.indexOf(id) !== i);
    if (twice.length) out.push(`${at} keys ${key} has two zones of mic "${twice[0]}"`);
    for (const field of ['gain', 'group', 'offBy'])
      if (new Set(zs.map((z) => z[field] ?? null)).size > 1)
        out.push(`${at} keys ${key}: its mics' zones differ in ${field}`);
  }
  return out;
}

let failed = 0;

for (const id of readdirSync(packsDir).sort()) {
  if (only.length && !only.includes(id)) continue;
  const problems = [];
  const fail = (text) => problems.push(text);
  const mapFile = join(packsDir, id, 'pack.json');
  const sumsFile = join(packsDir, id, 'files.sha256');
  if (!existsSync(mapFile)) fail('no pack.json');
  if (!existsSync(sumsFile)) fail('no files.sha256');
  let pack = null;
  if (!problems.length) {
    try {
      pack = JSON.parse(readFileSync(mapFile, 'utf8'));
    } catch (err) {
      fail(`pack.json doesn't parse: ${err.message}`);
    }
  }
  if (pack) {
    if (pack.format !== 'holo-pack' || pack.version !== 1) fail('pack.json is not a holo-pack map, version 1');
    if (pack.id !== id) fail(`its id is "${pack.id}", not its folder's "${id}"`);
    const mine = privateReason(pack);
    if (mine) fail(`${mine}`);
    for (const key of ['name', 'license', 'credit']) if (!pack[key]) fail(`it has no ${key}`);
    if (!Array.isArray(pack.instruments)) fail('it has no "instruments" (a palette has an empty list)');
    // only licences that let anyone share the samples
    if (pack.license && !LICENCES[pack.license] && !FREE.test(pack.license))
      fail(
        `its licence "${pack.license}" isn't one HO[LO] may ship (${Object.keys(LICENCES).join(', ')}, or "Free to use without restriction (whose)")`,
      );
    const files = (() => {
      try {
        return packPaths({ instruments: pack.instruments ?? [], impulses: pack.impulses }).length;
      } catch {
        return 0;
      }
    })();
    if (files) {
      if (!Number.isInteger(pack.bytes) || pack.bytes <= 0)
        fail('it has no "bytes" (its samples\' size: node tools/checksums.mjs, or its recipe, writes it)');
      if (!KINDS.has(pack.source?.kind)) fail(`its source is "${pack.source?.kind}", not ${[...KINDS].join(', ')}`);
    } else {
      // a palette: its sounds play other packs and HO[LO]'s synths
      if (pack.source?.kind !== 'none') fail('it has no files, so its source is "none"');
      if (pack.bytes) fail('it has no files, so no "bytes"');
      if (existsSync(sumsFile) && !readFileSync(sumsFile, 'utf8').trim())
        fail('its files.sha256 is empty: give it a comment line saying why (GitHub\'s raw host can refuse an empty file)');
    }
    if (!pack.instruments?.length && !pack.impulses?.length && !pack.sounds?.length)
      fail('it has no instruments, no spaces and no sounds');
    await checkPalette(id, pack, fail);

    // every file it names, pinned by checksum
    try {
      const sums = parseChecksums(readFileSync(sumsFile, 'utf8'));
      pinPack(pack, sums);
      const named = new Set(packPaths(pack));
      const extra = Object.keys(sums).filter((p) => !named.has(p));
      if (extra.length) fail(`files.sha256 has ${extra.length} file(s) no instrument plays, e.g. ${extra[0]}`);
    } catch (err) {
      fail(err.message);
    }

    for (const m of pack.instruments ?? []) {
      const at = `${m.name}:`;
      for (const p of micProblems(m)) fail(p);
      const sampler = { type: 'sampler', pack: id, name: m.name };
      const grid = padsFor(sampler, m, opts);
      if (m.pads?.length) {
        // a kit: each pad strikes one piece, named by it, and every piece has one pad
        const pieces = [];
        for (const p of m.pads) {
          const hit = new Set(
            m.zones
              .filter((z) => !z.trigger && z.lo <= p.key && p.key <= z.hi)
              .map((z) => z.file.replace(/\/[^/]*$/, '')),
          );
          if (hit.size !== 1) {
            fail(`${at} pad "${p.name}" (${p.key}) strikes ${hit.size} pieces, not one`);
            continue;
          }
          const piece = [...hit][0];
          const folder = piece.split('/').pop();
          for (const w of WORDS[folder] ?? folder.split('-'))
            if (!flat(p.name).includes(flat(w))) fail(`${at} pad "${p.name}" plays ${folder}: its name doesn't say "${w}"`);
          pieces.push(piece);
        }
        if (new Set(pieces).size !== pieces.length) fail(`${at} two pads strike the same piece`);
        const all = new Set(m.zones.filter((z) => !z.trigger).map((z) => z.file.replace(/\/[^/]*$/, '')));
        const unplayed = [...all].filter((x) => !pieces.includes(x));
        if (unplayed.length) fail(`${at} no pad plays ${unplayed.join(', ')}`);
        // a drum kit (category Drums) has General MIDI's kick, snare and hi-hats; any other set on pads
        // (a tabla's strokes, a kendhang's) has its own pieces, each on its pad
        const name = (key) => grid.pads.find((p) => p.note === key)?.name;
        const gm = [name(36), name(38), name(42), name(46)];
        const want = ['Kick', 'Snare', 'Hi-hat closed', 'Hi-hat open'];
        if (m.category === 'Drums' && gm.join('|') !== want.join('|'))
          fail(`${at} 36, 38, 42 and 46 are ${gm.join(', ')}, not ${want.join(', ')}`);
        const wide = m.category === 'Drums' ? 4 : Math.min(4, m.pads.length);
        if (grid.cols !== wide || grid.chromatic) fail(`${at} its pads aren't a ${wide}-wide grid of hits`);
        if (!playsHits(sampler, m)) fail(`${at} a kit that doesn't play each key as its own hit`);
      } else if (m.pitched === false) {
        if (grid.pads.length !== 1 || grid.pads[0].note !== 60 || grid.pads[0].name !== m.title)
          fail(`${at} one sound, but its pad isn't one pad on C4 named "${m.title}"`);
        if (!playsHits(sampler, m)) fail(`${at} one sound that doesn't play as a hit`);
      } else {
        if (!grid.chromatic) fail(`${at} pitched, but its pads aren't played by pitch`);
        if (playsHits(sampler, m)) fail(`${at} pitched, but plays each key as its own hit`);
      }
    }
  }
  if (problems.length) {
    failed++;
    console.error(`✗ ${id}`);
    for (const p of problems) console.error(`    ${p}`);
  } else {
    const files = packPaths(pack).length;
    const sounds = pack.sounds?.length ? `, ${pack.sounds.length} sound(s)` : '';
    console.log(`✓ ${id}: ${pack.instruments?.length ?? 0} instrument(s), ${files} files${sounds}`);
  }
}

for (const n of notes) console.log(`  note: ${n}`);

if (failed) {
  console.error(`\n${failed} pack(s) failed`);
  process.exit(1);
}

/** A palette's requires and sounds, against HO[LO] Desk's synths and effects and the packs here. */
async function checkPalette(id, pack, fail) {
  const requires = pack.requires ?? [];
  if (!Array.isArray(requires) || requires.some((r) => typeof r !== 'string')) {
    fail('its "requires" is not a list of pack ids');
    return;
  }
  for (const r of requires) {
    if (r === id) fail('it requires itself');
    else if (!maps.has(r)) fail(`it requires "${r}", which isn't a pack here`);
  }
  if (new Set(requires).size !== requires.length) fail('it requires a pack twice');
  try {
    // packs that require each other would never install
    await withRequired([id], (x) => (x === id ? requires : (maps.get(x)?.requires ?? [])));
  } catch (err) {
    fail(err.message);
  }
  const sounds = pack.sounds;
  if (sounds === undefined) return;
  if (!Array.isArray(sounds) || !sounds.length) {
    fail('its "sounds" is not a list of sounds');
    return;
  }
  if (!pack.description) fail('it has sounds but no "description" (what it is, in a line)');
  const names = new Set();
  for (const s of sounds) {
    const at = `sound "${s?.name}":`;
    if (names.has(s?.name)) fail(`${at} two sounds have that name`);
    names.add(s?.name);
    if (!s?.note) fail(`${at} it has no note (what it is, in a line)`);
    const { missing, problems } = checkSound(s);
    for (const p of problems) fail(`${at} ${p}`);
    const absent = [...missing];
    for (const p of soundPacks(s)) {
      if (p === id) continue;
      const map = maps.get(p);
      if (!map) {
        absent.push(`the "${p}" pack`);
        continue;
      }
      if (!requires.includes(p)) fail(`${at} it plays "${p}", which the palette doesn't require`);
      const sampler = soundSampler(s);
      if (sampler?.pack === p && !map.instruments?.some((i) => i.name === sampler.name))
        absent.push(`${p}/${sampler.name}`);
    }
    if (absent.length && !s.coming)
      fail(`${at} it needs ${absent.join(' and ')}, which isn't here: mark it "coming" if it's on its way`);
    if (!absent.length && s.coming) notes.push(`${id}: "${s.name}" has everything it needs now: drop its "coming"`);
  }
}
