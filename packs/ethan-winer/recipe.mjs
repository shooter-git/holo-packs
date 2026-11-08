// `node packs/ethan-winer/recipe.mjs [--cache DIR] [--out DIR]`: Ethan Winer's original instrument
// samples (free to use any way, royalty free, commercially too, no attribution required), as the SFZ
// Instruments project maps them in FLAC (kinwie), written into packs/ethan-winer/pack.json and
// packs/ethan-winer/files.sha256.
//
// - Played by pitch: bassoon (two layers), cello, glockenspiel.
// - On pads: African slit drums, a brushed snare's hits and rolls, temple blocks, shakers, claves,
//   sleigh bells, tambourine, triangle, wind chimes, a turtle drum and a slide whistle's swoops: each
//   sound its own pad, its dynamics as velocity layers, its takes in turn.
// Each instrument is measured (a pad set as a whole, its sounds' balance as recorded), the loudest at
// -17 dB at velocity 127 (less where a hit would peak over -1 dB); each sound is kept until it falls to
// -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, padSet, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/ethan-winer'));
const lib = library('sfzinstruments/EthanWiner.Soundfonts', '173e3f897a922dc9fb9b96ae743f82c9d5ad1e19');
const downloads = new Downloads(cache, { e: lib.base });
const DIR = 'Ethan Winer Collection';
const program = (name, keep) => programSamples(lib, `${DIR}/${name}.sfz`, { tag: 'e', keep });

/** A dynamic marking or take number at the end of a file's name: what makes it a layer of its sound. */
const DYN = /\s+(pp|p|mp|mf|f|ff|soft|medium|med|loud|hard)$/i;
const ORDER = ['pp', 'p', 'soft', 'mp', 'medium', 'med', 'mf', 'f', 'loud', 'hard', 'ff'];
/** A percussion program as pads: its files grouped by name less their dynamics, dynamics as layers. */
async function pads(folder, name, keep) {
  const regions = await program(name, keep);
  const pieces = new Map();
  for (const r of regions) {
    const stem = r.download.slice(r.download.lastIndexOf('/') + 1).replace(/\.flac$/i, '');
    const m = DYN.exec(stem);
    const base = (m ? stem.slice(0, m.index) : stem).trim();
    if (!pieces.has(base)) pieces.set(base, []);
    const layer = m ? ORDER.indexOf(m[1].toLowerCase()) + 1 : 1;
    if (!pieces.get(base).some((t) => t.download === r.download))
      pieces.get(base).push({ download: r.download, layer, rr: r.rr || 1, lovel: r.lovel, hivel: r.hivel });
  }
  return padSet(
    folder,
    [...pieces].map(([base, takes]) => {
      const title = TITLES[base] ?? base;
      const piece = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return [piece, title, takes];
    }),
  );
}
/** Pads named as a player would name them (the files' names are short). */
const TITLES = {
  ...Object.fromEntries([1, 2, 3, 4, 5, 6, 7].map((n) => [`Slt Drum${n}`, `Slit drum ${n}`])),
  'SBO Hit': 'Sleigh bells 1 hit',
  'SBT Hit': 'Sleigh bells 2 hit',
  'SBO Shake slow': 'Sleigh bells 1 shake slow',
  'SBO Shake fast': 'Sleigh bells 1 shake fast',
  'SBT Shake slow': 'Sleigh bells 2 shake slow',
  'SBT Shake fast': 'Sleigh bells 2 shake fast',
  TD: 'Turtle drum',
  Large: 'Large shaker',
  Small: 'Small shaker',
};
const ring = { release: 0.6, attack: 0, oneShot: false, polyphony: 32, notePolyphony: 2, offTime: 0.1 };
const hit = { release: 0.2, attack: 0, oneShot: true, polyphony: 32, notePolyphony: 2, offTime: 0.05 };
const set = (name, title, p, tail = 4) => ({ name, title, category: 'Percussion', pitched: false, ...p, peak: -1, tail: { floor: -60, cap: tail, fade: 0.3 }, playing: hit });

const instruments = [
  { name: 'bassoon', title: 'Bassoon', category: 'Woodwinds', folder: 'bassoon', samples: await program("Ethan's Bassoon", (r) => r.master_label === 'normal'), tail: { floor: -60, cap: 10, fade: 0.5 }, playing: { ...ring, release: 0.15 } },
  { name: 'cello', title: 'Cello', category: 'Strings', folder: 'cello', samples: await program("Ethan's Cello", (r) => r.group_label === 'normal'), tail: { floor: -60, cap: 10, fade: 0.5 }, playing: { ...ring, release: 0.3 } },
  { name: 'glockenspiel', title: 'Glockenspiel', category: 'Percussion', folder: 'glockenspiel', samples: await program("Ethan's Glock"), peak: -1, tail: { floor: -60, cap: 6, fade: 0.5 }, playing: { ...ring, release: 1 } },
  set('slit-drums', 'African Slit Drums', await pads('slit-drums', 'African Slit Drums')),
  set('brush-snare', 'Brush Snare Hits and Rolls', await pads('brush-snare', 'Brush Snare Hits & Rolls'), 8),
  set('temple-blocks', 'Temple Blocks', await pads('temple-blocks', "Ethan's Temple Blocks")),
  // its swishes and its shakes' dynamics: the program's own velocity splits
  { ...set('shakers', 'Shakers', await pads('shakers', "Ethan's Shakers")), layers: 'fixed' },
  set('claves', 'Claves', await pads('claves', "Ethan's Claves")),
  set('sleigh-bells', 'Sleigh Bells', await pads('sleigh-bells', "Ethan's Sleigh Bells")),
  set('tambourine', 'Tambourine', await pads('tambourine', "Ethan's Tambourine")),
  set('triangle', 'Triangle', await pads('triangle', "Ethan's Triangle"), 8),
  set('wind-chimes', 'Wind Chimes', await pads('wind-chimes', "Ethan's Wind Chimes"), 12),
  set('turtle-drum', 'Turtle Drum', await pads('turtle-drum', 'Turtle Drum')),
  set('slide-whistle', 'Slide Whistle', await pads('slide-whistle', 'Slide Whistle')),
];

await buildInstruments({
  id: 'ethan-winer',
  name: "Ethan Winer's Instruments",
  license: 'Free to use without restriction (Ethan Winer)',
  credit:
    "Ethan Winer's original instrument samples (ethanwiner.com: free to use any way you like, royalty free, including for " +
    'commercial projects), mapped in FLAC by kinwie for the SFZ Instruments project. The turtle drum was played by Katie Petreycik.',
  note: "The collection's FLACs at the pinned commit, each kept until it falls to -60 dB and faded there, otherwise bit for bit.",
  downloads,
  instruments,
  out: arg('out', null),
});
