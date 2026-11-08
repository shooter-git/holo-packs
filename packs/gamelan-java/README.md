# Javanese Gamelan (Casa da Música)

The Javanese gamelan of Casa da Música, Porto, in both its tunings, pelog (seven tones) and slendro
(five): *Casa da Música's Virtual Gamelan* by Digitópia, recorded by Pedro Augusto and Rui Penha and
edited by Pedro Augusto, published on [GitHub](https://github.com/Digitopia/CDM-GAMELAN-SAMPLE-LIBRARY)
under the Artistic License 2.0. HO[LO] credits Digitópia and Casa da Música wherever it's played.

**How it plays:**
- **Laid out as the library's own instrument lays it out:** each tone on a white key from C, tones and
  octaves rising left to right, so the keys read the gamelan's own cipher (1 2 3 4 5 6 7 in pelog,
  1 2 3 5 6 in slendro). The middle octave's first tone is C4.
- **Each key plays its recording as it is,** untransposed: a gamelan's tuning is its own, not the piano's.
- **Keyed instruments,** one an instrument and tuning: bonang barung and penerus, gendèr barung and
  penerus, slenthem, gambang, saron demung, barung and peking, kenong (ringing, and damped), and kempul
  (struck soft and hard, as velocity layers).
- **On pads:** the kethuk and kempyang (ringing and damped), the gong ageng and gong suwukan (soft and
  hard), and eight kendhang strokes (ciblon, ketipung, ageng).

The library's guide names the damped strokes with an *s*; its files are the other way round (the *s*
strokes ring for five to nine seconds, the others about one), and HO[LO] follows the files.

**Levels:** each instrument's level is measured, its loudest at −17 dB at velocity 127 (a little less
where a bonang's or saron's sharp strike would otherwise peak over −3 dB). Each note is kept until it
falls to −60 dB (30 s at most) and faded there.

For a Balinese gamelan, see [gamelan-bali](../gamelan-bali/); for more Javanese gongs,
[java-gongs](../java-gongs/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `gamelan-java` |
| Licence | [Artistic License 2.0](https://opensource.org/license/artistic-2-0) |
| Credit | Casa da Música's Virtual Gamelan by Digitópia, Casa da Música, Porto (Artistic License 2.0): its Javanese gamelan in pelog and slendro, recorded by Pedro Augusto and Rui Penha, edited by Pedro Augusto. |
| Size | 363 MB on disk, 281 sample files |
| Instruments | 27 |
| Install | the studio's Library, **More packs → Javanese Gamelan (Casa da Música)**, or `pnpm packs install gamelan-java` |

## Where its files come from

Made from 281 recordings, fetched from [Digitopia/CDM-GAMELAN-SAMPLE-LIBRARY](https://github.com/Digitopia/CDM-GAMELAN-SAMPLE-LIBRARY/tree/2c71a7d49b36c4962b2421273e8cb06aeddf157e) at `2c71a7d`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Bonang Barung (Pelog) | `gamelan-java/bonang-barung-pelog` | Tuned percussion | C4–B5 | 1 | 1 |  |
| Bonang Penerus (Pelog) | `gamelan-java/bonang-penerus-pelog` | Tuned percussion | C4–B5 | 1 | 1 |  |
| Gendèr Barung (Pelog) | `gamelan-java/gender-barung-pelog` | Tuned percussion | A3–C6 | 1 | 1 |  |
| Gendèr Penerus (Pelog) | `gamelan-java/gender-penerus-pelog` | Tuned percussion | A3–C6 | 1 | 1 |  |
| Slenthem (Pelog) | `gamelan-java/slenthem-pelog` | Tuned percussion | C4–B4 | 1 | 1 |  |
| Gambang (Pelog) | `gamelan-java/gambang-pelog` | Tuned percussion | D3–B5 | 1 | 1 |  |
| Saron Demung (Pelog) | `gamelan-java/saron-demung-pelog` | Tuned percussion | C4–B4 | 1 | 1 |  |
| Saron Barung (Pelog) | `gamelan-java/saron-barung-pelog` | Tuned percussion | C4–B4 | 1 | 1 |  |
| Saron Peking (Pelog) | `gamelan-java/saron-peking-pelog` | Tuned percussion | C4–B4 | 1 | 1 |  |
| Kenong (Pelog) | `gamelan-java/kenong-pelog` | Tuned percussion | D4–B4 | 1 | 1 |  |
| Kenong (Pelog, Damped) | `gamelan-java/kenong-pelog_damped` | Tuned percussion | D4–B4 | 1 | 1 |  |
| Kempul (Pelog) | `gamelan-java/kempul-pelog` | Tuned percussion | C4–A4 | 2 | 1 |  |
| Bonang Barung (Slendro) | `gamelan-java/bonang-barung-slendro` | Tuned percussion | C4–G5 | 1 | 1 |  |
| Bonang Penerus (Slendro) | `gamelan-java/bonang-penerus-slendro` | Tuned percussion | C4–G5 | 1 | 1 |  |
| Gendèr Barung (Slendro) | `gamelan-java/gender-barung-slendro` | Tuned percussion | B3–A5 | 1 | 1 |  |
| Gendèr Penerus (Slendro) | `gamelan-java/gender-penerus-slendro` | Tuned percussion | B3–A5 | 1 | 1 |  |
| Slenthem (Slendro) | `gamelan-java/slenthem-slendro` | Tuned percussion | B3–A4 | 1 | 1 |  |
| Gambang (Slendro) | `gamelan-java/gambang-slendro` | Tuned percussion | E3–B5 | 1 | 1 |  |
| Saron Demung (Slendro) | `gamelan-java/saron-demung-slendro` | Tuned percussion | B3–A4 | 1 | 1 |  |
| Saron Barung (Slendro) | `gamelan-java/saron-barung-slendro` | Tuned percussion | B3–C5 | 1 | 1 |  |
| Saron Peking (Slendro) | `gamelan-java/saron-peking-slendro` | Tuned percussion | B3–A4 | 1 | 1 |  |
| Kenong (Slendro) | `gamelan-java/kenong-slendro` | Tuned percussion | D4–B4 | 1 | 1 |  |
| Kenong (Slendro, Damped) | `gamelan-java/kenong-slendro_damped` | Tuned percussion | D4–B4 | 1 | 1 |  |
| Kempul (Slendro) | `gamelan-java/kempul-slendro` | Tuned percussion | E3–G4 | 2 | 1 |  |
| Kethuk and Kempyang | `gamelan-java/kethuk-kempyang` | Percussion | 8 pads | 1 | 1 |  |
| Gong Ageng and Suwukan | `gamelan-java/gongs` | Percussion | 2 pads | 2 | 1 |  |
| Kendhang | `gamelan-java/kendhang` | Percussion | 8 pads | 1 | 1 |  |

## Kethuk and Kempyang's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Kethuk pelog |
| 37 | C#2 | Kethuk pelog damped |
| 38 | D2 | Kethuk slendro |
| 39 | D#2 | Kethuk slendro damped |
| 40 | E2 | Kempyang pelog |
| 41 | F2 | Kempyang pelog damped |
| 42 | F#2 | Kempyang slendro |
| 43 | G2 | Kempyang slendro damped |

## Gong Ageng and Suwukan's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Gong ageng |
| 37 | C#2 | Gong suwukan |

## Kendhang's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Ciblon dlang |
| 37 | C#2 | Ciblon lung |
| 38 | D2 | Ciblon tak |
| 39 | D#2 | Ciblon thung |
| 40 | E2 | Ciblon tong |
| 41 | F2 | Ketipung dhung |
| 42 | F#2 | Ketipung tak |
| 43 | G2 | Ageng dha |
