# Classic Symphonic

The full symphony orchestra as a palette: horns and trumpets, trombones, violins, cellos and pizzicato
strings, flute, oboe, clarinet and bassoon, harp, celesta, glockenspiel, timpani, snare and choir.
Every section sends to one **Scoring Stage**, a clear, medium-large studio room, so the orchestra
sits together.

**Playing it:** each sound is one section, so a score is one track per section. Write the horns and
strings first, then colour with harp, celesta and glockenspiel.

**Celesta Bells** is an FM sound voiced like a celesta, as no free celesta recording is in these
packs yet.

**Coming:** **Trumpets**, once the University of Iowa brass recordings are here.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `classic-symphonic` |
| Palette | The full symphony orchestra on a scoring stage: horns and trumpets, strings, woodwinds, harp, celesta, glockenspiel, timpani, snare and choir. |
| Sounds | 16 (1 coming) |
| Plays | [VSCO 2 Community Edition](../vsco2/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and VSCO 2 Community Edition by Versilian Studios (CC0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Classic Symphonic**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install classic-symphonic` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Strings

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Violins | [Violins](../vsco2/) | — | Scoring Stage, −10 dB | −9 dB | The violin section, sustained. |
| Cellos | [Cellos](../vsco2/) | — | Scoring Stage, −10 dB | −6.5 dB | The cello section, sustained. |
| Pizzicato Strings | [Violins Pizzicato](../vsco2/) | — | Scoring Stage, −12 dB | −3 dB | Plucked violins. |

### Brass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| French Horns | [French Horns](../vsco2/) | — | Scoring Stage, −10 dB | −3.5 dB | The horn section, noble and round. |
| Trumpets *(coming)* | [Trumpet](../iowa-brass/) | — | Scoring Stage, −12 dB | 0 dB | Bright trumpets for fanfares (coming with the Iowa brass). |
| Trombones | [Trombones](../vsco2/) | — | Scoring Stage, −12 dB | −5.5 dB | Trombones for weight and chorales. |

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Flute | [Flute](../vsco2/) | — | Scoring Stage, −12 dB | +5.5 dB | Concert flute, with vibrato. |
| Oboe | [Oboe](../vsco2/) | — | Scoring Stage, −12 dB | −5 dB | Oboe: reedy and singing. |
| Clarinet | [Clarinet](../vsco2/) | — | Scoring Stage, −12 dB | −5.5 dB | Clarinet: warm and agile. |
| Bassoon | [Bassoon](../vsco2/) | — | Scoring Stage, −12 dB | −4.5 dB | Bassoon for the low woodwind line. |

### Voices

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Choir | Choir Ahh synth | — | Scoring Stage, −10 dB | −7 dB | A wordless mixed choir on “ah”. |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Harp | [Harp](../vsco2/) | — | Scoring Stage, −12 dB | −4.5 dB | Concert harp. |

### Mallets and bells

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Celesta Bells | FM Keys synth | Channel EQ | Scoring Stage, −12 dB | +1 dB | FM tines voiced like a celesta: small, sweet bells (no free celesta recording yet). Play high. |
| Glockenspiel | [Glockenspiel](../vsco2/) | — | Scoring Stage, −14 dB | +0.5 dB | Glockenspiel, bright and clear. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Timpani | [Timpani](../vsco2/) | — | Scoring Stage, −12 dB | −6 dB | Timpani, from soft taps to big strokes. |
| Snare Drum | [Snare](../vsco2/) | — | Scoring Stage, −14 dB | +5 dB | Concert snare drum. |
