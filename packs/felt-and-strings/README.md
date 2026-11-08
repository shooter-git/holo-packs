# Felt and Strings

An intimate palette for quiet, fragile pieces: an upright piano with felt between the hammers and the
strings, close and muffled, chamber strings, soft pads, the warble of old tape, and sparse textures to
leave space around the notes.

**Playing it:**
- **Felt Upright** is the heart of it: soft hammers (a Transient Softener), the top end rolled away, a
  little warmth in the low-mids and a gentle tape warble, in a **Small Room**.
- **Felt Upright, Worn Tape** pushes the warble and the tape saturation further.
- **Felt Upright, Cassette** adds a cassette's hiss and grain (the Lo-fi effect).
- Strings, pads and textures share a **Chamber**: keep them low and let the piano lead.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `felt-and-strings` |
| Palette | Intimate and fragile: a felt upright close and muffled, chamber strings, soft pads, tape warble and sparse textures. |
| Sounds | 11 |
| Plays | [VSCO 2 Community Edition](../vsco2/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and VSCO 2 Community Edition by Versilian Studios (CC0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Felt and Strings**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install felt-and-strings` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Keys

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Felt Upright | [Upright Piano](../vsco2/) | Transient Softener, Channel EQ, Wow & Flutter | Small Room, −14 dB | −3.5 dB | An upright with felt on the strings: soft, muffled and close, a gentle warble. |
| Felt Upright, Worn Tape | [Upright Piano](../vsco2/) | Transient Softener, Channel EQ, Wow & Flutter, Tape Warmth | Small Room, −14 dB | −9 dB | The felt upright on old tape: deeper wow, saturated and dark. |
| Felt Upright, Cassette | [Upright Piano](../vsco2/) | Transient Softener, Channel EQ, Wow & Flutter, Lo-fi | Small Room, −14 dB | −4 dB | The felt upright with a cassette’s hiss and grain. |

### Strings

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Chamber Violins | [Violins](../vsco2/) | Channel EQ | Chamber, −12 dB | −8 dB | Violins, soft and near. |
| Chamber Cellos | [Cellos](../vsco2/) | — | Chamber, −12 dB | −6 dB | Cellos, soft and near. |
| Solo Violin | [Solo Violin](../vsco2/) | — | Chamber, −12 dB | −6.5 dB | One violin, close. |
| Tremolo Strings | [Violins Tremolo](../vsco2/) | Channel EQ | Chamber, −10 dB | −7 dB | Trembling violins, kept low: a shimmer under the piano. |

### Pads

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Soft Pad | Morph Pad synth | Wow & Flutter | Chamber, −10 dB | −9 dB | A soft, dark wavetable pad with a touch of tape drift. |
| Tape Pad | Ethereal Pad synth | Wow & Flutter, Tape Warmth | Chamber, −12 dB | −2 dB | A blooming pad through warbling tape. |

### Textures

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Dust and Air | Drone Breath synth | Channel EQ, Wow & Flutter | Chamber, −10 dB | −2 dB | Breathy air drifting in slowly: hold one note and leave space around it. |
| Distant Glass | Drone Glass synth | — | Chamber, −8 dB | −5.5 dB | Sparse glints of high glass, far away. |
