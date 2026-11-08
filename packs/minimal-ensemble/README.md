# Minimal Ensemble

A palette for music built from repeating, interlocking patterns, played by a small amplified
ensemble: a plain electric organ (no rotor, no vibrato) and a soft pipe organ, arpeggiating synths,
the grand piano, solo violin, violas and cellos, flute without vibrato, clarinet, saxophone and
straight-toned wordless voices.

**Playing it:**
- **Organ Arpeggio**, **Arp Synth**, **Pulse Synth** and **Piano Broken Chords** each have an
  Arpeggiator on them: hold a chord and they turn it into a steady pattern in time with the song.
  Change the chord, and the pattern follows.
- Layer two of them at different rates (eighths against sixteenths) for the classic interlocking
  sound, and let the voices or the winds hold long notes over the top.
- The ensemble sends to a small **Chamber**; the pipe organ has the **Concert Hall**.

**Soprano Sax** is from the MTG solo saxophone recordings (CC BY 4.0).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `minimal-ensemble` |
| Palette | A small amplified ensemble for repeating, interlocking patterns: electric and pipe organ, arpeggiating synths, piano, strings, flute, clarinet, sax and wordless voices. |
| Sounds | 14 |
| Plays | [University of Iowa MIS: Clarinet and Bassoon](../iowa/), [MTG Solo Saxophones](../mtg-sax/), [Steinway Model D (bitKlavier Grand)](../steinway/), [VSCO 2 Community Edition](../vsco2/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and VSCO 2 Community Edition by Versilian Studios (CC0), the bitKlavier Grand (a Steinway D) by Princeton University (CC BY 4.0), the University of Iowa Musical Instrument Samples (free to use without restriction), MTG Solo Saxophones by the Music Technology Group, Universitat Pompeu Fabra, mapped for the SFZ Instruments project (CC BY 4.0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Minimal Ensemble**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install minimal-ensemble` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Keys

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Piano | [Steinway D Grand, Close](../steinway/) | — | Chamber, −16 dB | +5 dB | The grand, close and clear. |
| Piano Broken Chords | [Steinway D Grand, Close](../steinway/) | Arpeggiator | Chamber, −16 dB | +3 dB | Hold a chord: the piano breaks it up and down in eighths. |

### Organs

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Electric Organ | Tonewheel Ballad synth | — | Chamber, −18 dB | −5.5 dB | A plain, steady electric organ: no rotor, no vibrato, for long patterns. |
| Organ Arpeggio | Tonewheel Ballad synth | Arpeggiator | Chamber, −18 dB | −4 dB | The electric organ arpeggiating a held chord up and down in eighths. |
| Pipe Organ | [Organ (Soft)](../vsco2/) | — | Concert Hall, −10 dB | −8.5 dB | A soft pipe organ registration. |

### Strings

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Solo Violin | [Solo Violin](../vsco2/) | — | Chamber, −14 dB | −6 dB | One violin. |
| Violas | [Violas](../vsco2/) | — | Chamber, −14 dB | −5 dB | Violas for the middle voices. |
| Cellos | [Cellos](../vsco2/) | — | Chamber, −14 dB | −5.5 dB | Cellos for the bass line. |

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Flute | [Flute Non-vibrato](../vsco2/) | — | Chamber, −14 dB | −5 dB | Flute without vibrato: plain and even. |
| Clarinet | [Clarinet](../iowa/) | — | Chamber, −14 dB | −3 dB | Clarinet, even and warm. |
| Soprano Sax | [Soprano Sax](../mtg-sax/) | — | Chamber, −14 dB | −5.5 dB | Saxophone for the patterns. |

### Voices

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Wordless Voices | Choir Ahh synth | — | Chamber, −14 dB | −5 dB | Straight-toned voices on “ah”, singing the patterns with the band. |

### Synths

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Arp Synth | Morph Pluck synth | Arpeggiator | Chamber, −16 dB | −0.5 dB | A clean pluck arpeggiating a held chord in sixteenths over two octaves. |
| Pulse Synth | FM Pluck synth | Arpeggiator | Chamber, −16 dB | −1 dB | Held chords repeated in steady eighths. |
