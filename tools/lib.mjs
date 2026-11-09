// What the pack recipes share (`node packs/<id>/recipe.mjs`): fetching a library's recordings (kept in
// a cache folder between runs), measuring them (where a hit starts, how loud it is, where its tail
// falls away), spreading velocity layers over the keyboard's velocities by how loud they really are,
// and writing the pack: its map (packs/<id>/pack.json), with a `mix` recipe saying how each file is
// made from the downloads, and every made file's checksum (packs/<id>/files.sha256), made with the
// same code HO[LO] Desk's `pnpm packs install` makes them with.
import { createHash } from 'node:crypto';
import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { holo, repo } from './holo.mjs';
import { refusePrivate } from './private.mjs';

const { decodeInput, mixArchive, mixExtension, mixFile, mixUrl } = await holo('packages/music/src/mix.ts');
const { archiveExtension, archiveFormat, archiveNames, unpack } = await holo('packages/music/src/archives.ts');
const { formatChecksums } = await holo('packages/music/src/packs.ts');

export const root = repo;
export const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

/** `--name value` from the command line. */
export function arg(name, fallback) {
  const args = process.argv.slice(2);
  const at = args.indexOf(`--${name}`);
  return at >= 0 ? args[at + 1] : fallback;
}

// ---- downloads ----

/** A download written to a file as it comes (an archive may be gigabytes), a few tries. */
async function fetchToFile(url, file) {
  mkdirSync(dirname(file), { recursive: true });
  for (let i = 0; ; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(3_600_000) });
      if (!res.ok || !res.body) throw new Error(`${url}: ${res.status}`);
      await pipeline(Readable.fromWeb(res.body), createWriteStream(`${file}.part`));
      renameSync(`${file}.part`, file);
      return;
    } catch (err) {
      if (i === 3) throw err;
      await new Promise((ok) => setTimeout(ok, 2000 * 2 ** i));
    }
  }
}

/** A file's sha256, read as a stream. */
async function fileSha256(file) {
  const h = createHash('sha256');
  for await (const chunk of createReadStream(file)) h.update(chunk);
  return h.digest('hex');
}

/**
 * The downloads a pack is made from, kept in a folder (by base name and path) so a second run needs
 * no network. Each is fetched from its base's address and checksummed. A download may instead be a
 * file in an archive (`archives`: { name: { url, format? } }): the archive is fetched once, its
 * sha256 kept, and the files wanted taken out of it (`unpacked`).
 */
export class Downloads {
  constructor(dir, bases, archives = {}) {
    this.dir = dir;
    this.bases = bases;
    this.archives = archives;
    this.archiveSums = {};
    this.sums = {};
  }

  path(name) {
    const at = name.indexOf(':');
    return join(this.dir, name.slice(0, at), name.slice(at + 1));
  }

  /** An archive's file on disk (fetched the first time), and its format. */
  async archive(name) {
    const a = this.archives[name];
    if (!a) throw new Error(`No archive "${name}"`);
    const format = archiveFormat(a.url, a.format);
    const file = join(this.dir, '.archives', `${name}${archiveExtension(format)}`);
    if (!existsSync(file)) {
      console.log(`  fetching ${a.url}…`);
      await fetchToFile(a.url, file);
    }
    if (!this.archiveSums[name]) this.archiveSums[name] = await fileSha256(file);
    return { file, format };
  }

  /** Every file's name in an archive. */
  async listArchive(name) {
    const { file, format } = await this.archive(name);
    return archiveNames(file, format);
  }

  /** Take the files wanted out of their archives (those not out already), into this folder. */
  async unpacked(names) {
    const byArchive = new Map();
    for (const n of names) {
      const where = mixArchive({ archives: this.archives }, n);
      if (!where || existsSync(this.path(n))) continue;
      if (!byArchive.has(where[0])) byArchive.set(where[0], new Map());
      byArchive.get(where[0]).set(where[1], n);
    }
    for (const [archive, entries] of byArchive) {
      const { file, format } = await this.archive(archive);
      console.log(`  unpacking ${entries.size} file(s) from ${archive}…`);
      await unpack(file, format, new Set(entries.keys()), (entry, data) => {
        const out = this.path(entries.get(entry));
        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, data);
      });
    }
  }

  async get(name) {
    const file = this.path(name);
    let bytes;
    if (!existsSync(file) && mixArchive({ archives: this.archives }, name)) await this.unpacked([name]);
    if (existsSync(file)) bytes = new Uint8Array(readFileSync(file));
    else {
      const url = mixUrl({ bases: this.bases }, name);
      for (let i = 0; i < 4; i++) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(300_000) });
          if (!res.ok) throw new Error(`${url}: ${res.status}`);
          bytes = new Uint8Array(await res.arrayBuffer());
          break;
        } catch (err) {
          if (i === 3) throw err;
          await new Promise((ok) => setTimeout(ok, 2000 * 2 ** i));
        }
      }
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, bytes);
    }
    this.sums[name] = sha256(bytes);
    return bytes;
  }

  /** Fetch many, a few at a time. */
  async all(names, parallel = 8) {
    await this.unpacked(names);
    let next = 0;
    let done = 0;
    await Promise.all(
      Array.from({ length: parallel }, async () => {
        while (next < names.length) {
          const n = names[next++];
          await this.get(n);
          if (++done % 100 === 0) console.log(`  downloads: ${done}/${names.length}`);
        }
      }),
    );
  }

  decoded(name) {
    return decodeInput(new Uint8Array(readFileSync(this.path(name))));
  }
}

// ---- measuring ----

/** RBJ biquad coefficients, normalised. */
function biquad(type, f0, rate, q, db = 0) {
  const w0 = (2 * Math.PI * f0) / rate;
  const cos = Math.cos(w0);
  const alpha = Math.sin(w0) / (2 * q);
  let b0;
  let b1;
  let b2;
  let a0;
  let a1;
  let a2;
  if (type === 'highshelf') {
    const A = 10 ** (db / 40);
    const s = 2 * Math.sqrt(A) * alpha;
    b0 = A * (A + 1 + (A - 1) * cos + s);
    b1 = -2 * A * (A - 1 + (A + 1) * cos);
    b2 = A * (A + 1 + (A - 1) * cos - s);
    a0 = A + 1 - (A - 1) * cos + s;
    a1 = 2 * (A - 1 - (A + 1) * cos);
    a2 = A + 1 - (A - 1) * cos - s;
  } else {
    b0 = (1 + cos) / 2;
    b1 = -(1 + cos);
    b2 = (1 + cos) / 2;
    a0 = 1 + alpha;
    a1 = -2 * cos;
    a2 = 1 - alpha;
  }
  return [b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0];
}

function filter(x, [b0, b1, b2, a1, a2], from, to) {
  const out = new Float64Array(to - from);
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  for (let i = from; i < to; i++) {
    const v = x[i];
    const y = b0 * v + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    x2 = x1;
    x1 = v;
    y2 = y1;
    y1 = y;
    out[i - from] = y;
  }
  return out;
}

/**
 * Loudness (as BS.1770 weighs it: a high shelf and a low cut) of `seconds` from `from`, in dB: how
 * loud a hit or a note is heard, which is what its velocity should follow.
 */
export function loudness(channels, rate, from = 0, seconds = 0.4) {
  const to = Math.min(channels[0].length, from + Math.round(seconds * rate));
  if (to <= from) return -120;
  const shelf = biquad('highshelf', 1681, rate, Math.SQRT1_2, 4);
  const cut = biquad('highpass', 38, rate, 0.5);
  let sum = 0;
  for (const ch of channels) {
    const k = filter(filter(ch, shelf, from, to), cut, 0, to - from);
    let s = 0;
    for (let i = 0; i < k.length; i++) s += k[i] * k[i];
    sum += s / k.length;
  }
  return -0.691 + 10 * Math.log10(sum + 1e-20);
}

/** The loudest sample's level, in dB of full scale. */
export function peakDb(channels) {
  let p = 0;
  for (const ch of channels) for (let i = 0; i < ch.length; i++) p = Math.max(p, Math.abs(ch[i]));
  return 20 * Math.log10(p + 1e-12);
}

/** Each block's level (the louder channel's RMS), in dB. */
export function envelope(channels, rate, block = 0.05) {
  const n = Math.max(1, Math.round(block * rate));
  const count = Math.ceil(channels[0].length / n);
  const out = new Float64Array(count);
  for (let b = 0; b < count; b++) {
    let best = 0;
    for (const ch of channels) {
      let s = 0;
      const end = Math.min(ch.length, (b + 1) * n);
      for (let i = b * n; i < end; i++) s += ch[i] * ch[i];
      best = Math.max(best, s / (end - b * n));
    }
    out[b] = 10 * Math.log10(best + 1e-20);
  }
  return { db: out, frames: n };
}

/** The frame a hit starts on: where any channel first reaches `below` dB under the peak. */
export function onset(channels, below = 36) {
  let peak = 0;
  for (const ch of channels) for (let i = 0; i < ch.length; i++) peak = Math.max(peak, Math.abs(ch[i]));
  const t = peak * 10 ** (-below / 20);
  let first = channels[0].length;
  for (const ch of channels) {
    for (let i = 0; i < Math.min(first, ch.length); i++) {
      if (Math.abs(ch[i]) >= t) {
        first = i;
        break;
      }
    }
  }
  return first;
}

/** The frame after the last block louder than `db` (dB of full scale), at least `min` frames. */
export function tailEnd(channels, rate, db, min = 0) {
  const env = envelope(channels, rate);
  let last = -1;
  for (let b = env.db.length - 1; b >= 0; b--) {
    if (env.db[b] > db) {
      last = b;
      break;
    }
  }
  return Math.min(channels[0].length, Math.max(min, (last + 1) * env.frames));
}

/** How fast a sound falls away (dB a second) between `from` and `to` seconds (a line through its envelope). */
export function decayRate(channels, rate, from = 0.3, to = 2.5) {
  const env = envelope(channels, rate, 0.1);
  const xs = [];
  const ys = [];
  for (let b = 0; b < env.db.length; b++) {
    const t = (b * env.frames) / rate;
    if (t >= from && t <= to && env.db[b] > -90) {
      xs.push(t);
      ys.push(env.db[b]);
    }
  }
  if (xs.length < 3) return 0;
  const mx = xs.reduce((a, b) => a + b) / xs.length;
  const my = ys.reduce((a, b) => a + b) / ys.length;
  let num = 0;
  let den = 0;
  for (let i = 0; i < xs.length; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  return -num / den;
}

/** A signal mixed from inputs, as mixFile mixes them (in floating point, before it's written). */
export function mixSignal(inputs, decoded, start = 0, frames = Number.POSITIVE_INFINITY) {
  let len = 0;
  for (const [name] of inputs) len = Math.max(len, decoded.get(name).channels[0].length - start);
  len = Math.max(0, Math.min(len, frames));
  const l = new Float64Array(len);
  const r = new Float64Array(len);
  for (const [name, gl, gr, at] of inputs) {
    const d = decoded.get(name);
    // one channel of a multichannel recording (one microphone of it) taken alone, as mixFile takes it
    const a = d.channels[at?.channel ?? 0];
    if (!a) throw new Error(`${name} has no channel ${at.channel}`);
    const b = at?.channel === undefined ? (d.channels[1] ?? a) : a;
    const end = Math.min(len, a.length - start);
    for (let i = 0; i < end; i++) {
      l[i] += a[start + i] * gl;
      r[i] += b[start + i] * gr;
    }
  }
  return [l, r];
}

// ---- velocity ----

/**
 * Velocity layers spread over velocities 1 to 127 by how loud they are: `levels` are each layer's
 * loudness (dB, soft to loud). The sampler plays every layer at one level and turns it down by
 * velocity along a straight line of `range` dB, so each layer goes where that line meets its own
 * loudness, and the level never jumps from one layer to the next (only the timbre changes). Returns
 * each layer's velocities and the gain (dB) that brings it to `target`, its loudness at velocity 127.
 *
 * `range` is the whole instrument's (one velocity curve for every key or drum); left out, it's the
 * one these layers need.
 */
export function spreadLayers(levels, { range, target } = {}) {
  const k = levels.length;
  const order = levels.map((l, i) => [l, i]).sort((a, b) => a[0] - b[0]);
  const sorted = order.map(([l]) => l);
  const top = sorted[k - 1];
  const w = 126 / k;
  const need = k > 1 ? ((top - sorted[0]) / (126 - w)) * 126 : 12;
  const R = range ?? need;
  // the level at velocity 127: half a layer's worth above the loudest layer
  const ref = top + (R * (w / 2)) / 126;
  const centre = sorted.map((l) => 127 + (126 * (l - ref)) / R);
  // the layers that get velocities of their own: one quieter than velocity 1 reaches, or squeezed to
  // nothing between its neighbours, folds away (the quietest left plays from velocity 1)
  let kept = sorted.map((_, j) => j);
  for (;;) {
    const bounds = kept.slice(0, -1).map((j, n) => {
      const b = Math.round((centre[j] + centre[kept[n + 1]]) / 2);
      return Math.max(1, Math.min(126, b));
    });
    const empty = kept.findIndex((_, n) => {
      const lo = n === 0 ? 1 : bounds[n - 1] + 1;
      const hi = n === kept.length - 1 ? 127 : bounds[n];
      return hi < lo;
    });
    if (empty < 0) {
      const out = new Array(k);
      sorted.forEach((l, j) => {
        out[order[j][1]] = { lovel: 1, hivel: 0, gain: (target ?? ref) - l, level: l, unreachable: true };
      });
      kept.forEach((j, n) => {
        const o = out[order[j][1]];
        o.lovel = n === 0 ? 1 : bounds[n - 1] + 1;
        o.hivel = n === kept.length - 1 ? 127 : bounds[n];
        o.unreachable = false;
      });
      return { layers: out, range: R, need, ref };
    }
    // a squeezed layer goes; at the bottom, the quietest goes (the next takes velocity 1)
    kept = kept.filter((_, n) => n !== empty);
  }
}

/** The range a set of instruments' layers need together (the widest), in dB. */
export function widestRange(levelSets) {
  return Math.max(...levelSets.map((l) => spreadLayers(l).need));
}

// ---- writing the pack ----

/** The pack's map, written as the others are (one space indent, its size after its credit). */
export function writeManifest(pack) {
  refusePrivate(pack, 'writing the map of');
  const file = join(root, 'packs', pack.id, 'pack.json');
  mkdirSync(dirname(file), { recursive: true });
  const { format, version, id, name, license, credit, bytes, ...rest } = pack;
  const ordered = { format, version, id, name, license, credit, ...(bytes ? { bytes } : {}), ...rest };
  writeFileSync(file, `${JSON.stringify(ordered, null, 1)}\n`);
  return file;
}

/**
 * Make every file the pack's recipe names from the downloads (as an install makes them), write them
 * under `out` (a ready-made copy of the pack's samples, for `pnpm packs install ID --from out`), and
 * write their checksums.
 */
export async function makeFiles(pack, downloads, out) {
  refusePrivate(pack, 'making the files of');
  const source = pack.source;
  const sums = {};
  const paths = Object.keys(source.files).sort();
  let done = 0;
  let total = 0;
  const cache = new Map();
  for (const path of paths) {
    const recipe = source.files[path];
    const inputs = new Map();
    for (const [name] of recipe.in) {
      if (!cache.has(name)) cache.set(name, downloads.decoded(name));
      inputs.set(name, cache.get(name));
    }
    const bytes = mixFile(recipe, inputs, source.bits);
    sums[path] = sha256(bytes);
    total += bytes.length;
    if (out) {
      const file = join(out, path);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, bytes);
    }
    // inputs are used by one file or a few neighbours: keep the cache small
    if (cache.size > 64) cache.clear();
    if (++done % 100 === 0) console.log(`  made ${done}/${paths.length}`);
  }
  writeFileSync(join(root, 'packs', pack.id, 'files.sha256'), formatChecksums(sums));
  // its samples' size on disk: what an install takes, shown before it
  pack.bytes = total;
  return sums;
}

/** The archives a recipe's downloads come out of, pinned by their checksums, for its source. */
export function pinArchives(source, downloads) {
  const used = new Set();
  for (const r of Object.values(source.files))
    for (const [name] of r.in) {
      const where = mixArchive({ archives: downloads.archives }, name);
      if (where) used.add(where[0]);
    }
  const out = {};
  for (const name of [...used].sort()) {
    const sum = downloads.archiveSums[name];
    if (!sum) throw new Error(`The archive ${name} wasn't fetched`);
    const { url, format } = downloads.archives[name];
    out[name] = { url, sha256: sum, ...(format ? { format } : {}) };
  }
  return out;
}

/** The downloads a recipe uses, with their checksums, for its source. */
export function pinDownloads(source, downloads) {
  const used = new Set();
  for (const r of Object.values(source.files)) for (const [name] of r.in) used.add(name);
  const out = {};
  for (const name of [...used].sort()) {
    const sum = downloads.sums[name];
    if (!sum) throw new Error(`${name} wasn't fetched`);
    out[name] = sum;
  }
  return out;
}

/**
 * Decoded size in megabytes of an instrument's samples at 48 kHz float (what a device holds): stereo,
 * but for the files `mono` names (a set of paths), at half that.
 */
export function memoryMb(zones, rates, mono) {
  let frames = 0;
  let monoFrames = 0;
  for (const z of zones) {
    const f = ((z.end - z.start) * 48000) / (rates?.[z.file] ?? z.rate);
    if (mono?.has(z.file)) monoFrames += f;
    else frames += f;
  }
  return (frames * 8 + monoFrames * 4) / 1048576;
}

export { mixExtension };
