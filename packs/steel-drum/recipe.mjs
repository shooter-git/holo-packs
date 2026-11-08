// `node packs/steel-drum/recipe.mjs [--cache DIR] [--out DIR]`: Jeff Learman's jSteelDrum (the
// Unlicense), written into packs/steel-drum/pack.json and packs/steel-drum/files.sha256: a steel pan
// as its SFZ program (the one without crossfades) plays it, velocity layers and takes in turn. Its notes
// were each recorded to one level, so the layers keep the program's velocity splits and each plays at
// the level one velocity curve has there, the loudest at -17 dB at velocity 127; each note is kept
// until it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/steel-drum'));
const lib = library('sfzinstruments/jlearman.SteelDrum', 'dc15a36ad69a43b0d240fcbd0cc78fbc61b2b47e');
const downloads = new Downloads(cache, { j: lib.base });

await buildInstruments({
  id: 'steel-drum',
  name: 'jSteelDrum',
  license: 'Unlicense',
  credit: 'jSteelDrum by Jeff Learman (the Unlicense), from the SFZ Instruments project: a steel pan.',
  note: "The library's FLACs at the pinned commit, each kept until it falls to -60 dB and faded there, otherwise bit for bit.",
  downloads,
  instruments: [
    {
      name: 'steel-pan',
      title: 'Steel Pan',
      category: 'Percussion',
      samples: await programSamples(lib, 'jSteelDrum-noxfade.sfz', { tag: 'j' }),
      // its notes were each brought to one level: the program's own velocity splits
      layers: 'fixed',
      tail: { floor: -60, cap: 8, fade: 0.5 },
      playing: { release: 0.5, attack: 0, oneShot: false, polyphony: 32, notePolyphony: 2, offTime: 0.1 },
    },
  ],
  out: arg('out', null),
});
