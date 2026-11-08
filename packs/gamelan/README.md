# Gamelan

The bronze ensembles of Java and Bali: metallophones that carry the melody, rows of small kettle gongs
for interlocking figures, and the hanging gongs that mark and close each cycle.

**Tuning:** gamelan are not tuned to the piano's twelve equal steps. Javanese gamelan have two tunings,
**slendro** (five notes to the octave, roughly evenly spaced) and **pelog** (seven notes, with large and
small steps), and every set is tuned to itself. These instruments play their own recorded pitches: a
key plays a bar, not a piano note, so write by bar rather than by note name. In Bali, instruments
are tuned in pairs a little apart, so they beat against each other (ombak).

**Playing it:** each tone is on a white key from C, octaves rising left to right, so the keys read
the gamelan's own cipher (1 2 3 4 5 6 7 in pelog, 1 2 3 5 6 in slendro); the middle octave starts at
C4. **Gong Ageng** is on its lowest key, with the gong suwukan on the key above.

**Sources:** the Javanese instruments are Casa da Música's Virtual Gamelan (Digitópia, Casa da Música,
Porto; Artistic License 2.0); the Balinese are from the One Laptop per Child sound library (CC BY 3.0),
recorded by Akito van Troyer.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `gamelan` |
| Palette | The bronze orchestras of Java and Bali: metallophones, gong-chimes and hanging gongs in their own pelog and slendro tunings. |
| Sounds | 8 |
| Plays | [Balinese Gamelan (OLPC)](../gamelan-bali/), [Javanese Gamelan (Casa da Música)](../gamelan-java/) |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and Casa da Música's Virtual Gamelan by Digitópia, Casa da Música, Porto (Artistic License 2.0), Balinese gamelan by Akito van Troyer for the One Laptop per Child sound library (CC BY 3.0). Each pack keeps its own licence and credit. |
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
| Saron, Pelog | [Saron Barung (Pelog)](../gamelan-java/) | — | Open Pavilion, −12 dB | +1.5 dB | Javanese saron in pelog: bronze keys struck with a mallet, carrying the melody. |
| Saron, Slendro | [Saron Barung (Slendro)](../gamelan-java/) | — | Open Pavilion, −12 dB | +3 dB | Javanese saron in slendro, the five-note tuning. |
| Bonang | [Bonang Barung (Pelog)](../gamelan-java/) | — | Open Pavilion, −12 dB | −3 dB | Javanese bonang: small kettle gongs in rows, for interlocking figures. |
| Gendèr | [Gendèr Barung (Slendro)](../gamelan-java/) | — | Open Pavilion, −12 dB | −4 dB | Javanese gendèr: thin bronze keys over tube resonators, soft and ringing. |
| Gangsa | [Gangsa Pemade](../gamelan-bali/) | — | Open Pavilion, −12 dB | −7 dB | Balinese gangsa: bright metallophones for fast interlocking figures. |
| Reyong | [Reyong](../gamelan-bali/) | — | Open Pavilion, −12 dB | −4.5 dB | Balinese reyong: a row of small gongs played by several players at once. |

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Gong Ageng | [Gong Ageng and Suwukan](../gamelan-java/) | — | Open Pavilion, −10 dB | 0 dB | The great hanging gong that closes each cycle, with the smaller gong suwukan on the key above. |
| Kempul | [Kempul (Pelog)](../gamelan-java/) | — | Open Pavilion, −12 dB | +2.5 dB | Smaller hanging gongs that mark the cycle within. |
