// `node packs/headroom/recipe.mjs [--cache DIR] [--out DIR]`: Bengt Nilsson's Headroom Piano (CC BY 4.0),
// as the SFZ Instruments project publishes it (kinwie's mapping, in FLAC), written into
// packs/headroom/pack.json and packs/headroom/files.sha256.
//
// A Yamaha C3 grand recorded from two places at once, a close pair and a Decca tree, in five velocity
// layers every minor third from A0. Two instruments:
// - *Yamaha C3 Grand*: both, as the library plays them unless told otherwise (the close pair at full
//   level, the tree at half), mixed into one stereo file a note;
// - *Yamaha C3 Grand, Close*: the close pair alone, drier and nearer.
// The layers are measured and set where one velocity curve meets them, each instrument's loudest at
// -16.4 dB (as the Steinway's); each note is kept until it falls to -58 dB (20 s at most) and faded there.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/headroom'));
const REPO = 'sfzinstruments/BengtNilsson.HeadroomPiano';
const COMMIT = '2a7df3f7252227a3484202c1d61bc1bfe352a971';
const downloads = new Downloads(cache, { hr: `https://raw.githubusercontent.com/${REPO}/${COMMIT}/Samples/` });

/** A damper stops a bass string more slowly than a treble one (as the Steinway's). */
const damperTime = (key) => Math.round((0.12 + 0.38 * Math.min(1, Math.max(0, (96 - key) / 75))) * 1000) / 1000;
const file = (layer, mic, key) => `hr:HEADROOM PIANO LEVEL${layer} ${mic} ${key}.flac`;
const KEYS = [];
for (let key = 21; key <= 108; key += 3) KEYS.push(key);

const notes = (mics) =>
  KEYS.flatMap((key) =>
    [1, 2, 3, 4, 5].map((layer) => ({
      inputs: mics.map(([mic, g]) => [file(layer, mic, key), g, g]),
      file: `${key}_v${layer}`,
      root: key,
      lo: key === 21 ? 0 : key - 1,
      hi: key === 108 ? 127 : key + 1,
      layer,
      release: damperTime(key),
    })),
  );
const playing = { release: 0.3, attack: 0, oneShot: false, polyphony: 128, notePolyphony: 2, offTime: 0.12, undamped: 90 };
const tail = { floor: -58, cap: 20, fade: 1.5 };

await buildInstruments({
  id: 'headroom',
  name: 'Headroom Piano (Yamaha C3)',
  license: 'CC-BY-4.0',
  credit:
    'Headroom Piano by Bengt Nilsson (CC BY 4.0), mapped in FLAC by kinwie for the SFZ Instruments project: a Yamaha ' +
    'C3 grand from a close pair and a Decca tree. Mixed and trimmed for HO[LO]: each note ends where it falls to -58 dB.',
  note: "Headroom Piano's samples (FLAC, at the pinned commit): its close pair and Decca tree mixed as the library plays them, each note kept until it falls to -58 dB (20 s at most) and faded there.",
  downloads,
  level: -16.4,
  instruments: [
    {
      name: 'grand',
      title: 'Yamaha C3 Grand',
      category: 'Piano',
      folder: 'grand',
      samples: notes([
        ['CLOSE', 1],
        ['DECCA', 0.5],
      ]),
      tail,
      playing,
    },
    {
      name: 'grand-close',
      title: 'Yamaha C3 Grand, Close',
      category: 'Piano',
      folder: 'close',
      samples: notes([['CLOSE', 1]]),
      tail,
      playing,
    },
  ],
  out: arg('out', null),
});
