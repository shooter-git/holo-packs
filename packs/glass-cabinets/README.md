# Glass Cabinets

A palette for dreamy indie electronica, recreated from the instruments of an old home-studio song:
a glass bell that sparkles in sixteenths, a kalimba, two organs (a soft one for held chords and a
percussive one under bells), a polysynth with grit, keys that ping and a whistle high above. Every
sound here is made in HO[LO] Desk itself; the bell and the kalimba are modelled, mode by mode, on the
recordings they replace.

**Playing it:**
- **Shimmer Bell** is heard at the note you play, its brightest partial a third above: write its
  part a little sparse (eighths that skip the downbeat) and let the echo fill in the sixteenths.
- **Kalimba** likes the middle and upper octaves; its high tines ring shorter, as a real one does.
- Put **Percussive Organ** under the bell on the same chords, quietly, and **Organ Synth** under
  everything else.
- **Night Whistle** is for a few long notes at the top of a chorus, a twelfth above the harmony.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `glass-cabinets` |
| Palette | Dreamy indie electronica: a shimmering glass bell and a kalimba, a soft synth organ and a percussive one, a gritty polysynth, ping keys and a night whistle, voiced to sit around a voice. |
| Sounds | 7 |
| Plays | [VSCO 2 Community Edition](../vsco2/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and VSCO 2 Community Edition by Versilian Studios (CC0). Each pack keeps its own license and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Glass Cabinets**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install glass-cabinets` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Keys

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Ping Keys | FM Keys synth | Wow & Flutter, Tape Delay | Wide Hall, −24 dB | +0.5 dB | A gentle FM electric piano that pings and fades, on a slightly wavering tape, with a soft echo: for ballads. |

### Organs

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Organ Synth | Tonewheel Ballad synth | Channel EQ | Wide Hall, −20 dB | −7.5 dB | A soft synth organ for chords under everything: the speaker turning slowly, no key click, its top end rolled off so it stays behind a voice. |
| Percussive Organ | Tonewheel Ballad synth | Channel EQ | Wide Hall, −22 dB | −4 dB | An organ with its percussion on: each chord starts with a bright tick of harmonics that fades into a quiet held tone; good under bells. |

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Night Whistle | [Flute](../vsco2/) | Channel EQ | Whistle Shimmer, −20 dB | +8 dB | A high flute played as a whistle: single long notes at the top of the range with their vibrato, lifted by a shimmer an octave up. |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Kalimba | Kalimba synth | Channel EQ | Small Wood Room, −18 dB | 0 dB | A thumb piano's steel tines in a small wooden room: near-pure plucked tones with the thumb's soft thump, the high ones ringing shorter. |

### Mallets and bells

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Shimmer Bell | Shimmer Bell synth | Channel EQ, Tape Delay, Stereo Width | Glass Plate, −18 dB | +4 dB | A small glassy bell heard at the key's pitch, its brightest partial a third above, spread by a little ensemble and echoing in sixteenths from side to side: a sparkle that skips around the beat. |

### Synths

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Grit Poly | Fat Poly synth | Chorus, Channel EQ, Stereo Width | Wide Hall, −22 dB | 0 dB | A classic polysynth with some dirt in its filter: wide chords with an edge, from the lows up. |
