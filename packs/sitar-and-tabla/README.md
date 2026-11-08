# Sitar and Tabla

Instruments of North Indian (Hindustani) classical music: the sitar, whose strings buzz on a wide
curved bridge (the jawari) while sympathetic strings ring along; the tanpura, the drone behind every
performance; the bansuri, a side-blown bamboo flute; the harmonium, a hand-pumped reed organ; and the
tabla, the pair of hand drums. Singing bowls and Nepalese bells from the Himalaya are here too.

**The drone:** hold one note on **Tanpura** and it plays the classic cycle by itself: Pa (the fifth
below), Sa twice, then the low Sa. Hold your Sa, the tonic of the raga, and play the sitar or bansuri
over it.

**The tabla** has a bol on each pad: Dha, Dhin, Ge, Ke, Na, Re, Ta, Te, Tin and Tu.

**Sources:** sitar, tanpura, bansuri and harmonium are modelled by HO[LO] Desk's synths. The tabla
(bols recorded by Mihir Sarkar) and the singing bowls are from the One Laptop per Child sound library
(CC BY 3.0), and the Nepalese bells from the Versilian Community Sample Library (CC0).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `sitar-and-tabla` |
| Palette | North Indian classical instruments: sitar and tanpura, bansuri and harmonium, tabla, with singing bowls and Nepalese bells. |
| Sounds | 7 |
| Plays | [Nepalese Hand Bells (VCSL)](../nepal-bells/), [Singing Bowls (OLPC)](../singing-bowls/), [Tabla (OLPC, Sonic Pi)](../tabla/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and the Versilian Community Sample Library by Versilian Studios (CC0), tabla bols by Mihir Sarkar for the One Laptop per Child sound library (CC BY 3.0), singing bowls by OpenPath Music for the One Laptop per Child sound library (CC BY 3.0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Sitar and Tabla**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install sitar-and-tabla` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Organs

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Harmonium | Harmonium synth | — | Wooden Hall, −12 dB | −3.5 dB | Hand-pumped reeds, breathing with the bellows. |

### Woodwinds

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Bansuri | Bansuri synth | — | Wooden Hall, −10 dB | −5.5 dB | The side-blown bamboo flute: sweet, with a wide gentle vibrato. |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Sitar | Sitar synth | — | Wooden Hall, −12 dB | −1.5 dB | Strings buzzing on the wide bridge (jawari), sympathetic strings ringing along. |
| Tanpura | Tanpura synth | — | Wooden Hall, −10 dB | −2.5 dB | Hold Sa: the drone plays Pa, Sa, Sa and the low Sa, round and round. |

### Mallets and bells

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Singing Bowls | [Singing Bowls](../singing-bowls/) | — | Wooden Hall, −10 dB | −3.5 dB | Struck and rubbed bowls, long and beating. |
| Nepalese Bells | [Nepalese Hand Bells](../nepal-bells/) | — | Wooden Hall, −12 dB | +3 dB | Small hand bells, three on three keys. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Tabla | [Tabla](../tabla/) | — | Wooden Hall, −16 dB | −1.5 dB | The pair of hand drums, a bol on each key: Dha, Dhin, Ge, Ke, Na and more. |
