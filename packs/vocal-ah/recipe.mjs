// `node packs/vocal-ah/recipe.mjs [--cache DIR]`: a deep male voice singing "ah", from the SFZ
// Instruments project's legato vocal tutorial (CC0), written into packs/vocal-ah/pack.json and
// packs/vocal-ah/files.sha256.
//
// The "a" vowel of Karoryfer's Hadzi-Fia library, sustained, without vibrato, as the tutorial's
// polyphonic program plays it (an octave down from where its SFZ maps it, so each key plays the note
// it names) and held on their own loops. One layer: the library sets its
// level with the mod wheel; here velocity does.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/vocal-ah'));
const lib = library('sfzinstruments/legato_vocal_tutorial', 'fac6461ee4c7f498b23246eced644616fa58d2ec');
const downloads = new Downloads(cache, { v: lib.base });

const NOTE = `The library's WAVs at the pinned commit, a looped note kept whole, any other until it falls to -60 dB and faded there; otherwise bit for bit.`;

await buildInstruments({
  id: 'vocal-ah',
  name: 'Male Voice "Ah"',
  license: 'CC0-1.0',
  credit:
    "A male voice singing \"ah\": the legato vocal tutorial of the SFZ Instruments project (CC0), the a vowel from Karoryfer's Hadzi-Fia sample library.",
  note: NOTE,
  downloads,
  instruments: [
    {
      name: 'ah',
      title: 'Male Voice Ah',
      category: 'Voice',
      // its SFZ maps each note an octave over where it sounds ("d3", 74 Hz, on key 50): here each key
      // plays the note it names
      samples: await programSamples(lib, 'Programs/01-no_legato_polyphonic_only_no_vibrato_a.sfz', { tag: 'v', shift: -12 }),
      fileLoops: true,
      range: 24,
      playing: { release: 0.35, attack: 0.04, oneShot: false, polyphony: 24, notePolyphony: 2, offTime: 0.15 },
    },
  ],
});
