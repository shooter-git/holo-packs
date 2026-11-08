// `node packs/mtg-sax/recipe.mjs [--cache DIR] [--out DIR]`: MTG Solo Saxophones (CC BY 4.0), written
// into packs/mtg-sax/pack.json and packs/mtg-sax/files.sha256.
//
// Soprano, alto, tenor and baritone saxophones from the Music Technology Group's (Universitat Pompeu
// Fabra) free sample packs on Freesound, trimmed, looped and mapped by kinwie for the SFZ Instruments
// project (24-bit, 48 kHz, mono FLAC). Each plays as its program plays a note it starts: two velocity
// layers (the baritone three), three takes in turn, each held on its loop. The legato transitions and
// the breath and key noises aren't mapped. The layers are measured and set where one velocity curve
// meets them (the loudest at -17 dB); the files are the samples as they are, written as mono WAVs.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/mtg-sax'));
const lib = library('sfzinstruments/MTG.SoloSax', 'b494d256549b3d088fdec176ce82867f8a1f58b2');
const downloads = new Downloads(cache, { mtg: lib.base });
const DIR = 'MTG Solo Saxophones';
const SAXES = [
  ['soprano-sax', 'Soprano Sax', 'MTG Soprano Sax.sfz'],
  ['alto-sax', 'Alto Sax', 'MTG Alto Sax.sfz'],
  ['tenor-sax', 'Tenor Sax', 'MTG Tenor Sax.sfz'],
  ['baritone-sax', 'Baritone Sax', 'MTG Baritone Sax.sfz'],
];
const instruments = [];
for (const [name, title, sfz] of SAXES) {
  // the notes a key starts (not its legato transitions, nor the noises)
  const samples = await programSamples(lib, `${DIR}/${sfz}`, { tag: 'mtg', keep: (r) => r.master_label === 'attack' });
  instruments.push({
    name,
    title,
    category: 'Woodwinds',
    folder: name,
    samples,
    // each note's loop is kept in its FLAC (the WAV's smpl chunk the flac tool carried over)
    fileLoops: true,
    playing: { release: 0.12, attack: 0.005, oneShot: false, polyphony: 16, notePolyphony: 2, offTime: 0.08 },
  });
}

await buildInstruments({
  id: 'mtg-sax',
  name: 'MTG Solo Saxophones',
  license: 'CC-BY-4.0',
  credit:
    'MTG Solo Saxophones (CC BY 4.0): samples by the Music Technology Group, Universitat Pompeu Fabra (Freesound), ' +
    'trimmed, looped and mapped by kinwie for the SFZ Instruments project. Soprano, alto, tenor and baritone.',
  note: "MTG Solo Saxophones' samples (FLAC, at the pinned commit), written as WAVs as they are.",
  downloads,
  instruments,
  out: arg('out', null),
});
