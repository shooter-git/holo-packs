# Silk and Bamboo

Chinese instruments, named for the old grouping of instruments by what they're made of: silk strings
and bamboo pipes. The guzheng (a zither with many strings, played with picks and a pressing left
hand), the pipa (a pear-shaped lute played in fast tremolo), the dizi (a bamboo flute with a buzzing
membrane), the sheng (a mouth organ of bamboo pipes), the erhu (a two-stringed bowed fiddle), and the
percussion of Peking opera: hand gongs whose pitch slides after the strike, and the temple block.

**Playing it:** the pentatonic scale suits these instruments well (the Major pentatonic in HO[LO]
Desk's Scale Quantizer). Slide into notes on the guzheng with the pitch wheel, or use **Guzheng,
Pressed** for the deep left-hand vibrato.

**Sources:** guzheng, pipa, dizi, sheng and the opera gongs are modelled by HO[LO] Desk's synths; the
temple block is from the Versilian Community Sample Library.

**Coming:** the **Erhu**, from a CC0 recording, once it's mapped.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `silk-and-bamboo` |
| Palette | Chinese instruments of silk strings and bamboo pipes: erhu, guzheng and pipa, dizi and sheng, with Peking opera gongs and the temple block. |
| Sounds | 8 (1 coming) |
| Plays | [Versilian Community Sample Library](../vcsl/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and the Versilian Community Sample Library by Versilian Studios (CC0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Silk and Bamboo**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install silk-and-bamboo` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Organs

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Sheng | Sheng synth | — | Wooden Hall, −12 dB | 0 dB | The mouth organ of bamboo pipes: each note with its fifth and octave. |

### Strings

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Erhu *(coming)* | `erhu/erhu` | — | Wooden Hall, −12 dB | 0 dB | The two-stringed bowed fiddle: a voice-like, sliding tone (coming with the Erhu pack). |

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Dizi | Dizi synth | — | Wooden Hall, −12 dB | 0 dB | The bamboo flute with a buzzing membrane: bright and reedy. |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Guzheng | Guzheng synth | — | Wooden Hall, −12 dB | 0 dB | The many-stringed zither: shimmering plucks, lovely for glissandi. |
| Guzheng, Pressed | Guzheng synth | — | Wooden Hall, −12 dB | 0 dB | The guzheng with a deep left-hand vibrato pressed into each note. |
| Pipa | Pipa synth | — | Wooden Hall, −12 dB | 0 dB | The pear-shaped lute: held notes become a fast tremolo. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Opera Gongs | Opera Gongs synth | — | Wooden Hall, −12 dB | 0 dB | Peking opera hand gongs: the pitch slides down on low notes and up on high ones. |
| Temple Block | [Temple Block](../vcsl/) | — | Wooden Hall, −14 dB | 0 dB | The hollow wooden block that keeps time. |
