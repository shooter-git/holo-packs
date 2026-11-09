// `node packs/classic-rock-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Classic Rock Kit pack, from
// DrumGizmo's DRSKit (CC BY 4.0; a handmade DRSDrums kit lent by Jes Eiler, recorded by the DrumGizmo
// team, the SFZ and FLAC port by kinwie): a kick, a hanging tom and two floor toms, a snare, Paiste
// hi-hats, two Paiste crashes and a Paiste ride, recorded on thirteen microphones.
//
// Its samples are named by piece, hit and microphone ("Snare/12-Snare-OHL.flac"), and its SFZ (the
// library's stereo program, Stereo/DrumGizmo DRSKit.sfz) says how each microphone is mixed: the mixer
// channel each answers to (its amplitude CCs), where each is panned, and which hits are bleed (one
// piece heard on another's microphone). The program is read as it starts, in its "notes" keyswitch
// (12): the full kit, every stroke on a key of its own.
//
// "Whiskers" are brushes (Danish "viskere"): the library has the snare, toms, hi-hat, ride and crashes
// played with brushes besides sticks, and its full kit has both. Here too: the sticks on the General
// MIDI keys and the brushes on pads of their own.
//
// The microphones are kept apart, each with a knob, and start as the library's mixer has them: every
// fader at its default (the hi-hat and ride close microphones 14 dB down), the close microphones panned
// where its pan knobs start, the overhead and room pairs hard left and right (their width at full).
// Bleed is kept, as the library's thirteen-channel (multi) programs play it: every piece on every
// microphone. Its stereo program turns most bleed off only to spare a player's voices. The port's kick
// front channel plays the left overhead's recordings by a slip (put right below): here it plays its own.
//
// Velocity: DrumGizmo records each piece as many single hits at every strength, numbered by power, and
// picks the hit nearest the strength played. The SFZ port groups them into four to eight even velocity
// bands (one to nine hits a band, taking turns) and ramps each band's gain up to its top, so the level
// jumps where a band changes. Here every hit is measured, the hits are grouped into layers about 3 dB
// apart by how loud they really are, and the layers are set on the kit's one velocity curve, so a piece
// gets louder smoothly, changes timbre layer by layer, and its round robins are alike in level.
import { buildKit, Downloads, raw } from '../../tools/kit.mjs';
import { arg, loudness, onset } from '../../tools/lib.mjs';
import { ccDefault, readSfz } from '../../tools/sfz.mjs';

const REPO = 'sfzinstruments/DrumGizmo.DRSKit';
const COMMIT = 'b01448990a31f722542f1812e56159a97a6a2a82';
const LIB = 'DrumGizmo/DRSKit';
const bases = { drs: raw(REPO, COMMIT) };
const downloads = new Downloads(arg('cache', `${process.env.HOME}/.cache/holo-pack-sources/classic-rock-kit`), bases);
const text = new TextDecoder();
const sfz = await readSfz(`${LIB}/Stereo/DrumGizmo DRSKit.sfz`, async (path) =>
  text.decode(await downloads.get(`drs:${path}`)),
);
const def = sfz.defines;
// the port's kick front channel plays the left overhead's recordings (its microphone file names it OHL,
// a slip of the port's): it's given the kick front microphone's own, which the library has for every hit
for (const r of sfz.regions)
  if (r[`amplitude_oncc${def.$vol_kf}`] !== undefined && r.sample !== '*silence')
    r.sample = r.sample.replace(/-OHL\.flac$/, '-Kdrum_front.flac');

// ---- the microphones: each mixer channel's knob, as the library's own mixer starts ----

/** The knobs, in the order the studio shows them, and the recordings (by their files' microphone names) each is made of. */
const MICS = [
  { id: 'kick-back', name: 'Kick back', from: ['Kdrum_back'] },
  { id: 'kick-front', name: 'Kick front', from: ['Kdrum_front'] },
  { id: 'snare-top', name: 'Snare top', from: ['Snare_top'] },
  { id: 'snare-bottom', name: 'Snare bottom', from: ['Snare_bottom'] },
  // the three tom microphones are one knob, each tom panned where the library has it
  { id: 'toms', name: 'Toms', from: ['Tom1', 'Tom2', 'Tom3'] },
  { id: 'hat', name: 'Hi-hat', from: ['Hihat'] },
  { id: 'ride', name: 'Ride', from: ['Ride'] },
  { id: 'overheads', name: 'Overheads', from: ['OHL', 'OHR'] },
  { id: 'room', name: 'Room', from: ['AmbL', 'AmbR'] },
];
/** Each recording's input (its microphone's id, and which of several it is). */
const inputOf = new Map();
for (const m of MICS)
  for (const [n, name] of m.from.entries()) inputOf.set(name, m.from.length > 1 ? `${m.id}:${n + 1}` : m.id);

// bleed as the multi programs start it: every piece at full on every microphone (the stereo program's
// bleed knobs, CC 88 for the drums on the snare's bottom and CC 89 for the rest, at full)
const START = new Map([
  [def.$bleed_bot, 1],
  [def.$bleed_all, 1],
]);
const ccValue = (cc) => START.get(cc) ?? ccDefault(sfz.control, cc);
/** An SFZ CC curve at x (0 to 1): 0 straight, 1 bipolar (as ARIA's), 2 and 3 their inverses. */
function curve(x, n = '0') {
  if (n === '0') return x;
  if (n === '1') return 2 * x - 1;
  if (n === '2') return 1 - x;
  if (n === '3') return 1 - 2 * x;
  throw new Error(`CC curve ${n} isn't one this reads`);
}

/** A region's piece, hit and microphone, from its sample's name. */
function sampleOf(r) {
  const m = /^([^/]+)\/(\d+)-\1-(\w+)\.flac$/.exec(r.sample);
  if (!m) throw new Error(`${r.sample}: not a DrumGizmo sample's name`);
  return { instr: m[1], n: Number(m[2]), mic: m[3] };
}

/**
 * What the mixer does to a region at its defaults: `amp` (linear) the product of its amplitude CCs at
 * their starting values (the master volume CC 7 left out, the same on every region), `gain` its volume
 * opcodes and the overheads' width (and -1 for a microphone turned over), `pan` (-1 to 1) its pans.
 */
function mixerOf(r) {
  let amp = 1;
  let db = Number(r.volume ?? 0);
  let pan = Number(r.pan ?? 0) / 100;
  for (const [k, v] of Object.entries(r)) {
    const a = /^amplitude_oncc(\d+)$/.exec(k);
    if (a && a[1] !== '7') amp *= (ccValue(a[1]) * Number(v)) / 100;
    const d = /^volume_oncc(\d+)$/.exec(k);
    if (d) db += Number(v) * curve(ccValue(d[1]), r[`volume_curvecc${d[1]}`]);
    const p = /^pan_oncc(\d+)$/.exec(k);
    if (p) pan += (Number(v) / 100) * curve(ccValue(p[1]), r[`pan_curvecc${p[1]}`]);
  }
  const sign = r.phase === 'invert' ? -1 : 1;
  return { amp, gain: sign * 10 ** (db / 20), pan: Math.max(-1, Math.min(1, pan)) };
}

// the regions a hit plays: not the silent ones that choke, and the kit as its starting keyswitch plays it
// (the full kit, each stroke on its key; not the e-drum modes, which put strokes on a pedal CC)
const SWITCH = Number(def.$sw_default);
const inSwitch = (r) =>
  (r.sw_last === undefined || Number(r.sw_last) === SWITCH) &&
  (r.sw_lolast === undefined || (Number(r.sw_lolast) <= SWITCH && SWITCH <= Number(r.sw_hilast)));
const struck = sfz.regions.filter(
  (r) => r.sample !== '*silence' && (r.trigger ?? 'attack') === 'attack' && inSwitch(r) && inputOf.has(sampleOf(r).mic),
);

// each knob starts where the library's mixer has its channel (one level for all its regions)
const knob = new Map();
for (const r of struck) {
  const id = inputOf.get(sampleOf(r).mic).split(':')[0];
  const { amp } = mixerOf(r);
  if (knob.has(id) && Math.abs(knob.get(id) - amp) > 1e-9) throw new Error(`${id}: its channels start at different levels`);
  knob.set(id, amp);
}
const mics = MICS.map(({ id, name }) => {
  const amp = knob.get(id) ?? 0;
  const level = amp > 0 ? Math.round(20 * Math.log10(amp) * 100) / 100 : -60;
  return { id, name, ...(level ? { level } : {}) };
});

// ---- the pieces: each of the library's instruments, its hits layered by how loud they are ----

const download = (r) => `drs:${LIB}/${(sfz.control.default_path ?? '').replace(/^\.\.\//, '')}${r.sample}`;

/**
 * Hits grouped into velocity layers by their loudness (`levels`, dB): bands `step` dB wide from the
 * quietest to the loudest, a band of fewer than `minRR` hits joined to its nearer neighbour; hits more
 * than `span` dB under the loudest left out (too quiet for the kit's velocity curve to reach). Returns
 * each hit's layer and its place among the layer's round robins (soft to loud).
 */
function layered(levels, { step = 3, minRR = 2, span = 30 }) {
  const top = Math.max(...levels.values());
  const kept = [...levels].filter(([, l]) => l >= top - span).sort((a, b) => a[1] - b[1]);
  const lo = kept[0][1];
  const n = Math.max(1, Math.round((top - lo) / step));
  let bands = Array.from({ length: n }, () => []);
  for (const [hit, l] of kept) bands[Math.min(n - 1, Math.floor(((l - lo) / (top - lo || 1)) * n))].push([hit, l]);
  bands = bands.filter((b) => b.length);
  const mean = (b) => b.reduce((a, [, l]) => a + l, 0) / b.length;
  for (;;) {
    const i = bands.findIndex((b) => b.length < minRR);
    if (i < 0 || bands.length === 1) break;
    const j =
      i === 0 ? 1 : i === bands.length - 1 ? i - 1 : mean(bands[i]) - mean(bands[i - 1]) < mean(bands[i + 1]) - mean(bands[i]) ? i - 1 : i + 1;
    bands[Math.min(i, j)] = [...bands[Math.min(i, j)], ...bands[Math.max(i, j)]].sort((a, b) => a[1] - b[1]);
    bands.splice(Math.max(i, j), 1);
  }
  const out = new Map();
  bands.forEach((b, layer) => b.forEach(([hit], rr) => out.set(hit, { layer: layer + 1, rr: rr + 1 })));
  return out;
}

/**
 * A piece: the library's instrument (its samples' folder), the keys it's on here, the microphones its
 * hits are measured on (`ref`, to layer them), and how it plays: how long it rings, how much of its
 * tail is kept, and how many takes of each layer are kept. `skip` leaves out hits by number.
 */
async function piece(name, instr, keys, { ref, step, minRR, span, skip = [], ...opts }) {
  const regions = struck.filter((r) => sampleOf(r).instr === instr && !skip.includes(sampleOf(r).n));
  if (!regions.length) throw new Error(`${name}: no regions of ${instr}`);
  const pieceMics = {};
  const byHit = new Map();
  for (const r of regions) {
    const { n, mic } = sampleOf(r);
    const input = inputOf.get(mic);
    const { gain, pan } = mixerOf(r);
    const at = 63.5 + 63.5 * pan;
    if (pieceMics[input] && Math.abs(pieceMics[input][1] - at) > 1e-6) throw new Error(`${name}: ${input} is panned two ways`);
    pieceMics[input] = [1, at];
    if (!byHit.has(n)) byHit.set(n, { mics: {}, gains: {}, ref: {} });
    const hit = byHit.get(n);
    if (hit.mics[input] && hit.mics[input] !== download(r)) throw new Error(`${name}: hit ${n} has two ${input}s`);
    hit.mics[input] = download(r);
    hit.gains[input] = gain;
    hit.ref[mic] = download(r);
  }
  const inputs = Object.keys(pieceMics);
  for (const [n, h] of byHit) if (!inputs.every((i) => h.mics[i])) throw new Error(`${name}: hit ${n} is missing a microphone`);
  // every hit measured on its reference microphones, as recorded
  const refs = [...byHit.values()].map((h) => ref.map((m) => h.ref[m]));
  if (refs.some((r) => r.some((x) => !x))) throw new Error(`${name}: a hit has no ${ref.join('/')}`);
  await downloads.all(refs.flat());
  const levels = new Map();
  for (const [n, h] of byHit) {
    // at its own volume (the SFZ lifts a few quiet hits)
    const ch = ref.map((m) => downloads.decoded(h.ref[m]).channels[0]);
    const lift = 20 * Math.log10(Math.abs(h.gains[inputOf.get(ref[0])]));
    levels.set(n, lift + loudness(ch, downloads.decoded(h.ref[ref[0]]).rate, onset(ch, 40), 0.4));
  }
  const layers = layered(levels, { step, minRR, span });
  const hits = [...layers]
    .map(([n, { layer, rr }]) => ({ layer, rr, mics: byHit.get(n).mics, gains: byHit.get(n).gains }))
    .sort((a, b) => a.layer - b.layer || a.rr - b.rr);
  return { name, keys, hits, mics: pieceMics, ...opts };
}

// kept takes: every layer, and of each layer's hits as many as the kit can hold, so it decodes to
// about 580 MB at 48 kHz with every microphone kept apart. The pieces played most (the kick, the snare,
// the closed hi-hat) keep the most; a cymbal's few take turns under its long ring.
const kick = { ring: 1.6, fade: 0.35, floor: 56 };
const tom = { maxRR: 3, ring: 2.4, fade: 0.5, floor: 56, minRR: 1 };
const hat = { group: 1 };
const cymbal = { maxRR: 2, ring: 5, fade: 1.6, floor: 50, step: 4, minRR: 1 };
// the brushes are far quieter than the sticks: they come up together, by what brings the brushed snare
// to the struck one, so a part played with brushes is as loud as one played with sticks, in its own balance
const brush = { maxRR: 2, minRR: 1, levelAs: ['snare-brush', 'snare'] };
const overheads = ['OHL', 'OHR'];

await buildKit({
  id: 'classic-rock-kit',
  name: 'Classic Rock Kit (DrumGizmo DRSKit)',
  license: 'CC-BY-4.0',
  credit:
    "Drum samples provided by DrumGizmo.org: the DRSKit by the DrumGizmo team and Jes Eiler of DRSDrums (CC BY 4.0), in kinwie's " +
    'SFZ and FLAC version (sfzinstruments/DrumGizmo.DRSKit): a kick, three toms, a snare, Paiste hi-hats, crashes and ride, ' +
    'played with sticks and with brushes. Its microphones kept apart for HO[LO], each with its own level.',
  note: "The DRSKit's thirteen microphones (FLAC, at the pinned commit), each kept as its own file, at its own mixer's levels.",
  folder: 'classic',
  instrument: { name: 'kit', title: 'Classic Rock Kit' },
  level: -19,
  downloads,
  bases,
  mics,
  // the pads, in rows of four: cymbals and hats, toms (high to low) and the pedal, the snare's strokes
  // and the kicks, the other hi-hats, the other cymbal strokes, then the brushes
  pads: [
    'crash',
    'ride',
    'hat-open',
    'hat-closed',
    'rack-tom',
    'floor-tom-1',
    'floor-tom-2',
    'hat-pedal',
    'cross-stick',
    'snare',
    'kick',
    'kick-open',
    'rim-click',
    'hat-half',
    'hat-closed-edge',
    'hat-open-tip',
    'crash-2',
    'ride-bell',
    'ride-crash',
    'ride-sizzle',
    'crash-tip',
    'crash-2-tip',
    'ride-bell-tip',
    'ride-sizzle-bell',
    'ride-rest',
    'snare-brush',
    'snare-brush-sweep',
    'hat-closed-brush',
    'hat-open-brush',
    'rack-tom-brush',
    'floor-tom-1-brush',
    'floor-tom-2-brush',
    'ride-brush',
    'crash-brush',
    'crash-2-brush',
  ],
  pieces: [
    // the beater left against the head (the library's own kick), and let off it to ring
    await piece('kick', 'Kdrum_with_contact', [36], { ...kick, maxRR: 4, ref: ['Kdrum_back'], leadsRange: true }),
    await piece('kick-open', 'Kdrum_without_contact', [35], { ...kick, maxRR: 3, title: 'Kick open', ref: ['Kdrum_back'] }),
    // the stick resting on the head, its butt on the rim (the library's "rest"); the rim alone
    await piece('cross-stick', 'Snare_rest', [37], { maxRR: 3, ring: 0.8, ref: ['Snare_top'] }),
    await piece('rim-click', 'Snare_rim', [31], { maxRR: 3, title: 'Rim click', ring: 0.5, ref: ['Snare_top'] }),
    await piece('snare', 'Snare', [38], { maxRR: 5, ring: 1.6, fade: 0.4, floor: 56, ref: ['Snare_top'], leadsRange: true }),
    await piece('rack-tom', 'Tom1', [48, 47, 50], { ...tom, pad: 48, ref: ['Tom1'], leadsRange: true }),
    await piece('floor-tom-1', 'Tom2', [43, 45], { ...tom, title: 'Floor tom 1', pad: 43, ref: ['Tom2'] }),
    await piece('floor-tom-2', 'Tom3', [41], { ...tom, title: 'Floor tom 2', ref: ['Tom3'], leadsRange: true }),
    // the hi-hat: the stick's tip on the bow (closed, open), its shoulder on the edge (the library's "shank")
    await piece('hat-closed', 'Hihat_closed', [42], { ...hat, maxRR: 4, ring: 0.8, ref: ['Hihat'] }),
    await piece('hat-closed-edge', 'Hihat_closed_shank', [22], { ...hat, maxRR: 3, title: 'Hi-hat closed edge', ring: 0.9, ref: ['Hihat'] }),
    await piece('hat-pedal', 'Hihat_foot', [44], { ...hat, maxRR: 3, ring: 0.8, ref: ['Hihat'] }),
    await piece('hat-half', 'Hihat_semi_open', [26], { ...hat, maxRR: 2, offBy: 1, ring: 2.2, fade: 0.6, floor: 54, ref: ['Hihat'] }),
    await piece('hat-open', 'Hihat_open', [46], { ...hat, maxRR: 2, offBy: 1, ring: 3.5, fade: 1, floor: 54, ref: ['Hihat'] }),
    await piece('hat-open-tip', 'Hihat_open_tip', [24], { ...hat, maxRR: 2, offBy: 1, title: 'Hi-hat open tip', ring: 3, fade: 0.9, floor: 54, ref: ['Hihat'] }),
    // the ride (a Paiste 602 thin crash): its bow, its edge struck with the stick's shoulder, its bell
    // both ways, and both again with a chain on it (a sizzle ride)
    await piece('ride', 'Ride_tip', [51], { ...cymbal, ref: ['Ride'] }),
    await piece('ride-crash', 'Ride_shank', [66], { ...cymbal, title: 'Ride crash', ref: ['Ride'] }),
    await piece('ride-bell', 'Ride_shank_bell', [53], { ...cymbal, ref: ['Ride'] }),
    await piece('ride-bell-tip', 'Ride_tip_bell', [68], { ...cymbal, title: 'Ride bell tip', ref: ['Ride'] }),
    await piece('ride-sizzle', 'Ride_tip_chain', [59], { ...cymbal, ref: ['Ride'] }),
    await piece('ride-sizzle-bell', 'Ride_tip_bell_chain', [70], { ...cymbal, title: 'Sizzle ride bell', ref: ['Ride'] }),
    await piece('ride-rest', 'Ride_rest', [63], { ...cymbal, title: 'Ride rest', ref: ['Ride'] }),
    // the crashes (a Paiste Giant Beat left, a 602 right): the stick's shoulder on the edge, and its tip
    await piece('crash', 'Crash_left_shank', [49], { ...cymbal, ref: overheads }),
    await piece('crash-tip', 'Crash_left_tip', [54], { ...cymbal, title: 'Crash tip', ref: overheads }),
    await piece('crash-2', 'Crash_right_shank', [57], { ...cymbal, title: 'Crash 2', ref: overheads }),
    await piece('crash-2-tip', 'Crash_right_tip', [55], { ...cymbal, title: 'Crash 2 tip', ref: overheads }),
    // the brushes, on the library's own keys for them
    await piece('snare-brush', 'Snare_whisker', [71], { ...brush, title: 'Snare brush', ring: 1.2, fade: 0.4, floor: 56, ref: ['Snare_top'] }),
    await piece('snare-brush-sweep', 'Snare_circle_whisker', [69], { ...brush, title: 'Snare brush sweep', ring: 3, fade: 0.8, ref: ['Snare_top'] }),
    await piece('rack-tom-brush', 'Tom1_whisker', [72], { ...tom, ...brush, title: 'Rack tom brush', ref: ['Tom1'] }),
    await piece('floor-tom-1-brush', 'Tom2_whisker', [74], { ...tom, ...brush, title: 'Floor tom 1 brush', ref: ['Tom2'] }),
    await piece('floor-tom-2-brush', 'Tom3_whisker', [76], { ...tom, ...brush, title: 'Floor tom 2 brush', ref: ['Tom3'] }),
    await piece('hat-closed-brush', 'Hihat_closed_whisker', [64], { ...hat, ...brush, title: 'Hi-hat closed brush', ring: 0.8, ref: ['Hihat'] }),
    await piece('hat-open-brush', 'Hihat_open_whisker', [65], { ...hat, ...brush, offBy: 1, title: 'Hi-hat open brush', ring: 3, fade: 0.9, floor: 54, ref: ['Hihat'] }),
    await piece('ride-brush', 'Ride_whisker', [67], { ...cymbal, ...brush, title: 'Ride brush', ref: ['Ride'] }),
    await piece('crash-brush', 'Crash_left_whisker', [60], { ...cymbal, ...brush, title: 'Crash brush', ref: overheads }),
    await piece('crash-2-brush', 'Crash_right_whisker', [62], { ...cymbal, ...brush, title: 'Crash 2 brush', ref: overheads }),
  ],
});
