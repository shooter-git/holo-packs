// `node packs/gamelan-java/recipe.mjs [--cache DIR] [--out DIR]`: the Javanese gamelan of Casa da
// Música, Porto (Digitópia; Artistic License 2.0), written into packs/gamelan-java/pack.json and
// packs/gamelan-java/files.sha256.
//
// A full Javanese gamelan in both its tunings, pelog (seven tones) and slendro (five), recorded by
// Pedro Augusto and Rui Penha. Laid out as the library's own instrument lays it out: each tone on a
// white key from C, numbers and octaves rising left to right, so a player reads the gamelan's own
// cipher on the keys. Every key plays its recording as it is, untransposed: a gamelan's tuning is its
// own, not the piano's.
// - keyed instruments, one an instrument and tuning: bonang barung and penerus, gendèr barung and
//   penerus, slenthem, gambang, saron demung, barung and peking, kenong (open and damped), kempul (hit
//   soft and hard, as velocity layers);
// - hand percussion on pads: the kethuk and kempyang (open and damped), the gong ageng and suwukan
//   (soft and hard), the kendhang's strokes.
// Each instrument's level is measured, its loudest at -17 dB at velocity 127; each note is kept until it
// falls to -60 dB (a gong's long ring, 30 s at most) and faded there.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { githubTree } from '../../tools/kit.mjs';
import { buildInstruments } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/gamelan-java'));
const REPO = 'Digitopia/CDM-GAMELAN-SAMPLE-LIBRARY';
const COMMIT = '2c71a7d49b36c4962b2421273e8cb06aeddf157e';
const downloads = new Downloads(cache, { cdm: `https://raw.githubusercontent.com/${REPO}/${COMMIT}/` });
// the library's paths are as macOS wrote them, accents decomposed (NFD)
const DIR = 'Gamelao_CdM/WAV/Gamelão da Casa Da Música - Porto, Portugal'.normalize('NFD');
const paths = (await githubTree(REPO, COMMIT, downloads)).filter((p) => p.startsWith(`${DIR}/`) && p.endsWith('.wav'));
const file = (folder, stem) => {
  const p = `${DIR}/${folder}/${stem}.wav`;
  if (!paths.includes(p)) throw new Error(`${p} isn't in the library`);
  return `cdm:${p}`;
};
const stems = (folder) =>
  paths.filter((p) => p.startsWith(`${DIR}/${folder}/`)).map((p) => p.slice(p.lastIndexOf('/') + 1, -4));

const WHITE = [0, 2, 4, 5, 7, 9, 11];
/** The white key a tone's place on the instrument lands on (place 0 on C4). */
const whiteKey = (place) => 60 + 12 * Math.floor(place / 7) + WHITE[((place % 7) + 7) % 7];
const REGISTER = { ll: -2, l: -1, '': 0, h: 1, hh: 2 };

/**
 * A keyed instrument: its recordings named <prefix><tone><register><extra> ("BBPL3h": bonang barung,
 * pelog, tone 3, the octave up). Its tones go on white keys in order (each octave's tones, then the
 * next octave's), its middle register's first tone on C4. `extra` picks recordings by their ending
 * (a kenong's "s", damped) and `layers` names the endings that are velocity layers (a kempul's p, f).
 */
function keyed(folder, prefix, { extra = '', layers = null } = {}) {
  const re = new RegExp(`^${prefix}(\\d)(ll|l|hh|h|)(${layers ? layers.join('|') : extra})$`);
  const tones = stems(folder)
    .map((s) => ({ s, m: re.exec(s) }))
    .filter((x) => x.m)
    .map(({ s, m }) => ({ s, tone: Number(m[1]), reg: REGISTER[m[2]], layer: layers ? layers.indexOf(m[3]) + 1 : 1 }));
  if (!tones.length) throw new Error(`No ${prefix} recordings in ${folder}`);
  const degrees = [...new Set(tones.map((t) => t.tone))].sort((a, b) => a - b);
  const n = degrees.length;
  return tones.map((t) => {
    const key = whiteKey(t.reg * n + degrees.indexOf(t.tone));
    return { download: file(folder, t.s), root: key, lo: key, hi: key, layer: t.layer, rr: 1 };
  });
}

/** A pad set: each piece's recordings (one, or soft and hard as layers) on its own pad. */
function pads(name, folder, pieces) {
  const samples = [];
  const padList = [];
  pieces.forEach(([piece, title, files], i) => {
    const key = 36 + i;
    padList.push({ key, name: title });
    files.forEach(([f, stem], layer) =>
      samples.push({ download: file(f, stem), out: `${name}/${piece}/${stem}.wav`, root: key, lo: key, hi: key, layer: layer + 1 }),
    );
  });
  return { samples, pads: padList };
}

const TUNINGS = [
  ['PL', 'pelog', 'Pelog'],
  ['SL', 'slendro', 'Slendro'],
];
const KEYED = [
  ['bonang-barung', 'Bonang Barung', 'BONANG', 'BB'],
  ['bonang-penerus', 'Bonang Penerus', 'BONANG', 'BP'],
  ['gender-barung', 'Gendèr Barung', 'GENDER', 'GB'],
  ['gender-penerus', 'Gendèr Penerus', 'GENDER', 'GP'],
  ['slenthem', 'Slenthem', 'GENDER', 'GS'],
  ['gambang', 'Gambang', 'GAMBANG', 'G'],
  ['saron-demung', 'Saron Demung', 'SARON', 'SD'],
  ['saron-barung', 'Saron Barung', 'SARON', 'SB'],
  ['saron-peking', 'Saron Peking', 'SARON', 'SP'],
];
const ringing = { release: 1.2, attack: 0, oneShot: false, polyphony: 48, notePolyphony: 2, offTime: 0.2 };
const struck = { release: 0.08, attack: 0, oneShot: true, polyphony: 32, notePolyphony: 2, offTime: 0.05 };
const tail = { floor: -60, cap: 30, fade: 1.5 };
const common = { category: 'Percussion', checkPitch: false, tail };

const instruments = [];
for (const [code, id, scale] of TUNINGS) {
  for (const [name, title, folder, prefix] of KEYED)
    instruments.push({ ...common, name: `${name}-${id}`, title: `${title} (${scale})`, folder: `${name}-${id}`, samples: keyed(folder, `${prefix}${code}`), playing: ringing });
  // a kenong's ringing strokes end in "s" (5 to 9 s long); the others are damped (about 1 s)
  instruments.push({ ...common, name: `kenong-${id}`, title: `Kenong (${scale})`, folder: `kenong-${id}`, samples: keyed('KENONG', `K${code}`, { extra: 's' }), playing: ringing });
  instruments.push({ ...common, name: `kenong-${id}_damped`, title: `Kenong (${scale}, Damped)`, folder: `kenong-${id}-damped`, samples: keyed('KENONG', `K${code}`), playing: struck });
  instruments.push({ ...common, name: `kempul-${id}`, title: `Kempul (${scale})`, folder: `kempul-${id}`, samples: keyed('GONG', `GK${code}`, { layers: ['p', 'f'] }), playing: ringing });
}
// as the kenong's: the strokes ending "s" ring, the others are damped
const kk = pads('kethuk-kempyang', 'KETHUK', [
  ['kethuk-pelog', 'Kethuk pelog', [['KETHUK', 'KtPL6s']]],
  ['kethuk-pelog-damped', 'Kethuk pelog damped', [['KETHUK', 'KtPL6']]],
  ['kethuk-slendro', 'Kethuk slendro', [['KETHUK', 'KtSL2s']]],
  ['kethuk-slendro-damped', 'Kethuk slendro damped', [['KETHUK', 'KtSL2']]],
  ['kempyang-pelog', 'Kempyang pelog', [['KEMPYANG', 'KpPL6s']]],
  ['kempyang-pelog-damped', 'Kempyang pelog damped', [['KEMPYANG', 'KpPL6']]],
  ['kempyang-slendro', 'Kempyang slendro', [['KEMPYANG', 'KpSL1s']]],
  ['kempyang-slendro-damped', 'Kempyang slendro damped', [['KEMPYANG', 'KpSL1']]],
]);
instruments.push({ ...common, name: 'kethuk-kempyang', title: 'Kethuk and Kempyang', pitched: false, ...kk, playing: ringing });
const gongs = pads('gongs', 'GONG', [
  ['gong-ageng', 'Gong ageng', [['GONG', 'GAp'], ['GONG', 'GAf']]],
  ['gong-suwukan', 'Gong suwukan', [['GONG', 'GSp'], ['GONG', 'GSf']]],
]);
instruments.push({ ...common, name: 'gongs', title: 'Gong Ageng and Suwukan', pitched: false, ...gongs, tail: { ...tail, cap: 40 }, playing: ringing });
const kendhang = pads('kendhang', 'CIBLON_TAMBOR_MEDIO', [
  ['ciblon-dlang', 'Ciblon dlang', [['DRUMS/CIBLON_TAMBOR_MEDIO', 'DLANG']]],
  ['ciblon-lung', 'Ciblon lung', [['DRUMS/CIBLON_TAMBOR_MEDIO', 'LUNG']]],
  ['ciblon-tak', 'Ciblon tak', [['DRUMS/CIBLON_TAMBOR_MEDIO', 'TAK']]],
  ['ciblon-thung', 'Ciblon thung', [['DRUMS/CIBLON_TAMBOR_MEDIO', 'THUNG']]],
  ['ciblon-tong', 'Ciblon tong', [['DRUMS/CIBLON_TAMBOR_MEDIO', 'TONG']]],
  ['ketipung-dhung', 'Ketipung dhung', [['DRUMS/KETIPUNG_TAMBOR PEQUENO', 'DHUNG']]],
  ['ketipung-tak', 'Ketipung tak', [['DRUMS/KETIPUNG_TAMBOR PEQUENO', 'TAK']]],
  ['ageng-dha', 'Ageng dha', [['DRUMS/KENDHANG AGENG', 'DHA']]],
]);
instruments.push({ ...common, name: 'kendhang', title: 'Kendhang', pitched: false, ...kendhang, tail: { floor: -60, cap: 4, fade: 0.3 }, playing: struck });

await buildInstruments({
  id: 'gamelan-java',
  name: 'Javanese Gamelan (Casa da Música)',
  license: 'Artistic-2.0',
  credit:
    "Casa da Música's Virtual Gamelan by Digitópia, Casa da Música, Porto (Artistic License 2.0): its Javanese gamelan in " +
    'pelog and slendro, recorded by Pedro Augusto and Rui Penha, edited by Pedro Augusto.',
  note: "The library's WAVs at the pinned commit, each kept until it falls to -60 dB and faded there, otherwise bit for bit.",
  downloads,
  instruments,
  out: arg('out', null),
});
