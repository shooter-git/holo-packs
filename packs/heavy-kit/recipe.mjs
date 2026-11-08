// `node packs/heavy-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Heavy Kit pack, from DrumGizmo's
// MuldjordKit (CC BY 4.0; recorded by Lars Muldjord in 2010, the SFZ and FLAC port by kinwie): a Tama
// Superstar with two kicks, three rack toms and a floor tom, a snare, hi-hats, two crashes, two rides
// and a china, recorded on fifteen microphones (and a kick trigger channel, left out here).
//
// Its samples are named by piece, hit and microphone ("Snare/12-Snare-OHL.flac"), and its SFZ (the
// library's stereo program, Stereo/DrumGizmo MuldjordKit.sfz) says how each microphone is mixed: the
// mixer channel each answers to (its amplitude CCs), where each is panned, and which hits are bleed
// (one piece heard on another's microphone).
//
// The microphones are kept apart, each with a knob, and start as the library's mixer has them: every
// fader at its default, the close microphones panned where its pan knobs start, the overhead and room
// pairs hard left and right (their width at full), and the snare's bottom microphone turned over, as
// the library turns it (it's out of phase with the top). Bleed is kept, as the library's sixteen-channel
// (multi) programs play it: every piece on every microphone. Its stereo program turns bleed off only to
// spare a player's voices.
//
// Velocity: DrumGizmo records each piece as many single hits at every strength, numbered by power, and
// picks the hit nearest the strength played. The SFZ port groups them into four or five even velocity
// bands (one to sixteen hits a band, taking turns) and ramps each band's gain up to its top, so the
// level jumps where a band changes. Here every hit is measured, the hits are grouped into layers about
// 3 dB apart by how loud they really are, and the layers are set on the kit's one velocity curve, so a
// piece gets louder smoothly, changes timbre layer by layer, and its round robins are alike in level.
import { buildKit, Downloads, raw } from '../../tools/kit.mjs';
import { arg, loudness, onset } from '../../tools/lib.mjs';
import { ccDefault, readSfz } from '../../tools/sfz.mjs';

const REPO = 'sfzinstruments/DrumGizmo.MuldjordKit';
const COMMIT = 'fc165714974aa843125ce88597f341b31376e1d5';
const LIB = 'DrumGizmo/MuldjordKit';
const bases = { muldjord: raw(REPO, COMMIT) };
const downloads = new Downloads(arg('cache', `${process.env.HOME}/.cache/holo-pack-sources/heavy-kit`), bases);
const text = new TextDecoder();
const sfz = await readSfz(`${LIB}/Stereo/DrumGizmo MuldjordKit.sfz`, async (path) =>
  text.decode(await downloads.get(`muldjord:${path}`)),
);
const def = sfz.defines;

// ---- the microphones: each mixer channel's knob, as the library's own mixer starts ----

/** The knobs, in the order the studio shows them, and the recordings (by their files' microphone names) each is made of. */
const MICS = [
  { id: 'kick-right', name: 'Kick right', from: ['KdrumR'] },
  { id: 'kick-left', name: 'Kick left', from: ['KdrumL'] },
  { id: 'snare-top', name: 'Snare top', from: ['Snare_top'] },
  { id: 'snare-bottom', name: 'Snare bottom', from: ['Snare_bottom'] },
  // the four tom microphones are one knob, each tom panned where the library has it
  { id: 'toms', name: 'Toms', from: ['Tom1', 'Tom2', 'Tom3', 'Tom4'] },
  { id: 'hat', name: 'Hi-hat', from: ['Hihat'] },
  { id: 'ride-right', name: 'Ride right', from: ['RideR'] },
  { id: 'ride-left', name: 'Ride left', from: ['RideL'] },
  { id: 'overheads', name: 'Overheads', from: ['OHL', 'OHR'] },
  { id: 'room', name: 'Room', from: ['AmbL', 'AmbR'] },
];
/** Each recording's input (its microphone's id, and which of several it is). */
const inputOf = new Map();
for (const m of MICS)
  for (const [n, name] of m.from.entries()) inputOf.set(name, m.from.length > 1 ? `${m.id}:${n + 1}` : m.id);

// bleed (CC 42) as the multi programs start it: at its default, every piece at full on every microphone
const START = new Map([[def.$bleed, 0.5]]);
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

// the regions a hit plays (not the silent ones that choke, nor the kick trigger's channel)
const struck = sfz.regions.filter(
  (r) => r.sample !== '*silence' && (r.trigger ?? 'attack') === 'attack' && inputOf.has(sampleOf(r).mic),
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

const download = (r) => `muldjord:${LIB}/${(sfz.control.default_path ?? '').replace(/^\.\.\//, '')}${r.sample}`;

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

// kept takes: every hit the library has. Its files are short (each already trimmed where its hit falls
// away), so the whole library, every microphone kept apart, decodes to about 260 MB at 48 kHz.
const kick = { ring: 1.6, fade: 0.35, floor: 56 };
const tom = { ring: 3, fade: 0.6, floor: 56, minRR: 1 };
const hat = { group: 1 };
const cymbal = { ring: 8, fade: 2, floor: 50, step: 4, minRR: 1 };
const overheads = ['OHL', 'OHR'];

await buildKit({
  id: 'heavy-kit',
  name: 'Heavy Kit (DrumGizmo MuldjordKit)',
  license: 'CC-BY-4.0',
  credit:
    "Drum samples provided by DrumGizmo.org: the MuldjordKit by Lars Muldjord (CC BY 4.0), in kinwie's SFZ and FLAC " +
    'version (sfzinstruments/DrumGizmo.MuldjordKit): a Tama Superstar with two kicks, four toms, a snare, hi-hats, ' +
    'crashes, rides and a china. Its microphones kept apart for HO[LO], each with its own level.',
  note: "The MuldjordKit's fifteen microphones (FLAC, at the pinned commit), each kept as its own file, at its own mixer's levels.",
  folder: 'heavy',
  instrument: { name: 'kit', title: 'Heavy Kit' },
  level: -19,
  downloads,
  bases,
  mics,
  // the pads, in rows of four: cymbals and hats, toms (high to low), the snare's strokes and the kicks, then the rest
  pads: [
    'crash',
    'ride',
    'hat-open',
    'hat-closed',
    'rack-tom-1',
    'rack-tom-2',
    'rack-tom-3',
    'floor-tom',
    'cross-stick',
    'snare',
    'kick',
    'kick-2',
    'crash-2',
    'china',
    'ride-bell',
    'ride-2',
    'ride-2-bell',
  ],
  pieces: [
    await piece('kick', 'KdrumR', [36], { ...kick, ref: ['KdrumR'], leadsRange: true }),
    await piece('kick-2', 'KdrumL', [35], { ...kick, title: 'Kick 2', ref: ['KdrumL'] }),
    await piece('cross-stick', 'SnareRest', [37], { ring: 0.8, ref: ['Snare_top'] }),
    await piece('snare', 'Snare', [38], { ring: 1.6, fade: 0.4, floor: 56, ref: ['Snare_top'], leadsRange: true }),
    await piece('rack-tom-1', 'Tom1', [48, 50], { ...tom, title: 'Rack tom 1', pad: 48, ref: ['Tom1'], leadsRange: true }),
    await piece('rack-tom-2', 'Tom2', [47], { ...tom, title: 'Rack tom 2', ref: ['Tom2'] }),
    await piece('rack-tom-3', 'Tom3', [45], { ...tom, title: 'Rack tom 3', ref: ['Tom3'] }),
    await piece('floor-tom', 'Tom4', [41, 43], { ...tom, pad: 41, ref: ['Tom4'], leadsRange: true }),
    await piece('hat-closed', 'HihatClosed', [42], { ...hat, ring: 0.8, ref: ['Hihat'] }),
    await piece('hat-open', 'HihatOpen', [46], { ...hat, offBy: 1, ring: 3, fade: 0.9, floor: 54, ref: ['Hihat'] }),
    await piece('ride', 'RideR', [51], { ...cymbal, ref: ['RideR'] }),
    await piece('ride-bell', 'RideRBell', [53], { ...cymbal, ring: 6, ref: ['RideR'] }),
    // its third hit is struck twice (the library's own note says so)
    await piece('ride-2', 'RideL', [59], { ...cymbal, title: 'Ride 2', ref: ['RideL'], skip: [3] }),
    // one layer of three hits, all hard (as loud as the other bell's hardest): heard at velocity 127 as
    // recorded, as the top layer of a piece with several is, not half a velocity curve over it
    await piece('ride-2-bell', 'RideLBell', [56], { ...cymbal, title: 'Ride 2 bell', ring: 6, trim: -12, ref: ['RideL'] }),
    await piece('crash', 'CrashL', [49], { ...cymbal, ref: overheads }),
    await piece('crash-2', 'CrashR', [57], { ...cymbal, title: 'Crash 2', ref: overheads }),
    await piece('china', 'China', [52], { ...cymbal, ring: 6, ref: overheads }),
  ],
});
