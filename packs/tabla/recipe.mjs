// `node packs/tabla/recipe.mjs [--cache DIR] [--out DIR]`: tabla strokes on pads, written into
// packs/tabla/pack.json and packs/tabla/files.sha256, from two players:
// - *Tabla*: ten bols (Dha, Dhin, Ge, Ke, Na, Re, Ta, Te, Tin, Tu) recorded by Mihir Sarkar for One
//   Laptop per Child (CC BY 3.0), fetched one by one out of the published zip;
// - *Tabla, Strokes*: dio_333's strokes as Sonic Pi ships them (CC0, Freesound), takes in turn.
// Each set measured as a whole (its strokes' balance as recorded), the loudest at -17 dB at velocity
// 127; each kept until it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, padSet } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/tabla'));
const SONIC = 'https://raw.githubusercontent.com/sonic-pi-net/sonic-pi/d1393a06266f74dc216bfd8a7e9a8eb7135b4941/etc/samples/';
const downloads = new Downloads(cache, {
  mihir: 'https://archive.org/download/MihirSarkar/MihirSarkar44.zip/MihirSarkar44/',
  sonic: SONIC,
});
const bols = padSet(
  'tabla',
  ['Dha', 'Dhin', 'Ge', 'Ke', 'Na', 'Re', 'Ta', 'Te', 'Tin', 'Tu'].map((b) => [b.toLowerCase(), b, [{ download: `mihir:${b}.wav` }]]),
);
const sp = (...names) => names.map((n) => ({ download: `sonic:tabla_${n}.flac` }));
const strokes = padSet('strokes', [
  ['na', 'Na', sp('na')],
  ['na-open', 'Na open', sp('na_o')],
  ['na-s', 'Na s', sp('na_s')],
  ['tun', 'Tun', sp('tun1', 'tun2', 'tun3')],
  ['te', 'Te', sp('te1', 'te2')],
  ['te-m', 'Te m', sp('te_m')],
  ['te-ne', 'Te ne', sp('te_ne')],
  ['re', 'Re', sp('re')],
  ['tas', 'Tas', sp('tas1', 'tas2', 'tas3')],
  ['ke', 'Ke', sp('ke1', 'ke2', 'ke3')],
  ['ghe', 'Ghe', sp('ghe1', 'ghe2', 'ghe3', 'ghe4', 'ghe5', 'ghe6', 'ghe7', 'ghe8')],
  ['dhec', 'Dhec', sp('dhec')],
]);
const playing = { release: 0.3, attack: 0, oneShot: true, polyphony: 32, notePolyphony: 2, offTime: 0.05 };
const tail = { floor: -60, cap: 4, fade: 0.3 };

await buildInstruments({
  id: 'tabla',
  name: 'Tabla (OLPC, Sonic Pi)',
  license: 'CC-BY-3.0',
  credit:
    'Tabla bols by Mihir Sarkar for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/MihirSarkar), and ' +
    "dio_333's tabla strokes from Freesound as Sonic Pi ships them (CC0).",
  note: 'The 44.1 kHz WAVs of the OLPC zip, fetched one by one, and Sonic Pi\'s FLACs at the pinned commit, each kept until it falls to -60 dB and faded there, otherwise bit for bit.',
  downloads,
  instruments: [
    { name: 'tabla', title: 'Tabla', category: 'Percussion', pitched: false, peak: -1, ...bols, tail, range: 24, playing },
    { name: 'tabla_strokes', title: 'Tabla, Strokes', category: 'Percussion', pitched: false, peak: -1, ...strokes, tail, range: 24, playing },
  ],
  out: arg('out', null),
});
