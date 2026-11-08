# Breath and Pipes

A palette for warm, emotional scores where wind instruments lead: a breathy bamboo flute that scoops
into each note, Celtic pipes with their drones, a soft wordless choir, lush strings, short low brass
chords, an anvil that rings through the orchestra, a frame drum, harp, warm pads and the concert grand.

**Playing it:**
- Let the **Breath Flute** or **Celtic Pipes** carry the melody over **Lush Strings** and **Soft
  Choir**; the pipes' drones hold until every key is let go.
- Everything sends to one **Concert Hall**, so the whole palette sounds like one stage.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `breath-and-pipes` |
| Palette | Airy and emotional: a breathy bamboo flute and Celtic pipes over soft choir and lush strings, with low brass, an anvil, warm pads and a grand piano. |
| Sounds | 12 |
| Plays | [Steinway Model D (bitKlavier Grand)](../steinway/), [VSCO 2 Community Edition](../vsco2/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and VSCO 2 Community Edition by Versilian Studios (CC0), the bitKlavier Grand (a Steinway D) by Princeton University (CC BY 4.0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Breath and Pipes**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install breath-and-pipes` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Keys

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Grand Piano | [Steinway D Grand](../steinway/) | Channel EQ | Concert Hall, −14 dB | +0.5 dB | The concert grand, a little softened, in the hall. |

### Strings

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Lush Strings | [Violins](../vsco2/) | Channel EQ, Stereo Width | Concert Hall, −9 dB | −11.5 dB | Violins, warm and wide in a big hall. |
| Low Strings | [Cellos](../vsco2/) | — | Concert Hall, −10 dB | −7 dB | Cellos for the warm line underneath. |

### Brass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Low Brass Stabs | [Trombones Staccato](../vsco2/) | Channel EQ | Concert Hall, −12 dB | −2.5 dB | Short trombone chords, dark and heavy. |

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Breath Flute | Shakuhachi synth | — | Concert Hall, −10 dB | −5.5 dB | An end-blown bamboo flute full of air, each note scooping up into pitch. |
| Celtic Pipes | Celtic Pipes synth | — | Concert Hall, −14 dB | −3 dB | A reedy chanter over two drones, which hold until every key is let go. |

### Voices

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Soft Choir | Choir Ahh synth | Channel EQ | Concert Hall, −10 dB | −7 dB | A soft, wordless mixed choir on an “oh”, set back. |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Harp | [Harp](../vsco2/) | — | Concert Hall, −12 dB | −3 dB | Concert harp for gentle arpeggios. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Anvil | Anvil synth | — | Concert Hall, −14 dB | −2 dB | A struck steel block: a hard, high ring that cuts through the orchestra. |
| Frame Drum | Frame Drum synth | — | Concert Hall, −16 dB | +6.5 dB | A shallow skin drum, more skin than boom. |

### Pads

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Warm Pad | Morph Pad synth | — | Concert Hall, −10 dB | −9.5 dB | A soft, round wavetable pad under the orchestra. |

### Textures

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Breath Pad | Drone Breath synth | — | Concert Hall, −10 dB | −4.5 dB | Airy harmonics, like wind across pipes. |
