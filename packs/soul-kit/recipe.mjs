// `node packs/soul-kit/recipe.mjs [--cache DIR] [--out DIR]`: a soul kit from Karoryfer's Unruly Drums
// (CC0), written into packs/soul-kit/pack.json and packs/soul-kit/files.sha256.
//
// A small, warm kit: the 20" kick played clean, the 14" snare (centre, edge, rimshot, side stick), the
// 13" and 22" snares with their snares off for toms, 14" hi-hats played with the stick's tip at seven
// openings and the foot, the 20" ride (bow, bell, edge), the 16" crash, woodblocks. Mixed from each
// piece's close and overhead microphones, each hit trimmed to just before its attack, its layers set
// where the kit's velocity curve meets their loudness, as HO[LO]'s other kits are.
import { MICS, unruly } from '../../tools/unruly.mjs';

const u = await unruly('soul-kit');
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
  id: 'soul-kit',
  name: 'Soul Kit (Karoryfer Unruly Drums)',
  license: 'CC0-1.0',
  credit: "Unruly Drums by Karoryfer Lecolds (CC0). Mixed for HO[LO] from its close and overhead microphones: a soul kit.",
  note: "Unruly Drums' close and overhead microphones (FLAC, at the pinned commit), mixed as one session.",
  folder: 'soul',
  instrument: { name: 'kit', title: 'Soul Kit' },
  pieces: [
    p('kick', [36, 35], 'k20', 'kick_clean', MICS.kick, { leadsRange: true }),
    p('snare', [38], 's14', 's14_center', MICS.snare, { leadsRange: true }),
    p('snare-edge', [40], 's14', 's14_edge', MICS.snare),
    p('rimshot', [39], 's14', 's14_rimshot', MICS.snare),
    p('sidestick', [37], 's14', 's14_sstick', MICS.snare),
    p('tom-13', [45, 47, 48], 's13', 's13_tom_clean', MICS.tom, { pad: 48 }),
    p('tom-22', [41, 43], 's22', 's22_tom_clean', MICS.tom, { pad: 43 }),
    p('hat-closed', [42], 'h14', 'hh_closed_tip', MICS.hat, HAT),
    p('hat-tight', [33], 'h14', 'hh_tight_tip', MICS.hat, { ...HAT, title: 'Hi-hat tight' }),
    p('hat-pedal', [44], 'h14', 'hh_footchik', MICS.hat, HAT),
    p('hat-quarter', [24], 'h14', 'hh_quarter_tip', MICS.hat, { ...OPEN, title: 'Hi-hat quarter open' }),
    p('hat-half', [26], 'h14', 'hh_half_tip', MICS.hat, OPEN),
    p('hat-loose', [22], 'h14', 'hh_loose_tip', MICS.hat, OPEN),
    p('hat-open', [46], 'h14', 'hh_open_tip', MICS.hat, { ...OPEN, ring: 3 }),
    p('ride', [51], 'r20', 'ride_bow', MICS.cymbal, { ring: 5 }),
    p('ride-bell', [53], 'r20', 'ride_bell', MICS.cymbal, { ring: 5 }),
    p('ride-edge', [59], 'r20', 'ride_edge', MICS.cymbal, { ring: 5 }),
    p('crash', [49], 'c16', 'cr_edge', MICS.cymbal, { ring: 5 }),
    p('woodblock-high', [76], 'wb', 'woodblock_hi', MICS.block, { title: 'Woodblock high' }),
    p('woodblock-low', [77], 'wb', 'woodblock_lo', MICS.block, { title: 'Woodblock low' }),
  ],
  pads: [
    'crash', 'ride', 'hat-open', 'hat-closed',
    'tom-13', 'tom-22', 'ride-bell', 'ride-edge',
    'rimshot', 'sidestick', 'snare', 'kick',
    'snare-edge', 'hat-pedal', 'hat-tight', 'hat-quarter',
    'hat-half', 'hat-loose', 'woodblock-high', 'woodblock-low',
  ],
});
