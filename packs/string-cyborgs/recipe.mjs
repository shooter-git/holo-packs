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
// each key plays the note it sounds. The library maps Ironface an octave over its recordings (its "a2"
// sounds at 110 Hz). Zinc's tone carries a sub-octave series that grows with its pitch: its recordings
// under A2 sound as they're named, and from A2 up (the sub-octave as strong as the note, or stronger)
// each repeats an octave under its name, so the two halves overlap. Zinc is played from its A2-up
// recordings, each on the key it sounds, the lowest reaching down an octave as the library's lowest does.
const zinc = (await voice('zinc_one_voice', -12)).filter((s) => s.root >= 33);
const lowest = zinc.reduce((a, b) => (b.root < a.root ? b : a));
lowest.lo = lowest.root - 12;
const VOICES = [
  ['zinc', 'Zinc', zinc],
  ['blackheart', 'Blackheart', await voice('blackheart_one', 0)],
  ['ironface', 'Ironface', await voice('ironface_clean', -12)],
  ['ironface-distorted', 'Ironface (Distorted)', await voice('ironface_distorted', -12)],
];
const instruments = [];
for (const [name, title, samples] of VOICES)
  instruments.push({ name, title, category: 'Other', folder: name, samples, fileLoops: true, playing });

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
