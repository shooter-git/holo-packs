// `node packs/bigcat-cello/recipe.mjs [--cache DIR]`: Karoryfer x bigcat cello (CC0), written into
// packs/bigcat-cello/pack.json and packs/bigcat-cello/files.sha256.
//
// A cello played by Kamila Borowiak, recorded by Karoryfer Lecolds and bigcat instruments. Three ways
// of playing it, each as the library's own maps play them, :
// - bowed and held: four velocity layers, down and up bows taking turns;
// - staccato: four velocity layers, four takes in turn;
// - pizzicato: one layer, four takes in turn.
// Each instrument's layers are measured and set where one velocity curve meets them (the loudest at
// -17 dB), and a note's tail ends where it falls to -60 dB, and fades there.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/bigcat-cello'));
const lib = library('sfzinstruments/karoryfer-bigcat.cello', '6fd75fbfc1dbb3109bf26220ba1adea46188a18b');
const downloads = new Downloads(cache, { k: lib.base });
// the library maps the cello's low C (65 Hz) to key 24: here it plays where it sounds, from key 36
const map = (path, folder) =>
  programSamples(lib, path, { tag: 'k', shift: 12, keep: (r) => r.sample.replace(/\\/g, '/').includes(`/${folder}/`) });
const playing = { release: 0.25, attack: 0, oneShot: false, polyphony: 32, notePolyphony: 2, offTime: 0.1 };

const NOTE = `The library's WAVs at the pinned commit, each note kept until it falls to -60 dB and faded there, otherwise bit for bit.`;

await buildInstruments({
  id: 'bigcat-cello',
  name: 'Karoryfer x bigcat Cello',
  license: 'CC0-1.0',
  credit:
    'Karoryfer x bigcat cello by Karoryfer Lecolds and bigcat instruments (CC0): a cello played by Kamila Borowiak.',
  note: NOTE,
  downloads,
  instruments: [
    { name: 'cello', title: 'Solo Cello', category: 'Strings', samples: await map('Programs/vc_arco_sus_map.sfz', 'sus'), tail: { floor: -60, cap: 30 }, playing: { ...playing, attack: 0.01, release: 0.35 } },
    { name: 'cello_stac', title: 'Solo Cello (Staccato)', category: 'Strings', samples: await map('Programs/vc_arco_staccato_map.sfz', 'staccato'), tail: { floor: -60, cap: 4, fade: 0.3 }, playing },
    { name: 'cello_pizz', title: 'Solo Cello (Pizzicato)', category: 'Strings', samples: await map('Programs/vc_pizz_basic.sfz', 'pizzcato'), tail: { floor: -60, cap: 6, fade: 0.5 }, peak: -1, playing: { ...playing, release: 0.4 } },
  ],
});
