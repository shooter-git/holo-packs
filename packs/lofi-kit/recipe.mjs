// `node packs/lofi-kit/recipe.mjs [--cache DIR] [--out DIR]`: a lo-fi beat kit made for HO[LO] from
// Sonic Pi's samples (CC0) and the FreePats synthesizer percussion (CC0), written into
// packs/lofi-kit/pack.json and packs/lofi-kit/files.sha256.
//
// A kit on General MIDI's keys, each sound played two semitones slow, as old samplers pitched their
// drums down: darker, rounder, a little longer (resampled by plain arithmetic, the same on every
// computer). Fat and analog kicks, a dub snare and a synth one, a side stick, a clap, closed, pedal and
// open hi-hats (the closed ones stop the open), three toms, a soft splash, a ride, a cowbell, a shaker,
// a finger snap and vinyl hiss. Measured as a whole, the kit at -19 dB at velocity 127, the level of
// HO[LO]'s kits (less where a hit would peak over -1 dB).
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, kitSet } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/lofi-kit'));
const downloads = new Downloads(
  cache,
  { sp: 'https://raw.githubusercontent.com/sonic-pi-net/sonic-pi/d1393a06266f74dc216bfd8a7e9a8eb7135b4941/etc/samples/' },
  { fp: { url: 'https://freepats.zenvoid.org/Percussion/SynthesizerPercussion/SynthesizerPercussion-SFZ-20220718.7z' } },
);
const sp = (n) => [{ download: `sp:${n}.flac` }];
const fp = (n) => [{ download: `fp:SynthesizerPercussion-SFZ-20220718/samples/${n}.wav` }];
const HAT = { group: 1 };
const OPEN = { group: 1, offBy: 1 };
const kit = kitSet('kit', [
  ['crash', 'Crash', [49], sp('drum_splash_soft')],
  ['ride', 'Ride', [51], sp('ride_via')],
  ['hat-open', 'Hi-hat open', [46], fp('OpenHiHat02-01'), OPEN],
  ['hat-closed', 'Hi-hat closed', [42], sp('hat_tap'), HAT],
  ['tom-high', 'High tom', [48], fp('HighTom02-01')],
  ['tom-mid', 'Mid tom', [45], fp('MidTom02-01')],
  ['tom-low', 'Low tom', [41], fp('LowTom02-01')],
  ['hat-pedal', 'Hi-hat pedal', [44], sp('hat_snap'), HAT],
  ['clap', 'Clap', [39], fp('Clap01')],
  ['sidestick', 'Side stick', [37], sp('elec_tick')],
  ['snare', 'Snare', [38], sp('sn_dub')],
  ['kick', 'Kick', [36, 35], sp('bd_fat')],
  ['snare-2', 'Snare 2', [40], fp('Snare09')],
  ['kick-2', 'Kick 2', [34], fp('Kick04')],
  ['cowbell', 'Cowbell', [56], sp('drum_cowbell')],
  ['shaker', 'Shaker', [70], fp('Shaker04')],
  ['snap', 'Snap', [54], sp('perc_snap')],
  ['vinyl-hiss', 'Vinyl hiss', [60], sp('vinyl_hiss')],
]);
// each played two semitones slow, into 44.1 kHz files
await downloads.all([...new Set(kit.samples.map((s) => s.download))]);
const SLOW = 2 ** (-2 / 12);
const RATE = 44100;
const samples = kit.samples.map(({ download, ...s }) => {
  const rate = downloads.decoded(download).rate;
  return { ...s, inputs: [[download, 1, 1, { rate: Math.round(rate * SLOW * 1000) / 1000 }]], rate: RATE };
});

await buildInstruments({
  id: 'lofi-kit',
  name: 'Lo-fi Beat Kit (Sonic Pi, FreePats)',
  license: 'CC0-1.0',
  credit:
    "Made for HO[LO] from Sonic Pi's samples (CC0, Freesound users' recordings as Sonic Pi's README lists them) and the FreePats " +
    'synthesizer percussion (CC0, Roberto of FreePats): each played two semitones slow.',
  note: 'Sonic Pi\'s FLACs at the pinned commit and the FreePats 7z download, each sound resampled two semitones slow into a 44.1 kHz WAV, kept until it falls to -60 dB.',
  downloads,
  level: -19,
  peak: -1,
  bits: 16,
  instruments: [
    {
      name: 'kit',
      title: 'Lo-fi Beat Kit',
      category: 'Drums',
      pitched: false,
      samples,
      pads: kit.pads,
      range: 28,
      tail: { floor: -60, cap: 6, fade: 0.3 },
      playing: { release: 0.08, attack: 0, oneShot: true, polyphony: 64, notePolyphony: 3, offTime: 0.035 },
    },
  ],
  out: arg('out', null),
});
