// `node packs/black-blue-basses/recipe.mjs [--cache DIR] [--out DIR]`: Karoryfer's Black And Blue Basses
// (CC0), two 5-string bass guitars, written into packs/black-blue-basses/pack.json and
// packs/black-blue-basses/files.sha256: the black one played with the fingers (its plucks in four
// dynamics, two takes of each, its staccato and its ghost notes) and the blue one with a pick (two
// dynamics, four takes of each, its low notes down to E from its B string), as the library's programs
// play them with their controls at rest (poly, no unison, no release noises). The layers are measured
// and set where one velocity curve meets them, the loudest at -17 dB at velocity 127; each note is kept
// until it falls to -60 dB (4 s at most), as 16-bit WAVs.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/black-blue-basses'));
const lib = library('sfzinstruments/karoryfer.black-and-blue-basses', '6e7d674cdb41be7a54dbccb15472401ad01099b9');
const downloads = new Downloads(cache, { k: lib.base });
// the library maps each bass where it's written (an octave over where it sounds): here each key plays the
// note it names, the low B (31 Hz) on key 23
const shift = -12;
// fewer takes than the library has, so an instrument decodes to about what HO[LO]'s other basses do: a
// program's first `takes` round robins
const program = (p, takes) =>
  programSamples(lib, `Programs/${p}.sfz`, { tag: 'k', atRest: true, shift, keep: (r) => Number(r.seq_position ?? 1) <= takes });
const playing = { release: 0.15, attack: 0, oneShot: false, polyphony: 16, notePolyphony: 2, offTime: 0.08 };
const BASSES = [
  ['finger', 'Finger Bass (5-string)', '05-darkblack_pluck', 4, 2],
  ['finger-staccato', 'Finger Bass (Staccato)', '09-darkblack_stac', 2, 4],
  ['finger-ghost', 'Finger Bass (Ghost Notes)', '07-darkblack_ghost', 1.5, 4],
  ['pick', 'Pick Bass (5-string)', '03-babyblue_all', 4, 4],
];
const instruments = [];
for (const [name, title, p, cap, takes] of BASSES)
  instruments.push({ name, title, category: 'Bass', folder: name, samples: await program(p, takes), tail: { floor: -60, cap, fade: 0.5 }, playing });

await buildInstruments({
  id: 'black-blue-basses',
  name: 'Karoryfer Black And Blue Basses',
  license: 'CC0-1.0',
  credit: 'Black And Blue Basses by Karoryfer Lecolds (CC0): two 5-string bass guitars, one played with the fingers, one with a pick.',
  note: "The library's WAVs at the pinned commit, each note kept until it falls to -60 dB and faded there, as 16-bit WAVs.",
  downloads,
  instruments,
  bits: 16,
  out: arg('out', null),
});
