// `node packs/cowsynth/recipe.mjs [--cache DIR] [--out DIR]`: Karoryfer's Cowsynth (CC0): a replica of
// medieval bagpipes sampled as a synthesizer's oscillators, written into packs/cowsynth/pack.json and
// packs/cowsynth/files.sha256. Two of its mappings, every note held on its loop: Wheezy (the bagpipes
// tuned to equal temperament) and Lonely (pitch-corrected to perfect equal temperament). Each is
// measured, the loudest at -17 dB at velocity 127.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/cowsynth'));
const lib = library('sfzinstruments/karoryfer.cowsynth', '5a5b5afc2dabbe54cf9d75ab64711ce01862b42c');
const downloads = new Downloads(cache, { k: lib.base });
const playing = { release: 0.3, attack: 0.02, oneShot: false, polyphony: 32, notePolyphony: 2, offTime: 0.1 };
// the library maps each note an octave under where it sounds ("g2" on key 43): here each key plays the
// note it names
const shift = 12;

await buildInstruments({
  id: 'cowsynth',
  name: 'Karoryfer Cowsynth (Bagpipe Synth)',
  license: 'CC0-1.0',
  credit: 'Cowsynth by Karoryfer Lecolds (CC0): a replica of medieval bagpipes, sampled as a synthesizer\'s oscillators.',
  note: "The library's WAVs at the pinned commit, as they are, held on their loops.",
  downloads,
  instruments: [
    { name: 'wheezy', title: 'Bagpipe Synth (Wheezy)', category: 'Other', folder: 'wheezy', samples: await programSamples(lib, 'cowsynth_wheezy_organ.sfz', { tag: 'k', shift }), playing },
    { name: 'lonely', title: 'Bagpipe Synth (Lonely)', category: 'Other', folder: 'lonely', samples: await programSamples(lib, 'cowsynth_lonely_organ.sfz', { tag: 'k', shift }), playing },
  ],
  out: arg('out', null),
});
