// `node packs/pop-rock-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Pop Rock Kit pack, made from the
// Black Pearl kit of AVL Drumkits by Glen MacArthur (CC BY-SA 3.0, with the library's own exception): a
// Pearl kit with a 22" kick, a 14" snare, 12" and 16" toms, Sabian hi-hats, crashes and ride, a Zildjian
// splash, a 22" Paiste crash and an 18" Wuhan china, five velocity layers a piece, each hit one mono
// file, placed at the library's own pan.
//
// The licence asks that a modified version of the library go under a name of its own: this is the Pop
// Rock Kit, the library named in its credit.
import { avlKit, drumKeys, drumPads } from '../../tools/avl.mjs';

await avlKit({
  id: 'pop-rock-kit',
  name: 'Pop Rock Kit',
  title: 'Pop Rock Kit',
  credit:
    'Made from AVL Drumkits by Glen MacArthur (CC BY-SA 3.0; music made with it can be licensed freely): its ' +
    'Black Pearl kit, a Pearl kit with a 22" kick, 14" snare, 12/16" toms, Sabian, Zildjian, Paiste and Wuhan cymbals. ' +
    'Placed for HO[LO] at the library\'s own pans.',
  note: "AVL Drumkits' Black Pearl (2023 repack), one mono WAV a hit, each placed at the library's pan.",
  folder: 'pop-rock',
  zip: { name: 'pearl', url: 'https://www.bandshed.net/sounds/AVLDrumkits_SFZ/BLACK_PEARL_2023_repack.zip' },
  dir: 'BLACK_PEARL_2023_repack',
  sfz: 'Black_Pearl_2023_repack.sfz',
  map: {
    ...drumKeys(16, 12),
    60: { name: 'crash-3', title: 'Crash 3', keys: [30], kind: 'cymbal', ring: 6 },
    61: { name: 'maracas', title: 'Maracas', keys: [70], kind: 'hand' },
    62: { name: 'china', keys: [52], kind: 'cymbal' },
  },
  pads: drumPads(16, 12, ['maracas', 'crash-3']),
});
