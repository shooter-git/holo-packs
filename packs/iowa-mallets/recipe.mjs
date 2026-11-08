// `node packs/iowa-mallets/recipe.mjs [--cache DIR] [--out DIR]`: the University of Iowa's 2012 mallet
// percussion (free to use without restriction), written into packs/iowa-mallets/pack.json and
// packs/iowa-mallets/files.sha256.
//
// Marimba (yarn, cord and rubber mallets, rolled, dead strokes), xylophone (hard rubber and rosewood,
// struck and rolled), vibraphone (ringing, damped, short, bowed), glockenspiel (plastic and brass
// mallets) and crotales: every note fortissimo, in stereo. One layer a note: velocity sets its level,
// the loudest at -17 dB at velocity 127 (less where a strike would peak over -1 dB). Each note starts
// just before its attack and is kept until it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { BASE, CREDIT, LICENSE, notes, page } from '../../tools/iowa.mjs';
import { buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/iowa-mallets'));
const downloads = new Downloads(cache, { iowa: BASE });
const MALLETS = [
  ['marimba', 'Marimba', 'MISMarimba2012', '.yarn.', 1.2],
  ['marimba_cord', 'Marimba (Cord Mallets)', 'MISMarimba2012', '.cord.', 1.2],
  ['marimba_rubber', 'Marimba (Rubber Mallets)', 'MISMarimba2012', '.rubber.', 1.2],
  ['marimba_roll', 'Marimba (Roll)', 'MISMarimba2012', '.roll.', 0.4],
  ['marimba_dead', 'Marimba (Dead Strokes)', 'MISMarimba2012', '.deadstroke.', 0.1],
  ['xylophone', 'Xylophone', 'MISxylophone2012', 'hardrubber.ff.', 0.6],
  ['xylophone_rosewood', 'Xylophone (Rosewood Mallets)', 'MISxylophone2012', 'rosewood.ff.', 0.6],
  ['xylophone_roll', 'Xylophone (Roll)', 'MISxylophone2012', 'hardrubber.roll.', 0.3],
  ['vibraphone', 'Vibraphone', 'MISVibraphone2012', '.sustain.', 2],
  ['vibraphone_damped', 'Vibraphone (Damped)', 'MISVibraphone2012', '.dampen.', 0.1],
  ['vibraphone_short', 'Vibraphone (Short)', 'MISVibraphone2012', '.shortsustain.', 0.4],
  ['vibraphone_bowed', 'Vibraphone (Bowed)', 'MISVibraphone2012', '.bow.', 1.5],
  ['glockenspiel', 'Glockenspiel', 'MISBells2012', '.plastic.', 1.5],
  ['glockenspiel_brass', 'Glockenspiel (Brass Mallets)', 'MISBells2012', '.brass.', 1.5],
  ['crotales', 'Crotales', 'MISCrotales2012', '.', 2],
];
const instruments = [];
for (const [name, title, pageName, way, release] of MALLETS) {
  const files = await page(pageName);
  instruments.push({
    name,
    title,
    category: 'Percussion',
    folder: name,
    samples: notes(files, { pick: (p) => p.includes(way) }),
    trim: true,
    // a bowed bar swells: its loudness over its first 3 s
    ...(way === '.bow.' ? { window: 3 } : {}),
    peak: -1,
    tail: { floor: -60, cap: 10, fade: 0.5 },
    playing: { release, attack: 0, oneShot: false, polyphony: 48, notePolyphony: 2, offTime: 0.08 },
  });
}

await buildInstruments({
  id: 'iowa-mallets',
  name: 'University of Iowa MIS: Mallets',
  license: LICENSE,
  credit: CREDIT,
  note: "Iowa's 2012 single notes (stereo AIFF), each from just before its attack until it falls to -60 dB, faded there, otherwise bit for bit.",
  downloads,
  instruments,
  out: arg('out', null),
});
