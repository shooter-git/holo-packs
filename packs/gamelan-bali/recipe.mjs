// `node packs/gamelan-bali/recipe.mjs [--cache DIR] [--out DIR]`: a Balinese gamelan recorded by Akito
// van Troyer for One Laptop per Child (CC BY 3.0), written into packs/gamelan-bali/pack.json and
// packs/gamelan-bali/files.sha256.
//
// Its five tones (1 2 3 5 6) on white keys from C, octaves rising left to right as the Javanese pack
// lays them out, each recording played as it is (a gamelan's tuning is its own): the jegogan, calung,
// gangsa pemade and kantilan, and the reyong; the gong, kempur, kemong and kempli on pads. Each
// instrument's level is measured, its loudest at -17 dB at velocity 127, and each note kept until it
// falls to -60 dB. The files are fetched one by one out of the published zip (archive.org serves them).
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, padSet } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/gamelan-bali'));
const downloads = new Downloads(cache, {
  akito: 'https://archive.org/download/AkitoVanTroyer/AkitoVanTroyer44.zip/AkitoVanTroyer44/',
});
const WHITE = [0, 2, 4, 5, 7, 9, 11];
const whiteKey = (place) => 60 + 12 * Math.floor(place / 7) + WHITE[((place % 7) + 7) % 7];
const TONES = [1, 2, 3, 5, 6];

/** A keyed instrument: recordings "<name><register><tone>" (registers lo, mid, hi: -1, 0, 1). */
function keyed(name, registers) {
  const out = [];
  for (const [reg, at] of Object.entries(registers))
    for (const tone of TONES) {
      const key = whiteKey(at * TONES.length + TONES.indexOf(tone));
      out.push({ download: `akito:${name}${reg}${tone}.wav`, root: key, lo: key, hi: key, layer: 1, rr: 1 });
    }
  return out;
}
// what the set has: every tone of each register but the gaps below
const have = new Set(
  'calung1 calung2 calung3 calung5 calung6 gangsahi1 gangsalo2 gangsalo3 gangsalo5 gangsalo6 gangsamid1 gangsamid2 gangsamid3 gangsamid5 gangsamid6 higangsahi1 higangsalo2 higangsalo3 higangsalo5 higangsalo6 higangsamid1 higangsamid2 higangsamid3 higangsamid5 higangsamid6 jegogan1 jegogan2 jegogan3 jegogan5 jegogan6 reyonghi1 reyonghi2 reyonghi3 reyonghi5 reyonglo3 reyonglo5 reyonglo6 reyongmid1 reyongmid2 reyongmid3 reyongmid5 reyongmid6'.split(' '),
);
const only = (samples) => samples.filter((s) => have.has(s.download.slice(6, -4)));
const tail = { floor: -60, cap: 20, fade: 1 };
const ringing = { release: 0.8, attack: 0, oneShot: false, polyphony: 48, notePolyphony: 2, offTime: 0.15 };
const common = { category: 'Percussion', checkPitch: false, tail, playing: ringing };
const gongs = padSet('gongs', [
  ['gong', 'Gong', [{ download: 'akito:gong.wav' }]],
  ['kempur', 'Kempur', [{ download: 'akito:kempur.wav' }]],
  ['kempur-2', 'Kempur 2', [{ download: 'akito:kempur2.wav' }]],
  ['kemong', 'Kemong', [{ download: 'akito:kemong.wav' }]],
  ['kempli', 'Kempli', [{ download: 'akito:kempli.wav' }]],
]);

await buildInstruments({
  id: 'gamelan-bali',
  name: 'Balinese Gamelan (OLPC)',
  license: 'CC-BY-3.0',
  credit:
    'Balinese gamelan samples by Akito van Troyer for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/AkitoVanTroyer).',
  note: 'The 44.1 kHz WAVs of the published zip, fetched one by one, each kept until it falls to -60 dB and faded there, otherwise bit for bit.',
  downloads,
  instruments: [
    { ...common, name: 'jegogan', title: 'Jegogan', folder: 'jegogan', samples: keyed('jegogan', { '': -1 }) },
    { ...common, name: 'calung', title: 'Calung', folder: 'calung', samples: keyed('calung', { '': 0 }) },
    { ...common, name: 'gangsa-pemade', title: 'Gangsa Pemade', folder: 'gangsa', samples: only(keyed('gangsa', { lo: -1, mid: 0, hi: 1 })) },
    { ...common, name: 'gangsa-kantilan', title: 'Gangsa Kantilan', folder: 'kantilan', samples: only(keyed('higangsa', { lo: 0, mid: 1, hi: 2 })) },
    { ...common, name: 'reyong', title: 'Reyong', folder: 'reyong', samples: only(keyed('reyong', { lo: -1, mid: 0, hi: 1 })) },
    { ...common, name: 'gongs', title: 'Gong, Kempur, Kemong, Kempli', pitched: false, ...gongs, tail: { ...tail, cap: 30 } },
  ],
  out: arg('out', null),
});
