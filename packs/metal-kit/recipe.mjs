// `node packs/metal-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Metal Kit pack, from DrumGizmo's
// CrocellKit 1.1 (CC BY 4.0): a metal band's kit sampled in the studio where they'd just recorded an
// album, on its engineer's fifteen microphones. A double-pedalled kick, a snare, two rack and two
// floor toms, hi-hats, three crashes, a ride, two chinas and two splashes.
//
// Read as DrumGizmo reads it (tools/drumgizmo.mjs): its full drumkit, every instrument on the key
// its own MIDI map gives it, the toms on General MIDI's other tom keys too. Its hits are put in
// velocity layers by their power, the hits of a layer its round robins.
//
// The microphones are kept apart, each with a knob, all at 0 dB as DrumGizmo plays them (it has no
// mixer of its own). The overheads and the room are stereo pairs; each close microphone is panned
// where the overheads place its drum.
import { buildKit, Downloads } from '../../tools/kit.mjs';
import { drumgizmoPiece, overheadPans, readDrumkit } from '../../tools/drumgizmo.mjs';
import { arg } from '../../tools/lib.mjs';

const ARCHIVE = 'crocell';
const archives = { [ARCHIVE]: { url: 'https://drumgizmo.org/kits/CrocellKit/CrocellKit1_1.zip' } };
const downloads = new Downloads(arg('cache', `${process.env.HOME}/.cache/holo-pack-sources/metal-kit`), {}, archives);
const kit = await readDrumkit(downloads, `${ARCHIVE}:CrocellKit/`, 'CrocellKit_full.xml', 'Midimap_full.xml');

// ---- the microphones ----

const MICS = [
  { id: 'kick-in', name: 'Kick in' },
  { id: 'kick-out', name: 'Kick out' },
  { id: 'snare-top', name: 'Snare top' },
  { id: 'snare-bottom', name: 'Snare bottom' },
  { id: 'toms', name: 'Toms' },
  { id: 'hat', name: 'Hi-hat' },
  { id: 'ride', name: 'Ride' },
  { id: 'overheads', name: 'Overheads' },
  { id: 'oh-centre', name: 'Centre overhead' },
  { id: 'room', name: 'Room' },
];

// each close microphone panned where the overheads hear its drum (its loudest hit), the kick in the middle
const homes = {
  KDrumInside: 'KDrumR',
  KDrumOutside: 'KDrumR',
  SnareTop: 'Snare',
  SnareBottom: 'Snare',
  Tom1: 'Tom1',
  Tom2: 'Tom2',
  FTom1: 'FTom1',
  FTom2: 'FTom2',
  Hihat: 'HihatClosed',
  Ride: 'RideR',
};
const pan = await overheadPans(downloads, kit, homes, ['OHLeft', 'OHRight'], ['KDrumR', 'KDrumL']);
console.log('close microphones panned (0 left, 127 right):', pan);

// a stereo pair recorded as two mono microphones, each to its own side at the level it was recorded
// (panGains gives a hard-panned microphone √2, so each side is brought back to unity)
const side = Math.SQRT1_2;
/** The kit's fifteen channels: [input, gain, pan]. */
const mics = {
  KDrumInside: ['kick-in', 1, pan.KDrumInside],
  KDrumOutside: ['kick-out', 1, pan.KDrumOutside],
  SnareTop: ['snare-top', 1, pan.SnareTop],
  SnareBottom: ['snare-bottom', 1, pan.SnareBottom],
  Tom1: ['toms:1', 1, pan.Tom1],
  Tom2: ['toms:2', 1, pan.Tom2],
  FTom1: ['toms:3', 1, pan.FTom1],
  FTom2: ['toms:4', 1, pan.FTom2],
  Hihat: ['hat', 1, pan.Hihat],
  Ride: ['ride', 1, pan.Ride],
  OHLeft: ['overheads:l', side, 0],
  OHRight: ['overheads:r', side, 127],
  OHCenter: ['oh-centre', 1, 63.5],
  AmbLeft: ['room:l', side, 0],
  AmbRight: ['room:r', side, 127],
};

// ---- the pieces ----

const piece = (instrument, name, keys, opts = {}) => drumgizmoPiece(kit, instrument, name, keys, { mics, ...opts });
const drum = { layers: 8, maxRR: 4, ring: 1.6, fade: 0.4, floor: 56 };
const tom = { layers: 7, maxRR: 3, ring: 2.2, fade: 0.5, floor: 56 };
const hat = { group: 1 };
const cymbal = { layers: 5, maxRR: 2, ring: 4.5, fade: 1.4, floor: 50 };
// a crash grabbed as it's struck: it stops its crash's ring (and a crash struck again stops its own)
const CRASH_L = 2;
const CRASH_R = 3;

await buildKit({
  id: 'metal-kit',
  name: 'Metal Kit (DrumGizmo CrocellKit)',
  license: 'CC-BY-4.0',
  credit:
    'CrocellKit 1.1 by the DrumGizmo team (CC BY 4.0): sampled and prepared by Lars Muldjord, the kit set up ' +
    'by Andreas of Crocell, its microphones by Jacob Olsen of JBOSound. Drum samples provided by DrumGizmo.org. ' +
    'Its fifteen microphones kept apart for HO[LO], each with its own level.',
  note: "CrocellKit's fifteen microphones (one channel each of its multichannel WAVs, from DrumGizmo's own ZIP), each kept as its own file.",
  folder: 'crocell',
  instrument: { name: 'kit', title: 'Metal Kit' },
  level: -19,
  downloads,
  bases: {},
  mics: MICS,
  pads: [
    'crash',
    'crash-2',
    'china',
    'china-2',
    'splash',
    'splash-2',
    'crash-3',
    'ride',
    'tom-1',
    'tom-2',
    'floor-tom',
    'floor-tom-2',
    'hat-open',
    'hat-half',
    'hat-closed',
    'ride-bell',
    'sidestick',
    'snare',
    'rimshot',
    'snare-rest',
    'kick-2',
    'kick',
    'hat-pedal',
    'hat-loose',
    'crash-choke',
    'crash-2-choke',
    'hat-splash',
  ],
  pieces: [
    piece('KDrumR', 'kick', [36], { ...drum, maxRR: 4, leadsRange: true, ring: 1.4 }),
    piece('KDrumL', 'kick-2', [35], { ...drum, maxRR: 3, title: 'Kick 2 (left foot)', ring: 1.4 }),
    piece('Snare', 'snare', [38], { ...drum, layers: 10, maxRR: 5, leadsRange: true }),
    piece('SnareRim', 'sidestick', [37], { layers: 5, maxRR: 3, ring: 0.8 }),
    piece('SnareRimShot', 'rimshot', [40], { ...drum, layers: 6, maxRR: 2 }),
    piece('SnareRest', 'snare-rest', [39], { ...drum, layers: 5, maxRR: 2, title: 'Snare rest stroke' }),
    piece('Tom1', 'tom-1', [48, 50], { ...tom, pad: 48, title: 'Rack tom 1', leadsRange: true }),
    piece('Tom2', 'tom-2', [47, 45], { ...tom, pad: 47, title: 'Rack tom 2' }),
    piece('FTom1', 'floor-tom', [43], { ...tom, title: 'Floor tom' }),
    piece('FTom2', 'floor-tom-2', [41], { ...tom, title: 'Floor tom 2', leadsRange: true }),
    piece('HihatClosed', 'hat-closed', [42], { ...hat, layers: 7, maxRR: 4, ring: 0.8 }),
    piece('HihatClosedNoPedal', 'hat-loose', [78], { ...hat, layers: 6, maxRR: 3, ring: 1.2 }),
    piece('HihatPedal', 'hat-pedal', [44], { ...hat, layers: 4, maxRR: 3, ring: 0.8 }),
    piece('HihatPedalHit', 'hat-splash', [73], {
      ...hat,
      layers: 3,
      maxRR: 2,
      offBy: 1,
      ring: 2,
      title: 'Hi-hat foot splash',
    }),
    piece('HihatSemiOpen', 'hat-half', [80], { ...hat, layers: 5, maxRR: 2, offBy: 1, ring: 2, fade: 0.6, floor: 54 }),
    piece('HihatOpen', 'hat-open', [46], { ...hat, layers: 5, maxRR: 2, offBy: 1, ring: 2.5, fade: 0.8, floor: 54 }),
    piece('RideR', 'ride', [51], { ...cymbal, layers: 6, maxRR: 3, ring: 4 }),
    piece('RideRBell', 'ride-bell', [53], { ...cymbal, ring: 4 }),
    piece('CrashL', 'crash', [49], { ...cymbal, offBy: CRASH_L }),
    piece('CrashLStopped', 'crash-choke', [56], {
      ...cymbal,
      layers: 4,
      ring: 1,
      group: CRASH_L,
      title: 'Crash choke',
    }),
    piece('CrashR', 'crash-2', [57], { ...cymbal, offBy: CRASH_R, title: 'Crash 2' }),
    piece('CrashRStopped', 'crash-2-choke', [75], {
      ...cymbal,
      layers: 4,
      ring: 1,
      group: CRASH_R,
      title: 'Crash 2 choke',
    }),
    piece('CrashRXtra', 'crash-3', [59], { ...cymbal, layers: 4, title: 'Crash 3' }),
    piece('ChinaR', 'china', [52], { ...cymbal, ring: 3.5 }),
    piece('ChinaL', 'china-2', [54], { ...cymbal, ring: 3.5, title: 'China 2' }),
    piece('SplashL', 'splash', [55], { ...cymbal, layers: 4, ring: 2.5, title: 'Splash' }),
    piece('SplashR', 'splash-2', [58], { ...cymbal, layers: 4, ring: 2.5, title: 'Splash 2' }),
  ],
});
