# Gamelan

The bronze ensembles of Java and Bali: metallophones that carry the melody, rows of small kettle gongs
for interlocking figures, and the hanging gongs that mark and close each cycle.

**Tuning:** gamelan are not tuned to the piano's twelve equal steps. Javanese gamelan have two tunings,
**slendro** (five notes to the octave, roughly evenly spaced) and **pelog** (seven notes, with large and
small steps), and every set is tuned to itself. These instruments play their own recorded pitches: a
key plays a bar, not a piano note, so write by bar rather than by note name. In Bali, instruments
are tuned in pairs a little apart, so they beat against each other (ombak); the gangsa keep that.

**Coming:** every sound here waits for the recordings to be mapped: the Javanese sets from Casa da
Música (CC BY 3.0), the Javanese gongs and the Balinese gamelan from the One Laptop per Child sound
library (CC BY 3.0). Each is listened to and checked before it's added.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `gamelan` |
| Palette | The bronze orchestras of Java and Bali: metallophones, gong-chimes and hanging gongs in their own pelog and slendro tunings. |
| Sounds | 8 (8 coming) |
| Plays | packs that are still to come (below) |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects. Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Gamelan**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install gamelan` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Mallets and bells

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Saron, Pelog *(coming)* | `gamelan-javanese/saron_pelog` | — | Open Pavilion, −12 dB | 0 dB | Javanese saron in pelog: bronze keys struck with a mallet, carrying the melody. |
| Saron, Slendro *(coming)* | `gamelan-javanese/saron_slendro` | — | Open Pavilion, −12 dB | 0 dB | Javanese saron in slendro, the five-note tuning. |
| Bonang *(coming)* | `gamelan-javanese/bonang_pelog` | — | Open Pavilion, −12 dB | 0 dB | Javanese bonang: small kettle gongs in rows, for interlocking figures. |
| Gendèr *(coming)* | `gamelan-javanese/gender_slendro` | — | Open Pavilion, −12 dB | 0 dB | Javanese gendèr: thin bronze keys over tube resonators, soft and ringing. |
| Gangsa *(coming)* | `gamelan-balinese/gangsa` | — | Open Pavilion, −12 dB | 0 dB | Balinese gangsa: bright metallophones, tuned in pairs that beat against each other. |
| Reyong *(coming)* | `gamelan-balinese/reyong` | — | Open Pavilion, −12 dB | 0 dB | Balinese reyong: a row of small gongs played by several players at once. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Gong Ageng *(coming)* | `javanese-gongs/gong_ageng` | — | Open Pavilion, −10 dB | 0 dB | The great hanging gong that closes each cycle. |
| Kempul *(coming)* | `javanese-gongs/kempul` | — | Open Pavilion, −12 dB | 0 dB | Smaller hanging gongs that mark the cycle within. |
