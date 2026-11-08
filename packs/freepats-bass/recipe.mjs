// `node packs/freepats-bass/recipe.mjs [--cache DIR] [--out DIR]`: the FreePats project's Bass Guitar YR
// (CC0), picked and fingered, written into packs/freepats-bass/pack.json and
// packs/freepats-bass/files.sha256: each played as its SFZ program plays it (a note a key), measured, the
// loudest at -17 dB at velocity 127, each note kept until it falls to -60 dB. The notes are taken out of
// the project's own 7z downloads.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { archiveProgram, buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/freepats-bass'));
const REL = 'https://github.com/freepats/electric-bass-YR/releases/download/2019-09-30/';
const downloads = new Downloads(cache, {}, {
  picked: { url: `${REL}PickedBassYR-SFZ+FLAC-20190930.7z` },
  finger: { url: `${REL}FingerBassYR-SFZ+FLAC-20190930.7z` },
});
const playing = { release: 0.2, attack: 0, oneShot: false, polyphony: 16, notePolyphony: 2, offTime: 0.08 };
const tail = { floor: -60, cap: 10, fade: 0.5 };

await buildInstruments({
  id: 'freepats-bass',
  name: 'FreePats Bass Guitar YR',
  license: 'CC0-1.0',
  credit: 'Bass Guitar YR of the FreePats project (CC0): an electric bass, picked and played with the fingers.',
  note: "The project's SFZ+FLAC downloads (7z), each note taken out, kept until it falls to -60 dB and faded there, otherwise bit for bit.",
  downloads,
  instruments: [
    { name: 'picked', title: 'Electric Bass (Picked)', category: 'Bass', folder: 'picked', samples: await archiveProgram(downloads, 'picked', 'PickedBassYR SFZ+FLAC-20190930/PickedBassYR 20190930.sfz'), tail, playing },
    { name: 'finger', title: 'Electric Bass (Fingered)', category: 'Bass', folder: 'finger', samples: await archiveProgram(downloads, 'finger', 'FingerBassYR SFZ+FLAC-20190930/FingerBassYR 20190930.sfz'), tail, playing },
  ],
  out: arg('out', null),
});
