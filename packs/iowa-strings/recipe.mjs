// `node packs/iowa-strings/recipe.mjs [--cache DIR] [--out DIR]`: the University of Iowa's 2012 solo
// strings (free to use without restriction), written into packs/iowa-strings/pack.json and
// packs/iowa-strings/files.sha256.
//
// Violin, viola, cello and double bass, bowed and plucked, every note fortissimo, recorded in stereo.
// Iowa recorded each note on every string that reaches it; here each key plays it on the highest of
// those strings, where a player in first position would. One layer a note: velocity sets its level, the
// loudest at -17 dB at velocity 127. Each note starts just before its attack (the recordings have
// silence before it) and is kept until it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { BASE, CREDIT, LICENSE, notes, page } from '../../tools/iowa.mjs';
import { buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/iowa-strings'));
const downloads = new Downloads(cache, { iowa: BASE });
const STRINGS = {
  Violin: ['G', 'D', 'A', 'E'],
  Viola: ['C', 'G', 'D', 'A'],
  Cello: ['C', 'G', 'D', 'A'],
  'Double Bass': ['C', 'E', 'A', 'D', 'G'],
};
const PAGES = { Violin: 'MISViolin2012', Viola: 'MISViola2012', Cello: 'MISCello2012', 'Double Bass': 'MISDoubleBass2012' };
const string = (p) => /\.sul([A-G])\./.exec(p)?.[1];

const instruments = [];
for (const [inst, strings] of Object.entries(STRINGS)) {
  const files = await page(PAGES[inst]);
  // the higher string of two that play a note
  const prefer = (a, b) => (strings.indexOf(string(b)) > strings.indexOf(string(a)) ? b : a);
  const id = inst === 'Double Bass' ? 'bass' : inst.toLowerCase();
  for (const [way, suffix, title, playing, tail] of [
    ['arco', '', '', { release: 0.3, attack: 0.01, oneShot: false }, { floor: -60, cap: 12, fade: 0.5 }],
    ['pizz', '_pizz', ' (Pizzicato)', { release: 0.4, attack: 0, oneShot: false }, { floor: -60, cap: 6, fade: 0.4 }],
  ])
    instruments.push({
      name: `${id}${suffix}`,
      title: `Solo ${inst}${title}`,
      category: inst === 'Double Bass' ? 'Bass' : 'Strings',
      folder: `${id}${suffix}`,
      samples: notes(files, { pick: (p) => p.includes(`.${way}.`), prefer }),
      trim: true,
      tail,
      ...(way === 'pizz' ? { peak: -1 } : {}),
      playing: { ...playing, polyphony: 32, notePolyphony: 2, offTime: 0.1 },
    });
}

await buildInstruments({
  id: 'iowa-strings',
  name: 'University of Iowa MIS: Solo Strings',
  license: LICENSE,
  credit: CREDIT,
  note: "Iowa's 2012 single notes (stereo AIFF), each from just before its attack until it falls to -60 dB, faded there, otherwise bit for bit.",
  downloads,
  instruments,
  out: arg('out', null),
});
