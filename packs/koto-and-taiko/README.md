# Koto and Taiko

Japanese instruments: the koto (a long thirteen-stringed zither, plucked with picks, its pitch bent by
pressing the string), the shamisen (a three-stringed lute with a skin body, struck with a large
plectrum), the shakuhachi (an end-blown bamboo flute) and taiko drums.

**Playing it:** the koto's traditional tunings are pentatonic scales with half steps, such as
hirajoshi; play the koto and shamisen in one and let the shakuhachi follow. **Taiko Ensemble** is
several drums struck together, a little apart. Play the drums low.

**Sources:** all of these are modelled by HO[LO] Desk's synths: there are no free recordings of these
instruments that may be shipped yet.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `koto-and-taiko` |
| Palette | Japanese instruments: the koto and shamisen, the shakuhachi flute and taiko drums. |
| Sounds | 7 |
| Plays | HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects. Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Koto and Taiko**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install koto-and-taiko` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Shakuhachi | Shakuhachi synth | — | Wooden Hall, −10 dB | −5.5 dB | The end-blown bamboo flute: hollow, breathy, each note scooping up. |
| Shakuhachi, Breathy | Shakuhachi synth | — | Wooden Hall, −10 dB | −6 dB | More air and overblowing, for the rougher, wind-like tones. |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Koto | Koto synth | — | Wooden Hall, −12 dB | −1.5 dB | The long zither, plucked with picks: clean and bright. |
| Koto, Pressed | Koto synth | — | Wooden Hall, −12 dB | −1.5 dB | The koto with the left hand pressing the string after each pluck. |
| Shamisen | Shamisen synth | — | Wooden Hall, −14 dB | −1.5 dB | The three-stringed lute struck with a large plectrum: sharp and buzzing. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Taiko | Taiko synth | — | Wooden Hall, −12 dB | +3 dB | A deep barrel drum: boom and stick. Play low. |
| Taiko Ensemble | Taiko synth | — | Wooden Hall, −12 dB | +4.5 dB | Several taiko struck together, a little apart. |
