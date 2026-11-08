// `node packs/brushes-kit/recipe.mjs [--cache DIR] [--out DIR]`: a brushed drum kit from Karoryfer's Swirly
// Drums (CC0), written into packs/brushes-kit/pack.json and packs/brushes-kit/files.sha256.
//
// A kit played with brushes: a 20" marching kick (its beater and resonant-head microphones), the snare
// struck in the centre and at the edge, dug and stirred (its top and bottom microphones), its flutter,
// hi-hats at six openings and its foot, five toms, crash, ride, China, splash and a cracked crash, from
// the library's dry recordings (its "wet" ones are the same takes through a room: HO[LO] adds its own).
// Mixed the way an engineer mixes a session, each hit trimmed to just before its attack, its layers set
// where the kit's velocity curve meets their loudness, as HO[LO]'s other kits are.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildKit, githubTree, raw } from '../../tools/kit.mjs';

const REPO = 'sfzinstruments/karoryfer.swirly-drums';
const COMMIT = 'c40dafe0011cb2e54c0c220ff0fa308a11fc60f5';
const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/brushes-kit'));
const downloads = new Downloads(cache, { swirly: raw(REPO, COMMIT) });
const paths = await githubTree(REPO, COMMIT, downloads);

/**
 * A piece's hits from one dry folder: files "<stem>_vl<layer>_rr<rr>[_<mic>].wav" (or "_dl<layer>",
 * or only "_rr<rr>"), each microphone named by its ending (one microphone when it has none).
 */
function hits(folder, mics = ['dry']) {
  const out = new Map();
  for (const p of paths) {
    if (!p.startsWith(`Samples/${folder}/`) || p.slice(`Samples/${folder}/`.length).includes('/')) continue;
    const name = p.slice(p.lastIndexOf('/') + 1);
    const m = /(?:_(?:vl|dl)(\d+))?_rr(\d+)(?:_([a-z]+))?\.wav$/.exec(name);
    if (!m) continue;
    const mic = m[3] ?? 'dry';
    if (!mics.includes(mic)) continue;
    const layer = Number(m[1] ?? 1);
    const rr = Number(m[2]);
    const key = `${layer}:${rr}`;
    if (!out.has(key)) out.set(key, { layer, rr, mics: {} });
    out.get(key).mics[mic] = `swirly:${p}`;
  }
  const list = [...out.values()].filter((h) => mics.every((mic) => h.mics[mic]));
  if (!list.length) throw new Error(`No hits in ${folder}`);
  return list.sort((a, b) => a.layer - b.layer || a.rr - b.rr);
}
const HAT = { group: 1 };
const OPEN = { group: 1, offBy: 1 };
const dry = { dry: [1] };
const piece = (name, keys, folder, extra = {}) => ({ name, keys, hits: hits(folder), mics: dry, maxLayers: 10, ...extra });
const snare = (name, keys, folder, extra = {}) => ({
  name,
  keys,
  hits: hits(folder, ['top', 'btm']),
  mics: { top: [1, 63.5], btm: [0.5, 63.5] },
  maxLayers: 10,
  ...extra,
});

await buildKit({
  id: 'brushes-kit',
  name: 'Brushes Kit (Karoryfer Swirly Drums)',
  license: 'CC0-1.0',
  credit:
    'Swirly Drums by Karoryfer Lecolds (CC0): a drum kit played with brushes. Mixed for HO[LO] from its dry close microphones.',
  note: "Swirly Drums' dry recordings (WAV, at the pinned commit), mixed as one session.",
  bases: { swirly: raw(REPO, COMMIT) },
  downloads,
  folder: 'brushes',
  instrument: { name: 'kit', title: 'Brushes Kit' },
  pieces: [
    {
      name: 'kick',
      keys: [36, 35],
      hits: hits('marching_kick', ['beater', 'reso']),
      mics: { beater: [1, 63.5], reso: [0.7, 63.5] },
      maxLayers: 10,
    },
    snare('snare', [38], 'snare_main', { leadsRange: true }),
    snare('snare-edge', [40], 'snare_edge'),
    snare('snare-dig', [39], 'snare_dig', { title: 'Snare dig' }),
    piece('snare-stir', [37], 'snare_stir', { title: 'Snare stir', ring: 4 }),
    piece('snare-flutter', [34], 'snare_flutter', { title: 'Snare flutter', ring: 4 }),
    piece('hat-closed', [42], 'hat_closed', HAT),
    piece('hat-tight', [33], 'hat_tight', { ...HAT, title: 'Hi-hat tight' }),
    piece('hat-pedal', [44], 'hat_foot', HAT),
    piece('hat-quarter', [24], 'hat_quarter', { ...OPEN, title: 'Hi-hat quarter open' }),
    piece('hat-half', [26], 'hat_half', OPEN),
    piece('hat-open', [46], 'hat_open', { ...OPEN, ring: 3 }),
    piece('tom-16', [41], 'tom_floor'),
    piece('tom-13', [43], 'tom_mlow'),
    piece('tom-12', [45], 'tom_xmed'),
    piece('tom-10', [47], 'tom_mhi'),
    piece('tom-8', [48], 'tom_vhi'),
    piece('crash', [49], 'crash', { ring: 5 }),
    piece('ride', [51], 'ride', { ring: 5 }),
    piece('china', [52], 'china', { ring: 4 }),
    piece('splash', [55], 'splash', { title: 'Splash', ring: 3 }),
    piece('crash-cracked', [57], 'crash_broken', { title: 'Cracked crash', ring: 4 }),
  ],
  pads: [
    'crash', 'ride', 'hat-open', 'hat-closed',
    'tom-8', 'tom-10', 'tom-12', 'tom-13',
    'tom-16', 'snare-edge', 'snare', 'kick',
    'snare-dig', 'snare-stir', 'snare-flutter', 'hat-pedal',
    'hat-tight', 'hat-quarter', 'hat-half', 'china',
    'splash', 'crash-cracked',
  ],
});
