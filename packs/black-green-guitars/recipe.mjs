// `node packs/black-green-guitars/recipe.mjs [--cache DIR] [--out DIR]`: Karoryfer's Black And Green Guitars
// (CC0), two hollow-body electric guitars, written into packs/black-green-guitars/pack.json and
// packs/black-green-guitars/files.sha256. Each guitar's plucked notes (three dynamics, two to four takes
// in turn, with their release noises) and its staccato notes, as the library's programs play them with
// their controls at rest: no unison voices, no feedback, no tailpiece bends. The layers are measured and
// set where one velocity curve meets them, the loudest at -17 dB at velocity 127; each note is kept until
// it falls to -60 dB (6 s at most), as 16-bit WAVs.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/black-green-guitars'));
const lib = library('sfzinstruments/karoryfer.black-and-green-guitars', 'b3b3249d37dc977a1a297bd2dc053e6d9b6b805c');
const downloads = new Downloads(cache, { k: lib.base });
// the programs' controls at rest: no unison voices (CC 100), no feedback (CC 29), no tailpiece bends
// (CC 118), and the release noises at the volume the programs set (CC 27)
const program = (p) => programSamples(lib, `Programs/${p}.sfz`, { tag: 'k', atRest: true });
const playing = { release: 0.25, attack: 0, oneShot: false, polyphony: 24, notePolyphony: 2, offTime: 0.1 };
const GUITARS = [
  ['green', 'Green Guitar', '04-green_twang', 6],
  ['green-staccato', 'Green Guitar (Staccato)', '05-green_staccato', 2],
  ['black', 'Black Guitar', '07-black_twang', 6],
  ['black-staccato', 'Black Guitar (Staccato)', '08-black_staccato', 2],
];
const instruments = [];
for (const [name, title, p, cap] of GUITARS)
  instruments.push({ name, title, category: 'Guitar', folder: name, samples: await program(p), tail: { floor: -60, cap, fade: 0.5 }, playing });

await buildInstruments({
  id: 'black-green-guitars',
  name: 'Karoryfer Black And Green Guitars',
  license: 'CC0-1.0',
  credit: 'Black And Green Guitars by Karoryfer Lecolds (CC0): two hollow-body electric guitars.',
  note: "The library's WAVs at the pinned commit, each note kept until it falls to -60 dB and faded there, as 16-bit WAVs.",
  downloads,
  instruments,
  bits: 16,
  out: arg('out', null),
});
