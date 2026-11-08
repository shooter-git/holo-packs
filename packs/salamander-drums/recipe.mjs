// `node packs/salamander-drums/recipe.mjs [--cache DIR] [--out DIR]`: the Salamander Drumkit pack, from
// the Salamander Drumkit by Alexander Holm (CC BY-SA 3.0; its share-alike binds sample libraries made
// from it, not music): a birch-stave kit he built himself in 2009, an 18x18" kick played two ways, two
// snares (14x5" and 14x6") with their snares on and off and a stick, a 12" rack tom and a 14" floor tom,
// Stagg hi-hats closed, with the pedal and stomped, open and at seven openings between, two rides (one
// with its bell, crash and choke), three crashes and two chinas with their chokes, a splash, a bell
// chime and a cowbell. Recorded on a stereo pair of overheads, at 48 kHz.
//
// The library's samples are named by piece, dynamic and take (snare_OH_MP_4), so every piece is found
// by its name; its program (ALL.sfz, read as a player reads it) gives each dynamic its velocities, its
// volume and how much it follows velocity. The library brings every take up to full scale and makes it
// soft or loud with that volume and velocity, so each layer is played at its volume and placed on the
// kit's velocity curve as loud as the library plays it at its middle velocity, as Naked Drums is.
// Every take a layer has takes its turn (the library picks them at random).
//
// The archive is the original release, kept by the Internet Archive (the item its author's site points
// to). One take is left out: kick_OH_P_1.wav is a 44-second recording with its hit near the end (the
// library's own fixed program plays it from an offset), where every other take starts at its hit.
import { buildKit, Downloads } from '../../tools/kit.mjs';
import { arg } from '../../tools/lib.mjs';
import { readSfz } from '../../tools/sfz.mjs';

const ARCHIVE = 'https://archive.org/download/SalamanderDrumkit/salamanderDrumkit.tar.bz2';
const downloads = new Downloads(
  arg('cache', `${process.env.HOME}/.cache/holo-pack-sources/salamander-drums`),
  {},
  { sal: { url: ARCHIVE } },
);
// every take in the archive (and its program), taken out at once (a tar.bz2 is read end to end)
const names = (await downloads.listArchive('sal')).filter((n) => /^OH\/.+\.wav$/.test(n) || n === 'ALL.sfz');
await downloads.unpacked(names.map((n) => `sal:${n}`));
const text = new TextDecoder();
const sfz = await readSfz('ALL.sfz', async (path) => text.decode(await downloads.get(`sal:${path}`)));
const LEFT_OUT = new Set(['OH/kick_OH_P_1.wav']);

/** A take's name: its piece, its dynamic and its number (bellchime_F_2, snare2_OH_Ghost_4). */
const TAKE = /^OH\/([A-Za-z0-9]+?)(?:_OH)?_(Ghost|PP|P|MP|F|FF)_(\d+)\.wav$/;
const takes = names
  .filter((n) => !LEFT_OUT.has(n))
  .map((n) => [n, TAKE.exec(n)])
  .filter(([, m]) => m)
  .map(([n, m]) => ({ name: n, piece: m[1], dynamic: m[2], take: Number(m[3]) }));
const skipped = names.filter((n) => n.endsWith('.wav') && !LEFT_OUT.has(n) && !TAKE.test(n));
// hihatSemiOpen1_OH_P_.wav: a copy of hihatSemiOpen1_OH_P_1.wav (the same length and level), unnumbered
if (skipped.join() !== 'OH/hihatSemiOpen1_OH_P_.wav') throw new Error(`takes not read: ${skipped.join(', ')}`);

// each take's place in the program: its velocities, volume and velocity tracking, from its group's
// region (a take the program doesn't name plays as the other takes of its dynamic do)
const region = new Map();
for (const r of sfz.regions) {
  const n = r.sample.replace(/\\/g, '/').trim();
  const m = TAKE.exec(n);
  if (m) region.set(`${m[1]}:${m[2]}`, r);
}

/** The library's level for a velocity of a region: its volume, and its velocity tracking (dB). */
const heardAt = (r, v) => {
  const t = Number(r.amp_veltrack ?? 100) / 100;
  return 20 * Math.log10(1 - t + t * (v / 127) ** 2);
};

/** A piece: the library's piece name (its takes' prefix), the keys it plays here and how it plays. */
const all = new Set(takes.map((t) => t.piece));
function piece(name, from, keys, opts = {}) {
  all.delete(from);
  const own = takes.filter((t) => t.piece === from);
  if (!own.length) throw new Error(`${name}: no takes of ${from}`);
  const dynamics = [...new Set(own.map((t) => t.dynamic))].map((d) => {
    const r = region.get(`${from}:${d}`);
    if (!r) throw new Error(`${from} ${d}: the program doesn't play it`);
    return { d, r, lovel: Number(r.lovel ?? 1), hivel: Number(r.hivel ?? 127) };
  });
  dynamics.sort((a, b) => a.lovel - b.lovel);
  const heard = new Map();
  const hits = [];
  dynamics.forEach(({ d, r, lovel, hivel }, n) => {
    heard.set(n + 1, heardAt(r, (lovel + hivel) / 2));
    const volume = 10 ** (Number(r.volume ?? 0) / 20);
    own
      .filter((t) => t.dynamic === d)
      .sort((a, b) => a.take - b.take)
      .forEach((t, i) => hits.push({ layer: n + 1, rr: i + 1, mics: { oh: `sal:${t.name}` }, gains: { oh: volume } }));
  });
  return { name, keys, hits, mics: { oh: [1] }, heard: (layer) => heard.get(layer), ...opts };
}

const drum = { ring: 1.4, fade: 0.35 };
const tom = { ring: 2.4, fade: 0.6, floor: 58, leadsRange: true };
const hat = { group: 1, ring: 0.6, fade: 0.15 };
const open = (ring) => ({ group: 1, offBy: 1, ring, fade: Math.min(1, ring / 3), floor: 54 });
const cymbal = { ring: 6, fade: 1.6, floor: 56 };
const choke = { ring: 1.5, fade: 0.4 };
const semi = (n) => piece(`hat-semi-${n}`, `hihatSemiOpen${n}`, [21 + n], { ...open([1, 1.6, 1.8, 2, 2.6, 3, 3.5][n - 1]), title: `Hi-hat semi-open ${n}` });

const pieces = [
  // the library's two kicks: its second on General MIDI's kick, its first a key below
  piece('kick', 'kick2', [36], { ring: 1, fade: 0.3, leadsRange: true }),
  piece('kick-2', 'kick', [35], { ring: 1, fade: 0.3, title: 'Kick 2' }),
  // the 14x6" snare on the snare's key, the 14x5" as the second snare
  piece('snare', 'snare2', [38], { ...drum, leadsRange: true }),
  piece('snare-2', 'snare', [40], { ...drum, title: 'Snare 2' }),
  piece('snare-off', 'snare2OFF', [39], { ...drum, title: 'Snare, snares off' }),
  piece('snare-2-off', 'snareOFF', [34], { ...drum, title: 'Snare 2, snares off' }),
  piece('sidestick', 'snareStick', [37], { ring: 0.7, fade: 0.2 }),
  piece('tom-14', 'loTom', [41, 43], { ...tom, pad: 41 }),
  piece('tom-12', 'hiTom', [45, 47, 48, 50], { ...tom, pad: 45 }),
  piece('hat-closed', 'hihatClosed', [42], hat),
  piece('hat-pedal', 'hihatFoot', [44], { ...hat, ring: 1 }),
  piece('hat-stomp', 'hihatFootStomp', [21], { ...open(3), title: 'Hi-hat stomp' }),
  piece('hat-open', 'hihatOpen', [46], open(4)),
  ...[1, 2, 3, 4, 5, 6, 7].map(semi),
  piece('ride', 'ride1', [51], cymbal),
  piece('ride-bell', 'ride1Bell', [53], cymbal),
  // the second ride's crash and choke: a choke stops the ride ringing, as a hand grabs it
  piece('ride-2', 'ride2', [59], { ...cymbal, offBy: 6, title: 'Ride 2' }),
  piece('ride-2-bell', 'ride2Bell', [85], { ...cymbal, offBy: 6, title: 'Ride 2 bell' }),
  piece('ride-2-crash', 'ride2Crash', [86], { ...cymbal, offBy: 6, title: 'Ride 2 crash' }),
  piece('ride-2-crash-choke', 'ride2CrashChoke', [33], { ...choke, group: 6, title: 'Ride 2 crash choke' }),
  piece('crash', 'crash1', [49], { ...cymbal, offBy: 2 }),
  piece('crash-choke', 'crash1Choke', [29], { ...choke, group: 2, title: 'Crash choke' }),
  piece('crash-2', 'crash2', [57], { ...cymbal, offBy: 3, title: 'Crash 2' }),
  piece('crash-2-choke', 'crash2Choke', [30], { ...choke, group: 3, title: 'Crash 2 choke' }),
  piece('crash-3', 'crash3', [82], { ...cymbal, title: 'Crash 3' }),
  piece('china', 'china1', [52], { ...cymbal, offBy: 4 }),
  piece('china-choke', 'china1Choke', [31], { ...choke, group: 4, title: 'China choke' }),
  piece('china-2', 'china2', [83], { ...cymbal, offBy: 5, title: 'China 2' }),
  piece('china-2-choke', 'china2Choke', [32], { ...choke, group: 5, title: 'China 2 choke' }),
  piece('splash', 'splash1', [55], { ...cymbal, ring: 3, title: 'Splash' }),
  piece('bell-chime', 'bellchime', [84], { ...cymbal, ring: 7, fade: 2, title: 'Bell chime' }),
  piece('cowbell', 'cowbell', [56], { ring: 1, fade: 0.3, title: 'Cowbell' }),
];
if (all.size) throw new Error(`the library's ${[...all].join(', ')} have no piece`);

await buildKit({
  id: 'salamander-drums',
  name: 'Salamander Drumkit',
  license: 'CC-BY-SA-3.0',
  credit:
    'Salamander Drumkit by Alexander Holm (CC BY-SA 3.0; the share-alike applies to sample libraries made from it, not music): ' +
    'a birch-stave kit with an 18" kick, 14" snares, 12/14" toms, Paiste, Stagg and Masterworks cymbals, on overheads. ' +
    'Levelled for HO[LO] as its own program plays it.',
  note: "The Salamander Drumkit's overhead recordings (the original archive), each take at its dynamic's volume in the library's program.",
  folder: 'salamander',
  instrument: { name: 'kit', title: 'Salamander Drumkit' },
  level: -19,
  downloads,
  bases: {},
  // the pads, in rows of four: cymbals and hats, toms, the snare's strokes and the kick, then the rest
  pads: [
    'crash',
    'ride',
    'hat-open',
    'hat-closed',
    'tom-12',
    'tom-14',
    'sidestick',
    'hat-pedal',
    'snare-2',
    'snare-off',
    'snare',
    'kick',
    'snare-2-off',
    'kick-2',
    'hat-stomp',
    'ride-bell',
    'hat-semi-1',
    'hat-semi-2',
    'hat-semi-3',
    'hat-semi-4',
    'hat-semi-5',
    'hat-semi-6',
    'hat-semi-7',
    'splash',
    'crash-2',
    'crash-3',
    'china',
    'china-2',
    'crash-choke',
    'crash-2-choke',
    'china-choke',
    'china-2-choke',
    'ride-2',
    'ride-2-bell',
    'ride-2-crash',
    'ride-2-crash-choke',
    'cowbell',
    'bell-chime',
  ],
  pieces,
});
