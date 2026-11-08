// `node packs/string-cyborgs/recipe.mjs [--cache DIR] [--out DIR]`: Karoryfer's String Cyborgs (CC0), three
// synthesizer voices (Zinc, Blackheart and Ironface, clean and distorted), written into
// packs/string-cyborgs/pack.json and packs/string-cyborgs/files.sha256. Each voice's single-voice map:
// its oscillator recorded note by note and held on its loop (the library's unison voices, single-cycle
// variants and noise oscillator are left to HO[LO]'s own effects). Each is measured, the loudest at
// -17 dB at velocity 127.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/string-cyborgs'));
const lib = library('sfzinstruments/karoryfer.string-cyborgs', 'f2238b3e36ae64c6383356221dc89c9c476c7b11');
const downloads = new Downloads(cache, { k: lib.base });
// one voice: the regions the library plays with its unison control at its lowest
const single = (r) => r.hicc94 !== undefined && Number(r.hicc94) <= 32;
const voice = (program, shift) => programSamples(lib, `Programs/${program}.sfz`, { tag: 'k', keep: single, shift });
const playing = { release: 0.2, attack: 0.005, oneShot: false, polyphony: 32, notePolyphony: 2, offTime: 0.05 };
// each key plays the note it sounds: the library maps Ironface an octave over its recordings (its "a2"
// sounds at 110 Hz), and Zinc's tone carries a whole sub-octave series (from its A2 up, as loud as the
// note it's named for or louder), so each Zinc recording repeats an octave under its name
const VOICES = [
  ['zinc', 'Zinc', 'zinc_one_voice', -12],
  ['blackheart', 'Blackheart', 'blackheart_one', 0],
  ['ironface', 'Ironface', 'ironface_clean', -12],
  ['ironface-distorted', 'Ironface (Distorted)', 'ironface_distorted', -12],
];
const instruments = [];
for (const [name, title, program, shift] of VOICES)
  instruments.push({ name, title, category: 'Other', folder: name, samples: await voice(program, shift), fileLoops: true, playing });

await buildInstruments({
  id: 'string-cyborgs',
  name: 'Karoryfer String Cyborgs (Synth Voices)',
  license: 'CC0-1.0',
  credit: 'String Cyborgs by Karoryfer Lecolds (CC0): the synthesizer voices Zinc, Blackheart and Ironface.',
  note: "The library's WAVs at the pinned commit, as they are, held on their loops.",
  downloads,
  instruments,
  out: arg('out', null),
});
