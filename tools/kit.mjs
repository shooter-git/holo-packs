// A drum kit pack from multi-microphone recordings (packs/rock-kit, prog-kit and jazz-kit's `recipe.mjs`).
//
// Each hit was recorded on several microphones at once (a close one on the drum, the overheads, a
// room pair). A kit is mixed the way an engineer mixes a session: every microphone at its fader level
// and pan, the same for every hit, so the kit sounds as one instrument in one room. The mix of each hit
// is written as one stereo file, trimmed to just before its attack (a pad sounds the instant it's hit)
// and to where its tail falls away.
//
// Velocity: each piece's layers are measured (their loudness as BS.1770 weighs it) and set where the
// kit's one velocity curve meets them, so every drum gets louder smoothly as it's hit harder, changes
// its timbre at each layer, and answers velocity the same way as every other drum. Round robins take
// turns; the hi-hat chokes itself; a drum struck again past three times lets its oldest ring go.
import { join } from 'node:path';
import {
  arg,
  Downloads,
  envelope,
  loudness,
  makeFiles,
  memoryMb,
  mixSignal,
  onset,
  peakDb,
  pinDownloads,
  spreadLayers,
  writeManifest,
} from './lib.mjs';

/** A GitHub repository's files at a commit (cached beside the downloads). */
export async function githubTree(repo, commit, downloads) {
  const name = `tree-${repo.replace('/', '-')}-${commit}.json`;
  const { existsSync, mkdirSync, readFileSync, writeFileSync } = await import('node:fs');
  const file = join(downloads.dir, name);
  if (!existsSync(file)) {
    const res = await fetch(`https://api.github.com/repos/${repo}/git/trees/${commit}?recursive=1`, {
      headers: { accept: 'application/vnd.github+json', 'user-agent': 'holo-desk-packs' },
    });
    if (!res.ok) throw new Error(`${repo}@${commit}: ${res.status}`);
    mkdirSync(downloads.dir, { recursive: true });
    writeFileSync(file, await res.text());
  }
  const tree = JSON.parse(readFileSync(file, 'utf8'));
  if (tree.truncated) throw new Error(`${repo}: the tree is truncated`);
  return tree.tree.filter((t) => t.type === 'blob').map((t) => t.path);
}

export const raw = (repo, commit) => `https://raw.githubusercontent.com/${repo}/${commit}/`;

/** What a piece is called on its pad in the studio. */
const TITLES = {
  kick: 'Kick',
  snare: 'Snare',
  'snare-edge': 'Snare edge',
  rimshot: 'Rimshot',
  sidestick: 'Side stick',
  'cross-stick': 'Cross-stick',
  buzz: 'Snare buzz',
  'rack-tom': 'Rack tom',
  'floor-tom': 'Floor tom',
  'hat-closed': 'Hi-hat closed',
  'hat-pedal': 'Hi-hat pedal',
  'hat-open': 'Hi-hat open',
  'hat-half': 'Hi-hat half open',
  'hat-three-quarter': 'Hi-hat ¾ open',
  'hat-loose': 'Hi-hat loose',
  crash: 'Crash',
  'crash-sizzle': 'Sizzle crash',
  china: 'China',
  stack: 'Stack',
  ride: 'Ride',
  'ride-bell': 'Ride bell',
  'ride-edge': 'Ride edge',
  'ride-sizzle': 'Sizzle ride',
  'flat-ride': 'Flat ride',
  'flat-ride-crash': 'Flat ride crash',
  gong: 'Gong',
};

/** A piece's name on its pad: its own `title`, else its kind's (a tom by its size). */
export function pieceTitle(piece) {
  if (piece.title) return piece.title;
  if (TITLES[piece.name]) return TITLES[piece.name];
  const tom = /^tom-(\d+)$/.exec(piece.name);
  if (tom) return `Tom ${tom[1]}″`;
  throw new Error(`${piece.name}: give the piece a title for its pad`);
}

/**
 * The kit's pads: `spec.pads` names every piece once, in rows of four (the top row first). Each pad
 * plays its piece's first key, or the piece's `pad`.
 */
export function padsOf(spec) {
  const byName = new Map(spec.pieces.map((p) => [p.name, p]));
  const order = spec.pads ?? spec.pieces.map((p) => p.name);
  const missing = spec.pieces.map((p) => p.name).filter((n) => !order.includes(n));
  const unknown = order.filter((n) => !byName.has(n));
  const twice = order.filter((n, i) => order.indexOf(n) !== i);
  if (missing.length || unknown.length || twice.length)
    throw new Error(
      `${spec.id} pads: ${[
        missing.length ? `no pad for ${missing.join(', ')}` : '',
        unknown.length ? `no piece ${unknown.join(', ')}` : '',
        twice.length ? `twice: ${twice.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('; ')}`,
    );
  return order.map((name) => {
    const piece = byName.get(name);
    const key = piece.pad ?? piece.keys[0];
    if (!piece.keys.includes(key)) throw new Error(`${name}: its pad (${key}) isn't one of its keys`);
    return { key, name: pieceTitle(piece) };
  });
}

/** A mono microphone's gains into left and right at an SFZ pan (0 left, 63.5 centre, 127 right): constant power, unity in the centre. */
export function panGains(gain, pan = 63.5) {
  const p = Math.max(-1, Math.min(1, (pan - 63.5) / 63.5));
  const theta = ((p + 1) * Math.PI) / 4;
  return [gain * Math.cos(theta) * Math.SQRT2, gain * Math.sin(theta) * Math.SQRT2];
}

/**
 * The hits in a set of folders: `files` lists each microphone's file names by a pattern whose groups
 * are the layer and the round robin. Returns hits as { layer, rr, mics: { mic: download } }.
 */
export function hitsIn(paths, base, folder, mics, pattern) {
  const hits = new Map();
  for (const [mic, sub] of Object.entries(mics)) {
    const dir = `${folder}/${sub}/`;
    for (const p of paths) {
      if (!p.startsWith(dir) || p.slice(dir.length).includes('/')) continue;
      const m = pattern.exec(p.slice(dir.length));
      if (!m) continue;
      const layer = Number(m[1] ?? 1);
      const rr = Number(m[2] ?? 1);
      const key = `${layer}:${rr}`;
      if (!hits.has(key)) hits.set(key, { layer, rr, mics: {} });
      hits.get(key).mics[mic] = `${base}:${p}`;
    }
  }
  const out = [...hits.values()].filter((h) => Object.keys(mics).every((m) => h.mics[m]));
  if (!out.length) throw new Error(`No hits in ${folder} (${Object.values(mics).join(', ')})`);
  return out.sort((a, b) => a.layer - b.layer || a.rr - b.rr);
}

/** Keep `n` of a list, evenly spread (always the first and the last). */
function spreadPick(list, n) {
  if (!n || list.length <= n) return list;
  return Array.from({ length: n }, (_, i) => list[Math.round((i * (list.length - 1)) / (n - 1))]);
}

/** The microphone an input of a piece belongs to: its name, up to a colon ("snare-top:2" is "snare-top"'s). */
const micOf = (input) => input.split(':')[0];

/** A microphone's knob is off at this level (dB) or below. */
export const MIC_OFF = -60;

/**
 * The microphones a multi-microphone kit keeps apart (`spec.mics`), checked against its pieces: each
 * a unique id, a name, and a starting level (dB) and pan that make sense; every input of every piece
 * one of them. Returns each one's linear gain at its starting level (0 when it starts off).
 */
function micLevels(spec) {
  const levels = new Map();
  for (const m of spec.mics) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(m.id ?? ''))
      throw new Error(`mic "${m.id}": an id is lowercase letters, digits and -`);
    if (levels.has(m.id)) throw new Error(`mic "${m.id}" is declared twice`);
    if (!m.name) throw new Error(`mic "${m.id}" has no name`);
    const level = m.level ?? 0;
    if (!Number.isFinite(level) || level > 12)
      throw new Error(`mic "${m.id}": its level ${level} isn't a dB of 12 or less`);
    if (m.pan !== undefined && !(m.pan >= -1 && m.pan <= 1))
      throw new Error(`mic "${m.id}": its pan ${m.pan} isn't -1 to 1`);
    levels.set(m.id, level <= MIC_OFF ? 0 : 10 ** (level / 20));
  }
  for (const piece of spec.pieces)
    for (const input of Object.keys(piece.mics))
      if (!levels.has(micOf(input))) throw new Error(`${piece.name}: "${input}" isn't one of the kit's mics`);
  return levels;
}

/**
 * Build a kit pack. `spec.pieces`: each with a name, the keys it plays on, its hits (hitsIn), its
 * microphones' fader levels and pans ({ mic: [gain, pan] }, a stereo pair's pan left out), and how
 * long its tail may ring. A hit's `gains` ({ mic: factor }), where it has them, scale its microphones'
 * faders for that hit alone (a library that sets each velocity layer's microphones apart). A piece's
 * `heard(layer)` (dB) is for a library whose layers are recorded alike and get their dynamics from
 * velocity: how much quieter each is heard than recorded, so its layers spread by how they're heard.
 *
 * `spec.mics` ([{ id, name, level?, pan? }]) keeps the microphones apart: each hit is still measured,
 * trimmed and levelled as the mix of its microphones (each at its fader and pan, and its knob's starting
 * `level` in dB; a microphone that starts at -60 dB or below is left out), but every microphone of it
 * is written as a file of its own, which the sampler sounds together, each at its knob's level. A
 * piece's `mics` are keyed by those ids, or by "<id>:<anything>" for several recordings summed into
 * one microphone's file (two microphones on a snare's top heard as one).
 */
export async function buildKit(spec) {
  const cache = arg('cache', join(process.env.HOME ?? '.', `.cache/holo-pack-sources/${spec.id}`));
  const out = arg('out', null);
  const downloads = spec.downloads;
  const pieces = spec.pieces;
  const multi = Boolean(spec.mics?.length);
  // checked before anything is fetched: every piece has its pad, every microphone is declared
  const pads = padsOf(spec);
  const knob = multi ? micLevels(spec) : null;
  // fetch every microphone of every hit kept
  for (const piece of pieces) {
    piece.hits = spreadPick(
      [...new Set(piece.hits.map((h) => h.layer))].sort((a, b) => a - b),
      piece.maxLayers,
    ).flatMap((layer) => {
      const rrs = piece.hits.filter((h) => h.layer === layer);
      return spreadPick(rrs, piece.maxRR);
    });
  }
  const names = [...new Set(pieces.flatMap((p) => p.hits.flatMap((h) => Object.values(h.mics))))];
  console.log(`${spec.name}: ${names.length} downloads (cache ${cache})`);
  await downloads.all(names);

  const decodedCache = new Map();
  const decode = (n) => {
    if (!decodedCache.has(n)) decodedCache.set(n, downloads.decoded(n));
    return decodedCache.get(n);
  };
  const rateOf = (n) => decode(n).rate;

  // each piece's inputs: microphones at their gains and pans, summed as recorded (as the libraries'
  // own programs sum them: none turns a microphone over). `mic` picks one microphone's (at its fader,
  // as its own file is written); without it, the mix (and each microphone at its knob's starting level,
  // in a kit that keeps them apart).
  for (const piece of pieces) {
    piece.inputsOf = (hit, scale = 1, mic = null) =>
      Object.entries(piece.mics)
        .filter(([input, [gain]]) => gain > 0 && (mic ? micOf(input) === mic : !knob || knob.get(micOf(input)) > 0))
        .map(([input, [gain, pan]]) => {
          const name = hit.mics[input];
          let g0 = hit.gains?.[input] === undefined ? gain : gain * hit.gains[input];
          if (knob && !mic) g0 *= knob.get(micOf(input));
          const g = decode(name).channels.length === 1 ? panGains(g0, pan) : [g0, g0];
          return [name, g[0] * scale, g[1] * scale];
        });
  }
  /** The microphones a piece's hits are written as (a kit that keeps them apart), in the kit's order. */
  const micsOf = (piece) =>
    spec.mics
      .map((m) => m.id)
      .filter((id) => Object.entries(piece.mics).some(([i, [gain]]) => micOf(i) === id && gain > 0));
  /**
   * How one microphone of a hit is written: mono where every recording in it is mono and sits at one
   * pan (the sampler places it there), else stereo with its pans in it. Returns its recipe's inputs, and
   * the pan (-1 to 1) of a mono one.
   */
  const micFile = (piece, hit, mic, scale) => {
    const parts = Object.entries(piece.mics).filter(([input, [gain]]) => gain > 0 && micOf(input) === mic);
    const pans = new Set(parts.map(([, [, pan]]) => pan ?? 63.5));
    if (parts.every(([input]) => decode(hit.mics[input]).channels.length === 1) && pans.size === 1) {
      const pan = Math.max(-1, Math.min(1, ([...pans][0] - 63.5) / 63.5));
      const inputs = parts.map(([input, [gain]]) => {
        const g = hit.gains?.[input] === undefined ? gain : gain * hit.gains[input];
        return [hit.mics[input], g * scale, g * scale];
      });
      return { inputs, mono: true, pan: Math.round(pan * 1e4) / 1e4 };
    }
    return { inputs: piece.inputsOf(hit, scale, mic), mono: false };
  };
  /** A signal's loudest sample (as a fraction of full scale). */
  const peakOf = (channels) => {
    let p = 0;
    for (const c of channels) for (let i = 0; i < c.length; i++) p = Math.max(p, Math.abs(c[i]));
    return p;
  };

  // the kit's loudest moment sets how loud the files are written (just under full scale)
  let loudestPeak = 0;
  for (const piece of pieces) {
    for (const hit of piece.hits.slice(-Math.min(4, piece.hits.length))) {
      const inputs = piece.inputsOf(hit);
      const m = new Map(inputs.map(([n]) => [n, decode(n)]));
      const [l, r] = mixSignal(inputs, m);
      for (let i = 0; i < l.length; i++) loudestPeak = Math.max(loudestPeak, Math.abs(l[i]), Math.abs(r[i]));
    }
  }
  // and no microphone's own file may clip (one turned down in the mix is written at its fader)
  let loudestMic = 0;
  if (multi) {
    for (const piece of pieces) {
      for (const hit of piece.hits)
        for (const mic of micsOf(piece)) {
          const f = micFile(piece, hit, mic, 1);
          const sig = mixSignal(f.inputs, new Map(f.inputs.map(([n]) => [n, decode(n)])));
          loudestMic = Math.max(loudestMic, peakOf(f.mono ? [sig[0]] : sig));
        }
      decodedCache.clear();
    }
  }
  const scale = 0.89 / Math.max(loudestPeak, loudestMic);

  // measure every hit as it will be written
  const files = {};
  const zonesOf = new Map();
  for (const piece of pieces) {
    const measured = [];
    let topPeak = Number.NEGATIVE_INFINITY;
    for (const hit of piece.hits) {
      const inputs = piece.inputsOf(hit, scale);
      if (!inputs.length) throw new Error(`${piece.name}: every one of its microphones starts off`);
      const m = new Map(inputs.map(([n]) => [n, decode(n)]));
      const rate = rateOf(inputs[0][0]);
      const [l, r] = mixSignal(inputs, m);
      const ch = [Float32Array.from(l), Float32Array.from(r)];
      const at = onset(ch, 40);
      const start = Math.max(0, at - Math.round(0.0015 * rate));
      const peak = peakDb(ch);
      topPeak = Math.max(topPeak, peak);
      const h = { hit, inputs, rate, length: ch[0].length, env: envelope(ch, rate, 0.02), start, at, peak };
      h.level = loudness(ch, rate, at, 0.4);
      // each microphone's own file: from the hit's start (so they stay in step), to its own tail
      if (multi)
        h.mics = micsOf(piece).map((mic) => {
          const f = micFile(piece, hit, mic, scale);
          const sig = mixSignal(f.inputs, new Map(f.inputs.map(([n]) => [n, decode(n)])));
          const own = f.mono ? [Float32Array.from(sig[0])] : sig.map((c) => Float32Array.from(c));
          return { mic, ...f, length: own[0].length, env: envelope(own, rate, 0.02) };
        });
      measured.push(h);
    }
    if (multi) decodedCache.clear();
    // tails: kept down to `floor` dB under the piece's loudest peak, and no longer than `ring` seconds
    const floor = topPeak - (piece.floor ?? 62);
    const framesOf = (h, env, length) => {
      let last = 0;
      for (let b = env.db.length - 1; b >= 0; b--)
        if (env.db[b] > floor) {
          last = (b + 1) * env.frames;
          break;
        }
      const end = Math.min(length, last + Math.round(0.05 * h.rate), h.start + Math.round((piece.ring ?? 2) * h.rate));
      return Math.max(Math.round(0.05 * h.rate), end - h.start);
    };
    const recipe = (h, inputs, frames) => ({
      in: inputs,
      start: h.start,
      frames,
      fadeIn: Math.min(32, h.at - h.start),
      fadeOut: Math.min(Math.round((piece.fade ?? 0.2) * h.rate), Math.round(frames * 0.4)),
    });
    for (const h of measured) {
      h.frames = framesOf(h, h.env, h.length);
      const stem = `${spec.folder}/${piece.name}/${piece.name}_v${h.hit.layer}_rr${h.hit.rr}`;
      if (!multi) {
        h.path = `${stem}.wav`;
        files[h.path] = recipe(h, h.inputs, h.frames);
        continue;
      }
      // every microphone from the hit's start, each to where its own tail falls under the floor
      for (const m of h.mics) {
        m.frames = framesOf(h, m.env, m.length);
        m.path = `${stem}_${m.mic}.wav`;
        files[m.path] = { ...recipe(h, m.inputs, m.frames), ...(m.mono ? { mono: true } : {}) };
      }
    }
    zonesOf.set(piece, measured);
  }

  // velocity: one curve for the whole kit, as wide as its widest piece needs. A library that records
  // (or evens out) its layers alike and makes its dynamics by velocity says how much quieter each layer
  // is heard than recorded (`heard(layer)`, dB): its layers are placed by how loud they're heard
  const levelsOf = (piece) => {
    const m = zonesOf.get(piece);
    const layers = [...new Set(m.map((h) => h.hit.layer))].sort((a, b) => a - b);
    const levels = layers.map((L) => {
      const of = m.filter((h) => h.hit.layer === L);
      return of.reduce((a, h) => a + h.level, 0) / of.length;
    });
    return { layers, levels, placed: piece.heard ? levels.map((l, n) => l + piece.heard(layers[n])) : levels };
  };
  /** Each layer's velocities and gain, its loudness at velocity 127 being `target` (each layer played as recorded). */
  const spreadOf = (piece, target) => {
    const { levels, placed } = levelsOf(piece);
    const spread = spreadLayers(placed, { range, target });
    if (!piece.heard) return spread;
    return { ...spread, layers: spread.layers.map((v, n) => ({ ...v, gain: target - levels[n] })) };
  };
  const ranges = pieces.filter((p) => p.leadsRange).map((p) => spreadLayers(levelsOf(p).placed).need);
  const range = Math.round(Math.min(44, Math.max(28, ...ranges)) * 10) / 10;
  // every piece at its natural level in the mix, the kit as a whole brought to `spec.level` (one whose
  // layers are heard by velocity: its loudest, as it's heard at full velocity)
  const natural = pieces.map((p) => {
    const { levels } = levelsOf(p);
    return p.heard ? levels[levels.length - 1] : spreadLayers(levels, { range }).ref;
  });
  // pieces from another recording move by what brings one of them to one of this kit's
  // (`levelAs: [piece, like]`): a borrowed snare to the kick's level, and its rimshot with it
  const at = (name) => {
    const i = pieces.findIndex((q) => q.name === name);
    if (i < 0) throw new Error(`levelAs: no piece "${name}"`);
    return natural[i];
  };
  const refs = pieces.map((p, i) => natural[i] + (p.levelAs ? at(p.levelAs[1]) - at(p.levelAs[0]) : 0) + (p.trim ?? 0));
  // the kit's level is set by one piece (its snare, unless it says), the rest keep their balance to it
  const anchor = pieces.findIndex((p) => p.name === (spec.anchor ?? 'snare'));
  if (anchor < 0) throw new Error(`No piece "${spec.anchor ?? 'snare'}" to set the kit's level by`);
  const master = (spec.level ?? -19) - refs[anchor];
  // headroom: a track's fader starts at 0 dB, so the kit comes down until its snare peaks at -2 dB at
  // full velocity, and a piece that would still peak over full scale (a spiky rimshot) comes down alone
  const peakAtTop = (piece, target) => {
    const { layers } = levelsOf(piece);
    const spread = spreadOf(piece, target);
    let peak = Number.NEGATIVE_INFINITY;
    for (const h of zonesOf.get(piece)) {
      const v = spread.layers[layers.indexOf(h.hit.layer)];
      if (v.hivel === 127 && !v.unreachable) peak = Math.max(peak, h.peak + v.gain);
    }
    return peak;
  };
  const shift = Math.min(0, -2 - peakAtTop(pieces[anchor], refs[anchor] + master));
  const targets = pieces.map((p, i) => {
    const t = refs[i] + master + shift;
    return t + Math.min(0, -peakAtTop(p, t));
  });
  const tuned = pieces.some((p) => p.tune);
  // where each microphone's mono files sit: the microphone's own pan when every one of them shares it
  const micPan = new Map();
  if (multi)
    for (const m of spec.mics) {
      if (m.pan !== undefined) {
        micPan.set(m.id, m.pan);
        continue;
      }
      const pans = new Set();
      for (const piece of pieces)
        for (const h of zonesOf.get(piece)) for (const f of h.mics) if (f.mic === m.id && f.mono) pans.add(f.pan);
      if (pans.size === 1) micPan.set(m.id, [...pans][0]);
    }
  const zones = [];
  pieces.forEach((piece, i) => {
    const { layers } = levelsOf(piece);
    const spread = spreadOf(piece, targets[i]);
    for (const h of zonesOf.get(piece)) {
      const v = spread.layers[layers.indexOf(h.hit.layer)];
      if (v.unreachable) continue;
      // a kit that keeps its microphones apart: every microphone of the hit, at the hit's one gain
      const takes = multi ? h.mics : [{ path: h.path, frames: h.frames }];
      for (const t of takes) {
        const base = {
          file: t.path,
          lovel: v.lovel,
          hivel: v.hivel,
          gain: Math.round(v.gain * 100) / 100,
          start: 0,
          end: t.frames,
          loopStart: 0,
          loopEnd: 0,
          rate: h.rate,
          rr: h.hit.rr,
          ...(t.mic ? { mic: t.mic } : {}),
          ...(t.mono && t.pan !== (micPan.get(t.mic) ?? 0) ? { pan: t.pan } : {}),
          ...(piece.group ? { group: piece.group } : {}),
          ...(piece.offBy ? { offBy: piece.offBy } : {}),
        };
        // one zone a key (a tuned piece plays its recording a few semitones up)
        if (tuned)
          for (const key of piece.keys) zones.push({ ...base, root: key - (piece.tune ?? 0), lo: key, hi: key });
        else {
          const lo = Math.min(...piece.keys);
          const hi = Math.max(...piece.keys);
          if (hi - lo + 1 !== piece.keys.length)
            for (const key of piece.keys) zones.push({ ...base, root: key, lo: key, hi: key });
          else zones.push({ ...base, root: lo, lo, hi });
        }
      }
    }
  });
  zones.sort((a, b) => a.lo - b.lo || a.lovel - b.lovel || a.rr - b.rr);
  // only the files a zone plays are made (a layer quieter than velocity 1 reaches isn't)
  for (const path of Object.keys(files)) if (!zones.some((z) => z.file === path)) delete files[path];
  const instrument = {
    name: spec.instrument.name,
    title: spec.instrument.title,
    category: 'Drums',
    pitched: tuned,
    release: 0.08,
    attack: 0,
    oneShot: true,
    velocityRange: range,
    polyphony: 96,
    notePolyphony: 3,
    offTime: 0.035,
    pads,
    ...(multi
      ? {
          mics: spec.mics.map((m) => ({
            id: m.id,
            name: m.name,
            ...(m.level ? { level: m.level } : {}),
            ...(micPan.get(m.id) ? { pan: micPan.get(m.id) } : {}),
          })),
        }
      : {}),
    zones,
  };
  const source = { kind: 'mix', note: spec.note, bases: spec.bases, downloads: {}, bits: 24, files };
  source.downloads = pinDownloads(source, downloads);
  const pack = {
    format: 'holo-pack',
    version: 1,
    id: spec.id,
    name: spec.name,
    license: spec.license,
    credit: spec.credit,
    source,
    root: 'samples',
    instruments: [instrument],
  };
  console.log(
    `  velocity range ${range} dB; ${zones.length} zones from ${Object.keys(files).length} files; ` +
      `the kit ${shift.toFixed(1)} dB for headroom${
        targets.some((t, i) => t < refs[i] + master + shift - 0.05)
          ? `, ${pieces
              .filter((_p, i) => targets[i] < refs[i] + master + shift - 0.05)
              .map((p) => p.name)
              .join(', ')} more`
          : ''
      }`,
  );
  // what a device holds of each file (a mono one half a stereo one's)
  const mono = new Set(Object.keys(files).filter((f) => files[f].mono));
  const once = zones.filter((z, i, a) => a.findIndex((x) => x.file === z.file) === i);
  pieces.forEach((piece, i) => {
    const { levels, placed } = levelsOf(piece);
    const own = once.filter((z) => z.file.startsWith(`${spec.folder}/${piece.name}/`));
    const rrs = new Set(zonesOf.get(piece).map((h) => h.hit.rr)).size;
    console.log(
      `  ${piece.name.padEnd(14)} keys ${piece.keys.join(',').padEnd(10)} ${String(zonesOf.get(piece).length).padStart(3)} hits, ` +
        `layers ${levels.length}, ${levels[0].toFixed(1)}..${levels[levels.length - 1].toFixed(1)} dB` +
        (piece.heard ? ` (heard ${placed[0].toFixed(1)}..${placed[placed.length - 1].toFixed(1)})` : '') +
        (multi
          ? `, ${rrs} round robins, ${own.length} files, ${memoryMb(own, null, mono).toFixed(0)} MB, ` +
            `velocities ${spreadOf(piece, targets[i])
              .layers.map((v) => (v.unreachable ? '-' : `${v.lovel}-${v.hivel}`))
              .join(' ')}, ` +
            `target ${targets[i].toFixed(1)} dB, peak at 127 ${peakAtTop(piece, targets[i]).toFixed(1)} dBFS`
          : ''),
    );
  });
  if (multi)
    for (const m of instrument.mics) {
      const own = once.filter((z) => z.mic === m.id);
      const kinds = new Set(own.map((z) => (mono.has(z.file) ? 'mono' : 'stereo')));
      console.log(
        `  mic ${m.id.padEnd(13)} ${m.name.padEnd(14)} level ${String(m.level ?? 0).padStart(6)} dB, pan ${
          m.pan ?? (own.some((z) => z.pan !== undefined) ? 'by zone' : 0)
        }, ${[...kinds].join('+')}, ${own.length} files, ${memoryMb(own, null, mono).toFixed(0)} MB`,
      );
    }
  await makeFiles(pack, downloads, out);
  console.log(`${writeManifest(pack)}: ${memoryMb(once, null, mono).toFixed(0)} MB decoded at 48 kHz`);
  return pack;
}

export { Downloads };
