// `node packs/war-tuba/recipe.mjs [--cache DIR]`: Karoryfer's War Tuba (CC0), written into
// packs/war-tuba/pack.json and packs/war-tuba/files.sha256.
//
// A tuba played by Jakub Lewicki, recorded and mapped by Drogomir Smolken, from the library's
// condenser microphone, its files as they are:
// - sustained: one layer a note (the library swells it with the mod wheel; here velocity sets its level);
// - staccato: four velocity layers, three takes in turn.
// Each instrument's layers are measured and set where one velocity curve meets them (the loudest at
// -17 dB), and a note's tail ends where it falls to -60 dB, faded as it loads.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/war-tuba'));
const lib = library('sfzinstruments/karoryfer.war-tuba', '5b62dd6ef6b00281bb734769e44a63f5e013018a');
const downloads = new Downloads(cache, { k: lib.base });
const playing = { release: 0.2, attack: 0, oneShot: false, polyphony: 24, notePolyphony: 2, offTime: 0.1 };

await buildInstruments({
  id: 'war-tuba',
  name: 'Karoryfer War Tuba',
  license: 'CC0-1.0',
  credit: 'War Tuba by Karoryfer Lecolds (CC0): a tuba played by Jakub Lewicki, recorded and mapped by Drogomir Smolken.',
  mode: 'git',
  git: { url: lib.url, branch: 'master', commit: lib.commit },
  downloads,
  instruments: [
    { name: 'tuba', title: 'Tuba', category: 'Brass', samples: await programSamples(lib, 'Programs/poly/sustain_cnd.sfz', { tag: 'k', base: 'Programs' }), tail: { floor: -60, cap: 30 }, range: 24, playing: { ...playing, attack: 0.01 } },
    { name: 'tuba_stac', title: 'Tuba (Staccato)', category: 'Brass', samples: await programSamples(lib, 'Programs/poly/staccato_cnd.sfz', { tag: 'k', base: 'Programs' }), tail: { floor: -60, cap: 3, fade: 0.3 }, playing },
  ],
});
