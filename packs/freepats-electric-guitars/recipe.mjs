// `node packs/freepats-electric-guitars/recipe.mjs [--cache DIR] [--out DIR]`: the FreePats project's FSBS
// electric guitars (CC0), written into packs/freepats-electric-guitars/pack.json and
// packs/freepats-electric-guitars/files.sha256.
//
// A Fender electric guitar sampled direct and played through an amplifier and effects: clean, jazz
// (warm and dark) and distorted, each from its bridge pickup, a soft and a hard layer with four takes in
// turn, as each SFZ program plays it, but dying away as a guitar's note does (its programs hold them on
// loops): each kept until it falls to -60 dB, 6 s at most, as 16-bit WAVs. The layers are measured and
// set where one velocity curve meets them, the loudest at -17 dB at velocity 127. The notes are taken out
// of the project's own 7z downloads.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { archiveProgram, buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/freepats-electric-guitars'));
const R = 'https://github.com/freepats/';
const downloads = new Downloads(cache, {}, {
  clean: { url: `${R}electric-guitar-FSBS-clean/releases/download/2026-08-07/EGuitarFSBS-clean-SFZ+FLAC-20260807.7z` },
  jazz: { url: `${R}electric-guitar-FSBS-jazz/releases/download/2026-08-07/EGuitarFSBS-jazz-SFZ+FLAC-20260807.7z` },
  dist2: { url: `${R}electric-guitar-FSBS-dist2/releases/download/2022-09-11/EGuitarFSBS-dist2-SFZ+FLAC-20220911.7z` },
});
const playing = { release: 0.4, attack: 0, oneShot: false, polyphony: 24, notePolyphony: 2, offTime: 0.1 };
const GUITARS = [
  ['clean', 'Electric Guitar (Clean)', 'clean', 'EGuitarFSBS-clean SFZ+FLAC-20260807/EGuitarFSBS-clean bridge 20260807.sfz'],
  ['jazz', 'Electric Guitar (Jazz)', 'jazz', 'EGuitarFSBS-jazz SFZ+FLAC-20260807/EGuitarFSBS-jazz bridge 20260807.sfz'],
  ['distorted', 'Electric Guitar (Distorted)', 'dist2', 'EGuitarFSBS-dist2 SFZ+FLAC-20220911/EGuitarFSBS-dist2 bridge 20220911.sfz'],
];
const instruments = [];
for (const [name, title, archive, sfz] of GUITARS) {
  // a guitar's note dies away: played as recorded (not held on the program's loop), up to 6 s
  const samples = (await archiveProgram(downloads, archive, sfz)).map(({ loop: _loop, ...s }) => s);
  // its two layers were recorded to one level: the program's own velocity splits
  instruments.push({ name, title, category: 'Guitar', folder: name, samples, layers: 'fixed', tail: { floor: -60, cap: 6, fade: 0.8 }, playing });
}

await buildInstruments({
  id: 'freepats-electric-guitars',
  name: 'FreePats Electric Guitars (FSBS)',
  license: 'CC0-1.0',
  credit: 'Electric Guitar FSBS of the FreePats project (CC0): a Fender electric guitar, clean, jazz and distorted.',
  note: "The project's SFZ+FLAC downloads (7z), each note taken out, kept until it falls to -60 dB (6 s at most) and faded there.",
  downloads,
  bits: 16,
  instruments,
  out: arg('out', null),
});
