// `node packs/caveman-cosmonaut/recipe.mjs [--cache DIR] [--out DIR]`: Karoryfer's Caveman Cosmonaut
// (CC0), an Unitra B-11 transistor organ's voices, written into packs/caveman-cosmonaut/pack.json and
// packs/caveman-cosmonaut/files.sha256: its flute, clarinet, trombone, trumpet, violin and tremolo voices
// and its 8' bass, every note held on its loop, as the library's maps play them (the library builds a
// synthesizer around them; here they're the organ's own voices). Each is measured, the loudest at -17 dB
// at velocity 127.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/caveman-cosmonaut'));
const lib = library('sfzinstruments/karoryfer.caveman-cosmonaut', '9de9bcfcbc6d2b20bea5c1116cd07a310febc339');
const downloads = new Downloads(cache, { k: lib.base });
// each voice's map, read as the main program includes it (from Programs/)
// the organ's voices sound at their own footage: the library maps most an octave under where they sound
// and its 8' bass an octave over; here each key plays the note it names (each shift as measured)
const voice = (m, shift) => programSamples(lib, `Programs/mappings/${m}.sfz`, { tag: 'k', as: `Programs/${m}.sfz`, shift });
const VOICES = [
  ['flutes', 'Transistor Organ Flutes', 'unitra_flutes', 12],
  ['clarinet', 'Transistor Organ Clarinet', 'unitra_clarinet', 12],
  ['trombone', 'Transistor Organ Trombone', 'unitra_trombone', 0],
  ['trumpet', 'Transistor Organ Trumpet', 'unitra_trompette', 12],
  ['violin', 'Transistor Organ Violin', 'unitra_violin', 12],
  ['tremolo', 'Transistor Organ Tremolo', 'unitra_tremolo', 12],
  ['bass', "Transistor Organ Bass 8'", 'unitra_bass_8', -12],
];
const instruments = [];
for (const [name, title, m, shift] of VOICES)
  instruments.push({
    name,
    title,
    category: name === 'bass' ? 'Bass' : 'Keys',
    folder: name,
    samples: await voice(m, shift),
    fileLoops: true,
    playing: { release: 0.1, attack: 0.005, oneShot: false, polyphony: 48, notePolyphony: 2, offTime: 0.05 },
  });

await buildInstruments({
  id: 'caveman-cosmonaut',
  name: 'Karoryfer Caveman Cosmonaut (Transistor Organ)',
  license: 'CC0-1.0',
  credit: 'Caveman Cosmonaut by Karoryfer Lecolds (CC0): the voices of an Unitra B-11 transistor organ.',
  note: "The library's WAVs at the pinned commit, as they are, held on their loops.",
  downloads,
  instruments,
  out: arg('out', null),
});
