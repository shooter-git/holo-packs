// `node packs/extreme-metal-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Extreme Metal Kit pack, from
// DrumGizmo's Aasimonster 2.1 (CC BY 4.0): a large death-metal kit, the one a band recorded its debut
// album on. Two kicks, a snare, three rack toms and a floor tom, hi-hats, two crashes, three chinas, a
// ride with two bells and a bell cymbal, on fourteen microphones.
//
// Read as DrumGizmo reads it (tools/drumgizmo.mjs): its drumkit, every instrument on the key its own
// MIDI map gives it, but for the crashes' chokes (moved off General MIDI's high tom and onto keys of
// their own) and a closed hi-hat that sits on a tom's key; the toms on General MIDI's other tom keys
// too. Its hits are put in velocity layers by their power, the hits of a layer its round robins.
//
// The microphones are kept apart, each with a knob, all at 0 dB as DrumGizmo plays them (it has no
// mixer of its own). Its two trigger channels (a snare trigger's signal and an electronic drum
// module's output) aren't microphones, and are left out. The overheads and the room are stereo pairs;
// each close microphone is panned where the overheads place its drum.
import { buildKit, Downloads } from '../../tools/kit.mjs';
import { drumgizmoPiece, overheadPans, readDrumkit } from '../../tools/drumgizmo.mjs';
import { arg } from '../../tools/lib.mjs';

const ARCHIVE = 'aasimonster';
const archives = { [ARCHIVE]: { url: 'https://drumgizmo.org/kits/Aasimonster/aasimonster2_1.zip' } };
const downloads = new Downloads(
  arg('cache', `${process.env.HOME}/.cache/holo-pack-sources/extreme-metal-kit`),
  {},
  archives,
);
const kit = await readDrumkit(downloads, `${ARCHIVE}:aasimonster2/`, 'aasimonster.xml', 'midimap.xml');

// ---- the microphones ----

const MICS = [
  { id: 'kick-1', name: 'Kick 1' },
  { id: 'kick-2', name: 'Kick 2' },
  { id: 'snare-top', name: 'Snare top' },
  { id: 'snare-bottom', name: 'Snare bottom' },
  { id: 'toms', name: 'Toms' },
  { id: 'hat', name: 'Hi-hat' },
  { id: 'ride', name: 'Ride' },
  { id: 'overheads', name: 'Overheads' },
  { id: 'room', name: 'Room' },
];

// each close microphone panned where the overheads hear its drum (its loudest hit), the kick in the middle
const homes = {
  KdrumL: 'kick_l',
  KdrumR: 'kick_r',
  Snare_top: 'snare_on_center',
  Snare_bottom: 'snare_on_center',
  Tom1: 'tom_1',
  Tom2: 'tom_2',
  Tom3: 'tom_3',
  Tom4: 'tom_4',
  Hihat: 'hihat_closed1',
  Ride: 'ride',
};
const pan = await overheadPans(downloads, kit, homes, ['OHL', 'OHR'], ['kick_l', 'kick_r']);
console.log('close microphones panned (0 left, 127 right):', pan);

// a stereo pair recorded as two mono microphones, each to its own side at the level it was recorded
// (panGains gives a hard-panned microphone √2, so each side is brought back to unity)
const side = Math.SQRT1_2;
/** The kit's channels (not its triggers): [input, gain, pan]. */
const mics = {
  KdrumL: ['kick-1', 1, pan.KdrumL],
  KdrumR: ['kick-2', 1, pan.KdrumR],
  Snare_top: ['snare-top', 1, pan.Snare_top],
  Snare_bottom: ['snare-bottom', 1, pan.Snare_bottom],
  Tom1: ['toms:1', 1, pan.Tom1],
  Tom2: ['toms:2', 1, pan.Tom2],
  Tom3: ['toms:3', 1, pan.Tom3],
  Tom4: ['toms:4', 1, pan.Tom4],
  Hihat: ['hat', 1, pan.Hihat],
  Ride: ['ride', 1, pan.Ride],
  OHL: ['overheads:l', side, 0],
  OHR: ['overheads:r', side, 127],
  AmbL: ['room:l', side, 0],
  AmbR: ['room:r', side, 127],
};

// ---- the pieces ----

const piece = (instrument, name, keys, opts = {}) => drumgizmoPiece(kit, instrument, name, keys, { mics, ...opts });
const drum = { layers: 8, maxRR: 6, ring: 1.6, fade: 0.4, floor: 56 };
const tom = { layers: 7, maxRR: 4, ring: 2.2, fade: 0.5, floor: 56 };
const hat = { group: 1 };
const cymbal = { layers: 5, maxRR: 3, ring: 4.5, fade: 1.4, floor: 50 };
// a crash grabbed as it's struck: it stops its crash's ring
const CRASH_1 = 2;
const CRASH_2 = 3;

await buildKit({
  id: 'extreme-metal-kit',
  name: 'Extreme Metal Kit (DrumGizmo Aasimonster)',
  license: 'CC-BY-4.0',
  credit:
    'Aasimonster 2.1 by the DrumGizmo team (CC BY 4.0): set up and sampled by Deva, prepared by Chaot4 and Deva, ' +
    'bleed control by Henry Järvinen. Drum samples provided by DrumGizmo.org. ' +
    'Its fourteen microphones kept apart for HO[LO], each with its own level.',
  note: "Aasimonster's fourteen microphones (one channel each of its multichannel WAVs, from DrumGizmo's own ZIP), each kept as its own file.",
  folder: 'aasimonster',
  instrument: { name: 'kit', title: 'Extreme Metal Kit' },
  level: -19,
  downloads,
  bases: {},
  mics: MICS,
  pads: [
    'crash',
    'crash-2',
    'china',
    'ride',
    'tom-1',
    'tom-2',
    'tom-3',
    'tom-4',
    'hat-open',
    'hat-closed-2',
    'hat-closed',
    'ride-bell',
    'rimshot',
    'snare',
    'snare-edge',
    'ride-bell-2',
    'kick-2',
    'kick',
    'hat-closed-3',
    'bell',
    'china-2',
    'china-3',
    'crash-choke',
    'crash-2-choke',
  ],
  pieces: [
    piece('kick_l', 'kick', [36], { ...drum, leadsRange: true, ring: 1.4 }),
    piece('kick_r', 'kick-2', [35], { ...drum, maxRR: 5, title: 'Kick 2', ring: 1.4 }),
    piece('snare_on_center', 'snare', [38], { ...drum, layers: 10, maxRR: 8, leadsRange: true }),
    piece('snare_off_center', 'snare-edge', [40], { ...drum, layers: 6, maxRR: 3 }),
    piece('snare_rim_shot', 'rimshot', [37], { ...drum, layers: 7, maxRR: 3 }),
    piece('tom_1', 'tom-1', [48, 50], { ...tom, pad: 48, title: 'Tom 1', leadsRange: true }),
    piece('tom_2', 'tom-2', [47], { ...tom, title: 'Tom 2' }),
    piece('tom_3', 'tom-3', [45], { ...tom, title: 'Tom 3' }),
    piece('tom_4', 'tom-4', [43, 41], { ...tom, pad: 43, title: 'Floor tom 4', leadsRange: true }),
    piece('hihat_closed1', 'hat-closed', [42], { ...hat, layers: 7, maxRR: 5, ring: 0.8 }),
    piece('hihat_closed2', 'hat-closed-2', [22], { ...hat, layers: 6, maxRR: 3, ring: 0.8, title: 'Hi-hat closed 2' }),
    piece('hihat_closed3', 'hat-closed-3', [44], { ...hat, layers: 6, maxRR: 3, ring: 0.8, title: 'Hi-hat closed 3' }),
    piece('hihat_open', 'hat-open', [46], { ...hat, layers: 6, maxRR: 3, offBy: 1, ring: 2.5, fade: 0.8, floor: 54 }),
    piece('ride', 'ride', [51], { ...cymbal, layers: 6, maxRR: 3, ring: 4 }),
    piece('ride_bell2', 'ride-bell', [53], { ...cymbal, ring: 4 }),
    piece('ride_bell1', 'ride-bell-2', [59], { ...cymbal, ring: 4, title: 'Ride bell 2' }),
    piece('crash1', 'crash', [49], { ...cymbal, offBy: CRASH_1 }),
    piece('crash1_stop', 'crash-choke', [60], { layers: 1, maxRR: 3, ring: 1, group: CRASH_1, title: 'Crash choke' }),
    piece('crash2', 'crash-2', [57], { ...cymbal, offBy: CRASH_2, title: 'Crash 2' }),
    piece('crash2_stop', 'crash-2-choke', [58], {
      layers: 1,
      maxRR: 3,
      ring: 1,
      group: CRASH_2,
      title: 'Crash 2 choke',
    }),
    piece('china_18_inch', 'china', [52], { ...cymbal, ring: 3.5, title: 'China 18″' }),
    piece('china_10_inch', 'china-2', [54], { ...cymbal, ring: 3, title: 'China 2, 10″' }),
    piece('china_8_inch', 'china-3', [56], { ...cymbal, ring: 2.5, title: 'China 3, 8″' }),
    piece('zilbel', 'bell', [55], { layers: 1, maxRR: 3, ring: 4, fade: 1.4, floor: 50, title: 'Bell cymbal' }),
  ],
});
