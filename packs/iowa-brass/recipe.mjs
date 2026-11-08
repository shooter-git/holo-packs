// `node packs/iowa-brass/recipe.mjs [--cache DIR] [--out DIR]`: the University of Iowa's 2012 brass
// (free to use without restriction), written into packs/iowa-brass/pack.json and
// packs/iowa-brass/files.sha256.
//
// French horn, trumpet (with and without vibrato), tenor and bass trombones and tuba: every note
// fortissimo, in stereo. One layer a note: velocity sets its level, the loudest at -17 dB at velocity
// 127 (measured over a note's first second: a held note swells). Each note starts just before its attack and is kept until it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { BASE, CREDIT, LICENSE, notes, page } from '../../tools/iowa.mjs';
import { buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/iowa-brass'));
const downloads = new Downloads(cache, { iowa: BASE });
const BRASS = [
  ['horn', 'French Horn', 'MISHorn2012', '.'],
  ['trumpet', 'Trumpet', 'MISBbTrumpet2012', '.vib.'],
  ['trumpet_novib', 'Trumpet (No Vibrato)', 'MISBbTrumpet2012', '.novib.'],
  ['trombone', 'Tenor Trombone', 'MISTenorTrombone2012', '.'],
  ['bass-trombone', 'Bass Trombone', 'MISBassTrombone2012', '.'],
  ['tuba', 'Tuba', 'MISTuba2012', '.'],
];
const instruments = [];
for (const [name, title, pageName, way] of BRASS) {
  const files = await page(pageName);
  instruments.push({
    name,
    title,
    category: 'Brass',
    folder: name,
    samples: notes(files, { pick: (p) => p.includes(way) }),
    trim: true,
    // a held note swells after its attack: its loudness over its first second
    window: 1,
    tail: { floor: -60, cap: 12, fade: 0.5 },
    playing: { release: 0.2, attack: 0.01, oneShot: false, polyphony: 24, notePolyphony: 2, offTime: 0.08 },
  });
}

await buildInstruments({
  id: 'iowa-brass',
  name: 'University of Iowa MIS: Brass',
  license: LICENSE,
  credit: CREDIT,
  note: "Iowa's 2012 single notes (stereo AIFF), each from just before its attack until it falls to -60 dB, faded there, otherwise bit for bit.",
  downloads,
  instruments,
  out: arg('out', null),
});
