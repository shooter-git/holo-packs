// `node packs/salamander/recipe.mjs [--cache DIR] [--out DIR]`: the Salamander Grand Piano pack, from
// Alexander Holm's Salamander Grand Piano V3 (public domain since 4 March 2022) as the SFZ Instruments
// project publishes it (kinwie's mapping, in FLAC), written into packs/salamander/pack.json and
// packs/salamander/files.sha256.
//
// A Yamaha C5 recorded at 48 kHz, 24-bit, with two AKG C414s in an AB pair about 12 cm above the
// strings: 16 velocity layers every minor third from A0, the hammers coming back (a sample a key), the
// strings ringing off as the dampers fall (three layers every minor third, up to D#6: the keys from F6
// up have no dampers) and the sustain pedal. Its tuning is the piano's own (the library's Natural set).
//
// Each note is kept until it falls to -55 dB (a fade to silence over its last second or so, 16 s at
// most). Nothing else is changed: the files are the library's samples, bit for bit, up to the fade.
// The layers are measured and set where the velocity curve meets them, as the Steinway's are.
import { join } from 'node:path';
import {
  arg,
  Downloads,
  decayRate,
  loudness,
  makeFiles,
  memoryMb,
  pinDownloads,
  spreadLayers,
  tailEnd,
  writeManifest,
} from '../../tools/lib.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/salamander'));
const out = arg('out', null);

const REPO = 'sfzinstruments/SalamanderGrandPiano';
const COMMIT = '3382bf9496bba2486f5ab0de55a264d1dfc38404';
const bases = { sal: `https://raw.githubusercontent.com/${REPO}/${COMMIT}/Samples/` };
const downloads = new Downloads(cache, bases);

const PC = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
const midi = (note, octave) => (octave + 1) * 12 + PC[note];
const RATE = 48000;
/** Where a struck note is kept to, and how it fades. */
const FULL = { floor: -55, cap: 16, fade: 1.5 };
/** The light instrument: half the layers, shorter tails (cut as they load, from the same files). */
const LIGHT = { floor: -52, cap: 10, fade: 0.8 };
/** Keys from F6 up have no dampers (the library's "notes without dampers"). */
const UNDAMPED = 89;
/** A damper stops a bass string more slowly than a treble one. */
const damperTime = (key) => Math.round((0.12 + 0.38 * Math.min(1, Math.max(0, (96 - key) / 75))) * 1000) / 1000;
/** The library's own levels for its extras, beside the notes (its SFZ's volumes). */
const HAMMER_DB = -37;
const PEDAL_DB = { D: -20, U: -19 };

// the samples, as the library names them: "A0v1.flac", "harmLA0.flac" (L, S and V3: three layers),
// "rel1.flac" (key 21), "pedalD1.flac"
const NOTES = [];
for (let key = 21; key <= 108; key += 3) NOTES.push(key);
const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteName = (key) => `${NAMES[key % 12]}${Math.floor(key / 12) - 1}`;
const sustain = [];
for (const key of NOTES)
  for (let layer = 1; layer <= 16; layer++) sustain.push({ file: `${noteName(key)}v${layer}.flac`, key, layer });
const HARM = { V3: 1, S: 2, L: 3 };
const harm = [];
for (const key of NOTES.filter((k) => k < UNDAMPED))
  for (const [tag] of Object.entries(HARM)) harm.push({ file: `harm${tag}${noteName(key)}.flac`, key, tag });
const rel = Array.from({ length: 88 }, (_, i) => ({ file: `rel${i + 1}.flac`, key: 21 + i }));
const pedal = ['D', 'U'].flatMap((d) => [1, 2].map((rr) => ({ file: `pedal${d}${rr}.flac`, down: d === 'D', rr })));
if (sustain.length !== 480 || harm.length !== 69) throw new Error(`${sustain.length} notes, ${harm.length} ring-offs`);

const dl = (s) => `sal:${s.file}`;
const made = (s) => s.file.replace('#', 's').replace(/\.flac$/, '.wav');
const all = [...sustain, ...harm, ...rel, ...pedal];
console.log(`Salamander Grand Piano: ${all.length} recordings (cache ${cache})`);
await downloads.all(all.map(dl));

const files = {};
for (const s of all) {
  const d = downloads.decoded(dl(s));
  if (d.rate !== RATE) throw new Error(`${s.file}: ${d.rate} Hz`);
  s.frames = d.channels[0].length;
  s.loudness = loudness(d.channels, RATE, 0, 0.4);
  if (s.layer !== undefined) {
    s.end = Math.min(s.frames, tailEnd(d.channels, RATE, FULL.floor, RATE) + Math.round(0.5 * RATE), FULL.cap * RATE);
    s.lightEnd = Math.min(s.end, tailEnd(d.channels, RATE, LIGHT.floor, RATE) + Math.round(0.3 * RATE), LIGHT.cap * RATE);
    if (s.layer === 8) s.decay = decayRate(d.channels, RATE, 0.3, 3);
  } else {
    // ring-offs, hammers and the pedal: short, kept down to -80 dB
    s.end = Math.min(s.frames, tailEnd(d.channels, RATE, -80, Math.round(0.2 * RATE)) + Math.round(0.05 * RATE));
  }
  const fade = s.layer !== undefined ? FULL.fade : 0.05;
  files[made(s)] = {
    in: [[dl(s), 1, 1]],
    start: 0,
    frames: s.end,
    fadeIn: 0,
    fadeOut: Math.min(Math.round(fade * RATE), Math.round(s.end * 0.4)),
  };
}

// the layers, by their loudness over the keyboard
const average = (list) => list.reduce((a, s) => a + s.loudness, 0) / list.length;
const levels = Array.from({ length: 16 }, (_, i) => average(sustain.filter((s) => s.layer === i + 1)));
// the loudest layer at velocity 127 plays where the Steinway's does (-16.4 dB), 4 dB under its own
// recorded level at most, so a chord played hard under the pedal stays under full scale
const natural = spreadLayers(levels);
const target = Math.min(-16.4, natural.ref - 4);
const spread = spreadLayers(levels, { target });
const offset = target - natural.ref;
const harmLevels = Object.keys(HARM).map((tag) => average(harm.filter((s) => s.tag === tag)));
const harmSpread = spreadLayers(harmLevels, { target: spreadLayers(harmLevels).ref + offset });
console.log(
  `  layers ${levels[0].toFixed(1)} to ${levels[15].toFixed(1)} dB, velocity range ${spread.range.toFixed(1)} dB, ` +
    `top at ${target.toFixed(1)} dB; ring-offs ${harmLevels.map((l) => l.toFixed(1)).join(' ')} (range ${harmSpread.range.toFixed(1)} dB)`,
);

const round = (x) => Math.round(x * 100) / 100;
// each sampled note covers the keys a semitone either side (the lowest and highest, the ends too)
const keyRange = (key) => [key === 21 ? 0 : key - 1, key === 108 ? 127 : key + 1];
const decayOf = new Map(sustain.filter((s) => s.decay !== undefined).map((s) => [s.key, s.decay]));
const zone = (s, extra) => {
  const [lo, hi] = keyRange(s.key);
  return { file: made(s), root: s.key, lo, hi, start: 0, end: s.end, loopStart: 0, loopEnd: 0, rate: RATE, rr: 0, ...extra };
};
const ALL = Array.from({ length: 16 }, (_, i) => i + 1);
const LAYERS = [2, 4, 6, 8, 10, 12, 14, 16];
const lightSpread = spreadLayers(
  LAYERS.map((k) => levels[k - 1]),
  { range: spread.range, target },
);
const struck = (layers) =>
  sustain
    .filter((s) => layers.includes(s.layer))
    .sort((a, b) => a.key - b.key || a.layer - b.layer)
    .map((s) => {
      const v = layers === ALL ? spread.layers[s.layer - 1] : lightSpread.layers[layers.indexOf(s.layer)];
      return zone(s, { lovel: v.lovel, hivel: v.hivel, gain: round(v.gain), release: damperTime(s.key) });
    });
const releases = [
  // the strings ringing off as the dampers fall: quieter the longer the note was held, as it is
  ...harm
    .sort((a, b) => a.key - b.key || HARM[a.tag] - HARM[b.tag])
    .map((s) => {
      const v = harmSpread.layers[HARM[s.tag] - 1];
      const decay = Math.min(20, Math.max(0.5, decayOf.get(s.key) ?? 4));
      return zone(s, { lovel: v.lovel, hivel: v.hivel, gain: round(v.gain), trigger: 'release', decay: round(decay) });
    }),
  // each key's hammer and key coming back up, the same however long it was held, at the library's level
  ...rel
    .sort((a, b) => a.key - b.key)
    .map((s) => ({
      ...zone(s, {}),
      lo: s.key,
      hi: s.key,
      lovel: 1,
      hivel: 127,
      gain: round(offset + HAMMER_DB),
      trigger: 'release',
      part: 1,
      decay: 0,
    })),
];
const pedals = pedal
  .sort((a, b) => Number(b.down) - Number(a.down) || a.rr - b.rr)
  .map((s) => ({
    file: made(s),
    root: 60,
    lo: 0,
    hi: 127,
    lovel: 1,
    hivel: 127,
    gain: round(offset + PEDAL_DB[s.down ? 'D' : 'U']),
    start: 0,
    end: s.end,
    loopStart: 0,
    loopEnd: 0,
    rate: RATE,
    rr: s.rr,
    trigger: s.down ? 'pedalDown' : 'pedalUp',
  }));
const playing = {
  category: 'Piano',
  pitched: true,
  release: 0.3,
  attack: 0,
  oneShot: false,
  velocityRange: round(spread.range),
  releaseVelocityRange: round(harmSpread.range),
  polyphony: 128,
  notePolyphony: 2,
  offTime: 0.12,
  undamped: UNDAMPED,
};
const full = { name: 'grand', title: 'Yamaha C5 Grand', ...playing, zones: [...struck(ALL), ...releases, ...pedals] };
const lightZones = struck(LAYERS).map((z) => {
  const s = sustain.find((x) => made(x) === z.file);
  return { ...z, end: s.lightEnd, fadeOut: Math.min(Math.round(LIGHT.fade * RATE), Math.round(s.lightEnd * 0.4)) };
});
const light = { name: 'grand-light', title: 'Yamaha C5 Grand, Light', ...playing, zones: [...lightZones, ...releases, ...pedals] };

const source = {
  kind: 'mix',
  note:
    "Salamander Grand Piano V3's 48 kHz 24-bit samples (FLAC, at the pinned commit), each note kept until it " +
    'falls to -55 dB (16 s at most) and faded there, otherwise bit for bit.',
  bases,
  downloads: {},
  bits: 24,
  files,
};
source.downloads = pinDownloads(source, downloads);
const pack = {
  format: 'holo-pack',
  version: 1,
  id: 'salamander',
  name: 'Salamander Grand Piano (Yamaha C5)',
  license: 'Public-Domain',
  credit:
    'Salamander Grand Piano V3 by Alexander Holm (public domain since 4 March 2022), mapped in FLAC by kinwie for ' +
    'the SFZ Instruments project: a Yamaha C5 recorded at 48 kHz, 24-bit. Trimmed for HO[LO]: each note ends where ' +
    'it falls to -55 dB.',
  source,
  root: 'samples',
  instruments: [full, light],
};
console.log(`Writing: ${Object.keys(files).length} files`);
await makeFiles(pack, downloads, out);
console.log(
  `${writeManifest(pack)}\n${full.title}: ${memoryMb(full.zones).toFixed(0)} MB, ${light.title}: ${memoryMb(light.zones).toFixed(0)} MB (decoded, at 48 kHz)`,
);
