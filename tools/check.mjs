// `node tools/check.mjs [ID…]`: every pack checked with HO[LO] Desk's own code, as CI runs it.
//
// - Its map parses, is a holo-pack map named after its folder, and says whose samples it plays and
//   under what licence: one that lets anyone share them (CC0, CC BY 3.0 or 4.0, public domain, the
//   Unlicense, the Artistic License 2.0, or free to use without restriction).
// - Every file its instruments and spaces name has a checksum (what an install and an experience's
//   build check each sample against).
// - A kit's pads each play the one piece their name says, every piece has one, and the kick, snare
//   and hi-hats sit where General MIDI has them. A set of hand percussion (category Percussion: a
//   tabla's strokes) has pads too, each its own piece, without General MIDI's kit.
// - Every other instrument is played by pitch, or is one sound whose one pad is named by it.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { holo, repo } from './holo.mjs';
import { FREE, LICENCES } from './readme.mjs';

const { packPaths, parseChecksums, pinPack } = await holo('packages/music/src/packs.ts');
const { padsFor, playsHits } = await holo('apps/web/src/ui/pads.ts');

const only = process.argv.slice(2);
const packsDir = join(repo, 'packs');
const opts = { wide: false, octave: 3, middleC: 'C4' };
const KINDS = new Set(['git', 'cut', 'archive', 'mix']);
// a piece's folder words that its pad's name must have (by letters and digits)
const WORDS = { 'hat-three-quarter': ['hat', '¾'] };
const flat = (s) => s.toLowerCase().replace(/[^a-z0-9¾]/g, '');

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
    for (const key of ['name', 'license', 'credit']) if (!pack[key]) fail(`it has no ${key}`);
    // only licences that let anyone share the samples
    if (pack.license && !LICENCES[pack.license] && !FREE.test(pack.license))
      fail(
        `its licence "${pack.license}" isn't one HO[LO] may ship (${Object.keys(LICENCES).join(', ')}, or "Free to use without restriction (whose)")`,
      );
    if (!Number.isInteger(pack.bytes) || pack.bytes <= 0)
      fail('it has no "bytes" (its samples\' size: node tools/checksums.mjs, or its recipe, writes it)');
    if (!KINDS.has(pack.source?.kind)) fail(`its source is "${pack.source?.kind}", not ${[...KINDS].join(', ')}`);
    if (!pack.instruments?.length && !pack.impulses?.length) fail('it has no instruments and no spaces');

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
        // a drum kit has General MIDI's kick, snare and hi-hats; a set of hand percussion (a tabla's
        // strokes, a kendhang's) has its own pieces, each on its pad
        const name = (key) => grid.pads.find((p) => p.note === key)?.name;
        const gm = [name(36), name(38), name(42), name(46)];
        const want = ['Kick', 'Snare', 'Hi-hat closed', 'Hi-hat open'];
        if (m.category !== 'Percussion' && gm.join('|') !== want.join('|'))
          fail(`${at} 36, 38, 42 and 46 are ${gm.join(', ')}, not ${want.join(', ')}`);
        const wide = m.category === 'Percussion' ? Math.min(4, m.pads.length) : 4;
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
    console.log(`✓ ${id}: ${pack.instruments?.length ?? 0} instrument(s), ${files} files`);
  }
}

if (failed) {
  console.error(`\n${failed} pack(s) failed`);
  process.exit(1);
}
