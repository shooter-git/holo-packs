// `node packs/session-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Session Kit pack, from Sam's Sonor
// by Sam Greene (CC BY-SA 4.0; the SFZ and FLAC version by kinwie): a Sonor Force 3001 kit, its snare
// played by the left hand and the right (for rolls), at the centre, as a rimshot and with its snares
// off, two toms and a click on the high one, hi-hats closed, with the pedal, half open and open (struck
// with the tip and with the shoulder), a ride and its bell, and a crash (its tip and its shoulder).
//
// Its samples are named by take, not by layer, so every piece is found by its SFZ, read as a player
// reads it: the key it plays gives the piece, its regions (soft to loud) the layers, and each group's
// volume the piece's level in the library's own mix. Each hit is one stereo file as it was recorded.
//
// The snare's two hands take turns on the snare's key (left, right, left), so a roll or a run of
// repeated hits falls hand to hand, as the library meant its two snares to be played; the snares-off
// snare's two hands likewise.
import { buildKit, Downloads, raw } from '../../tools/kit.mjs';
import { arg } from '../../tools/lib.mjs';
import { readSfz } from '../../tools/sfz.mjs';

const REPO = 'sfzinstruments/SamsSonor';
const COMMIT = 'ef3e32058924ed1c3335e86d03094d3f310a9104';
const bases = { sonor: raw(REPO, COMMIT) };
const downloads = new Downloads(arg('cache', `${process.env.HOME}/.cache/holo-pack-sources/session-kit`), bases);
const text = new TextDecoder();
const sfz = await readSfz('SamsSonor.sfz', async (path) => text.decode(await downloads.get(`sonor:${path}`)));
const def = sfz.defines;
const sampled = sfz.regions.filter((r) => r.sample && r.sample !== '*silence');

/**
 * The hits of one of the library's keys (by its keymap's name): its regions by velocity, soft to loud,
 * each a layer, as round robin `rr`; and the group's volume (dB) as the piece's level.
 */
function hitsOf(from, rr = 1) {
  const key = def[from];
  if (key === undefined) throw new Error(`the keymap has no ${from}`);
  const regions = sampled.filter((r) => r.key === key).sort((a, b) => Number(a.lovel) - Number(b.lovel));
  if (!regions.length) throw new Error(`${from}: no regions on key ${key}`);
  const volumes = new Set(regions.map((r) => Number(r.group_volume ?? 0) + Number(r.volume ?? 0)));
  if (volumes.size !== 1) throw new Error(`${from}: its layers' volumes differ`);
  return {
    db: [...volumes][0],
    hits: regions.map((r, n) => ({
      layer: n + 1,
      rr,
      mics: { main: `sonor:${sfz.control.default_path ?? ''}${r.sample}` },
    })),
  };
}

/**
 * A piece from one key of the library, or from two that take turns (the two hands). Every key the
 * library plays a sample on is given a piece, checked below.
 */
const used = new Set();
function piece(name, from, keys, opts = {}) {
  const sources = Array.isArray(from) ? from : [from];
  const sets = sources.map((f, i) => hitsOf(f, i + 1));
  for (const f of sources) used.add(def[f]);
  if (new Set(sets.map((s) => s.db)).size !== 1) throw new Error(`${name}: its hands are at different levels`);
  if (new Set(sets.map((s) => s.hits.length)).size !== 1) throw new Error(`${name}: its hands have different layers`);
  return {
    name,
    keys,
    hits: sets.flatMap((s) => s.hits),
    mics: { main: [10 ** (sets[0].db / 20)] },
    ...opts,
  };
}

const drum = { ring: 1.4, fade: 0.35 };
const tom = { ring: 2.4, fade: 0.6, floor: 58, leadsRange: true };
const hat = { group: 1, ring: 0.6, fade: 0.15 };
const open = { group: 1, offBy: 1, ring: 2.2, fade: 0.6, floor: 54 };
const cymbal = { ring: 5, fade: 1.4, floor: 56 };

const pieces = [
  piece('kick', '$KEY_KICK', [35, 36], { pad: 36, ring: 1.4, fade: 0.35, leadsRange: true }),
  piece('snare', ['$KEY_SN_LH', '$KEY_SN_RH'], [38], { ...drum, leadsRange: true }),
  piece('snare-centre', '$KEY_SN_CT', [39], { ...drum, title: 'Snare centre' }),
  piece('rimshot', '$KEY_SN_RS', [40], drum),
  piece('snare-off', ['$KEY_SN_OL', '$KEY_SN_OR'], [34], { ...drum, title: 'Snare, snares off' }),
  piece('floor-tom', '$KEY_TM_L', [41, 43], { ...tom, pad: 41 }),
  piece('rack-tom', '$KEY_TM_H', [45, 47, 48, 50], { ...tom, pad: 45 }),
  piece('rack-tom-click', '$KEY_TM_C', [25], { ring: 1.2, fade: 0.3, title: 'Rack tom click' }),
  piece('hat-closed', '$KEY_HH_CL', [42], hat),
  piece('hat-pedal', '$KEY_HH_PD', [44], hat),
  piece('hat-open', '$KEY_HH_OC', [46], open),
  piece('hat-half', '$KEY_HH_HO', [26], { ...open, ring: 1.6 }),
  piece('hat-open-tip', '$KEY_HH_OT', [22], { ...open, title: 'Hi-hat open tip' }),
  piece('ride', '$KEY_RD_TP', [51], cymbal),
  piece('ride-bell', '$KEY_RD_BL', [53], cymbal),
  piece('crash', '$KEY_CR_CL', [49], cymbal),
  piece('crash-tip', '$KEY_CR_TP', [57], { ...cymbal, title: 'Crash tip' }),
];
const unplayed = [...new Set(sampled.map((r) => r.key))].filter((k) => !used.has(k));
if (unplayed.length) throw new Error(`the library's keys ${unplayed.join(', ')} have no piece`);

await buildKit({
  id: 'session-kit',
  name: "Session Kit (Sam's Sonor)",
  license: 'CC-BY-SA-4.0',
  credit:
    "Sam's Sonor by Sam Greene (CC BY-SA 4.0), SFZ and FLAC version by kinwie: " +
    'a Sonor Force 3001 kit with left- and right-hand snares and a snares-off snare. Levelled for HO[LO] at the library\'s own mix.',
  note: "Sam's Sonor's stereo recordings (FLAC, at the pinned commit), each at its group's volume in the library's SFZ.",
  folder: 'session',
  instrument: { name: 'kit', title: 'Session Kit' },
  level: -19,
  downloads,
  bases,
  // the pads, in rows of four: cymbals and hats, toms, the snare's strokes and the kick, then the rest
  pads: [
    'crash',
    'ride',
    'hat-open',
    'hat-closed',
    'rack-tom',
    'rack-tom-click',
    'floor-tom',
    'hat-pedal',
    'rimshot',
    'snare-centre',
    'snare',
    'kick',
    'hat-half',
    'hat-open-tip',
    'ride-bell',
    'crash-tip',
    'snare-off',
  ],
  pieces,
});
