// A pack of played instruments (pianos, keys, strings, winds, tuned and one-sound percussion) from a
// library's recordings, for the recipes that make one (`packs/<id>/recipe.mjs`).
//
// Each recording is measured: where its sound starts, how loud it is (BS.1770's weighting, its first
// 0.4 s from the attack), its peak, and where its tail has fallen away. Then, as the Steinway and the
// kits are levelled:
// - an instrument's velocity layers are set where one velocity curve meets their loudness, so a note
//   played harder gets louder smoothly and changes its timbre at each layer;
// - its loudest layer plays at velocity 127 at `level` (−17 dB unless the recipe says, as HO[LO]'s
//   other instruments do), lower if a note would peak over `peak` (−3 dB of full scale);
// - release samples keep their natural level beside the notes;
// - a note's tail is kept until it falls to `floor` dB of full scale (`cap` seconds at most), and fades
//   out over its last `fade` seconds.
//
// The files are either the library's own (`mode: 'git'`, its WAVs as they are, a zone ending where
// the tail is cut and fading as it loads), or made from its recordings (`mode: 'mix'`, the default:
// trimmed and faded copies, which is how a FLAC library becomes the WAVs a render reads).
import { basename, extname } from 'node:path';
import {
  loudness,
  makeFiles,
  memoryMb,
  mixSignal,
  onset,
  peakDb,
  pinArchives,
  pinDownloads,
  spreadLayers,
  tailEnd,
  writeManifest,
} from './lib.mjs';

export const round = (x, d = 100) => Math.round(x * d) / d;

/** Bits a sample of a recording (FLAC, WAV or AIFF), from its header. */
export function bitsOf(bytes) {
  const tag = (at) => String.fromCharCode(...bytes.subarray(at, at + 4));
  if (tag(0) === 'fLaC') return ((bytes[20] & 1) << 4) + (bytes[21] >> 4) + 1;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const riff = tag(0) === 'RIFF';
  let at = 12;
  while (at + 8 <= bytes.length) {
    const id = tag(at);
    const size = riff ? view.getUint32(at + 4, true) : view.getUint32(at + 4);
    if (riff && id === 'fmt ') return view.getUint16(at + 8 + 14, true);
    if (!riff && id === 'COMM') return view.getUint16(at + 8 + 6);
    at += 8 + size + (size & 1);
  }
  throw new Error('No sample size in its header');
}

/** A smpl chunk's first loop ([start, end) frames), from the chunk's body, or null. */
function smplLoop(view, body, size) {
  if (size < 36 + 24 || view.getUint32(body + 28, true) < 1) return null;
  const start = view.getUint32(body + 36 + 8, true);
  const end = view.getUint32(body + 36 + 12, true);
  return end > start ? [start, end + 1] : null;
}

/**
 * A recording's first loop ([start, end) frames), or null: a WAV's smpl chunk, or a FLAC's (kept in
 * an APPLICATION "riff" block, as flac --keep-foreign-metadata keeps a WAV's chunks).
 */
export function wavLoop(bytes) {
  const tag = (at) => String.fromCharCode(...bytes.subarray(at, at + 4));
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (bytes.length >= 4 && tag(0) === 'fLaC') {
    let at = 4;
    while (at + 4 <= bytes.length) {
      const head = bytes[at];
      const size = (bytes[at + 1] << 16) | (bytes[at + 2] << 8) | bytes[at + 3];
      if ((head & 0x7f) === 2 && tag(at + 4) === 'riff' && tag(at + 8) === 'smpl')
        return smplLoop(view, at + 16, view.getUint32(at + 12, true));
      if (head & 0x80) break;
      at += 4 + size;
    }
    return null;
  }
  if (bytes.length < 12 || tag(0) !== 'RIFF' || tag(8) !== 'WAVE') return null;
  let at = 12;
  while (at + 8 <= bytes.length) {
    const size = view.getUint32(at + 4, true);
    if (tag(at) === 'smpl' && size >= 36) return smplLoop(view, at + 8, size);
    at += 8 + size + (size & 1);
  }
  return null;
}

/**
 * A recording's pitch (as a MIDI key, fractional), by autocorrelation of 0.4 s from 0.3 s in, or null
 * where it has no clear one. Good enough to catch a library mapped an octave off.
 */
export function measurePitch(channels, rate) {
  const x = channels[0];
  const from = Math.min(x.length - 1, Math.round(0.3 * rate));
  const minLag = Math.round(rate / 4200);
  const maxLag = Math.round(rate / 25);
  const n = Math.min(Math.round(0.4 * rate), x.length - from - maxLag - 1);
  if (n < maxLag) return null;
  const r = new Float64Array(maxLag + 2);
  let best = 0;
  for (let lag = minLag; lag <= maxLag + 1; lag++) {
    let s = 0;
    let e1 = 0;
    let e2 = 0;
    for (let i = 0; i < n; i++) {
      const a = x[from + i];
      const b = x[from + i + lag];
      s += a * b;
      e1 += a * a;
      e2 += b * b;
    }
    r[lag] = s / Math.sqrt(e1 * e2 + 1e-20);
    best = Math.max(best, r[lag]);
  }
  if (best < 0.6) return null;
  // the shortest lag nearly as good as the best (not a multiple of the period)
  for (let lag = minLag + 1; lag <= maxLag; lag++)
    if (r[lag] > 0.88 * best && r[lag] >= r[lag - 1] && r[lag] >= r[lag + 1]) return 69 + 12 * Math.log2(rate / lag / 440);
  return null;
}

/** A sample's inputs: its microphones at their gains ([download, left, right]), or its one download. */
const inputsOf = (s) => s.inputs ?? [[s.download, 1, 1]];

/** A recording's measurements, as its inputs mix (decoded once, then let go). */
function measure(downloads, s, opts = {}) {
  const inputs = inputsOf(s);
  let d;
  let mono;
  if (inputs.length === 1 && inputs[0][1] === 1 && inputs[0][2] === 1) {
    d = downloads.decoded(inputs[0][0]);
    mono = d.channels.length === 1;
  } else {
    const decoded = new Map(inputs.map(([n]) => [n, downloads.decoded(n)]));
    const [l, r] = mixSignal(inputs, decoded);
    const first = decoded.get(inputs[0][0]);
    for (const [n] of inputs)
      if (decoded.get(n).rate !== first.rate) throw new Error(`${n}: its rate isn't its fellow microphones'`);
    mono = false;
    d = { rate: first.rate, channels: [Float32Array.from(l), Float32Array.from(r)] };
  }
  const ch = d.channels;
  const rate = d.rate;
  const frames = ch[0].length;
  const from = Math.min(frames - 1, s.offset ?? 0);
  const to = Math.min(frames, s.end ?? frames);
  const body = ch.map((c) => c.subarray(from, to));
  const at = from + (opts.trim ? onset(body, opts.onsetBelow ?? 48) : 0);
  const start = opts.trim ? Math.max(from, at - Math.round((opts.preroll ?? 0.004) * rate)) : from;
  // its loudness over its first 0.4 s from the attack, or `window` seconds (a long texture's swell)
  const level = loudness(ch, rate, Math.max(start, from + onset(body, 40)), opts.window ?? 0.4);
  const peak = peakDb(body);
  const pitch = opts.pitched === false ? null : measurePitch(body, rate);
  return { rate, frames: to, mono, start, at, level, peak, pitch, decoded: d };
}

/** Where a struck note's tail ends (frames from its start), and its fade (frames). */
function tailOf(m, tail) {
  if (tail.keep) return { end: m.frames - m.start, fade: 0 };
  const ch = m.decoded.channels.map((c) => c.subarray(m.start, m.frames));
  const rate = m.rate;
  const min = Math.round((tail.min ?? 0.3) * rate);
  let end = tailEnd(ch, rate, tail.floor ?? -60, min) + Math.round((tail.after ?? 0.3) * rate);
  end = Math.min(ch[0].length, end, Math.round((tail.cap ?? 20) * rate));
  const fade = Math.min(Math.round((tail.fade ?? 1) * rate), Math.round(end * 0.4));
  return { end, fade: end === ch[0].length && !tail.fadeAlways ? Math.min(fade, Math.round(0.01 * rate)) : fade };
}

/**
 * Build the pack. `spec`: { id, name, license, credit, note, downloads, mode ('mix' | 'git'), git
 * ({ url, branch, commit }, for 'git'), bits (16 | 24, for 'mix'), level, peak, instruments }.
 *
 * Each instrument: { name, title, category, pitched, playing ({ release, attack, oneShot, polyphony,
 * … }), samples, tail ({ floor, cap, fade, after, keep }), trim (start just before the attack), range
 * (its velocity curve, dB), level, peak, levelAs (share another instrument's offset), folder (for the
 * files made), sharesFiles (another instrument's files, cut its own way: a lighter version) }.
 *
 * Each sample: { download, root, lo, hi, layer (any number: louder layers higher, or as measured),
 * rr, trigger, decay, part, release, group, offBy, gain (dB more), loop ([start, end] frames: a looped
 * sustain is kept whole), lovel, hivel (a release sample's), keepLevel (a release sample levelled as
 * recorded) }.
 */
export async function buildInstruments(spec) {
  const downloads = spec.downloads;
  const mode = spec.mode ?? 'mix';
  const names = [...new Set(spec.instruments.flatMap((i) => i.samples.flatMap((s) => inputsOf(s).map(([n]) => n))))];
  console.log(`${spec.name}: ${names.length} recordings`);
  await downloads.all(names);

  // loops kept in the files themselves (a WAV's smpl chunk), for the instruments that play them
  const { readFileSync } = await import('node:fs');
  for (const inst of spec.instruments)
    if (inst.fileLoops)
      for (const s of inst.samples)
        if (!s.loop && !s.trigger) s.loop = wavLoop(new Uint8Array(readFileSync(downloads.path(inputsOf(s)[0][0])))) ?? undefined;

  // every recording measured once (its samples let go after)
  const measured = new Map();
  for (const inst of spec.instruments) {
    const tail = inst.tail ?? {};
    for (const s of inst.samples) {
      const key = `${JSON.stringify(inputsOf(s))}|${s.offset ?? 0}|${s.end ?? ''}|${inst.trim ? 1 : 0}`;
      if (!measured.has(key)) {
        const m = measure(downloads, s, inst);
        const looped = !!s.loop;
        m.tail = s.trigger || looped ? { end: m.frames - m.start, fade: 0 } : tailOf(m, tail);
        if (s.trigger && !looped) {
          // release samples: short; kept down to -80 dB
          const ch = m.decoded.channels.map((c) => c.subarray(m.start, m.frames));
          const end = Math.min(
            ch[0].length,
            tailEnd(ch, m.rate, tail.releaseFloor ?? -80, Math.round(0.1 * m.rate)) + Math.round(0.05 * m.rate),
          );
          m.tail = { end, fade: Math.min(Math.round(0.05 * m.rate), Math.round(end * 0.4)) };
        }
        m.decoded = null;
        measured.set(key, m);
      }
      s.m = measured.get(key);
    }
    if (measured.size % 50 === 0) console.log(`  measured ${measured.size}`);
  }

  // levels: each instrument's layers spread over velocity, its top at `level`
  const files = {};
  const instruments = [];
  const offsets = new Map();
  const memory = [];
  for (const inst of spec.instruments) {
    const struck = inst.samples.filter((s) => !s.trigger);
    const layers = [...new Set(struck.map((s) => s.layer ?? 1))].sort((a, b) => a - b);
    // a layer's level: its notes' loudness as they play (with any gain a note has of its own)
    const levels = layers.map((L) => {
      const of = struck.filter((s) => (s.layer ?? 1) === L);
      return of.reduce((a, s) => a + s.m.level + (s.gain ?? 0), 0) / of.length;
    });
    // a library whose notes were each brought to one level (its dynamics left to the sampler) keeps
    // its own velocity splits: each layer plays at the level the velocity curve has there
    const fixed = inst.layers === 'fixed';
    if (!fixed && levels.some((l, i) => i > 0 && l < levels[i - 1] - 1.5))
      console.log(`  ${inst.name}: its layers aren't louder as they go (${levels.map((l) => l.toFixed(1)).join(' ')}): layers: 'fixed'?`);
    const need = fixed ? 28 : spreadLayers(levels).need;
    const range = inst.range ?? round(Math.min(40, Math.max(layers.length > 1 ? 20 : 16, need)), 10);
    const natural = fixed ? Math.max(...levels) : spreadLayers(levels, { range }).ref;
    let target = inst.level ?? spec.level ?? -17;
    if (inst.levelAs) {
      const o = offsets.get(inst.levelAs);
      if (o === undefined) throw new Error(`${inst.name}: levelAs ${inst.levelAs}, which isn't built yet`);
      target = natural + o;
    }
    /** Each layer's velocities and gain for a top level t. */
    const spreadAt = (t) => {
      if (!fixed) return spreadLayers(levels, { range, target: t });
      return {
        layers: layers.map((L, i) => {
          const of = struck.filter((s) => (s.layer ?? 1) === L);
          const lovel = Math.min(...of.map((s) => s.lovel ?? 1));
          const hivel = Math.max(...of.map((s) => s.hivel ?? 127));
          return { lovel, hivel, gain: t - levels[i], unreachable: false };
        }),
      };
    };
    // headroom: no note over `peak` at velocity 127
    const peakAt = (t) => {
      const sp = spreadAt(t);
      let p = Number.NEGATIVE_INFINITY;
      for (const s of struck) {
        const v = sp.layers[layers.indexOf(s.layer ?? 1)];
        if (v.hivel === 127 && !v.unreachable) p = Math.max(p, s.m.peak + v.gain + (s.gain ?? 0));
      }
      return p;
    };
    if (!inst.levelAs) target += Math.min(0, (inst.peak ?? spec.peak ?? -3) - peakAt(target));
    const spread = spreadAt(target);
    const offset = target - natural;
    offsets.set(inst.name, offset);

    // the samples' measured pitches against their roots: an octave off is a mapping to fix
    if (inst.pitched !== false && inst.checkPitch !== false) {
      const off = struck
        .filter((s) => s.m.pitch !== null && Number.isFinite(s.m.pitch))
        .map((s) => s.m.pitch - s.root)
        .map((d) => Math.round(d));
      const counts = new Map();
      for (const d of off) counts.set(d, (counts.get(d) ?? 0) + 1);
      const [common, n] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] ?? [0, 0];
      if (common !== 0 && n > off.length / 2)
        throw new Error(`${inst.name}: most samples sound ${common} semitones from their roots (${n} of ${off.length}): shift its keys`);
    }
    const zones = [];
    for (const s of inst.samples) {
      const m = s.m;
      const ext = {};
      for (const k of ['trigger', 'decay', 'part', 'release', 'group', 'offBy']) if (s[k] !== undefined) ext[k] = s[k];
      let lovel = s.lovel ?? 1;
      let hivel = s.hivel ?? 127;
      let gain = offset + (s.gain ?? 0);
      if (!s.trigger) {
        const v = spread.layers[layers.indexOf(s.layer ?? 1)];
        if (v.unreachable) continue;
        lovel = v.lovel;
        hivel = v.hivel;
        gain = v.gain + (s.gain ?? 0);
      }
      const { end, fade } = m.tail;
      let file;
      let start = m.start;
      let zoneEnd = m.start + end;
      let fadeOut = fade;
      if (mode === 'git') {
        if (s.inputs) throw new Error(`${inst.name}: a library's own files can't mix microphones (mode 'mix' can)`);
        file = s.download.slice(s.download.indexOf(':') + 1);
      } else {
        const folder = inst.folder ?? inst.name;
        const named = s.file ?? s.download ?? inputsOf(s)[0][0];
        const stem = basename(named.slice(named.indexOf(':') + 1), extname(named));
        // `out`: the file's own path (a kit piece's folder names it on its pad)
        file = s.out ?? `${folder}/${stem}.wav`;
        const recipe = {
          in: inputsOf(s),
          start: m.start,
          frames: end,
          fadeIn: m.start > 0 ? Math.min(32, m.at - m.start) : 0,
          fadeOut: fade,
          ...(m.mono ? { mono: true } : {}),
        };
        const had = files[file];
        if (had && JSON.stringify(had) !== JSON.stringify(recipe)) throw new Error(`${file} is made two ways`);
        files[file] = recipe;
        start = 0;
        zoneEnd = end;
        fadeOut = 0;
      }
      const loop = s.loop ? [s.loop[0] - (mode === 'git' ? 0 : m.start), s.loop[1] - (mode === 'git' ? 0 : m.start)] : [0, 0];
      zones.push({
        file,
        root: s.root,
        lo: s.lo,
        hi: s.hi,
        lovel,
        hivel,
        gain: round(gain),
        start,
        end: zoneEnd,
        loopStart: loop[0],
        loopEnd: loop[1],
        rate: m.rate,
        rr: s.rr ?? 0,
        ...(fadeOut ? { fadeOut } : {}),
        ...ext,
      });
    }
    zones.sort((a, b) => !!a.trigger - !!b.trigger || a.lo - b.lo || a.lovel - b.lovel || a.rr - b.rr);
    const instrument = {
      name: inst.name,
      title: inst.title,
      category: inst.category,
      pitched: inst.pitched ?? true,
      release: 0.3,
      attack: 0,
      oneShot: false,
      velocityRange: range,
      ...(inst.playing ?? {}),
      zones,
    };
    if (inst.pads) instrument.pads = inst.pads;
    instruments.push(instrument);
    const mb = memoryMb(zones.filter((z, i, a) => a.findIndex((x) => x.file === z.file) === i));
    memory.push(`  ${inst.title}: ${layers.length} layer(s) ${levels.map((l) => l.toFixed(1)).join(' ')} dB, range ${range} dB, top at ${target.toFixed(1)} dB, ${mb.toFixed(0)} MB decoded`);
  }

  const pack = {
    format: 'holo-pack',
    version: 1,
    id: spec.id,
    name: spec.name,
    license: spec.license,
    credit: spec.credit,
    source: null,
    root: 'samples',
    instruments,
    ...(spec.extra ?? {}),
  };
  if (mode === 'git') {
    pack.source = { kind: 'git', url: spec.git.url, branch: spec.git.branch, commit: spec.git.commit };
    const sums = {};
    let bytes = 0;
    for (const inst of instruments)
      for (const z of inst.zones) {
        const name = spec.instruments
          .find((i) => i.name === inst.name)
          .samples.find((s) => s.download?.slice(s.download.indexOf(':') + 1) === z.file).download;
        if (sums[z.file]) continue;
        sums[z.file] = downloads.sums[name];
        bytes += (await import('node:fs')).statSync(downloads.path(name)).size;
      }
    const { writeFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const { formatChecksums, root } = await checksumTools();
    writeFileSync(join(root, 'packs', spec.id, 'files.sha256'), formatChecksums(sums));
    pack.bytes = bytes;
  } else {
    // as many bits as the recordings have (16 or 24)
    let bits = spec.bits;
    if (!bits) {
      const { readFileSync } = await import('node:fs');
      bits = 16;
      for (const r of Object.values(files))
        for (const [n] of r.in) if (bitsOf(new Uint8Array(readFileSync(downloads.path(n)))) > 16) bits = 24;
    }
    const source = { kind: 'mix', note: spec.note, bases: spec.downloads.bases, downloads: {}, bits, files };
    if (Object.keys(downloads.archives ?? {}).length) source.archives = pinArchives(source, downloads);
    source.downloads = pinDownloads(source, downloads);
    if (source.archives && !Object.keys(source.archives).length) delete source.archives;
    pack.source = source;
    if (spec.note === undefined) delete source.note;
    await makeFiles(pack, downloads, spec.out ?? null);
  }
  if (mode === 'git' && spec.note) pack.source.note = spec.note;
  console.log(memory.join('\n'));
  console.log(writeManifest(pack));
  return pack;
}

async function checksumTools() {
  const { holo } = await import('./holo.mjs');
  const { formatChecksums } = await holo('packages/music/src/packs.ts');
  const { root } = await import('./lib.mjs');
  return { formatChecksums, root };
}

/** Keys from a note name ("C4", "F#2", "Db5"; middle C is C4). */
export function noteKey(name) {
  const m = /^([A-Ga-g])([#b]?)(-?\d+)$/.exec(name.trim());
  if (!m) throw new Error(`Not a note: ${name}`);
  const pc = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }[m[1].toLowerCase()];
  return (Number(m[3]) + 1) * 12 + pc + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
}

/**
 * Key ranges for sampled notes: each sample covers the keys from halfway to the one below to halfway
 * to the one above (the lowest down to `bottom`, the highest up to `top`). `roots` are sorted keys.
 */
export function keyRanges(roots, bottom = 0, top = 127) {
  return roots.map((r, i) => {
    const lo = i === 0 ? Math.min(bottom, r) : Math.floor((roots[i - 1] + r) / 2) + 1;
    const hi = i === roots.length - 1 ? Math.max(top, r) : Math.floor((r + roots[i + 1]) / 2);
    return [lo, hi];
  });
}

/** A path joined to a folder, its \`..\` and \`.\` resolved. */
export function joinPath(dir, rel) {
  const out = dir ? dir.split('/') : [];
  for (const part of rel.replace(/\\/g, '/').split('/')) {
    if (part === '..') out.pop();
    else if (part && part !== '.') out.push(part);
  }
  return out.join('/');
}

const keyOf = (v) => (v === undefined ? undefined : /^-?\d+$/.test(v.trim()) ? Number(v) : noteKey(v));

/**
 * An SFZ program's regions (tools/sfz.mjs readSfz) as samples for buildInstruments: each region's
 * file (a download "<tag>:<path in the library>", the program at `dir`), its keys, root (its key
 * centre, less its tune and transpose), velocities (its velocity layer, by its lowest velocity), round
 * robin, trigger, gain (its volume), loop, offset and end. `keep(region)` leaves regions out.
 */
export function sfzSamples({ regions, control }, { tag, dir = '', keep = () => true, shift = 0 }) {
  const out = [];
  // round robins taken at random (lorand): each range its own turn
  const rands = [...new Set(regions.filter((r) => r.lorand !== undefined).map((r) => Number(r.lorand)))].sort((a, b) => a - b);
  for (const r of regions) {
    if (!r.sample || !keep(r)) continue;
    const path = joinPath(dir, `${control.default_path ?? ''}${r.sample}`);
    // `shift`: keys moved by that many semitones (a library mapped an octave off its true pitch)
    const key = keyOf(r.key);
    const lo = Math.max(0, (keyOf(r.lokey) ?? key ?? 0) + shift);
    const hi = Math.min(127, (keyOf(r.hikey) ?? key ?? 127) + shift);
    const centre = (keyOf(r.pitch_keycenter) ?? key ?? keyOf(r.lokey) ?? 0) + shift;
    const looped = ['loop_continuous', 'loop_sustain'].includes(r.loop_mode ?? r.loopmode);
    const trigger = r.trigger === 'release' || r.trigger === 'release_key' ? 'release' : undefined;
    const sample = {
      download: `${tag}:${path}`,
      root: round(centre - Number(r.tune ?? 0) / 100 - Number(r.transpose ?? 0), 1000),
      lo,
      hi,
      layer: Number(r.lovel ?? 1),
      lovel: Number(r.lovel ?? 1),
      hivel: Number(r.hivel ?? 127),
      rr: r.seq_position !== undefined ? Number(r.seq_position) : r.lorand !== undefined ? rands.indexOf(Number(r.lorand)) + 1 : 0,
      gain: Number(r.volume ?? 0),
      region: r,
    };
    if (trigger) sample.trigger = trigger;
    if (trigger && r.rt_decay !== undefined) sample.decay = Number(r.rt_decay);
    if (r.offset) sample.offset = Number(r.offset);
    if (r.end) sample.end = Number(r.end) + 1;
    if (looped && r.loop_end !== undefined) sample.loop = [Number(r.loop_start ?? 0), Number(r.loop_end) + 1];
    // a sound that doesn't follow the key (a key's noise): each key plays it as it is
    if (r.pitch_keytrack !== undefined && Number(r.pitch_keytrack) === 0 && lo !== hi) {
      for (let k = lo; k <= hi; k++) out.push({ ...sample, root: k, lo: k, hi: k });
    } else out.push(sample);
  }
  return out;
}

/** A GitHub library at a commit: where its files are, and its text files read (cached). */
export function library(repo, commit) {
  const base = `https://raw.githubusercontent.com/${repo}/${commit}/`;
  const texts = new Map();
  const read = async (path) => {
    if (!texts.has(path)) {
      const res = await fetch(`${base}${path.split('/').map(encodeURIComponent).join('/')}`);
      if (!res.ok) throw new Error(`${repo} ${path}: ${res.status}`);
      texts.set(path, await res.text());
    }
    return texts.get(path);
  };
  return { repo, commit, base, read, url: `https://github.com/${repo}.git` };
}

/**
 * An SFZ program's samples (its regions that `keep` keeps), as downloads under `tag`. Its samples are
 * found from its own folder, or `base` (a map included by a program in another folder finds them from
 * that program's).
 */
export async function programSamples(lib, path, { tag, keep, base, shift } = {}) {
  const { readSfz } = await import('./sfz.mjs');
  const dir = base ?? (path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '');
  return sfzSamples(await readSfz(path, lib.read), { tag, dir, keep, shift });
}

/**
 * A set of hand percussion on pads (a tabla's strokes, a gamelan's gongs): each piece on its own key
 * from `first`, rows of four, its recordings made into `<folder>/<piece>/` so its pad's name is its
 * piece's. `pieces`: [piece, title, takes], each take { download, layer, rr }.
 */
export function padSet(folder, pieces, first = 36) {
  const samples = [];
  const pads = [];
  pieces.forEach(([piece, title, takes], i) => {
    const key = first + i;
    pads.push({ key, name: title });
    takes.forEach((t, n) => {
      const stem = t.download.slice(t.download.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '');
      samples.push({ ...t, out: `${folder}/${piece}/${stem}.wav`, root: key, lo: key, hi: key, layer: t.layer ?? 1, rr: t.rr ?? n + 1 });
    });
  });
  return { samples, pads };
}

/** One sound on every key (played as recorded at middle C): its takes as layers and round robins. */
export function oneSound(takes) {
  return takes.map((t, n) => ({ ...t, root: 60, lo: 0, hi: 127, layer: t.layer ?? 1, rr: t.rr ?? n + 1 }));
}
