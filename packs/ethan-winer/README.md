# Ethan Winer's Instruments

[Ethan Winer](https://ethanwiner.com/ewsf2.html)'s original instrument samples, free to use any way you
like, royalty free, commercial projects included, with no attribution required. They're mapped in FLAC
by kinwie for the [SFZ Instruments](https://github.com/sfzinstruments/EthanWiner.Soundfonts) project.
- **Played by pitch:** bassoon (two layers), cello, glockenspiel.
- **On pads:** African slit drums, a brushed snare's hits and rolls (thin and fat brushes), temple
  blocks, shakers, claves, sleigh bells, tambourine, triangle, wind chimes, a turtle drum (played by
  Katie Petreycik) and a slide whistle's swoops. Each sound is its own pad, its dynamics are velocity
  layers, and its takes play in turn.

**Levels:** each instrument is measured (a pad set as a whole), the loudest at −17 dB at velocity 127
(less where a hit would peak over −1 dB). Each sound is kept until it falls to −60 dB.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `ethan-winer` |
| Licence | Free to use without restriction (Ethan Winer) |
| Credit | Ethan Winer's original instrument samples (ethanwiner.com: free to use any way you like, royalty free, including for commercial projects), mapped in FLAC by kinwie for the SFZ Instruments project. The turtle drum was played by Katie Petreycik. |
| Size | 32 MB on disk, 139 sample files |
| Instruments | 14 |
| Install | the studio's Library, **More packs → Ethan Winer's Instruments**, or `pnpm packs install ethan-winer` |

## Where its files come from

Made from 139 recordings, fetched from [sfzinstruments/EthanWiner.Soundfonts](https://github.com/sfzinstruments/EthanWiner.Soundfonts/tree/173e3f897a922dc9fb9b96ae743f82c9d5ad1e19) at `173e3f8`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Bassoon | `ethan-winer/bassoon` | Woodwinds | B1–C#5 | 2 | 1 |  |
| Cello | `ethan-winer/cello` | Strings | C#2–E6 | 1 | 1 |  |
| Glockenspiel | `ethan-winer/glockenspiel` | Tuned percussion | G5–B7 | 1 | 1 |  |
| African Slit Drums | `ethan-winer/slit-drums` | Percussion | 7 pads | 3 | 1 |  |
| Brush Snare Hits and Rolls | `ethan-winer/brush-snare` | Percussion | 4 pads | 1 | 1 |  |
| Temple Blocks | `ethan-winer/temple-blocks` | Percussion | 5 pads | 4 | 1 |  |
| Shakers | `ethan-winer/shakers` | Percussion | 6 pads | 3 | 1 |  |
| Claves | `ethan-winer/claves` | Percussion | 1 pads | 4 | 1 |  |
| Sleigh Bells | `ethan-winer/sleigh-bells` | Percussion | 6 pads | 2 | 1 |  |
| Tambourine | `ethan-winer/tambourine` | Percussion | 2 pads | 1 | 1 |  |
| Triangle | `ethan-winer/triangle` | Percussion | 1 pads | 1 | 1 |  |
| Wind Chimes | `ethan-winer/wind-chimes` | Percussion | 3 pads | 1 | 1 |  |
| Turtle Drum | `ethan-winer/turtle-drum` | Percussion | 1 pads | 4 | 1 |  |
| Slide Whistle | `ethan-winer/slide-whistle` | Percussion | 6 pads | 1 | 1 |  |

## African Slit Drums's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Slit drum 1 |
| 37 | C#2 | Slit drum 2 |
| 38 | D2 | Slit drum 3 |
| 39 | D#2 | Slit drum 4 |
| 40 | E2 | Slit drum 5 |
| 41 | F2 | Slit drum 6 |
| 42 | F#2 | Slit drum 7 |

## Brush Snare Hits and Rolls's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Brush Hit |
| 37 | C#2 | Brush Roll |
| 38 | D2 | Brush Hit Fat |
| 39 | D#2 | Brush Roll Fat |

## Temple Blocks's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Temple Block 1 |
| 37 | C#2 | Temple Block 2 |
| 38 | D2 | Temple Block 3 |
| 39 | D#2 | Temple Block 4 |
| 40 | E2 | Temple Block 5 |

## Shakers's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Large Swish |
| 37 | C#2 | Large shaker |
| 38 | D2 | Small Swish1 |
| 39 | D#2 | Small Swish2 |
| 40 | E2 | Small shaker |
| 41 | F2 | Small Swish3 |

## Claves's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Clave |

## Sleigh Bells's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Sleigh bells 1 hit |
| 37 | C#2 | Sleigh bells 2 hit |
| 38 | D2 | Sleigh bells 1 shake slow |
| 39 | D#2 | Sleigh bells 1 shake fast |
| 40 | E2 | Sleigh bells 2 shake slow |
| 41 | F2 | Sleigh bells 2 shake fast |

## Tambourine's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Tambourine Hit |
| 37 | C#2 | Tambourine Roll |

## Triangle's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Triangle |

## Wind Chimes's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Wind Chime 1 |
| 37 | C#2 | Wind Chime 2 |
| 38 | D2 | Wind Chime 3 |

## Turtle Drum's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Turtle drum |

## Slide Whistle's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Up slow |
| 37 | C#2 | Up fast |
| 38 | D2 | Up faster |
| 39 | D#2 | Down slow |
| 40 | E2 | Down fast |
| 41 | F2 | Down faster |
