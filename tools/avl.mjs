// What the kits made from Glen MacArthur's AVL Drumkits share (packs/pop-rock-kit, vintage-rock-kit,
// bop-kit, bop-kit-rods and busker-kit's `recipe.mjs`). Each AVL kit is a zip of mono 16-bit 44.1 kHz
// WAVs, one already mixed file a hit, five velocity layers a piece, and an SFZ that maps them to General
// MIDI's keys with a pan for each piece (from the drummer's point of view, as its SFZ says).
//
// The SFZ is read as a player reads it: each key it plays is one piece, its regions (soft to loud) the
// piece's layers, its pan the place it sits. Every key the library plays must be given a piece here, so
// nothing it has goes unplayed. Each mono hit is written as a stereo file at the library's pan (constant
// power, unity in the centre), as buildKit places a single-microphone piece.
//
// The AVL licence (CC BY-SA 3.0, with its own exception) asks that a modified version go under a name of
// its own, so the packs are named for their sound, the library named in their credit.
import { buildKit, Downloads } from './kit.mjs';
import { arg, loudness, onset, pinArchives, writeManifest } from './lib.mjs';
import { readSfz } from './sfz.mjs';

/** An SFZ pan (-100 left to 100 right) as buildKit's (0 to 127, 63.5 the centre). */
const sfzPan = (pan) => 63.5 + (63.5 * Math.max(-100, Math.min(100, Number(pan ?? 0)))) / 100;

/**
 * The kit's velocity curve (dB from velocity 1 to 127). The AVL kits bring most of their layers up to
 * full scale and make them soft or loud by velocity, so each layer plays at the velocities the library
 * gives it (five even bands) and its level follows one curve of this range, rather than being placed by
 * its recorded loudness (which would squeeze every layer but the softest into the top velocities).
 */
const RANGE = 36;

/** How each kind of piece rings and is kept, by default. */
export const KINDS = {
  kick: { ring: 1.6, fade: 0.35, leadsRange: true },
  snare: { ring: 1.2, fade: 0.3, leadsRange: true },
  stroke: { ring: 1, fade: 0.25 },
  tom: { ring: 2.4, fade: 0.6, floor: 58, leadsRange: true },
  hat: { group: 1, ring: 0.6, fade: 0.15 },
  'hat-open': { group: 1, offBy: 1, ring: 1.2, fade: 0.3 },
  cymbal: { ring: 4.5, fade: 1.4, floor: 56 },
  choke: { ring: 1, fade: 0.25 },
  hand: { ring: 1, fade: 0.25 },
};

/**
 * The keys the AVL drum kits share (35 to 59), each piece where General MIDI has it: the toms on every
 * tom key (the floor tom low, the rack tom high), and what General MIDI has no key for (the stick click,
 * the toms' edges, the swish, the chokes) below the kick, where HO[LO]'s other kits keep their extras.
 * `floor` and `rack` are the toms' sizes (inches).
 */
export function drumKeys(floor, rack) {
  return {
    35: { name: 'stick-click', title: 'Stick click', keys: [31], kind: 'stroke' },
    36: { name: 'kick', keys: [35, 36], pad: 36, kind: 'kick' },
    37: { name: 'sidestick', keys: [37], kind: 'stroke' },
    38: { name: 'snare', keys: [38], kind: 'snare' },
    39: { name: 'clap', title: 'Clap', keys: [39], kind: 'hand' },
    40: { name: 'snare-edge', keys: [40], kind: 'snare', leadsRange: false },
    41: { name: `tom-${floor}`, keys: [41, 43], pad: 41, kind: 'tom' },
    42: { name: 'hat-closed', keys: [42], kind: 'hat' },
    43: { name: `tom-${floor}-edge`, title: `Tom ${floor}″ edge`, keys: [23], kind: 'tom', leadsRange: false },
    44: { name: 'hat-pedal', keys: [44], kind: 'hat' },
    45: { name: `tom-${rack}`, keys: [45, 47, 48, 50], pad: 45, kind: 'tom' },
    // the library's semi-open hi-hat is its open one
    46: { name: 'hat-open', keys: [46], kind: 'hat-open' },
    47: { name: `tom-${rack}-edge`, title: `Tom ${rack}″ edge`, keys: [25], kind: 'tom', leadsRange: false },
    48: { name: 'hat-swish', title: 'Hi-hat swish', keys: [26], kind: 'hat-open' },
    // a cymbal's choke (struck and grabbed) stops it ringing
    49: { name: 'crash', keys: [49], kind: 'cymbal', offBy: 2 },
    50: { name: 'crash-choke', title: 'Crash choke', keys: [27], kind: 'choke', group: 2 },
    51: { name: 'ride', keys: [51], kind: 'cymbal', offBy: 3 },
    52: { name: 'ride-choke', title: 'Ride choke', keys: [29], kind: 'choke', group: 3 },
    53: { name: 'ride-bell', keys: [53], kind: 'cymbal', offBy: 3 },
    54: { name: 'tambourine', title: 'Tambourine', keys: [54], kind: 'hand' },
    55: { name: 'splash', title: 'Splash', keys: [55], kind: 'cymbal', ring: 2.5 },
    56: { name: 'cowbell', title: 'Cowbell', keys: [56], kind: 'hand' },
    57: { name: 'crash-2', title: 'Crash 2', keys: [57], kind: 'cymbal', offBy: 4 },
    58: { name: 'crash-2-choke', title: 'Crash 2 choke', keys: [28], kind: 'choke', group: 4 },
    59: { name: 'ride-shank', title: 'Ride shank', keys: [59], kind: 'cymbal', offBy: 3, ring: 6 },
  };
}

/** The pads of an AVL drum kit, in rows of four: cymbals and hats, toms, snare and kick, then the rest. */
export function drumPads(floor, rack, extra) {
  return [
    'crash',
    'ride',
    'hat-open',
    'hat-closed',
    `tom-${rack}`,
    `tom-${rack}-edge`,
    `tom-${floor}`,
    `tom-${floor}-edge`,
    'snare-edge',
    'sidestick',
    'snare',
    'kick',
    'clap',
    'hat-pedal',
    'hat-swish',
    'stick-click',
    'crash-2',
    'ride-bell',
    'ride-shank',
    'splash',
    'crash-choke',
    'crash-2-choke',
    'ride-choke',
    'china',
    'tambourine',
    'cowbell',
    ...extra,
  ];
}

/**
 * Build an AVL kit. `zip` is the library's archive ({ name, url }); `dir` its folder in the zip and
 * `sfz` its program there. `map` gives each library key its piece: { name, keys, kind, title?, ...opts }
 * (opts as buildKit's pieces take: pad, ring, fade, floor, group, offBy). `category` other than
 * Drums is a set of hits on pads without General MIDI's kit; `anchor` the piece that sets its level
 * (the snare, unless it says).
 */
export async function avlKit({ id, name, title, credit, note, folder, zip, dir, sfz, map, pads, category, anchor }) {
  const archives = { [zip.name]: { url: zip.url } };
  const downloads = new Downloads(arg('cache', `${process.env.HOME}/.cache/holo-pack-sources/${id}`), {}, archives);
  const text = new TextDecoder();
  const program = await readSfz(`${dir}/${sfz}`, async (path) => text.decode(await downloads.get(`${zip.name}:${path}`)));
  const byKey = new Map();
  for (const r of program.regions) {
    const key = Number(r.key);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(r);
  }
  const unmapped = [...byKey.keys()].filter((k) => !map[k]);
  const unplayed = Object.keys(map).filter((k) => !byKey.has(Number(k)));
  if (unmapped.length || unplayed.length)
    throw new Error(
      `${id}: ${unmapped.length ? `library keys ${unmapped.join(', ')} have no piece` : ''}${
        unplayed.length ? ` keys ${unplayed.join(', ')} aren't in the library` : ''
      }`,
    );
  // the zip's checksum is pinned even when every file is already out of it (a second run)
  await downloads.archive(zip.name);
  const download = (r) => `${zip.name}:${dir}/${r.sample.replace(/\\/g, '/')}`;
  await downloads.all(program.regions.map(download));
  const pieces = [...byKey.entries()].map(([key, regions]) => {
    const { kind, ...piece } = map[key];
    const pans = new Set(regions.map((r) => Number(r.pan ?? 0)));
    if (pans.size !== 1) throw new Error(`${piece.name}: its layers are panned apart`);
    // the layers by their velocities, soft to loud (each a file of its own)
    const layers = [...regions].sort((a, b) => Number(a.lovel) - Number(b.lovel));
    const files = new Set(layers.map((r) => r.sample));
    if (files.size !== layers.length) throw new Error(`${piece.name}: a sample plays twice`);
    // each layer where the library plays it: its own velocities, its level the kit's one curve (its
    // loudness measured as buildKit measures it, from its attack, so the layers land on its velocities)
    const middle = (r) => (Number(r.lovel) + Number(r.hivel)) / 2;
    const levels = layers.map((r) => {
      const ch = downloads.decoded(download(r)).channels.slice(0, 1);
      return loudness(ch, downloads.decoded(download(r)).rate, onset(ch, 40), 0.4);
    });
    const top = levels[levels.length - 1];
    return {
      ...(KINDS[kind] ?? {}),
      ...piece,
      hits: layers.map((r, n) => ({ layer: n + 1, rr: 1, mics: { main: download(r) } })),
      mics: { main: [1, sfzPan([...pans][0])] },
      heard: (layer) => (RANGE * (middle(layers[layer - 1]) - 127)) / 126 - (levels[layer - 1] - top),
    };
  });
  const pack = await buildKit({
    id,
    name,
    license: 'CC-BY-SA-3.0',
    credit,
    note,
    folder,
    instrument: { name: 'kit', title },
    level: -19,
    downloads,
    bases: {},
    pads,
    pieces,
    ...(anchor ? { anchor } : {}),
  });
  // the hits come out of the library's zip: pin it, and say what kind of instrument the kit is
  pack.source.archives ??= pinArchives(pack.source, downloads);
  if (category) pack.instruments[0].category = category;
  writeManifest(pack);
  return pack;
}
