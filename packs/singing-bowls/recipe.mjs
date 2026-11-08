// `node packs/singing-bowls/recipe.mjs [--cache DIR] [--out DIR]`: three singing bowls struck and left to
// ring, recorded by OpenPath Music for One Laptop per Child (CC BY 3.0), written into
// packs/singing-bowls/pack.json and packs/singing-bowls/files.sha256.
//
// The bowls are named for their notes (D♭, G, B♭); each is rooted at the pitch of its lowest strong
// partial as measured (a bowl's partials aren't a string's, so a spectrum, not a pitch tracker, says
// where it sits) and plays the keys nearest it, so a melody can be played across them. Each rings for
// up to a minute; it's kept until it falls to -60 dB (30 s at most) and faded there.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/singing-bowls'));
const downloads = new Downloads(cache, {
  open: 'https://archive.org/download/OpenPathMusic44V1/OpenPathMusic44V1.zip/OpenPathMusic44V1/',
});
// the lowest strong partial of each (Hz, as MIDI): 546.2 Hz, 789.2 Hz, 958.3 Hz
const BOWLS = [
  ['prayer bowl Db.wav', 72.74, 60, 75],
  ['prayer bowl G.wav', 79.11, 76, 80],
  ['prayer bowl Bb.wav', 82.48, 81, 96],
];

await buildInstruments({
  id: 'singing-bowls',
  name: 'Singing Bowls (OLPC)',
  license: 'CC-BY-3.0',
  credit: 'Singing bowl samples by OpenPath Music for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/OpenPathMusic44V1).',
  note: 'The 44.1 kHz WAVs of the published zip, fetched one by one, each kept until it falls to -60 dB (30 s at most) and faded there, otherwise bit for bit.',
  downloads,
  instruments: [
    {
      name: 'bowls',
      title: 'Singing Bowls',
      category: 'Percussion',
      checkPitch: false,
      samples: BOWLS.map(([f, root, lo, hi]) => ({ download: `open:${f}`, root, lo, hi, layer: 1, rr: 1 })),
      tail: { floor: -60, cap: 30, fade: 3 },
      playing: { release: 2.5, attack: 0, oneShot: false, polyphony: 24, notePolyphony: 3, offTime: 0.3 },
    },
  ],
  out: arg('out', null),
});
