// `node packs/growlybass/recipe.mjs [--cache DIR] [--out DIR]`: Karoryfer's Growlybass (CC0), a Squier Jazz
// Bass, written into packs/growlybass/pack.json and packs/growlybass/files.sha256: its sustained notes
// (the library's clean mapping) and its staccato ones (its vicious mapping), velocity layers and takes in
// turn as the maps play them, without the string scrapes. The layers are measured and set where one
// velocity curve meets them, the loudest at -17 dB at velocity 127; each note is kept until it falls to
// -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/growlybass'));
const lib = library('sfzinstruments/karoryfer.growlybass', '4f483268fc66b5a6d5781d421c0d11b8d08d3fc6');
const downloads = new Downloads(cache, { k: lib.base });
const notes = (r) => !/scrape/i.test(r.sample) && r.trigger === undefined;
// the library maps the bass where it's written (an octave over where it sounds): here each key plays
// the note it names, its low E (41 Hz) on key 28
const shift = -12;
const playing = { release: 0.15, attack: 0, oneShot: false, polyphony: 16, notePolyphony: 2, offTime: 0.08 };

await buildInstruments({
  id: 'growlybass',
  name: 'Karoryfer Growlybass',
  license: 'CC0-1.0',
  credit: 'Growlybass by Karoryfer Lecolds (CC0): a Squier Jazz Bass.',
  note: "The library's WAVs at the pinned commit, each note kept until it falls to -60 dB and faded there, otherwise bit for bit.",
  downloads,
  instruments: [
    { name: 'bass', title: 'Jazz Bass', category: 'Bass', folder: 'bass', samples: await programSamples(lib, 'growlybass_clean.sfz', { tag: 'k', keep: notes, shift }), tail: { floor: -60, cap: 6, fade: 0.5 }, playing },
    { name: 'bass_stac', title: 'Jazz Bass (Staccato)', category: 'Bass', folder: 'stac', samples: await programSamples(lib, 'growlybass_vicious.sfz', { tag: 'k', keep: notes, shift }), tail: { floor: -60, cap: 3, fade: 0.2 }, playing },
  ],
  out: arg('out', null),
});
