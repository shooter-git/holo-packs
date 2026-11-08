// `node packs/erhu/recipe.mjs [--cache DIR]`: the erhu of the SFZ Instruments project (CC0), written
// into packs/erhu/pack.json and packs/erhu/files.sha256.
//
// A Chinese two-string fiddle, close miked in stereo:
// - long notes, two takes in turn (the library sets their level with the mod wheel; here velocity does);
// - short notes, four takes in turn.
// Played as the library's polyphonic programs play them (not its legato or unison voices), an octave
// up from where its SFZ maps them, so each key plays the note it names. Each is measured and set where
// one velocity curve meets it (the loudest at -17 dB).
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, library, programSamples } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/erhu'));
const lib = library('sfzinstruments/aliexpress-erhu', '6615047b2fd06126877483e97b8bb4af9d00b080');
const downloads = new Downloads(cache, { e: lib.base });
// the polyphonic regions (CC105 below 64, the default), without the unison voices CC100 brings in
const poly = (r) => r.hicc105 !== undefined && r.locc100 === undefined && r.trigger === undefined;
// the library maps each note an octave under where it sounds ("d5", 291 Hz, on key 50): here each key
// plays the note it names
const shift = 12;
const playing = { release: 0.25, attack: 0.01, oneShot: false, polyphony: 16, notePolyphony: 2, offTime: 0.1 };

const NOTE = `The library's WAVs at the pinned commit, each note kept until it falls to -60 dB and faded there, otherwise bit for bit.`;

await buildInstruments({
  id: 'erhu',
  name: 'Erhu',
  license: 'CC0-1.0',
  credit: 'The erhu of the SFZ Instruments project (CC0): a two-string Chinese fiddle, close miked in stereo.',
  note: NOTE,
  downloads,
  instruments: [
    { name: 'erhu', title: 'Erhu', category: 'Strings', samples: await programSamples(lib, 'Programs/02-erhu_long.sfz', { tag: 'e', keep: poly, shift }), tail: { floor: -60, cap: 30 }, range: 24, playing },
    { name: 'erhu_stac', title: 'Erhu (Short)', category: 'Strings', samples: await programSamples(lib, 'Programs/03-erhu_short.sfz', { tag: 'e', keep: poly, shift }), tail: { floor: -60, cap: 3, fade: 0.3 }, range: 24, playing },
  ],
});
