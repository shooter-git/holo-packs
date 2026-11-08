# Javanese Gongs (OLPC)

Javanese gongs recorded by Nils van Ottorloo for the One Laptop per Child sound library
([archive.org/details/NilsVanOttorloo](https://archive.org/details/NilsVanOttorloo), CC BY 3.0): two
gong ageng, a gong kemodhong, six kempul and five kenong, each on its own pad and played as it was
recorded (their tunings are their own).

**Provenance:** the set has no notes on each file, so each was checked before it was mapped: mono
44.1 kHz recordings edited in an ordinary editor, nothing pointing at a commercial library. Its other
files (birds, frogs, musical glasses, long field recordings) aren't mapped.

**How it's made:** HO[LO] fetches each file on its own out of the published zip (archive.org serves a
zip's files one by one), keeps it until it falls to −60 dB (30 s at most) and fades it there. They're
measured together, so they keep their balance as recorded, the loudest at −17 dB at velocity 127.

For a whole gamelan, see [gamelan-java](../gamelan-java/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `java-gongs` |
| Licence | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Credit | Javanese gong samples by Nils van Ottorloo for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/NilsVanOttorloo). |
| Size | 8 MB on disk, 14 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Javanese Gongs (OLPC)**, or `pnpm packs install java-gongs` |

## Where its files come from

Made from 14 recordings, fetched from <https://archive.org/download/NilsVanOttorloo/NilsVanOttorloo44.zip/NilsVanOttorloo44/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Javanese Gongs | `java-gongs/gongs` | Percussion | 14 pads | 1 | 1 |  |

## Javanese Gongs's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Gong ageng 1 |
| 37 | C#2 | Gong ageng 2 |
| 38 | D2 | Gong kemodhong |
| 39 | D#2 | Kempul 1 |
| 40 | E2 | Kempul 2 |
| 41 | F2 | Kempul 3 |
| 42 | F#2 | Kempul 4 |
| 43 | G2 | Kempul 5 |
| 44 | G#2 | Kempul 6 |
| 45 | A2 | Kenong 1 |
| 46 | A#2 | Kenong 2 |
| 47 | B2 | Kenong 3 |
| 48 | C3 | Kenong 4 |
| 49 | C#3 | Kenong 5 |
