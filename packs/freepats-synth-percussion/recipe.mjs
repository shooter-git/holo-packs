// `node packs/freepats-synth-percussion/recipe.mjs [--cache DIR] [--out DIR]`: the FreePats project's
// synthesizer percussion (CC0), written into packs/freepats-synth-percussion/pack.json and
// packs/freepats-synth-percussion/files.sha256.
//
// A drum kit of the sounds vintage analog machines made, synthesized by Roberto of FreePats with the
// free Yoshimi and Geonkick synthesizers: two kicks, two snares, a clap, closed and open hi-hats (the
// closed one stops the open), two cymbals, six toms, shakers and claves, on General MIDI's keys.
// Measured as a whole (their balance as made), the kit at -19 dB at velocity 127, the level of HO[LO]'s kits
// (less where a hit would peak over -1 dB). Taken out of the project's own 7z download.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, kitSet } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/freepats-synth-percussion'));
const downloads = new Downloads(cache, {}, {
  sp: { url: 'https://freepats.zenvoid.org/Percussion/SynthesizerPercussion/SynthesizerPercussion-SFZ-20220718.7z' },
});
const s = (...files) => files.map((f) => ({ download: `sp:SynthesizerPercussion-SFZ-20220718/samples/${f}.wav` }));
const HAT = { group: 1 };
const OPEN = { group: 1, offBy: 1 };
const kit = kitSet('kit', [
  ['crash', 'Crash', [49], s('Cymbal01-01', 'Cymbal01-02', 'Cymbal01-03')],
  ['crash-2', 'Crash 2', [57], s('Cymbal02')],
  ['hat-open', 'Hi-hat open', [46], s('OpenHiHat02-01'), OPEN],
  ['hat-closed', 'Hi-hat closed', [42], s('ClosedHiHat01-01'), HAT],
  ['tom-high-1', 'High tom 1', [50], s('HighTom02-01')],
  ['tom-high-2', 'High tom 2', [48], s('HighTom02-02')],
  ['tom-mid-1', 'Mid tom 1', [47], s('MidTom02-01')],
  ['tom-mid-2', 'Mid tom 2', [45], s('MidTom02-02')],
  ['tom-low-1', 'Low tom 1', [43], s('LowTom02-01')],
  ['tom-low-2', 'Low tom 2', [41], s('LowTom02-02')],
  ['clap', 'Clap', [39], s('Clap01')],
  ['hat-closed-2', 'Hi-hat closed 2', [44], s('ClosedHiHat02-01'), HAT],
  ['snare', 'Snare', [38], s('Snare09')],
  ['kick', 'Kick', [36, 35], s('Kick04')],
  ['snare-2', 'Snare 2', [40], s('Snare14')],
  ['kick-2', 'Kick 2', [34], s('Kick06')],
  ['shaker', 'Shaker', [70], s('Shaker04')],
  ['shaker-long', 'Shaker long', [82], s('ShakerLong01')],
  ['claves', 'Claves', [75], s('Claves01')],
]);

await buildInstruments({
  id: 'freepats-synth-percussion',
  name: 'FreePats Synthesizer Percussion',
  license: 'CC0-1.0',
  credit: 'The synthesizer percussion of the FreePats project (CC0), made by Roberto with the Yoshimi and Geonkick synthesizers.',
  note: "The project's SFZ download (7z), each sound taken out and written as a WAV as it is.",
  downloads,
  level: -19,
  peak: -1,
  instruments: [
    {
      name: 'kit',
      title: 'Synth Percussion Kit',
      category: 'Drums',
      pitched: false,
      ...kit,
      range: 28,
      tail: { floor: -60, cap: 4, fade: 0.3 },
      playing: { release: 0.08, attack: 0, oneShot: true, polyphony: 64, notePolyphony: 3, offTime: 0.035 },
    },
  ],
  out: arg('out', null),
});
