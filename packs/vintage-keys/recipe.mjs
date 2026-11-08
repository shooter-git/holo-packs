// `node packs/vintage-keys/recipe.mjs [--cache DIR] [--out DIR]`: vintage keyboards made for HO[LO] by
// mixing Greg Sullivan's electric pianos (CC BY 3.0) and the FreePats Upright Piano KW (CC0), written
// into packs/vintage-keys/pack.json and packs/vintage-keys/files.sha256.
//
// Each is a new mix of those recordings, made by plain arithmetic (resampled where it's retuned):
// - *Honky-tonk Upright*: the upright with a copy of itself 14 cents sharp and 6 ms late, the beating
//   of an old upright's unisons out of tune;
// - *Stage Piano Layer*: the CP80 electric grand with the upright's matching layer under it (the
//   upright's nearest note resampled to each CP80 note's pitch), the classic layered stage sound;
// - *Wurlitzer Chorus*: the Wurlitzer EP200 with copies 7 cents flat and 7 cents sharp, one to each
//   side, a wide, shimmering reed piano.
// The layers are measured and set where one velocity curve meets them, the loudest at -17 dB at velocity
// 127; each note is kept until it falls to -60 dB (8 s at most), as 16-bit WAVs.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { arg, Downloads, onset } from '../../tools/lib.mjs';
import { repo } from '../../tools/holo.mjs';
import { buildInstruments, round } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/vintage-keys'));
const pack = (id) => JSON.parse(readFileSync(join(repo, 'packs', id, 'pack.json'), 'utf8'));
const ep = pack('epianos');
const up = pack('freepats-upright');
const downloads = new Downloads(cache, ep.source.bases, up.source.archives);

/** An instrument's played zones, each with its download (as its pack made its file from). */
const zonesOf = (p, name) =>
  p.instruments
    .find((i) => i.name === name)
    .zones.filter((z) => !z.trigger)
    .map((z) => ({ ...z, download: p.source.files[z.file].in[0][0] }));
const upright = zonesOf(up, 'upright');
const cp80 = zonesOf(ep, 'cp80');
const wurli = zonesOf(ep, 'wurlitzer');
await downloads.all([...new Set([...upright, ...cp80, ...wurli].map((z) => z.download))]);
const RATE = 44100;
const decoded = new Map();
const info = (n) => {
  if (!decoded.has(n)) {
    const d = downloads.decoded(n);
    decoded.set(n, { rate: d.rate, at: onset(d.channels, 40) });
  }
  return decoded.get(n);
};
const cents = (c) => 2 ** (c / 1200);
const layerOf = (zones) => {
  const lovels = [...new Set(zones.map((z) => z.lovel))].sort((a, b) => a - b);
  return (z) => lovels.indexOf(z.lovel) + 1;
};
const stem = (n) => n.slice(n.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '');

// the upright with a copy of itself 14 cents sharp and 6 ms late
const uLayer = layerOf(upright);
const honky = upright.map((z) => {
  const u = info(z.download);
  return {
    inputs: [
      [z.download, 0.7, 0.7],
      [z.download, 0.7, 0.7, { start: round(-0.006 * u.rate, 1000), rate: round(u.rate * cents(14), 1000) }],
    ],
    rate: RATE,
    out: `honky-tonk/${stem(z.download)}.wav`,
    root: z.root,
    lo: z.lo,
    hi: z.hi,
    layer: uLayer(z),
    lovel: z.lovel,
    hivel: z.hivel,
  };
});

// the CP80 with the upright's matching layer under it, resampled to each note's pitch
const cLayer = layerOf(cp80);
const cpLayers = [...new Set(cp80.map((z) => z.lovel))].length;
const upLayers = [...new Set(upright.map((z) => z.lovel))].length;
const stage = cp80.map((z) => {
  const c = info(z.download);
  // the upright layer whose share of the velocity range this CP80 layer's falls in
  const want = Math.min(upLayers, Math.ceil((cLayer(z) / cpLayers) * upLayers));
  const near = upright
    .filter((u) => uLayer(u) === want)
    .reduce((a, b) => (Math.abs(b.root - z.root) < Math.abs(a.root - z.root) ? b : a));
  const u = info(near.download);
  const rate = round(u.rate * 2 ** ((z.root - near.root) / 12), 1000);
  const startC = Math.max(0, c.at - Math.round(0.003 * c.rate));
  const step = rate / RATE;
  return {
    inputs: [
      [z.download, 0.8, 0.8, { start: startC }],
      [near.download, 0.5, 0.5, { start: round(u.at - (c.at - startC) * step, 1000), rate }],
    ],
    rate: RATE,
    out: `stage-layer/${stem(z.download)}.wav`,
    root: z.root,
    lo: z.lo,
    hi: z.hi,
    layer: cLayer(z),
    lovel: z.lovel,
    hivel: z.hivel,
  };
});

// the Wurlitzer with copies 7 cents flat (left) and 7 cents sharp (right)
const wLayer = layerOf(wurli);
const chorus = wurli.map((z) => {
  const w = info(z.download);
  return {
    inputs: [
      [z.download, 0.6, 0.6],
      [z.download, 0.45, 0.1, { start: 0, rate: round(w.rate * cents(-7), 1000) }],
      [z.download, 0.1, 0.45, { start: 0, rate: round(w.rate * cents(7), 1000) }],
    ],
    rate: RATE,
    out: `wurlitzer-chorus/${stem(z.download)}_${z.lo}.wav`,
    root: z.root,
    lo: z.lo,
    hi: z.hi,
    layer: wLayer(z),
    lovel: z.lovel,
    hivel: z.hivel,
  };
});

const tail = { floor: -60, cap: 8, fade: 1 };
await buildInstruments({
  id: 'vintage-keys',
  name: 'Vintage Keys (Greg Sullivan, FreePats)',
  license: 'CC-BY-3.0',
  credit:
    "Made for HO[LO] from Greg Sullivan's E-Pianos (CC BY 3.0, sullivang.net; mapped in FLAC by kinwie for the SFZ " +
    'Instruments project) and the FreePats Upright Piano KW (CC0): honky-tonk, layered and chorused mixes.',
  note:
    "The E-Pianos' FLACs and the FreePats upright's 7z download, mixed into new files: copies retuned (resampled) and lined up at their attacks.",
  downloads,
  bits: 16,
  instruments: [
    { name: 'honky-tonk', title: 'Honky-tonk Upright', category: 'Piano', folder: 'honky-tonk', samples: honky, layers: 'fixed', tail, playing: { release: 0.5, attack: 0, oneShot: false, polyphony: 64, notePolyphony: 2, offTime: 0.12 } },
    { name: 'stage-layer', title: 'Stage Piano Layer (CP80 and Upright)', category: 'Keys', folder: 'stage-layer', samples: stage, layers: 'fixed', tail, playing: { release: 0.3, attack: 0, oneShot: false, polyphony: 64, notePolyphony: 2, offTime: 0.1 } },
    { name: 'wurlitzer-chorus', title: 'Wurlitzer Chorus', category: 'Keys', folder: 'wurlitzer-chorus', samples: chorus, layers: 'fixed', tail, playing: { release: 0.2, attack: 0, oneShot: false, polyphony: 64, notePolyphony: 2, offTime: 0.1 } },
  ],
  out: arg('out', null),
});
