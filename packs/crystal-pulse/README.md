# Crystal Pulse

A palette for cold, tense, shimmering electronic scores. Everything here is glassy or metallic, and
most of it moves: glass harmonica and struck crystal rods, bowed vibraphone and bowed metal, mallets
echoing through tape delays, a soft analog pulse and arpeggios, all over thin, frozen pads.

**Playing it:**
- Hold a chord on **Soft Pulse** or **Analog Arp** and it plays itself in time with the song; put a
  slow pad or **Frozen Air** under it and a mallet sound on top.
- The mallet sounds echo in eighths and dotted values, so they lock to the tempo: set the tempo first.
- Every sound sends to the same room, **Glass Sky** (a wide, bright space with the lows cut), so they
  blend as one place.

**Steel Pan Tones** is an FM sound voiced like a steel pan; a sampled steel drum will join it once one
is in these packs.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `crystal-pulse` |
| Palette | Cold, glassy and pulsing: glass harmonica and crystal rods, bowed metal, mallets echoing through tape delays, soft analog pulses and arpeggios over frozen pads. |
| Sounds | 13 |
| Plays | [Versilian Community Sample Library](../vcsl/), [VSCO 2 Community Edition](../vsco2/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and VSCO 2 Community Edition by Versilian Studios (CC0), the Versilian Community Sample Library by Versilian Studios (CC0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Crystal Pulse**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install crystal-pulse` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Mallets and bells

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Glass Harmonica | Glass Harmonica synth | — | Glass Sky, −12 dB | −2.5 dB | Rubbed glass bowls: pure tones that swell in and shimmer as they ring. |
| Crystal Rods | FM Bells synth | Tape Delay | Glass Sky, −14 dB | −2.5 dB | Struck glass rods: clear, inharmonic and long, with a dotted echo. |
| Steel Pan Tones | FM Pluck synth | Tape Delay | Glass Sky, −16 dB | +0.5 dB | FM voiced like a steel pan: sweet, bright and quick to fade, echoing softly. |
| Bowed Vibes | [Vibraphone (Bowed)](../vcsl/) | — | Glass Sky, −10 dB | +10 dB | Vibraphone bars bowed: a pure tone that swells and hangs. |
| Vibes in Echo | [Vibraphone](../vcsl/) | Tape Delay, Wow & Flutter | Glass Sky, −16 dB | −1 dB | Vibraphone through a ping-pong tape delay, a little warble on it. |
| Marimba Pulse | [Marimba](../vsco2/) | Channel EQ, Tape Delay | Glass Sky, −18 dB | −0.5 dB | Soft marimba notes repeating in eighths through a tape delay. |
| Glockenspiel Echo | [Glockenspiel](../vsco2/) | Channel EQ, Tape Delay | Glass Sky, −14 dB | +2.5 dB | Glockenspiel, its edge taken off, with a dotted-quarter echo. |

### Bass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Pulse Bass | Fat Mono synth | Arpeggiator | dry | −3 dB | A dark analog bass that pulses in eighths while a note is held. |

### Synths

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Soft Pulse | Fat Poly synth | Arpeggiator, Chorus, Tape Delay | Glass Sky, −18 dB | +8 dB | Held chords throb in sixteenths: a soft, filtered analog pulse. |
| Analog Arp | Fat Mono synth | Arpeggiator, Tape Delay | Glass Sky, −18 dB | −3.5 dB | Hold a chord: it rises in sixteenths over two octaves, echoing in dotted eighths. |

### Pads

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Cold Pad | Morph Pad synth | Channel EQ | Glass Sky, −10 dB | −4 dB | A glassy wavetable pad, thin in the lows and cold on top. |

### Textures

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Bowed Metal | Drone Metal synth | — | Glass Sky, −10 dB | −6.5 dB | The sustained, slowly shifting ring of bowed metal bars. |
| Frozen Air | Drone Glass synth | — | Glass Sky, −8 dB | −9 dB | High glassy partials glinting in and out: frost in the air. |
