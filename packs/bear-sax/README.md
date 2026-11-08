# Karoryfer Bear Sax

A 1926 Conn baritone saxophone: [Bear Sax](https://github.com/sfzinstruments/karoryfer.bear-sax) by
Karoryfer Lecolds (CC0), its files as they are.

- **Baritone Sax**: each note soft and loud, looped where the library loops it, so a note holds as long
  as its key. The library fades between them with the mod wheel; here velocity chooses.
- **Baritone Sax (Staccato)**: four velocity layers, three takes in turn.

**Levels:** measured and set where HO[LO]'s velocity curve meets them, the loudest at −17 dB at velocity
127 (less where a note's attack would otherwise peak over −3 dB).

For an alto, see [Weresax](../weresax/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `bear-sax` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Bear Sax by Karoryfer Lecolds (CC0): a 1926 Conn baritone saxophone. |
| Size | 88 MB on disk, 512 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Karoryfer Bear Sax**, or `pnpm packs install bear-sax` |

## Where its files come from

Taken as published from [sfzinstruments/karoryfer.bear-sax](https://github.com/sfzinstruments/karoryfer.bear-sax) at commit [`7abb3c6`](https://github.com/sfzinstruments/karoryfer.bear-sax/tree/7abb3c652525a15dfac80e1b5dfbba9964ee568f): an install checks out only the files this map plays. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Baritone Sax | `bear-sax/baritone-sax` | Woodwinds | C#2–G#4 | 2 | 1 | looped sustains |
| Baritone Sax (Staccato) | `bear-sax/baritone-sax_stac` | Woodwinds | C#2–G#4 | 4 | 4 |  |
