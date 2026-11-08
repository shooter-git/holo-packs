// `node packs/orchestral-sections/recipe.mjs [--cache DIR] [--out DIR]`: orchestral sections made by
// layering the free libraries' recordings of the same notes, written into
// packs/orchestral-sections/pack.json and packs/orchestral-sections/files.sha256.
//
// Each section is VSCO 2's section recording (CC0), and at its loudest layer the University of Iowa's
// soloists (free to use without restriction) and Karoryfer's (CC0) playing with it:
// - every note is made where VSCO 2 sampled it (its measured pitch), each soloist's nearest note
//   played at the rate that brings it to that pitch (resampled, by plain arithmetic);
// - each soloist starts where its attack meets the section's, a few milliseconds behind it (players
//   never land together), 6 dB under the section and placed where it sits in the orchestra;
// - the softer layers are the section alone, so a section gets fuller and brighter as it's played
//   harder.
// The layers are measured and set where one velocity curve meets them, the loudest at -17 dB at
// velocity 127; each note is kept until it falls to -60 dB (8 s at most) and faded there.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { arg, Downloads, onset } from '../../tools/lib.mjs';
import { BASE, noteOf, page } from '../../tools/iowa.mjs';
import { repo } from '../../tools/holo.mjs';
import { buildInstruments, round } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/orchestral-sections'));
const VSCO = 'https://raw.githubusercontent.com/sgossner/VSCO-2-CE/440300901dfe9275fd84e0b7763af1f8443ae62e/';
const BIGCAT = 'https://raw.githubusercontent.com/sfzinstruments/karoryfer-bigcat.cello/6fd75fbfc1dbb3109bf26220ba1adea46188a18b/';
const TUBA = 'https://raw.githubusercontent.com/sfzinstruments/karoryfer.war-tuba/5b62dd6ef6b00281bb734769e44a63f5e013018a/';
const downloads = new Downloads(cache, { vsco: VSCO, iowa: BASE, bigcat: BIGCAT, tuba: TUBA });
const pack = (id) => JSON.parse(readFileSync(join(repo, 'packs', id, 'pack.json'), 'utf8'));
const vsco = pack('vsco2');

/** A soloist's notes: key → download (the loudest, sustained). */
async function iowaNotes(pageName, pick) {
  const out = new Map();
  for (const p of await page(pageName)) if (pick(p) && noteOf(p) !== null && !out.has(noteOf(p))) out.set(noteOf(p), `iowa:${p}`);
  return out;
}
/** A soloist from one of these packs' own maps: its loudest layer's notes, key → download. */
function packNotes(id, name, tag) {
  const p = pack(id);
  const inst = p.instruments.find((i) => i.name === name);
  const top = inst.zones.filter((z) => !z.trigger && z.hivel === 127);
  const out = new Map();
  for (const z of top) {
    const download = p.source.files[z.file].in[0][0];
    if (!out.has(Math.round(z.root))) out.set(Math.round(z.root), `${tag}:${download.slice(download.indexOf(':') + 1)}`);
  }
  return out;
}
/** A pan (-1 left .. 1 right) as gains into the left and right, at `gain`. */
const pan = (gain, x) => [gain * Math.min(1, 1 - x), gain * Math.min(1, 1 + x)];
const SOLO = 0.5; // 6 dB under the section
const LATE = 0.008; // seconds behind the section's attack

const SECTIONS = [
  ['violins', 'Violins', 'violins', 'Strings', [[await iowaNotes('MISViolin2012', (p) => p.includes('.arco.')), -0.5]]],
  ['violas', 'Violas', 'violas', 'Strings', [[await iowaNotes('MISViola2012', (p) => p.includes('.arco.')), -0.2]]],
  ['cellos', 'Cellos', 'cellos', 'Strings', [[await iowaNotes('MISCello2012', (p) => p.includes('.arco.')), 0.25], [packNotes('bigcat-cello', 'cello', 'bigcat'), 0.4]]],
  ['basses', 'Basses', 'basses', 'Strings', [[await iowaNotes('MISDoubleBass2012', (p) => p.includes('.arco.')), 0.5]]],
  ['horns', 'Horns', 'horns', 'Brass', [[await iowaNotes('MISHorn2012', () => true), -0.3]]],
  ['trombones', 'Trombones', 'trombones', 'Brass', [[await iowaNotes('MISTenorTrombone2012', () => true), 0.3]]],
  ['tubas', 'Tubas', 'tuba', 'Brass', [[await iowaNotes('MISTuba2012', () => true), 0.4], [packNotes('war-tuba', 'tuba', 'tuba'), 0.5]]],
  ['flutes', 'Flutes', 'flute', 'Woodwinds', [[await iowaNotes('MISFlute2012', (p) => p.includes('.vib.')), -0.2]]],
  ['oboes', 'Oboes', 'oboe', 'Woodwinds', [[await iowaNotes('MISOboe2012', () => true), 0.1]]],
  ['clarinets', 'Clarinets', 'clarinet', 'Woodwinds', [[await iowaNotes('MISBbClarinet2012', () => true), -0.1]]],
  ['bassoons', 'Bassoons', 'bassoon', 'Woodwinds', [[await iowaNotes('MISBassoon2012', () => true), 0.2]]],
];

// everything the sections are made from, fetched first: their attacks are measured to line them up
const zonesOf = (name) => vsco.instruments.find((i) => i.name === name).zones.filter((z) => !z.trigger);
const nearest = (notes, root) => {
  let best = null;
  for (const k of notes.keys()) if (best === null || Math.abs(k - root) < Math.abs(best - root)) best = k;
  return best;
};
const need = new Set();
for (const [, , name, , soloists] of SECTIONS)
  for (const z of zonesOf(name)) {
    need.add(`vsco:${z.file}`);
    if (z.hivel === 127) for (const [notes] of soloists) need.add(notes.get(nearest(notes, z.root)));
  }
console.log(`Sections: ${need.size} recordings`);
await downloads.all([...need]);
const onsets = new Map();
const onsetOf = (n) => {
  if (!onsets.has(n)) {
    const d = downloads.decoded(n);
    onsets.set(n, { at: onset(d.channels, 40), rate: d.rate });
  }
  return onsets.get(n);
};

const RATE = 44100;
const instruments = [];
for (const [id, title, name, category, soloists] of SECTIONS) {
  const zones = zonesOf(name);
  const layers = [...new Set(zones.map((z) => z.lovel))].sort((a, b) => a - b);
  const samples = zones.map((z) => {
    const section = `vsco:${z.file}`;
    const sv = onsetOf(section);
    if (sv.rate !== RATE) throw new Error(`${section}: ${sv.rate} Hz`);
    const startV = Math.max(0, sv.at - Math.round(0.004 * RATE));
    const inputs = [[section, 1, 1, { start: startV }]];
    if (z.hivel === 127)
      for (const [notes, where] of soloists) {
        const key = nearest(notes, z.root);
        const solo = notes.get(key);
        const so = onsetOf(solo);
        // its rate brings its note to the section's pitch; its attack lands LATE behind the section's
        const rate = round(so.rate * 2 ** ((z.root - key) / 12), 1000);
        const step = rate / RATE;
        const start = round(so.at - (sv.at - startV + LATE * RATE) * step, 1000);
        const [gl, gr] = pan(SOLO, where);
        inputs.push([solo, round(gl, 10000), round(gr, 10000), { start, rate }]);
      }
    const stem = z.file.slice(z.file.lastIndexOf('/') + 1, -4);
    return {
      inputs,
      rate: RATE,
      out: `${id}/${stem}.wav`,
      root: z.root,
      lo: z.lo,
      hi: z.hi,
      layer: layers.indexOf(z.lovel) + 1,
      rr: z.rr,
    };
  });
  instruments.push({
    name: id,
    title: `${title} (Layered)`,
    category,
    folder: id,
    samples,
    tail: { floor: -60, cap: 8, fade: 0.6 },
    playing: { release: 0.35, attack: 0.01, oneShot: false, polyphony: 48, notePolyphony: 2, offTime: 0.12 },
  });
}

await buildInstruments({
  id: 'orchestral-sections',
  name: 'Orchestral Sections (VSCO 2, Iowa, Karoryfer)',
  // its recordings are CC0 and Iowa's, free to use without restriction: so is the mix
  license: 'Free to use without restriction (VSCO 2 and Karoryfer CC0; University of Iowa EMS)',
  credit:
    'Made for HO[LO] from VSCO 2 Community Edition (CC0, Versilian Studios), the University of Iowa Musical Instrument ' +
    'Samples (Electronic Music Studios, free to use without restriction), Karoryfer x bigcat cello and War Tuba ' +
    '(CC0, Karoryfer Lecolds and bigcat instruments).',
  note:
    "VSCO 2's section recordings, with the Iowa and Karoryfer soloists' nearest notes resampled to each note's pitch, " +
    'lined up at their attacks and mixed under the section, each kept until it falls to -60 dB (8 s at most).',
  downloads,
  bits: 16,
  instruments,
  out: arg('out', null),
});
