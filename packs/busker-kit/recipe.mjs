// `node packs/busker-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Busker Kit pack, made from the
// Buskman's Holiday kit of AVL Drumkits by Glen MacArthur (CC BY-SA 3.0, with the library's own
// exception): a street percussionist's kit, a Meinl cajon for the kick and snare, two congas played with
// either hand, shakers and tambourines for the hi-hat, claves, a Paiste cymbal, a cowbell, a foot stomp,
// a 20-litre bucket, bell trees, hand claps and finger snaps. Ten velocity layers a piece (five for the
// bell trees), each hit one mono file, placed at the library's own pan (the percussionist's point of view).
//
// The library maps it as a stand-in for a drum kit (the cajon's bass on the kick's key, its slaps on the
// snare's, the shaker and tambourines on the hi-hat's, the congas on the toms'), and its keys are kept:
// a drum part played on it comes out as the busker's version. It has no drum kit's hi-hat or snare, so it
// is a set of percussion on pads rather than a General MIDI kit.
//
// The licence asks that a modified version of the library go under a name of its own: this is the
// Busker Kit, the library named in its credit.
import { avlKit } from '../../tools/avl.mjs';

const conga = { kind: 'hand', ring: 2, fade: 0.5 };
const cymbal = { kind: 'cymbal', ring: 6, fade: 1.6 };
await avlKit({
  id: 'busker-kit',
  name: 'Busker Kit',
  title: 'Busker Kit',
  credit:
    'Made from AVL Drumkits by Glen MacArthur (CC BY-SA 3.0; music made with it can be licensed freely): its ' +
    "Buskman's Holiday kit, a Meinl cajon, Meinl congas, shakers, tambourines, claves, a Paiste cymbal, a cowbell, " +
    "a stomp, a bucket and bell trees. Placed for HO[LO] at the library's own pans.",
  note: "AVL Drumkits' Buskman's Holiday, one mono WAV a hit, each placed at the library's pan.",
  folder: 'busker',
  category: 'Percussion',
  zip: { name: 'busker', url: 'https://www.bandshed.net/sounds/AVLDrumkits_SFZ/BUSKMANS_HOLIDAY_SFZ.zip' },
  dir: 'BUSKMANS_HOLIDAY_SFZ',
  sfz: 'Buskmans_Holiday.sfz',
  map: {
    35: { name: 'stick-click', title: 'Stick click', keys: [35], kind: 'stroke' },
    36: { name: 'cajon-bass', title: 'Cajon bass', keys: [36], kind: 'kick' },
    37: { name: 'snaps', title: 'Finger snaps', keys: [37], kind: 'hand' },
    38: { name: 'cajon-slap-left', title: 'Cajon slap left', keys: [38], kind: 'snare' },
    39: { name: 'claps', title: 'Hand claps', keys: [39], kind: 'hand' },
    40: { name: 'cajon-slap-right', title: 'Cajon slap right', keys: [40], kind: 'snare', leadsRange: false },
    41: { name: 'conga-low-left', title: 'Low conga left', keys: [41], ...conga, leadsRange: true },
    42: { name: 'shaker', title: 'Shaker', keys: [42], kind: 'hand' },
    43: { name: 'conga-low-right', title: 'Low conga right', keys: [43], ...conga },
    44: { name: 'tambourine-shake', title: 'Tambourine shake', keys: [44], kind: 'hand' },
    45: { name: 'conga-high-left', title: 'High conga left', keys: [45], ...conga },
    46: { name: 'tambourine-hit', title: 'Tambourine hit', keys: [46], kind: 'hand', ring: 1.5 },
    47: { name: 'conga-high-right', title: 'High conga right', keys: [47], ...conga },
    48: { name: 'claves', title: 'Claves', keys: [48], kind: 'hand' },
    49: { name: 'cymbal', title: 'Cymbal', keys: [49], ...cymbal },
    50: { name: 'cymbal-bell', title: 'Cymbal bell', keys: [50], ...cymbal, ring: 5 },
    51: { name: 'cowbell', title: 'Cowbell', keys: [51], kind: 'hand' },
    52: { name: 'stomp', title: 'Foot stomp', keys: [52], kind: 'kick', leadsRange: false },
    53: { name: 'bucket', title: 'Bucket', keys: [53], kind: 'hand', ring: 1.5 },
    54: { name: 'bell-tree-down', title: 'Bell tree down', keys: [54], kind: 'cymbal', ring: 7, fade: 2 },
    55: { name: 'bell-tree-up', title: 'Bell tree up', keys: [55], kind: 'cymbal', ring: 7, fade: 2 },
  },
  // the pads, in rows of four: cymbal and bells, shakers, congas, the cajon and stomp, then the rest
  pads: [
    'cymbal',
    'cymbal-bell',
    'bell-tree-down',
    'bell-tree-up',
    'shaker',
    'tambourine-shake',
    'tambourine-hit',
    'cowbell',
    'conga-high-left',
    'conga-high-right',
    'conga-low-left',
    'conga-low-right',
    'cajon-slap-left',
    'cajon-slap-right',
    'cajon-bass',
    'stomp',
    'claps',
    'snaps',
    'claves',
    'bucket',
    'stick-click',
  ],
  anchor: 'cajon-slap-left',
});
