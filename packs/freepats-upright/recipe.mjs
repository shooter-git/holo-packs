// `node packs/freepats-upright/recipe.mjs [--cache DIR] [--out DIR]`: the FreePats project's Upright
// Piano KW (CC0), written into packs/freepats-upright/pack.json and packs/freepats-upright/files.sha256:
// two velocity layers every minor third, each note held on its loop as its SFZ program loops it
// (the program's per-note filters aren't played: the notes are as recorded). Its layers were recorded
// to one level, so they keep the program's velocity splits and each plays at the level one velocity
// curve has there, the loudest at -16.4 dB at velocity 127 (the Steinway's level). The notes are taken out of the project's own 7z download.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { archiveProgram, buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/freepats-upright'));
const downloads = new Downloads(cache, {}, {
  kw: { url: 'https://freepats.zenvoid.org/Piano/UprightPianoKW/UprightPianoKW-SFZ+FLAC-20220221.7z' },
});

await buildInstruments({
  id: 'freepats-upright',
  name: 'FreePats Upright Piano KW',
  license: 'CC0-1.0',
  credit: 'Upright Piano KW of the FreePats project (CC0).',
  note: "The project's SFZ+FLAC download (7z), each note taken out and written as a WAV as it is.",
  downloads,
  level: -16.4,
  instruments: [
    {
      name: 'upright',
      title: 'Upright Piano',
      category: 'Piano',
      folder: 'upright',
      samples: await archiveProgram(downloads, 'kw', 'UprightPianoKW-SFZ+FLAC-20220221/UprightPianoKW-20220221.sfz'),
      // its two layers were recorded to one level: the program's own velocity splits
      layers: 'fixed',
      playing: { release: 0.6, attack: 0, oneShot: false, polyphony: 96, notePolyphony: 2, offTime: 0.12 },
    },
  ],
  out: arg('out', null),
});
