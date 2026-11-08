// `node packs/freepats-accordion/recipe.mjs [--cache DIR] [--out DIR]`: the FreePats project's Button
// Accordion HN (CC0), a Hohner button accordion, written into packs/freepats-accordion/pack.json and
// packs/freepats-accordion/files.sha256: played as its SFZ program plays it, each note held on its loop
// and tuned as the program tunes it, measured, the loudest at -17 dB at velocity 127. The notes are
// taken out of the project's own 7z download.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { archiveProgram, buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/freepats-accordion'));
const downloads = new Downloads(cache, {}, {
  hn: { url: 'https://github.com/freepats/button-accordion-HN/releases/download/2024-03-29/ButtonAccordionHN-SFZ+FLAC-20240329.7z' },
});

await buildInstruments({
  id: 'freepats-accordion',
  name: 'FreePats Button Accordion HN',
  license: 'CC0-1.0',
  credit: 'Button Accordion HN of the FreePats project (CC0): a Hohner button accordion.',
  note: "The project's SFZ+FLAC download (7z), each note taken out and written as a WAV as it is.",
  downloads,
  instruments: [
    {
      name: 'accordion',
      title: 'Button Accordion',
      category: 'Keys',
      folder: 'accordion',
      samples: await archiveProgram(downloads, 'hn', 'Button Accordion HN SFZ+FLAC-20240329/PRESET Button Accordion HN tuned.sfz'),
      range: 20,
      playing: { release: 0.13, attack: 0.03, oneShot: false, polyphony: 24, notePolyphony: 2, offTime: 0.08 },
    },
  ],
  out: arg('out', null),
});
