// `node packs/iowa-winds/recipe.mjs [--cache DIR] [--out DIR]`: the University of Iowa's 2012 woodwinds
// (free to use without restriction), written into packs/iowa-winds/pack.json and
// packs/iowa-winds/files.sha256.
//
// Flute (with and without vibrato), alto flute, bass flute, oboe, E♭ clarinet, bass clarinet, soprano
// and alto saxophones (with and without vibrato): every note fortissimo, in stereo. (The B♭ clarinet
// and bassoon, in three dynamics, are in the older iowa pack.) One layer a note: velocity sets its
// level, the loudest at -17 dB at velocity 127. Each note starts just before its attack and is kept
// until it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { BASE, CREDIT, LICENSE, notes, page } from '../../tools/iowa.mjs';
import { buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/iowa-winds'));
const downloads = new Downloads(cache, { iowa: BASE });
const WINDS = [
  ['flute', 'Flute', 'MISFlute2012', '.vib.'],
  ['flute_nonvib', 'Flute (No Vibrato)', 'MISFlute2012', '.nonvib.'],
  ['alto-flute', 'Alto Flute', 'MISaltoflute2012', '.'],
  ['bass-flute', 'Bass Flute', 'MISBassFlute2012', '.'],
  ['oboe', 'Oboe', 'MISOboe2012', '.'],
  ['eb-clarinet', 'E♭ Clarinet', 'MISEbClarinet2012', '.'],
  ['bass-clarinet', 'Bass Clarinet', 'MISBbBassClarinet2012', '.'],
  ['soprano-sax', 'Soprano Sax', 'MISBbSopranoSaxophone2012', '.vib.'],
  ['soprano-sax_nonvib', 'Soprano Sax (No Vibrato)', 'MISBbSopranoSaxophone2012', '.nonvib.'],
  ['alto-sax', 'Alto Sax', 'MISEbAltoSaxophone2012', '.vib.'],
  ['alto-sax_nonvib', 'Alto Sax (No Vibrato)', 'MISEbAltoSaxophone2012', '.NoVib.'],
];
const instruments = [];
for (const [name, title, pageName, way] of WINDS) {
  const files = await page(pageName);
  instruments.push({
    name,
    title,
    category: 'Woodwinds',
    folder: name,
    samples: notes(files, { pick: (p) => p.includes(way) }),
    trim: true,
    tail: { floor: -60, cap: 12, fade: 0.5 },
    playing: { release: 0.2, attack: 0.01, oneShot: false, polyphony: 24, notePolyphony: 2, offTime: 0.08 },
  });
}

await buildInstruments({
  id: 'iowa-winds',
  name: 'University of Iowa MIS: Woodwinds',
  license: LICENSE,
  credit: CREDIT,
  note: "Iowa's 2012 single notes (stereo AIFF), each from just before its attack until it falls to -60 dB, faded there, otherwise bit for bit.",
  downloads,
  instruments,
  out: arg('out', null),
});
