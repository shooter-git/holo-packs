// `node packs/gogodze-phu/recipe.mjs [--cache DIR] [--out DIR]`: the bobobo drums of Karoryfer's
// Gogodze Phu Vol I (CC0), written into packs/gogodze-phu/pack.json and packs/gogodze-phu/files.sha256.
//
// Five bobobo drums from Ghana: the bass, and two tenors and two trebles each struck two ways (the
// library's "l" and "s" articulations: long and short), each on its own pad, four velocity layers and
// four takes in turn, as its maps play them. Measured together (their balance as recorded), the
// loudest at -17 dB at velocity 127.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, padSet, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/gogodze-phu'));
const lib = library('sfzinstruments/karoryfer.gogodze-phu-vol-i', '7452f62060cd3a468c78bc361d96a4dfb30879c9');
const downloads = new Downloads(cache, { k: lib.base });
const map = async (m) =>
  (await programSamples(lib, `Programs/mappings/${m}.sfz`, { tag: 'k', base: 'Programs' })).map((s) => ({
    download: s.download,
    layer: s.lovel,
    rr: s.rr,
  }));
const PIECES = [
  ['bass', 'Bass', 'bobobo_bass'],
  ['tenor-1-long', 'Tenor 1 long', 'bobobo_tenor_l_1'],
  ['tenor-1-short', 'Tenor 1 short', 'bobobo_tenor_s_1'],
  ['tenor-2-long', 'Tenor 2 long', 'bobobo_tenor_l_2'],
  ['tenor-2-short', 'Tenor 2 short', 'bobobo_tenor_s_2'],
  ['treble-1-long', 'Treble 1 long', 'bobobo_treble_l_1'],
  ['treble-1-short', 'Treble 1 short', 'bobobo_treble_s_1'],
  ['treble-2-long', 'Treble 2 long', 'bobobo_treble_l_2'],
  ['treble-2-short', 'Treble 2 short', 'bobobo_treble_s_2'],
];
const set = padSet('bobobo', await Promise.all(PIECES.map(async ([p, t, m]) => [p, t, await map(m)])));

await buildInstruments({
  id: 'gogodze-phu',
  name: 'Karoryfer Gogodze Phu (Bobobo Drums)',
  license: 'CC0-1.0',
  credit: 'Gogodze Phu Vol I by Karoryfer Lecolds (CC0): five bobobo drums from Ghana.',
  note: "The library's WAVs at the pinned commit, each kept until it falls to -60 dB and faded there, otherwise bit for bit.",
  downloads,
  instruments: [
    {
      name: 'bobobo',
      title: 'Bobobo Drums',
      category: 'Percussion',
      pitched: false,
      // a struck sound's peak is sharp: up to -1 dB at velocity 127, as the kits' are
      peak: -1,
      ...set,
      tail: { floor: -60, cap: 3, fade: 0.2 },
      range: 30,
      playing: { release: 0.15, attack: 0, oneShot: true, polyphony: 32, notePolyphony: 3, offTime: 0.04 },
    },
  ],
  out: arg('out', null),
});
