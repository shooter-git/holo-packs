// `node packs/iowa-percussion/recipe.mjs [--cache DIR] [--out DIR]`: the University of Iowa's 2012
// percussion (free to use without restriction), written into packs/iowa-percussion/pack.json and
// packs/iowa-percussion/files.sha256.
//
// - *Thai Gongs*: thirteen tuned gongs, C4 to C5, played by pitch.
// - On pads: tam-tams (22", 28", 40") and a 20" wind gong, struck and bowed; suspended cymbals (crash,
//   Chinese, ride, splash, struck with a stick, a mallet's roll, choked) and five orchestral crash
//   pairs; hand percussion (woodblocks, granite blocks, claves, guiro, castanets, triangles); three
//   tambourines played five ways.
// Every sound fortissimo, in stereo, starting just before its attack and kept until it falls to -60 dB.
// Each set is measured as a whole (its sounds' balance as recorded), the loudest at -17 dB at velocity
// 127 (less where a strike would peak over -1 dB).
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { BASE, CREDIT, LICENSE, iowaPads, notes, page } from '../../tools/iowa.mjs';
import { buildInstruments, padSet } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/iowa-percussion'));
const downloads = new Downloads(cache, { iowa: BASE });
const gongs = await page('MISGongsTamTams2012');
const cymbals = await page('MISCymbals2012');
const hand = await page('MISHandPercussion2012');
const tambs = await page('MISTambourines2012');
const find = (list, end) => {
  const hit = list.filter((p) => p.endsWith(`/${end}.stereo.aif`));
  if (hit.length !== 1) throw new Error(`${end}: ${hit.length} files`);
  return hit[0];
};
const set = (folder, list, pieces) => padSet(folder, iowaPads(folder, pieces.map(([piece, title, end]) => [piece, title, find(list, end)])));
const ring = { release: 1, attack: 0, oneShot: false, polyphony: 32, notePolyphony: 2, offTime: 0.15 };
const hit = { release: 0.2, attack: 0, oneShot: true, polyphony: 32, notePolyphony: 2, offTime: 0.05 };
const common = { category: 'Percussion', pitched: false, trim: true, peak: -1 };

const tamtams = set('tamtams', gongs, [
  ['tam-tam-22', 'Tam-tam 22″', '22tamtam.ff'],
  ['tam-tam-28', 'Tam-tam 28″', '28tamtam.ff'],
  ['tam-tam-40', 'Tam-tam 40″', '40tamtam.ff'],
  ['wind-gong-20', 'Wind gong 20″', '20windgong.ff'],
  ['tam-tam-22-bowed', 'Tam-tam 22″ bowed', '22tamtam.bow'],
  ['tam-tam-28-bowed', 'Tam-tam 28″ bowed', '28tamtam.bow'],
  ['tam-tam-40-bowed', 'Tam-tam 40″ bowed', '40tamtam.bow'],
  ['wind-gong-20-bowed', 'Wind gong 20″ bowed', '20windgong.bow'],
]);
const cym = set('cymbals', cymbals, [
  ['crash-13', 'Crash 13″', '13crash.stick.normal.ff'],
  ['crash-17', 'Crash 17″', '17crash.stick.normal.ff'],
  ['crash-18', 'Crash 18″', '18crash.stick.normal.ff'],
  ['crash-20', 'Crash 20″', '20crash.stick.normal.ff'],
  ['chinese-16', 'Chinese 16″', '16chinese.stick.normal.ff'],
  ['chinese-19', 'Chinese 19″', '19chinese.stick.normal.ff'],
  ['ride-21', 'Ride 21″', '21ride.stick.normal.ff'],
  ['ride-21-bell', 'Ride 21″ bell', '21ride.stick.bell.ff'],
  ['splash', 'Splash', 'splash.stick.normal.ff'],
  ['crash-18-roll', 'Crash 18″ roll', '18crash.mallet.roll'],
  ['ride-21-roll', 'Ride 21″ roll', '21ride.mallet.roll'],
  ['crash-18-choke', 'Crash 18″ choke', '18crash.chokecrash'],
  ['orch-crash-15-banda-turka', 'Orch crash 15″ banda turka', '15orchcrash.bandaturka.ff'],
  ['orch-crash-17-medium-heavy', 'Orch crash 17″ medium heavy', '17orchcrash.medheavy.ff'],
  ['orch-crash-18-french', 'Orch crash 18″ French', '18orchcrash.french.ff'],
  ['orch-crash-18-germanic', 'Orch crash 18″ Germanic', '18orchcrash.germanic.ff'],
  ['orch-crash-18-viennese', 'Orch crash 18″ Viennese', '18orchcrash.viennese.ff'],
]);
const handset = set('hand', hand, [
  ['woodblock-5', 'Woodblock 5½″', '5.5wb.ff'],
  ['woodblock-6', 'Woodblock 6½″', '6.5wb.ff'],
  ['woodblock-7', 'Woodblock 7″', '7wb.ff'],
  ['woodblock-8', 'Woodblock 8½″', '8.5wb.ff'],
  ['woodblock-10', 'Woodblock 10″', '10wb.ff'],
  ['granite-block-1', 'Granite block 1', 'graniteblock1.ff'],
  ['granite-block-3', 'Granite block 3', 'graniteblock3.ff'],
  ['granite-block-5', 'Granite block 5', 'graniteblock5.ff'],
  ['clave-1', 'Clave 1', 'clave1.ff'],
  ['clave-4', 'Clave 4', 'clave4.ff'],
  ['guiro-away', 'Guiro away', 'guiro.away.ff'],
  ['guiro-toward', 'Guiro toward', 'guiro.toward.ff'],
  ['castanet-1', 'Castanet 1', 'castanet1.ff'],
  ['castanet-2', 'Castanet 2', 'castanet2.ff'],
  ['triangle-6', 'Triangle 6″', '6triangle.ff'],
  ['triangle-8', 'Triangle 8″', '8triangle.ff'],
  ['triangle-6-roll', 'Triangle 6″ roll', '6triangle.roll.ff'],
  ['triangle-8-roll', 'Triangle 8″ roll', '8triangle.roll.ff'],
]);
const tamb = set('tambourines', tambs, [
  ['tambourine-1', 'Tambourine 1', 'tambourine1.normal.ff'],
  ['tambourine-2', 'Tambourine 2', 'tambourine2.normal.ff'],
  ['tambourine-3', 'Tambourine 3', 'tambourine3.normal.ff'],
  ['tambourine-1-sforzando', 'Tambourine 1 sforzando', 'tambourine1.sforzando'],
  ['tambourine-1-shake-roll', 'Tambourine 1 shake roll', 'tambourine1.shakeroll.ff'],
  ['tambourine-1-thumb-roll', 'Tambourine 1 thumb roll', 'tambourine1.thumbroll.ff'],
  ['tambourine-1-finger-roll', 'Tambourine 1 finger roll', 'tambourine1.fingerroll.ff'],
]);

await buildInstruments({
  id: 'iowa-percussion',
  name: 'University of Iowa MIS: Percussion and Thai Gongs',
  license: LICENSE,
  credit: CREDIT,
  note: "Iowa's 2012 single sounds (stereo AIFF), each from just before its attack until it falls to -60 dB, faded there, otherwise bit for bit.",
  downloads,
  instruments: [
    {
      name: 'thai-gongs',
      title: 'Thai Gongs',
      category: 'Percussion',
      folder: 'thai-gongs',
      samples: notes(gongs, { pick: (p) => p.includes('/Thai Gongs/') }),
      trim: true,
      peak: -1,
      tail: { floor: -60, cap: 15, fade: 1 },
      playing: ring,
    },
    { ...common, name: 'tamtams', title: 'Tam-tams and Wind Gong', ...tamtams, tail: { floor: -60, cap: 25, fade: 2 }, playing: ring },
    { ...common, name: 'cymbals', title: 'Suspended and Orchestral Cymbals', ...cym, tail: { floor: -60, cap: 15, fade: 1 }, playing: ring },
    { ...common, name: 'hand', title: 'Hand Percussion', ...handset, tail: { floor: -60, cap: 6, fade: 0.3 }, playing: hit },
    { ...common, name: 'tambourines', title: 'Tambourines', ...tamb, tail: { floor: -60, cap: 6, fade: 0.3 }, playing: hit },
  ],
  out: arg('out', null),
});
