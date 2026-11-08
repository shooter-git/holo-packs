// `node packs/dim-cabasa/recipe.mjs [--cache DIR] [--out DIR]`: kinwie's Dim Cabasa (CC BY 4.0), written
// into packs/dim-cabasa/pack.json and packs/dim-cabasa/files.sha256: a cabasa turned backward and
// forward, each on its pad, 125 takes of each in turn, as its SFZ program plays them.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, padSet, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/dim-cabasa'));
const lib = library('sfzinstruments/kinwie.dim-cabasa', '016457e51a3e6558ab49676789260b54ff52ff1b');
const downloads = new Downloads(cache, { c: lib.base });
const regions = await programSamples(lib, 'Dim Cabasa.sfz', { tag: 'c' });
const takes = (art) =>
  regions
    .filter((s) => s.region.group_label === art)
    .map((s, i) => ({ download: s.download, rr: i + 1 }));
const set = padSet('cabasa', [
  ['backward', 'Cabasa backward', takes('bw')],
  ['forward', 'Cabasa forward', takes('fw')],
]);

await buildInstruments({
  id: 'dim-cabasa',
  name: 'Dim Cabasa',
  license: 'CC-BY-4.0',
  credit: 'Dim Cabasa by kinwie for the SFZ Instruments project (CC BY 4.0).',
  note: "The library's FLACs at the pinned commit, written as WAVs as they are.",
  downloads,
  instruments: [
    {
      name: 'cabasa',
      title: 'Cabasa',
      category: 'Percussion',
      pitched: false,
      // a struck sound's peak is sharp: up to -1 dB at velocity 127, as the kits' are
      peak: -1,
      ...set,
      tail: { floor: -60, cap: 2, fade: 0.1 },
      range: 24,
      playing: { release: 0.1, attack: 0, oneShot: true, polyphony: 16, notePolyphony: 2, offTime: 0.03 },
    },
  ],
  out: arg('out', null),
});
