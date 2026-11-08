// `node tools/levels.mjs [ID…] [--write]`: each palette sound played by HO[LO] Desk's own engine and
// measured, so a palette's sounds sit together. Each sound plays the same short phrase (a line rising
// to its octave, then a held chord; a drum or a one-sound instrument, a bar of hits) at velocity 96
// through its effects and room, and its loudness is measured as BS.1770 integrates it (K-weighted,
// gated). Its fader is the level that brings the phrase to the target: −20 LUFS, or −23 for pads and
// textures, which sit behind; but never so high that the phrase peaks above −4 dBFS (a sharp pluck or
// a drum is held by its peak, leaving room for harder playing). --write puts those levels in the maps;
// without it, they're only shown.
//
// It plays the packs installed in HO[LO]'s data folder (HOLO_DATA_DIR, else the checkout's own): a
// sound whose pack isn't installed there, or whose synth or effect HO[LO] Desk hasn't got yet, is
// skipped and said so.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { dataDir, holo, repo } from './holo.mjs';

const { renderSession } = await holo('packages/engine/src/render.ts');
const { dataFolderSource } = await holo('packages/engine/src/node.ts');
const S = await holo('packages/session/src/index.ts');

const RATE = 48000;
const VELOCITY = 96;
const TARGET = { default: -20, Pads: -23, Textures: -23 };
/** The highest a phrase may peak at velocity 96, in dBFS: room for harder playing above it. */
const CEILING = -4;
const args = process.argv.slice(2);
const write = args.includes('--write');
const only = args.filter((a) => !a.startsWith('--'));

/** Where each family's phrase sits (its lowest note), when the instrument doesn't say. */
const HOME = {
  Bass: 36,
  Brass: 53,
  Woodwinds: 67,
  'Mallets and bells': 72,
  'Drums and percussion': 45,
  default: 60,
};
/** Synths whose notes are drums, struck where they sound best. */
const STRUCK = { Taiko: 41, 'War Drums': 38, 'Frame Drum': 50, 'Opera Gongs': 62, Anvil: 74 };

// ---- loudness (ITU-R BS.1770-4) ----

function biquad(type, f0, rate, q, db = 0) {
  const w0 = (2 * Math.PI * f0) / rate;
  const cos = Math.cos(w0);
  const alpha = Math.sin(w0) / (2 * q);
  let c;
  if (type === 'shelf') {
    const A = 10 ** (db / 40);
    const s = 2 * Math.sqrt(A) * alpha;
    c = [
      A * (A + 1 + (A - 1) * cos + s),
      -2 * A * (A - 1 + (A + 1) * cos),
      A * (A + 1 + (A - 1) * cos - s),
      A + 1 - (A - 1) * cos + s,
      2 * (A - 1 - (A + 1) * cos),
      A + 1 - (A - 1) * cos - s,
    ];
  } else c = [(1 + cos) / 2, -(1 + cos), (1 + cos) / 2, 1 + alpha, -2 * cos, 1 - alpha];
  const [b0, b1, b2, a0, a1, a2] = c;
  return (x) => {
    const y = new Float64Array(x.length);
    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2 = 0;
    for (let i = 0; i < x.length; i++) {
      const v = x[i];
      const o = (b0 * v + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
      x2 = x1;
      x1 = v;
      y2 = y1;
      y1 = o;
      y[i] = o;
    }
    return y;
  };
}

/** Integrated loudness in LUFS: 400 ms blocks every 100 ms, gated at −70 LUFS and 10 LU below. */
export function lufs(channels, rate) {
  const shelf = biquad('shelf', 1681.97, rate, 0.7072, 4);
  const cut = biquad('highpass', 38.13, rate, 0.5003);
  const k = channels.map((ch) => cut(shelf(ch)));
  const size = Math.round(0.4 * rate);
  const hop = Math.round(0.1 * rate);
  const blocks = [];
  for (let at = 0; at + size <= k[0].length; at += hop) {
    let sum = 0;
    for (const ch of k) {
      let s = 0;
      for (let i = at; i < at + size; i++) s += ch[i] * ch[i];
      sum += s / size;
    }
    blocks.push(sum);
  }
  const level = (ms) => -0.691 + 10 * Math.log10(ms.reduce((a, b) => a + b, 0) / ms.length);
  const loud = blocks.filter((b) => -0.691 + 10 * Math.log10(b) > -70);
  if (!loud.length) return -Infinity;
  const relative = level(loud) - 10;
  const gated = loud.filter((b) => -0.691 + 10 * Math.log10(b) > relative);
  return level(gated);
}

export function peak(channels) {
  let p = 0;
  for (const ch of channels) for (let i = 0; i < ch.length; i++) p = Math.max(p, Math.abs(ch[i]));
  return 20 * Math.log10(p + 1e-12);
}

// ---- the phrase ----

const installed = new Map();
const packsDir = join(dataDir, 'packs');
if (existsSync(packsDir))
  for (const id of readdirSync(packsDir)) {
    const f = join(packsDir, id, 'holo-pack.json');
    if (existsSync(f)) installed.set(id, JSON.parse(readFileSync(f, 'utf8')));
  }

/** The notes a sound plays: a rising line and a held chord, or a bar of hits. */
export function phrase(sound) {
  const PPQ = S.PPQ;
  const n = (t, p, d, v = VELOCITY) => ({ t: Math.round(t * PPQ), d: Math.round(d * PPQ), p, v });
  const sampler = S.soundSampler(sound);
  const inst = sampler ? installed.get(sampler.pack)?.instruments.find((i) => i.name === sampler.name) : null;
  const preset = sampler ? null : sound.instrument.synth;
  const hits = (key) => Array.from({ length: 8 }, (_, i) => n(i / 2, key, 0.4, i % 2 ? VELOCITY - 16 : VELOCITY));
  if (inst?.pitched === false) return hits(60);
  if (preset && STRUCK[preset] !== undefined) return hits(STRUCK[preset]);
  if (preset && S.DRUM_PRESETS?.includes(preset))
    return [36, 42, 38, 42, 36, 42, 38, 46].map((key, i) => n(i / 2, key, 0.4));
  let home = HOME[sound.family] ?? HOME.default;
  if (inst) {
    const roots = inst.zones.filter((z) => !z.trigger).map((z) => Math.round(z.root));
    const lo = Math.min(...roots);
    const hi = Math.max(...roots);
    home = Math.max(lo, Math.min(home, hi - 12));
  }
  return [
    n(0, home, 1),
    n(1, home + 4, 1),
    n(2, home + 7, 1),
    n(3, home + 12, 1),
    n(4, home, 4),
    n(4, home + 4, 4),
    n(4, home + 7, 4),
  ];
}

/** A sound's phrase rendered by the engine, at a fader of 0 dB. */
export async function play(sound) {
  let project = S.newProject('levels');
  project.tracks = [];
  project.master.inserts = [];
  project.tempo = [{ tick: 0, bpm: 100 }];
  const { ops, track } = S.soundTrack(project, { ...sound, volume: 0 });
  project = S.applyOps(project, ops);
  const region = S.newRegion(0, S.PPQ * 8);
  region.notes = phrase(sound);
  project = S.applyOps(project, [{ op: 'addRegion', track: track.id, region }]);
  const source = dataFolderSource(dataDir, 'levels');
  const out = await renderSession(project, source, { sampleRate: RATE, tail: 4, finish: false, loop: false });
  if (out.errors.length) throw new Error(out.errors.join('; '));
  return out.channels;
}

/** What a sound can't play with here: a synth or effect HO[LO] Desk hasn't got, or a pack not installed. */
function lacks(sound) {
  const { missing } = S.checkSound(sound);
  const sampler = S.soundSampler(sound);
  if (sampler && !installed.get(sampler.pack)?.instruments.some((i) => i.name === sampler.name))
    missing.push(`${sampler.pack}/${sampler.name} installed`);
  return missing;
}

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename) {
  for (const id of readdirSync(join(repo, 'packs')).sort()) {
    if (only.length && !only.includes(id)) continue;
    const file = join(repo, 'packs', id, 'pack.json');
    const pack = JSON.parse(readFileSync(file, 'utf8'));
    if (!pack.sounds?.length) continue;
    console.log(`${pack.name}:`);
    let changed = 0;
    for (const sound of pack.sounds) {
      const need = lacks(sound);
      if (need.length) {
        console.log(`  ${sound.name.padEnd(26)} skipped: needs ${need.join(' and ')}`);
        continue;
      }
      const channels = await play(sound);
      const loud = lufs(channels, RATE);
      const target = TARGET[sound.family] ?? TARGET.default;
      const raw = peak(channels);
      // as loud as the target, but never peaking above the ceiling (a sharp pluck or hit is held by its peak)
      const want = Math.min(target - loud, CEILING - raw);
      const volume = Math.max(-30, Math.min(12, Math.floor(want * 2) / 2));
      const top = raw + volume;
      const held = target - loud > CEILING - raw ? ', held by its peak' : '';
      console.log(
        `  ${sound.name.padEnd(26)} ${loud.toFixed(1).padStart(6)} LUFS → fader ${volume > 0 ? '+' : ''}${volume.toFixed(1)} dB` +
          ` (was ${sound.volume ?? 0}), peak ${top.toFixed(1)} dBFS${held}`,
      );
      if (sound.volume !== volume) {
        sound.volume = volume;
        changed++;
      }
    }
    if (write && changed) {
      writeFileSync(file, `${JSON.stringify(pack, null, 1)}\n`);
      console.log(`  wrote ${changed} level(s) into packs/${id}/pack.json`);
    }
  }
}
