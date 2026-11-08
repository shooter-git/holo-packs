# Heroic Orchestra

A palette for big, earthy adventure scores: blazing brass and horns (long and short), tuba, a low men's
choir, war drums, timpani and a marching snare, dark low strings and driving contrabass spiccato, and
woodwinds for modal, ancient-sounding melodies.

**Playing it:**
- Write the melody for **Horns** or **Oboe** in a mode such as Dorian or Mixolydian, with **Male
  Choir** and **Low Strings** under it and **War Drums** driving.
- Everything sends to one **Concert Hall**.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `heroic-orchestra` |
| Palette | A big, earthy adventure orchestra: blazing brass and horns, a low men’s choir, war drums and timpani, low strings and modal woodwinds. |
| Sounds | 14 |
| Plays | [VSCO 2 Community Edition](../vsco2/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and VSCO 2 Community Edition by Versilian Studios (CC0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Heroic Orchestra**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install heroic-orchestra` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Strings

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Low Strings | [Cellos](../vsco2/) | Channel EQ | Concert Hall, −10 dB | 0 dB | Cellos, dark and full, for the low melodies. |
| Contrabass Spiccato | [Contrabass Spiccato](../vsco2/) | — | Concert Hall, −12 dB | 0 dB | Short basses for driving rhythms. |

### Brass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Big Brass | [Trombones](../vsco2/) | Channel EQ | Concert Hall, −10 dB | 0 dB | Trombones played big, with a bright edge. |
| Horns | [French Horns](../vsco2/) | — | Concert Hall, −10 dB | 0 dB | French horns for the heroic lines. |
| Horns, Short | [French Horns Staccato](../vsco2/) | — | Concert Hall, −10 dB | 0 dB | Short horn notes for rhythmic calls. |
| Tuba | [Tuba](../vsco2/) | — | Concert Hall, −12 dB | 0 dB | Tuba under the brass. |

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Oboe | [Oboe](../vsco2/) | — | Concert Hall, −12 dB | 0 dB | Oboe for modal, ancient-sounding melodies. |
| Flute | [Flute](../vsco2/) | — | Concert Hall, −12 dB | 0 dB | Flute for soaring lines. |
| Bassoon | [Bassoon](../vsco2/) | — | Concert Hall, −12 dB | 0 dB | Bassoon, dark and woody. |

### Voices

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Male Choir | Male Choir synth | — | Concert Hall, −10 dB | 0 dB | Low men’s voices for chant and weight. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| War Drums | War Drums synth | Compressor | Concert Hall, −10 dB | 0 dB | Many big drums struck together. Play low. |
| Timpani | [Timpani](../vsco2/) | — | Concert Hall, −12 dB | 0 dB | Timpani strokes. |
| Timpani Roll | [Timpani Roll](../vsco2/) | — | Concert Hall, −12 dB | 0 dB | Timpani rolls for swells. |
| Field Snare | [Snare](../vsco2/) | — | Concert Hall, −14 dB | 0 dB | A marching snare. |
