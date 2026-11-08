// `node packs/epianos/recipe.mjs [--cache DIR] [--out DIR]`: Greg Sullivan's electric pianos (CC BY 3.0),
// as the SFZ Instruments project publishes them (kinwie's mapping, in FLAC), written into
// packs/epianos/pack.json and packs/epianos/files.sha256.
//
// Three instruments, each played as its SFZ program plays it (its keys, its velocity layers, each
// note's own tuning and level trim, where a note starts and ends):
// - a Yamaha CP80 electric grand (four layers);
// - a Hohner Pianet T (two layers);
// - a Wurlitzer EP200 (three layers).
// Each note was recorded at one level (the programs leave the dynamics to the sampler), so the layers
// keep the programs' own velocity splits and each plays at the level one velocity curve has there; each
// note is kept until it falls to -60 dB (15 s at most) and faded there, otherwise bit for bit.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, sfzSamples } from '../../tools/sampler.mjs';
import { readSfz } from '../../tools/sfz.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/epianos'));
const REPO = 'sfzinstruments/GregSullivan.E-Pianos';
const COMMIT = '8c3e581acda3594b553948ff0222d4f84a698376';
const base = `https://raw.githubusercontent.com/${REPO}/${COMMIT}/`;
const downloads = new Downloads(cache, { gs: base });
const read = async (path) => {
  const res = await fetch(`${base}${path.split('/').map(encodeURIComponent).join('/')}`);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.text();
};

const PROGRAMS = [
  { dir: 'CP80', sfz: 'CP80/CP80.sfz', name: 'cp80', title: 'Yamaha CP80 Electric Grand', release: 0.25 },
  { dir: 'Pianet T', sfz: 'Pianet T/Pianet T.sfz', name: 'pianet', title: 'Hohner Pianet T', release: 0.12 },
  { dir: 'Wurlitzer EP200', sfz: 'Wurlitzer EP200/Wurlitzer EP200.sfz', name: 'wurlitzer', title: 'Wurlitzer EP200', release: 0.15 },
];

const instruments = [];
for (const p of PROGRAMS) {
  const samples = sfzSamples(await readSfz(p.sfz, read), { tag: 'gs', dir: p.dir });
  instruments.push({
    name: p.name,
    title: p.title,
    category: 'Keys',
    folder: p.name,
    samples,
    // each note was recorded to one level: the program's own velocity splits, the curve's level at each
    layers: 'fixed',
    tail: { floor: -60, cap: 15, fade: 1 },
    playing: { release: p.release, attack: 0, oneShot: false, polyphony: 64, notePolyphony: 2, offTime: 0.1 },
  });
}

await buildInstruments({
  id: 'epianos',
  name: 'Greg Sullivan E-Pianos (CP80, Pianet T, Wurlitzer)',
  license: 'CC-BY-3.0',
  credit:
    "Greg Sullivan's E-Pianos (CC BY 3.0, sullivang.net): a Yamaha CP80 electric grand, a Hohner Pianet T and a " +
    'Wurlitzer EP200, mapped in FLAC by kinwie for the SFZ Instruments project. Trimmed for HO[LO]: each note ends ' +
    'where it falls to -60 dB.',
  note: 'The E-Pianos samples (FLAC, at the pinned commit), each note kept until it falls to -60 dB (15 s at most) and faded there, otherwise bit for bit.',
  downloads,
  instruments,
  out: arg('out', null),
});
