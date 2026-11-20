# Prism Colors

A palette of Prism, HO[LO] Desk's morphing synth of four sources, every one of its sounds made ready
to play: pulsing bells and glass steps, two plucks, two keys, two basses, a lead and a whistle, a pad,
a choir and two slow textures. Prism's sounds bring an echo and a room of their own; here most of
those rooms are turned down so the sounds share the palette's two, a chamber for the bells, plucks,
keys and lead and a hall for the whistle, pad and choir, while the two textures keep their long rooms
and send to the hall as well. On **Glass Steps**, **Glass Pluck** and **Stack Lead** their own echo
gives way to a dual delay whose repeats darken as they fall. The basses, the lead, the whistle,
**Glass Pluck** and **Silver Keys** go through a character compressor, and every sound through a
studio EQ that fits it.

**Playing it:**
- **Pulse Bells** and **Glass Steps** play rhythms of their own in time with the song: set the tempo,
  hold a chord and they move. Pulse sets the pace of **Pulse Bells**, from half notes to eighths.
- **Glass Pluck** is made for the Arpeggiator; **Wood Pluck** for melodies that ring.
- **Deep Bass** plays one note at a time and glides when notes overlap; **Pulse Bass** is the steadier
  of the two. Both stay dry.
- **Tide Field** and **Frozen Bells** change slowly by themselves: hold a chord for a bar or more. Moment
  picks where **Frozen Bells** holds its ring.
- Every sound keeps its six knobs: Space brings back as much of the sound's own room as you want.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `prism-colors` |
| Palette | The morphing synth made ready to play: pulsing bells and glass steps, two plucks, two keys, two basses, a lead and a whistle, a pad, a choir and two slow textures, each fitted with studio EQ, compression, echoes and rooms. |
| Sounds | 14 |
| Plays | HO[LO] Desk's built-in synths |
| License | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Prism Colors**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install prism-colors` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
grayed out until then.

### Keys

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Silver Keys | Silver Keys synth | Studio EQ, Character Compressor | Prism Chamber, −18 dB | −0.5 dB | Keys of sine partials, darker played softly and brighter hard, over a struck attack and a bell-like twelfth, evened out by a gentle optical compressor. |
| Glow Keys | Glow Keys synth | Studio EQ, Room Reverb | Prism Chamber, −22 dB | −2 dB | Drawbar partials and a detuned sine body, glass ringing an octave up and a gentle tremolo, in a close studio room. |

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Air Whistle | Air Whistle synth | Studio EQ, Character Compressor | Prism Hall, −16 dB | −8 dB | A breathy whistle with a chiff on each note and vibrato that waits, its swells smoothed by an optical compressor, floating in a hall. |

### Voices

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Choir Bloom | Choir Bloom synth | Studio EQ | Prism Hall, −14 dB | −3.5 dB | Grains of a small choir and a voice moving through its vowels over a soft saw, a little air lifted and the low mids eased, in a hall. |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Glass Pluck | Glass Pluck synth | Studio EQ, Character Compressor, Dual Delay | Prism Chamber, −20 dB | +2 dB | Two detuned saws snapping shut with a struck bar an octave up, tightened by a quick compressor, echoing a dotted eighth left and a quarter right: lovely under the Arpeggiator. |
| Wood Pluck | Wood Pluck synth | Studio EQ, Room Reverb | Prism Chamber, −20 dB | −1.5 dB | A struck bar's partials ringing over a soft body, the mallet's breath on each note, in a small wooden room. |

### Mallets and bells

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Pulse Bells | Pulse Bells synth | Studio EQ | Prism Chamber, −18 dB | −2.5 dB | A struck tone restruck on every beat, glass an octave up on the half note, hopping between the sides in its own echo; its built-in room turned down for the chamber. |
| Glass Steps | Glass Steps synth | Studio EQ, Dual Delay | Prism Chamber, −18 dB | −2.5 dB | Mallet tones accented by a sixteenth-note pattern over a glass strike on the beat, its own echo swapped for a darker one, a dotted quarter left and a quarter right. |

### Bass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Deep Bass | Deep Bass synth | Studio EQ, Character Compressor | dry | −9.5 dB | Two saws and a sine an octave down through a growling filter, one note at a time, gliding when played legato, glued by a compressor. Dry. |
| Pulse Bass | Pulse Bass synth | Studio EQ, Character Compressor | dry | −6.5 dB | A square whose symmetry sways over a saw an octave down, through a steep ladder filter, leveled by an optical compressor. Dry. |

### Synths

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Stack Lead | Stack Lead synth | Studio EQ, Character Compressor, Dual Delay | Prism Chamber, −18 dB | −6 dB | Five detuned saws and a square an octave up, gliding, held forward by a fast compressor, the fizz on top trimmed, echoing in time; the mod wheel adds vibrato. |

### Pads

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Drift Pad | Drift Pad synth | Studio EQ | Prism Hall, −16 dB | −4 dB | A detuned saw stack, a singing voice and grains of shimmer, morphing slowly between them, the low mids eased so it sits under a melody. |

### Textures

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Tide Field | Tide Field synth | Studio EQ | Prism Hall, −18 dB | −5.5 dB | Grains of air and shimmer, a bowl's partials and a low sine, moving on two slow tides: hold a chord and let it change. |
| Frozen Bells | Frozen Bells synth | Studio EQ | Prism Hall, −18 dB | −3.5 dB | A bell and a bowl held at one moment of their ring, that moment wandering slowly under grains of chimes: a long, still texture. |
