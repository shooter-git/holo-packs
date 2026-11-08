// `node packs/bop-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Bop Kit pack, made from the Blonde Bop
// kit of AVL Drumkits by Glen MacArthur (CC BY-SA 3.0, with the library's own exception): a small TAMA
// bop kit with an 18" kick, a 13" snare, 10" and 14" toms, Zildjian hi-hats, a Paiste 2002 crash,
// Sabian AAX crash and ride, a Zildjian splash and an 18" Wuhan china, played with sticks, five velocity
// layers a piece, each hit one mono file, placed at the library's own pan.
//
// The licence asks that a modified version of the library go under a name of its own: this is the Bop
// Kit, the library named in its credit.
import { avlKit, drumKeys, drumPads } from '../../tools/avl.mjs';

await avlKit({
  id: 'bop-kit',
  name: 'Bop Kit',
  title: 'Bop Kit',
  credit:
    'Made from AVL Drumkits by Glen MacArthur (CC BY-SA 3.0; music made with it can be licensed freely): its ' +
    'Blonde Bop kit, a TAMA bop kit with an 18" kick, 13" snare, 10/14" toms, Zildjian, Paiste, Sabian and Wuhan cymbals, ' +
    "played with sticks. Placed for HO[LO] at the library's own pans.",
  note: "AVL Drumkits' Blonde Bop, one mono WAV a hit, each placed at the library's pan.",
  folder: 'bop',
  zip: { name: 'bop', url: 'https://www.bandshed.net/sounds/AVLDrumkits_SFZ/BLONDE_BOP_SFZ.zip' },
  dir: 'BLONDE_BOP_SFZ',
  sfz: 'BLONDE_BOP.sfz',
  map: {
    ...drumKeys(14, 10),
    60: { name: 'china', keys: [52], kind: 'cymbal' },
    61: { name: 'shaker', title: 'Shaker', keys: [70], kind: 'hand' },
  },
  pads: drumPads(14, 10, ['shaker']),
});
