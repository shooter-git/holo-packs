// `node packs/studio-kit/recipe.mjs [--cache DIR] [--out DIR]`: a studio kit from Karoryfer's Unruly
// Drums (CC0), written into packs/studio-kit/pack.json and packs/studio-kit/files.sha256.
//
// The same kit tuned and played another way: the 20" kick played dirty (a harder, rattling beater), the
// 13" snare (tighter, higher), toms from the 14" and 22" snares with their snares off played dirty, the
// 14" hi-hats with the stick's shank, the ride and crash. Mixed from each piece's close and overhead
// microphones, each hit trimmed to just before its attack, its layers set where the kit's velocity curve
// meets their loudness, as HO[LO]'s other kits are.
import { MICS, unruly } from '../../tools/unruly.mjs';

const u = await unruly('studio-kit');
const HAT = { group: 1 };
const OPEN = { group: 1, offBy: 1 };
const p = (name, keys, piece, articulation, mics, extra = {}) => ({
  name,
  keys,
  hits: u.hits(piece, articulation, Object.keys(mics)),
  mics,
  maxLayers: 8,
  ...extra,
});
await u.build({
  id: 'studio-kit',
  name: 'Studio Kit (Karoryfer Unruly Drums)',
  license: 'CC0-1.0',
  credit: "Unruly Drums by Karoryfer Lecolds (CC0). Mixed for HO[LO] from its close and overhead microphones: a studio kit.",
  note: "Unruly Drums' close and overhead microphones (FLAC, at the pinned commit), mixed as one session.",
  folder: 'studio',
  instrument: { name: 'kit', title: 'Studio Kit' },
  pieces: [
    p('kick', [36, 35], 'k20', 'kick_dirty', MICS.kick, { leadsRange: true }),
    p('snare', [38], 's13', 's13_center', MICS.snare, { leadsRange: true }),
    p('snare-edge', [40], 's13', 's13_edge', MICS.snare),
    p('rimshot', [39], 's13', 's13_rimshot', MICS.snare),
    p('sidestick', [37], 's13', 's13_sstick', MICS.snare),
    p('tom-14', [45, 47, 48], 's14', 's14_tom_dirty', MICS.tom, { pad: 48 }),
    p('tom-22', [41, 43], 's22', 's22_tom_dirty', MICS.tom, { pad: 43 }),
    p('hat-closed', [42], 'h14', 'hh_closed_shank', MICS.hat, HAT),
    p('hat-tight', [33], 'h14', 'hh_tight_shank', MICS.hat, { ...HAT, title: 'Hi-hat tight' }),
    p('hat-pedal', [44], 'h14', 'hh_footchik', MICS.hat, HAT),
    p('hat-half', [26], 'h14', 'hh_half_shank', MICS.hat, OPEN),
    p('hat-open', [46], 'h14', 'hh_open_shank', MICS.hat, { ...OPEN, ring: 3 }),
    p('ride', [51], 'r20', 'ride_bow', MICS.cymbal, { ring: 5 }),
    p('ride-bell', [53], 'r20', 'ride_bell', MICS.cymbal, { ring: 5 }),
    p('crash', [49], 'c16', 'cr_edge', MICS.cymbal, { ring: 5 }),
  ],
  pads: [
    'crash', 'ride', 'hat-open', 'hat-closed',
    'tom-14', 'tom-22', 'ride-bell', 'hat-pedal',
    'rimshot', 'sidestick', 'snare', 'kick',
    'snare-edge', 'hat-tight', 'hat-half',
  ],
});
