// `node packs/angklung-khaen/recipe.mjs [--cache DIR] [--out DIR]`: an angklung and a khaen recorded by
// Berklee students for One Laptop per Child (CC BY 3.0), written into packs/angklung-khaen/pack.json
// and packs/angklung-khaen/files.sha256.
//
// What the recordings allow:
// - *Angklung*: a shake of the bamboo frame, two takes in turn (the set has no single angklung notes
//   to play a melody with, only fast runs);
// - *Angklung Ensemble*: a group of players' long shaken chord, one sound;
// - *Khaen*: the mouth organ's drone, two chords, rooted at their lowest notes (A3, and G3 a quarter
//   tone sharp) and played on the keys around them.
// The files are fetched one by one out of the published zip (archive.org serves them).
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, oneSound } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/angklung-khaen'));
const downloads = new Downloads(cache, { berklee: 'https://archive.org/download/Berklee44v1/Berklee44v1.zip/Berklee44v1/' });
const take = (f) => ({ download: `berklee:${f}.wav` });
const one = { release: 0.4, attack: 0, oneShot: true, polyphony: 16, notePolyphony: 2, offTime: 0.1 };

await buildInstruments({
  id: 'angklung-khaen',
  name: 'Angklung and Khaen (OLPC)',
  license: 'CC-BY-3.0',
  credit: 'Angklung and khaen samples by Berklee College of Music students for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/Berklee44v1).',
  note: 'The 44.1 kHz WAVs of the published zip, fetched one by one, each kept until it falls to -60 dB and faded there, otherwise bit for bit.',
  downloads,
  instruments: [
    { name: 'angklung', title: 'Angklung', category: 'Percussion', pitched: false, samples: oneSound([take('anklung_1'), take('anklung_2')]), tail: { floor: -60, cap: 3, fade: 0.2 }, playing: one },
    { name: 'angklung_ensemble', title: 'Angklung Ensemble', category: 'Percussion', pitched: false, samples: oneSound([take('group_anklung_long_1')]), window: 8, tail: { floor: -60, cap: 30, fade: 2 }, playing: { ...one, release: 1.5 } },
    {
      name: 'khaen',
      title: 'Khaen',
      category: 'Woodwinds',
      checkPitch: false,
      // the lowest note of each drone (220.1 Hz, and 198.9 Hz)
      samples: [
        { ...take('khaen_lo_2'), root: 55.26, lo: 43, hi: 56, layer: 1, rr: 1 },
        { ...take('khaen_lo_1'), root: 57.01, lo: 57, hi: 69, layer: 1, rr: 1 },
      ],
      tail: { floor: -60, cap: 10, fade: 0.3 },
      range: 20,
      playing: { release: 0.25, attack: 0.03, oneShot: false, polyphony: 16, notePolyphony: 2, offTime: 0.1 },
    },
  ],
  out: arg('out', null),
});
