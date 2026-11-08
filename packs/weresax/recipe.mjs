// `node packs/weresax/recipe.mjs [--cache DIR]`: Karoryfer's Weresax (CC0), written into
// packs/weresax/pack.json and packs/weresax/files.sha256.
//
// An alto saxophone, every note played soft and loud, two takes of each in turn, from the library's
// condenser microphone. The two dynamics are measured and set where one
// velocity curve meets them (the loudest at -17 dB), and a note's tail ends where it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/weresax'));
const lib = library('sfzinstruments/karoryfer.weresax', 'a4d756b21d2a573aca0d840cce7e71ba5effd4c6');
const downloads = new Downloads(cache, { k: lib.base });
const samples = [
  ...(await programSamples(lib, 'Programs/alto_map_piano_condenser.sfz', { tag: 'k' })),
  ...(await programSamples(lib, 'Programs/alto_map_forte_condenser.sfz', { tag: 'k' })),
];

const NOTE = `The library's WAVs at the pinned commit, each note kept until it falls to -60 dB and faded there, otherwise bit for bit.`;

await buildInstruments({
  id: 'weresax',
  name: 'Karoryfer Weresax',
  license: 'CC0-1.0',
  credit: 'Weresax by Karoryfer Lecolds (CC0): an alto saxophone.',
  note: NOTE,
  downloads,
  instruments: [
    {
      name: 'alto-sax',
      title: 'Alto Sax',
      category: 'Woodwinds',
      samples,
      tail: { floor: -60, cap: 30 },
      playing: { release: 0.15, attack: 0.005, oneShot: false, polyphony: 16, notePolyphony: 2, offTime: 0.08 },
    },
  ],
});
