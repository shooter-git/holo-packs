// `node packs/vintage-rock-kit/recipe.mjs [--cache DIR] [--out DIR]`: the Vintage Rock Kit pack, made
// from the Red Zeppelin kit of AVL Drumkits by Glen MacArthur (CC BY-SA 3.0, with the library's own
// exception): a big Ludwig kit with a 26" kick, a 14" snare, 14" and 16" toms, Sabian hi-hats, Zildjian
// crashes, a 24" Zildjian ride, a 22" Paiste crash and an 18" Wuhan china, five velocity layers a piece,
// each hit one mono file, placed at the library's own pan.
//
// The licence asks that a modified version of the library go under a name of its own: this is the
// Vintage Rock Kit, the library named in its credit.
import { avlKit, drumKeys, drumPads } from '../../tools/avl.mjs';

await avlKit({
  id: 'vintage-rock-kit',
  name: 'Vintage Rock Kit',
  title: 'Vintage Rock Kit',
  credit:
    'Made from AVL Drumkits by Glen MacArthur (CC BY-SA 3.0; music made with it can be licensed freely): its ' +
    'Red Zeppelin kit, a Ludwig kit with a 26" kick, 14" snare, 14/16" toms, Sabian, Zildjian, Paiste and Wuhan cymbals. ' +
    "Placed for HO[LO] at the library's own pans.",
  note: "AVL Drumkits' Red Zeppelin (2023 repack), one mono WAV a hit, each placed at the library's pan.",
  folder: 'vintage-rock',
  zip: { name: 'ludwig', url: 'https://www.bandshed.net/sounds/AVLDrumkits_SFZ/RED_ZEPPELIN_2023_repack.zip' },
  dir: 'RED_ZEPPELIN_2023_repack',
  sfz: 'Red_Zeppelin_2023_repack.sfz',
  map: {
    ...drumKeys(16, 14),
    60: { name: 'crash-3', title: 'Crash 3', keys: [30], kind: 'cymbal', ring: 6 },
    61: { name: 'maracas', title: 'Maracas', keys: [70], kind: 'hand' },
    62: { name: 'china', keys: [52], kind: 'cymbal' },
  },
  pads: drumPads(16, 14, ['maracas', 'crash-3']),
});
