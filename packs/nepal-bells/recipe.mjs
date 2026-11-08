// `node packs/nepal-bells/recipe.mjs [--cache DIR] [--out DIR]`: three Nepalese hand bells from the
// Versilian Community Sample Library (CC0), written into packs/nepal-bells/pack.json and
// packs/nepal-bells/files.sha256: each bell on its own pad, as recorded (24-bit stereo), measured
// together, the loudest at -17 dB at velocity 127.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, padSet } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/nepal-bells'));
const downloads = new Downloads(cache, {
  vcsl: 'https://raw.githubusercontent.com/sgossner/VCSL/c1ea7bcc3c7309650ab0da9d15c9cd1fbc4a4c7e/Idiophones/Struck Idiophones/Hand Bells, Nepalese/',
});
const set = padSet('bells', [1, 2, 3].map((n) => [`bell-${n}`, `Bell ${n}`, [{ download: `vcsl:HB_${n}.wav` }]]));

await buildInstruments({
  id: 'nepal-bells',
  name: 'Nepalese Hand Bells (VCSL)',
  license: 'CC0-1.0',
  credit: 'Nepalese hand bells from the Versilian Community Sample Library (CC0, Versilian Studios).',
  note: "VCSL's WAVs at the pinned commit, each kept until it falls to -60 dB and faded there, otherwise bit for bit.",
  downloads,
  instruments: [
    {
      name: 'bells',
      title: 'Nepalese Hand Bells',
      category: 'Percussion',
      pitched: false,
      // a struck sound's peak is sharp: up to -1 dB at velocity 127, as the kits' are
      peak: -1,
      ...set,
      tail: { floor: -60, cap: 8, fade: 0.5 },
      range: 24,
      playing: { release: 0.8, attack: 0, oneShot: false, polyphony: 16, notePolyphony: 3, offTime: 0.15 },
    },
  ],
  out: arg('out', null),
});
