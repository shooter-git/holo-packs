# Balinese Gamelan (OLPC)

A Balinese gamelan recorded by Akito van Troyer for the One Laptop per Child sound library
([archive.org/details/AkitoVanTroyer](https://archive.org/details/AkitoVanTroyer), CC BY 3.0).

Its five tones (1 2 3 5 6) are on white keys from C, octaves rising left to right, as the
[Javanese gamelan](../gamelan-java/) lays them out. Each key plays its recording as it is: a gamelan's
tuning is its own.
- **Keyed:** jegogan, calung, gangsa pemade, gangsa kantilan (the set's *higangsa*) and reyong.
- **On pads:** the gong, two kempur, the kemong and the kempli.

**Provenance:** One Laptop per Child published these as CC BY 3.0 without notes on each file, so each
was checked before it was mapped: one consistent set of mono 44.1 kHz recordings of one ensemble, edited
in an ordinary editor, with nothing that points at a commercial library.

**How it's made:** HO[LO] fetches each file on its own out of the published zip (archive.org serves a
zip's files one by one), keeps it until it falls to −60 dB and fades it there, otherwise bit for bit.
Each instrument's loudest note plays at −17 dB at velocity 127.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `gamelan-bali` |
| Licence | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Credit | Balinese gamelan samples by Akito van Troyer for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/AkitoVanTroyer). |
| Size | 14 MB on disk, 47 sample files |
| Instruments | 6 |
| Install | the studio's Library, **More packs → Balinese Gamelan (OLPC)**, or `pnpm packs install gamelan-bali` |

## Where its files come from

Made from 47 recordings, fetched from <https://archive.org/download/AkitoVanTroyer/AkitoVanTroyer44.zip/AkitoVanTroyer44/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Jegogan | `gamelan-bali/jegogan` | Tuned percussion | E3–B3 | 1 | 1 |  |
| Calung | `gamelan-bali/calung` | Tuned percussion | C4–G4 | 1 | 1 |  |
| Gangsa Pemade | `gamelan-bali/gangsa-pemade` | Tuned percussion | F3–A4 | 1 | 1 |  |
| Gangsa Kantilan | `gamelan-bali/gangsa-kantilan` | Tuned percussion | D4–F5 | 1 | 1 |  |
| Reyong | `gamelan-bali/reyong` | Tuned percussion | G3–D5 | 1 | 1 |  |
| Gong, Kempur, Kemong, Kempli | `gamelan-bali/gongs` | Percussion | 5 pads | 1 | 1 |  |

## Gong, Kempur, Kemong, Kempli's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Gong |
| 37 | C#2 | Kempur |
| 38 | D2 | Kempur 2 |
| 39 | D#2 | Kemong |
| 40 | E2 | Kempli |
