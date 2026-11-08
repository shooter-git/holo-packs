# Karoryfer Gogodze Phu (Bobobo Drums)

Five bobobo drums from Ghana: [Gogodze Phu Vol I](https://github.com/sfzinstruments/karoryfer.gogodze-phu-vol-i)
by Karoryfer Lecolds (CC0). The bass, and two tenors and two trebles each struck two ways (the library's
*l* and *s* articulations: long and short), each on its own pad, with four velocity layers and four
takes in turn, as its maps play them.

**Levels:** measured together, so the drums keep their balance as recorded, the loudest at −17 dB at
velocity 127 (less where a slap would peak over −1 dB).

The library's cajon isn't mapped yet.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `gogodze-phu` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Gogodze Phu Vol I by Karoryfer Lecolds (CC0): five bobobo drums from Ghana. |
| Size | 8 MB on disk, 144 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Karoryfer Gogodze Phu (Bobobo Drums)**, or `pnpm packs install gogodze-phu` |

## Where its files come from

Made from 144 recordings, fetched from [sfzinstruments/karoryfer.gogodze-phu-vol-i](https://github.com/sfzinstruments/karoryfer.gogodze-phu-vol-i/tree/7452f62060cd3a468c78bc361d96a4dfb30879c9) at `7452f62`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Bobobo Drums | `gogodze-phu/bobobo` | Percussion | 9 pads | 4 | 4 |  |

## Bobobo Drums's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Bass |
| 37 | C#2 | Tenor 1 long |
| 38 | D2 | Tenor 1 short |
| 39 | D#2 | Tenor 2 long |
| 40 | E2 | Tenor 2 short |
| 41 | F2 | Treble 1 long |
| 42 | F#2 | Treble 1 short |
| 43 | G2 | Treble 2 long |
| 44 | G#2 | Treble 2 short |
