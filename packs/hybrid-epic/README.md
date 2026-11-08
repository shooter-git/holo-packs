# Hybrid Epic

A palette for big modern film and game scores, where an orchestra meets drums and synths: massed low
brass pushed into saturation, spiccato string ostinatos, war drums and taiko, an analog sub bass, risers
to build into the downbeat, a cathedral organ, a felt piano for the quiet moments, and a solo cello.

**Playing it:**
- Brass, strings and drums share one large room, **Epic Hall**; the organ has its own **Cathedral**,
  and the felt piano sits close in a **Chamber**.
- **Analog Sub** is dry (no reverb) so the low end stays tight under the brass.
- **Rising Air** is a riser you play like an instrument: hold a chord and it swells for several bars.

**Coming:** the **Solo Cello** plays the Bigcat Cello (a CC0 solo cello) once that pack is here. Until
then, **Cellos** is the section.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `hybrid-epic` |
| Palette | A big modern score: massed low brass, driving string ostinatos, war drums and an analog sub, with risers, a cathedral organ, a felt piano and a solo cello. |
| Sounds | 14 (1 coming) |
| Plays | [VSCO 2 Community Edition](../vsco2/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and VSCO 2 Community Edition by Versilian Studios (CC0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Hybrid Epic**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install hybrid-epic` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Keys

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Felt Piano | [Upright Piano](../vsco2/) | Transient Softener, Channel EQ | Chamber, −14 dB | −4.5 dB | Upright piano with the felt down: soft hammers, a muffled top, close. |

### Organs

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Cathedral Organ | [Organ](../vsco2/) | — | Cathedral, −6 dB | −7.5 dB | Pipe organ in a cathedral: full, slow and enormous. |

### Strings

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Cello Ostinato | [Cellos Spiccato](../vsco2/) | Compressor, Channel EQ | Epic Hall, −16 dB | +1 dB | Spiccato cellos for chugging ostinatos. |
| Violin Ostinato | [Violins Spiccato](../vsco2/) | Compressor | Epic Hall, −16 dB | 0 dB | Spiccato violins: tight, bright repeated notes above the cellos. |
| Cellos | [Cellos](../vsco2/) | — | Epic Hall, −12 dB | −5.5 dB | A cello section singing a long line. |
| Solo Cello *(coming)* | `bigcat-cello/cello` | — | Epic Hall, −14 dB | 0 dB | One cello, close and expressive (coming with the Bigcat Cello pack). |

### Brass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Massed Low Brass | [Trombones](../vsco2/) | Channel EQ, Saturation | Epic Hall, −12 dB | −9.5 dB | Trombones massed and pushed: a broad, heavy wall of low brass. |
| Brass Stabs | [Trombones Staccato](../vsco2/) | Channel EQ, Saturation | Epic Hall, −12 dB | −4 dB | Short, hard trombone hits for driving rhythms. |
| Horns | [French Horns](../vsco2/) | Channel EQ | Epic Hall, −10 dB | −4 dB | French horns, warm and heroic, set back in the hall. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| War Drums | War Drums synth | Compressor | Epic Hall, −10 dB | +1 dB | Several big drums struck together: a massed, rolling thunder. Play low. |
| Taiko Hits | Taiko synth | — | Epic Hall, −12 dB | +6 dB | One deep barrel drum: the boom and the stick’s slap. Play low. |
| Cymbal Riser | [Cymbal Swell (Long)](../vsco2/) | — | Epic Hall, −10 dB | +1 dB | A long cymbal swell rising into the downbeat. |

### Bass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Analog Sub | Fat Mono synth | Channel EQ | dry | −2.5 dB | A deep, steady analog sub to sit under the low brass. |

### Textures

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Rising Air | Drone Breath synth | Channel EQ | Epic Hall, −10 dB | 0 dB | Breath and noise swelling slowly over a held chord: a riser you can pitch. |
