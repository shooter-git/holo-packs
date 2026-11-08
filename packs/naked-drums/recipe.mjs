// `node packs/naked-drums/recipe.mjs [--cache DIR] [--out DIR]`: the Naked Drums pack, from Wilkinson
// Audio's Naked Drums (CC BY 4.0; the SFZ and FLAC port by kinwie): a 22" kick, two snares, five toms,
// hi-hats, a ride, two crashes, two splashes and two chinas, recorded on sixteen microphones.
//
// Its samples' names are codes, so every piece is found by its SFZ, read as a player reads it
// (Stereo/Naked Drums.sfz, the library's full kit): the key it plays on in the library's own keymap
// gives the piece, the mixer channel it answers to (its amplitude CC) gives the microphone, and its
// layer and round robin come from its velocities and its place in the round robin.
//
// The microphones are kept apart, each with a knob, and start as the library's own mixer has them:
// every channel's fader at its default (the hi-hat and ride close microphones and the wide overheads
// turned well down), each piece's trims and each velocity layer's own volume as its SFZ sets them,
// the close microphones panned where its pan knobs start, and the toms tuned as it tunes them. Its
// mid-side pair is already decoded to left and right (its sides are as loud as each other and closely
// alike, as a left and right pair are), so it plays as a stereo pair, as the library plays it.
//
// The library evens out its velocity layers (every microphone of a hit alike) and makes them soft or
// loud with velocity (amp_veltrack): each layer is placed on the kit's velocity curve as loud as the
// library plays it at its middle velocity, and played back as recorded.
import { buildKit, Downloads, raw } from '../../tools/kit.mjs';
import { arg } from '../../tools/lib.mjs';
import { ccDefault, readSfz } from '../../tools/sfz.mjs';

const REPO = 'sfzinstruments/WilkinsonAudio.NakedDrums';
const COMMIT = '407732a548606ac715ad8f3fbac63d9f4df77c0d';
const LIB = 'Wilkinson Audio/Naked Drums';
const bases = { naked: raw(REPO, COMMIT) };
const downloads = new Downloads(arg('cache', `${process.env.HOME}/.cache/holo-pack-sources/naked-drums`), bases);
const text = new TextDecoder();
const sfz = await readSfz(`${LIB}/Stereo/Naked Drums.sfz`, async (path) =>
  text.decode(await downloads.get(`naked:${path}`)),
);
const def = sfz.defines;

// ---- the microphones: each mixer channel's knob, as the library's own mixer starts ----

/** The knobs, in the order the studio shows them, and the mixer channels (CC names) each answers to. */
const MICS = [
  { id: 'kick-in', name: 'Kick in', cc: ['$VOL_KI'] },
  { id: 'kick-sub', name: 'Kick sub', cc: ['$VOL_KS'] },
  // the snare's two top microphones, heard as one (the library pans them apart only on request)
  { id: 'snare-top', name: 'Snare top', cc: ['$VOL_ST1', '$VOL_ST2'] },
  { id: 'snare-bottom', name: 'Snare bottom', cc: ['$VOL_SB'] },
  { id: 'toms', name: 'Toms', cc: ['$VOL_TOM1', '$VOL_TOM2', '$VOL_TOM3', '$VOL_TOM4', '$VOL_TOM5'] },
  { id: 'hat', name: 'Hi-hat', cc: ['$VOL_HH'] },
  { id: 'ride', name: 'Ride', cc: ['$VOL_RD'] },
  { id: 'overheads', name: 'Overheads', cc: ['$VOL_OH'] },
  { id: 'wide', name: 'Wide overheads', cc: ['$VOL_CH'] },
  { id: 'close-room', name: 'Close room', cc: ['$VOL_CR'] },
  { id: 'far-room', name: 'Far room', cc: ['$VOL_FR'] },
  { id: 'mid-side', name: 'Mid-side room', cc: ['$VOL_MS'] },
];
/** Each mixer channel's CC number: the microphone (an input of it) it belongs to. */
const inputOf = new Map();
for (const m of MICS)
  for (const [n, name] of m.cc.entries())
    inputOf.set(def[name], m.cc.length > 1 && m.id === 'snare-top' ? `${m.id}:${n + 1}` : m.id);

/** A region's sample, as a download. */
const download = (r) => `naked:${LIB}/${(sfz.control.default_path ?? '').replace(/^\.\.\//, '')}${r.sample}`;

/**
 * What the mixer does to a region at its defaults: `amp` (linear) the product of its channels'
 * amplitude CCs (a CC's depth in percent at its starting value; the master volume CC 7 is left out,
 * the same on every region), `db` its volume opcodes, `pan` (-1 to 1) its pan CCs' (curve 1 is
 * bipolar, as ARIA's), and the channel it answers to.
 */
function mixerOf(r) {
  let amp = 1;
  let pan = Number(r.pan ?? 0) / 100;
  const channels = [];
  for (const [k, v] of Object.entries(r)) {
    const a = /^amplitude_oncc(\d+)$/.exec(k);
    if (a && a[1] !== '7') {
      amp *= (ccDefault(sfz.control, a[1]) * Number(v)) / 100;
      if (inputOf.has(a[1])) channels.push(inputOf.get(a[1]));
    }
    const p = /^pan_oncc(\d+)$/.exec(k);
    if (p) {
      const x = ccDefault(sfz.control, p[1]);
      pan += (Number(v) / 100) * (r[`pan_curvecc${p[1]}`] === '1' ? 2 * x - 1 : x);
    }
  }
  if (channels.length !== 1) throw new Error(`${r.sample}: answers to ${channels.length} microphone channels, not one`);
  const db = Number(r.master_volume ?? 0) + Number(r.group_volume ?? 0) + Number(r.volume ?? 0);
  return { input: channels[0], amp, db, pan };
}

// the regions a hit plays: not the silent ones that choke, not the release ones (a choke grabbed),
// and the hi-hat as its keys play it (the library's default mode, not the pedal CC's)
const struck = sfz.regions.filter(
  (r) => r.sample !== '*silence' && (r.trigger ?? 'attack') === 'attack' && (!r.sw_last || r.sw_last === def.$SW_DEF),
);

// each knob starts where the library's mixer has its channel (one level for all its regions)
const knob = new Map();
for (const r of struck) {
  const { input, amp } = mixerOf(r);
  const id = input.split(':')[0];
  if (knob.has(id) && Math.abs(knob.get(id) - amp) > 1e-9)
    throw new Error(`${id}: its channels start at different levels`);
  knob.set(id, amp);
}
const mics = MICS.map(({ id, name }) => {
  const amp = knob.get(id) ?? 0;
  const level = amp > 0 ? Math.round(20 * Math.log10(amp) * 100) / 100 : -60;
  return { id, name, ...(level ? { level } : {}) };
});

// ---- the pieces: the library's keys, placed as General MIDI has them ----

/**
 * How much quieter (dB) the library plays a velocity than its sample (its amp_veltrack over the
 * default curve, as ARIA and sfizz play it). Its layers are recorded about alike (evened out, hit by
 * hit, with every microphone), and this is what makes them soft or loud.
 */
const velocityDb = (r, v) => {
  const t = Number(r.amp_veltrack ?? 100) / 100;
  return 20 * Math.log10(1 - t + t * (v / 127) ** 2);
};

/**
 * A piece: the library's key it's played on (by its keymap's name), the keys it's on here, and how it
 * plays: how long it rings, how much of its tail is kept, and how many takes of it are kept.
 */
function piece(name, from, keys, opts = {}) {
  const key = def[from];
  if (key === undefined) throw new Error(`${name}: the keymap has no ${from}`);
  const regions = struck.filter((r) => r.key === key);
  if (!regions.length) throw new Error(`${name}: no regions on key ${key}`);
  // velocity layers by their velocities (soft to loud); round robins by their place in the turn
  const layers = [...new Set(regions.map((r) => Number(r.lovel)))].sort((a, b) => a - b);
  // each layer heard as the library plays it at its middle velocity, so the kit's curve spreads them as it does
  const heard = new Map();
  const mics = {};
  const hits = new Map();
  const tunes = new Set();
  for (const r of regions) {
    const { input, db, pan } = mixerOf(r);
    // a mono close microphone where its pan knob starts (SFZ's 0 to 127, 63.5 the centre)
    mics[input] = [1, 63.5 + 63.5 * Math.max(-1, Math.min(1, pan))];
    const layer = layers.indexOf(Number(r.lovel)) + 1;
    const rr = Number(r.seq_position ?? 1);
    const at = `${layer}:${rr}`;
    if (!hits.has(at)) hits.set(at, { layer, rr, mics: {}, gains: {} });
    const hit = hits.get(at);
    if (hit.mics[input]) throw new Error(`${name}: two regions of ${input} for layer ${layer}, round robin ${rr}`);
    hit.mics[input] = download(r);
    // its trims and its layer's own volume (the kick's overheads and rooms evened out layer by layer,
    // as the library has them)
    hit.gains[input] = 10 ** (db / 20);
    tunes.add(Number(r.tune ?? 0));
    const middle = velocityDb(r, (Number(r.lovel) + Number(r.hivel)) / 2);
    if (heard.has(layer) && Math.abs(heard.get(layer) - middle) > 1e-9)
      throw new Error(`${name}: layer ${layer}'s velocities differ`);
    heard.set(layer, middle);
  }
  if (tunes.size !== 1) throw new Error(`${name}: its microphones are tuned apart`);
  const cents = [...tunes][0];
  const all = Object.keys(mics);
  const out = [...hits.values()]
    .filter((h) => all.every((i) => h.mics[i]))
    .sort((a, b) => a.layer - b.layer || a.rr - b.rr);
  if (out.length !== hits.size) throw new Error(`${name}: a hit is missing a microphone`);
  return {
    name,
    keys,
    hits: out,
    mics,
    heard: (layer) => heard.get(layer),
    ...(cents ? { tune: cents / 100 } : {}),
    ...opts,
  };
}

// kept takes: every layer, and of the library's ten round robins as many as the kit can hold, so it
// decodes to about 540 MB at 48 kHz with every microphone kept apart. One round robin of every layer
// costs about 3 MB for a drum or a closed hi-hat, 20 MB for all five toms, 13 MB for the open hi-hat and
// 9 to 11 MB for a crash, a china or the ride (their tails ring on every microphone). The pieces played
// most (kick, snare, closed hi-hat) keep the most; a cymbal's three take turns under its long ring.
const tom = { maxRR: 5, ring: 2.2, fade: 0.5, floor: 56 };
const hat = { group: 1 };
const cymbal = { maxRR: 3, ring: 4.5, fade: 1.4, floor: 50 };

await buildKit({
  id: 'naked-drums',
  name: 'Naked Drums (Wilkinson Audio)',
  license: 'CC-BY-4.0',
  credit:
    'Naked Drums by Wilkinson Audio (CC BY 4.0), SFZ and FLAC version by kinwie: a 22" kick, two snares, ' +
    '10/12/13/14/16" toms, hi-hats, ride, crashes, splashes and chinas. Its microphones kept apart for HO[LO], each with its own level.',
  note: "Naked Drums' sixteen microphones (FLAC, at the pinned commit), each kept as its own file, at its own mixer's levels.",
  folder: 'naked',
  instrument: { name: 'kit', title: 'Naked Drums' },
  level: -19,
  downloads,
  bases,
  mics,
  // the pads, in rows of four: cymbals and hats, toms (high to low), the snare's strokes and the kick, then the rest
  pads: [
    'crash',
    'ride',
    'hat-open',
    'hat-closed',
    'tom-10',
    'tom-12',
    'tom-13',
    'tom-14',
    'tom-16',
    'sidestick',
    'snare',
    'kick',
    'snare-2',
    'hat-pedal',
    'hat-half',
    'hat-tight',
    'crash-2',
    'china',
    'splash',
    'ride-bell',
    'crash-bell',
    'crash-2-bell',
    'china-2',
    'splash-2',
  ],
  pieces: [
    piece('kick', '$KEY_KICK', [35, 36], { maxRR: 8, pad: 36, ring: 1.6, fade: 0.35, floor: 56, leadsRange: true }),
    piece('sidestick', '$KEY_SIDE', [37], { ring: 0.8 }),
    piece('snare', '$KEY_SNR1', [38], { maxRR: 8, ring: 1.6, fade: 0.4, floor: 56, leadsRange: true }),
    piece('snare-2', '$KEY_SNR2', [40], { maxRR: 6, title: 'Snare 2', ring: 1.6, fade: 0.4, floor: 56 }),
    piece('tom-10', '$KEY_TOM1', [48, 50], { ...tom, pad: 48, leadsRange: true }),
    piece('tom-12', '$KEY_TOM2', [47], tom),
    piece('tom-13', '$KEY_TOM3', [45], tom),
    piece('tom-14', '$KEY_TOM4', [43], tom),
    piece('tom-16', '$KEY_TOM5', [41], { ...tom, leadsRange: true }),
    piece('hat-closed', '$KEY_HH_CLS', [42], { ...hat, maxRR: 8, ring: 0.8 }),
    piece('hat-tight', '$KEY_HH_TGH', [22], { ...hat, maxRR: 6, title: 'Hi-hat tight', ring: 0.6 }),
    piece('hat-pedal', '$KEY_HH_PDL', [44], { ...hat, maxRR: 8, ring: 0.8 }),
    piece('hat-half', '$KEY_HH_HLF', [26], { ...hat, maxRR: 5, offBy: 1, ring: 2, fade: 0.6, floor: 54 }),
    piece('hat-open', '$KEY_HH_OPN', [46], { ...hat, maxRR: 4, offBy: 1, ring: 2.5, fade: 0.8, floor: 54 }),
    piece('ride', '$KEY_RD_BOW', [51], { ...cymbal, maxRR: 5, ring: 4 }),
    piece('ride-bell', '$KEY_RD_BEL', [53], { ...cymbal, maxRR: 4, ring: 4 }),
    piece('crash', '$KEY_CRS1_EDG', [49], cymbal),
    piece('crash-bell', '$KEY_CRS1_BEL', [58], { ...cymbal, title: 'Crash bell', ring: 3.5 }),
    piece('crash-2', '$KEY_CRS2_EDG', [57], { ...cymbal, title: 'Crash 2' }),
    piece('crash-2-bell', '$KEY_CRS2_BEL', [59], { ...cymbal, title: 'Crash 2 bell', ring: 3.5 }),
    piece('splash', '$KEY_SPL1', [55], { ...cymbal, title: 'Splash', ring: 2.5 }),
    piece('splash-2', '$KEY_SPL2', [56], { ...cymbal, title: 'Splash 2', ring: 2.5 }),
    piece('china', '$KEY_CHN1', [52], { ...cymbal, ring: 3.5 }),
    piece('china-2', '$KEY_CHN2', [54], { ...cymbal, title: 'China 2', ring: 3.5 }),
  ],
});
