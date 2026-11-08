# Southeast Asian

Instruments of mainland and island Southeast Asia: the Vietnamese đàn tranh (a sixteen-stringed zither
whose notes bend and slide), the Sundanese angklung (tuned bamboo tubes shaken in a frame), the Lao
khaen (a mouth organ of bamboo pipes) and Thai gongs.

**Sources:** the đàn tranh is from the Versilian Community Sample Library (CC0).

**Coming:** the **Angklung** and **Khaen** from the One Laptop per Child sound library (CC BY 3.0),
and the **Thai Gongs** from the University of Iowa recordings, once each is mapped.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `southeast-asian` |
| Palette | Instruments of Vietnam, Indonesia, Laos and Thailand: the đàn tranh zither, angklung, khaen and Thai gongs. |
| Sounds | 6 (3 coming) |
| Plays | [Versilian Community Sample Library](../vcsl/) |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and the Versilian Community Sample Library by Versilian Studios (CC0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Southeast Asian**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install southeast-asian` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Organs

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Khaen *(coming)* | `khaen/khaen` | — | Open Pavilion, −12 dB | 0 dB | The Lao bamboo mouth organ, chords over a drone (coming with the Khaen pack). |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Đàn Tranh | [Dan Tranh (Zither)](../vcsl/) | — | Wooden Hall, −12 dB | −4 dB | The Vietnamese zither: bright plucks with bent, sliding notes. |
| Đàn Tranh Tremolo | [Dan Tranh Tremolo](../vcsl/) | — | Wooden Hall, −12 dB | −8 dB | Đàn tranh notes played as a fast tremolo. |
| Đàn Tranh Glissando | [Dan Tranh Glissando Up](../vcsl/) | — | Wooden Hall, −12 dB | −8 dB | A sweep up the strings. |

### Mallets and bells

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Angklung *(coming)* | `angklung/angklung` | — | Open Pavilion, −12 dB | 0 dB | Sundanese bamboo tubes shaken in a frame: a soft, rattling tone (coming with the Angklung pack). |
| Thai Gongs *(coming)* | `iowa-percussion/thai_gongs` | — | Open Pavilion, −12 dB | 0 dB | Tuned bossed gongs (coming with the Iowa percussion). |
