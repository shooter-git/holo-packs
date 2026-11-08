// `node packs/bear-sax/recipe.mjs [--cache DIR]`: Karoryfer's Bear Sax (CC0), written into
// packs/bear-sax/pack.json and packs/bear-sax/files.sha256.
//
// A 1926 Conn baritone saxophone:
// - sustained: each note soft and loud (the library fades between them with the mod wheel; here
//   velocity chooses), looped where the library loops it, so a note holds as long as its key;
// - staccato: four velocity layers, three takes in turn.
// Each instrument's layers are measured and set where one velocity curve meets them (the loudest at
// -17 dB); a staccato note's tail ends where it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/bear-sax'));
const lib = library('sfzinstruments/karoryfer.bear-sax', '7abb3c652525a15dfac80e1b5dfbba9964ee568f');
const downloads = new Downloads(cache, { k: lib.base });
// the sustains: soft below CC1 30, loud above, as two layers
const sustain = (await programSamples(lib, 'Programs/poly/dynfade_map.sfz', { tag: 'k', base: 'Programs' })).map((s) => ({
  ...s,
  layer: /_looped_f\./.test(s.download) ? 2 : 1,
}));
const playing = { release: 0.15, attack: 0.005, oneShot: false, polyphony: 16, notePolyphony: 2, offTime: 0.08 };

const NOTE = `The library's WAVs at the pinned commit, a looped note kept whole, any other until it falls to -60 dB and faded there; otherwise bit for bit.`;

await buildInstruments({
  id: 'bear-sax',
  name: 'Karoryfer Bear Sax',
  license: 'CC0-1.0',
  credit: 'Bear Sax by Karoryfer Lecolds (CC0): a 1926 Conn baritone saxophone.',
  note: NOTE,
  downloads,
  instruments: [
    { name: 'baritone-sax', title: 'Baritone Sax', category: 'Woodwinds', samples: sustain, fileLoops: true, playing },
    { name: 'baritone-sax_stac', title: 'Baritone Sax (Staccato)', category: 'Woodwinds', samples: await programSamples(lib, 'Programs/poly/staccato_map.sfz', { tag: 'k', base: 'Programs' }), tail: { floor: -60, cap: 3, fade: 0.3 }, playing },
  ],
});
