# University of Iowa MIS: Percussion and Thai Gongs

The University of Iowa Electronic Music Studios' [Musical Instrument Samples](https://theremin.music.uiowa.edu/MIS.html),
free to use for any project without restriction: its newer single-note recordings (the 2012 pages,
published as *MIS Pitches - 2014*), every note recorded on its own, fortissimo, in stereo.

- **Thai Gongs**: thirteen tuned gongs, C4 to C5, played by pitch.
- On pads:
  - **Tam-tams and Wind Gong**: 22″, 28″ and 40″ tam-tams and a 20″ wind gong, struck and bowed.
  - **Suspended and Orchestral Cymbals**: crash, Chinese, ride, ride bell, splash, mallet rolls, a choke,
    and five orchestral crash pairs (banda turka, medium heavy, French, Germanic, Viennese).
  - **Hand Percussion**: woodblocks, granite blocks, claves, guiro, castanets and triangles (struck and
    rolled).
  - **Tambourines**: three tambourines, and one played sforzando and rolled three ways.

**How it's made:** HO[LO] fetches each note's AIFF from the university's own site, starts it just
before its attack (the recordings have silence before it), keeps it until it falls to −60 dB and fades
it there, otherwise bit for bit. One layer a note, so velocity sets its level, the loudest at −17 dB at
velocity 127 (less where an attack would peak over the limit). Each pad set is measured as a whole, so its sounds keep their balance as recorded.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `iowa-percussion` |
| Licence | Free to use without restriction (University of Iowa Electronic Music Studios) |
| Credit | University of Iowa Musical Instrument Samples (Electronic Music Studios, University of Iowa): free to use for any project, without restriction. |
| Size | 96 MB on disk, 63 sample files |
| Instruments | 5 |
| Install | the studio's Library, **More packs → University of Iowa MIS: Percussion and Thai Gongs**, or `pnpm packs install iowa-percussion` |

## Where its files come from

Made from 63 recordings, fetched from <https://theremin.music.uiowa.edu/sound%2520files/MIS%2520Pitches%2520-%25202014/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Thai Gongs | `iowa-percussion/thai-gongs` | Tuned percussion | C4–C5 | 1 | 1 |  |
| Tam-tams and Wind Gong | `iowa-percussion/tamtams` | Percussion | 8 pads | 1 | 1 |  |
| Suspended and Orchestral Cymbals | `iowa-percussion/cymbals` | Percussion | 17 pads | 1 | 1 |  |
| Hand Percussion | `iowa-percussion/hand` | Percussion | 18 pads | 1 | 1 |  |
| Tambourines | `iowa-percussion/tambourines` | Percussion | 7 pads | 1 | 1 |  |

## Tam-tams and Wind Gong's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Tam-tam 22″ |
| 37 | C#2 | Tam-tam 28″ |
| 38 | D2 | Tam-tam 40″ |
| 39 | D#2 | Wind gong 20″ |
| 40 | E2 | Tam-tam 22″ bowed |
| 41 | F2 | Tam-tam 28″ bowed |
| 42 | F#2 | Tam-tam 40″ bowed |
| 43 | G2 | Wind gong 20″ bowed |

## Suspended and Orchestral Cymbals's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Crash 13″ |
| 37 | C#2 | Crash 17″ |
| 38 | D2 | Crash 18″ |
| 39 | D#2 | Crash 20″ |
| 40 | E2 | Chinese 16″ |
| 41 | F2 | Chinese 19″ |
| 42 | F#2 | Ride 21″ |
| 43 | G2 | Ride 21″ bell |
| 44 | G#2 | Splash |
| 45 | A2 | Crash 18″ roll |
| 46 | A#2 | Ride 21″ roll |
| 47 | B2 | Crash 18″ choke |
| 48 | C3 | Orch crash 15″ banda turka |
| 49 | C#3 | Orch crash 17″ medium heavy |
| 50 | D3 | Orch crash 18″ French |
| 51 | D#3 | Orch crash 18″ Germanic |
| 52 | E3 | Orch crash 18″ Viennese |

## Hand Percussion's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Woodblock 5½″ |
| 37 | C#2 | Woodblock 6½″ |
| 38 | D2 | Woodblock 7″ |
| 39 | D#2 | Woodblock 8½″ |
| 40 | E2 | Woodblock 10″ |
| 41 | F2 | Granite block 1 |
| 42 | F#2 | Granite block 3 |
| 43 | G2 | Granite block 5 |
| 44 | G#2 | Clave 1 |
| 45 | A2 | Clave 4 |
| 46 | A#2 | Guiro away |
| 47 | B2 | Guiro toward |
| 48 | C3 | Castanet 1 |
| 49 | C#3 | Castanet 2 |
| 50 | D3 | Triangle 6″ |
| 51 | D#3 | Triangle 8″ |
| 52 | E3 | Triangle 6″ roll |
| 53 | F3 | Triangle 8″ roll |

## Tambourines's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Tambourine 1 |
| 37 | C#2 | Tambourine 2 |
| 38 | D2 | Tambourine 3 |
| 39 | D#2 | Tambourine 1 sforzando |
| 40 | E2 | Tambourine 1 shake roll |
| 41 | F2 | Tambourine 1 thumb roll |
| 42 | F#2 | Tambourine 1 finger roll |
