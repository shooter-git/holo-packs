// `node packs/bop-kit-rods/recipe.mjs [--cache DIR] [--out DIR]`: the Bop Kit, Hot Rods pack, made from
// the Blonde Bop HR kit of AVL Drumkits by Glen MacArthur (CC BY-SA 3.0, with the library's own
// exception): the Bop Kit's TAMA kit and cymbals played with Hot Rods (bundled dowels: softer and
// breathier than sticks, between sticks and brushes), five velocity layers a piece, each hit one mono
// file, placed at the library's own pan.
//
// The licence asks that a modified version of the library go under a name of its own: this is the Bop
// Kit, Hot Rods, the library named in its credit.
import { avlKit, drumKeys, drumPads } from '../../tools/avl.mjs';

await avlKit({
  id: 'bop-kit-rods',
  name: 'Bop Kit, Hot Rods',
  title: 'Bop Kit, Hot Rods',
  credit:
    'Made from AVL Drumkits by Glen MacArthur (CC BY-SA 3.0; music made with it can be licensed freely): its ' +
    'Blonde Bop HR kit, a TAMA bop kit with an 18" kick, 13" snare, 10/14" toms, Zildjian, Paiste, Sabian and Wuhan cymbals, ' +
    "played with Hot Rods. Placed for HO[LO] at the library's own pans.",
  note: "AVL Drumkits' Blonde Bop HR, one mono WAV a hit, each placed at the library's pan.",
  folder: 'bop-rods',
  zip: { name: 'bop-rods', url: 'https://www.bandshed.net/sounds/AVLDrumkits_SFZ/BLONDE_BOP_HR_SFZ.zip' },
  dir: 'BLONDE_BOP_HR_SFZ',
  sfz: 'BLONDE_BOP_HR.sfz',
  map: {
    ...drumKeys(14, 10),
    60: { name: 'china', keys: [52], kind: 'cymbal' },
    61: { name: 'shaker', title: 'Shaker', keys: [70], kind: 'hand' },
  },
  pads: drumPads(14, 10, ['shaker']),
});
