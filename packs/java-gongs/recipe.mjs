// `node packs/java-gongs/recipe.mjs [--cache DIR] [--out DIR]`: Javanese gongs recorded by Nils van
// Ottorloo for One Laptop per Child (CC BY 3.0), written into packs/java-gongs/pack.json and
// packs/java-gongs/files.sha256.
//
// Two gong ageng, a gong kemodhong, six kempul and five kenong, each on its own pad, each played as it
// was recorded (their tunings are their own). Measured together (their balance as recorded), the
// loudest at -17 dB at velocity 127; each kept until it falls to -60 dB. The files are fetched one by
// one out of the published zip (archive.org serves them).
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, padSet } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/java-gongs'));
const downloads = new Downloads(cache, {
  nils: 'https://archive.org/download/NilsVanOttorloo/NilsVanOttorloo44.zip/NilsVanOttorloo44/',
});
const take = (f) => [{ download: `nils:${f}.wav` }];
const set = padSet('gongs', [
  ['gong-ageng-1', 'Gong ageng 1', take('GongAgeng90')],
  ['gong-ageng-2', 'Gong ageng 2', take('GongAgeng91')],
  ['gong-kemodhong', 'Gong kemodhong', take('GongKemadhong90')],
  ['kempul-1', 'Kempul 1', take('KempulGong90')],
  ['kempul-2', 'Kempul 2', take('KempulGong91')],
  ['kempul-3', 'Kempul 3', take('KempulGong92')],
  ['kempul-4', 'Kempul 4', take('KempulGong93')],
  ['kempul-5', 'Kempul 5', take('KempulGong94')],
  ['kempul-6', 'Kempul 6', take('KempulGong6')],
  ['kenong-1', 'Kenong 1', take('Kenong90')],
  ['kenong-2', 'Kenong 2', take('Kenong91')],
  ['kenong-3', 'Kenong 3', take('Kenong92')],
  ['kenong-4', 'Kenong 4', take('Kenong93')],
  ['kenong-5', 'Kenong 5', take('Kenong94')],
]);

await buildInstruments({
  id: 'java-gongs',
  name: 'Javanese Gongs (OLPC)',
  license: 'CC-BY-3.0',
  credit:
    'Javanese gong samples by Nils van Ottorloo for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/NilsVanOttorloo).',
  note: 'The 44.1 kHz WAVs of the published zip, fetched one by one, each kept until it falls to -60 dB and faded there, otherwise bit for bit.',
  downloads,
  instruments: [
    {
      name: 'gongs',
      title: 'Javanese Gongs',
      category: 'Percussion',
      pitched: false,
      ...set,
      tail: { floor: -60, cap: 30, fade: 1.5 },
      playing: { release: 1, attack: 0, oneShot: false, polyphony: 32, notePolyphony: 2, offTime: 0.2 },
    },
  ],
  out: arg('out', null),
});
