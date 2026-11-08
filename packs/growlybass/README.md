# Karoryfer Growlybass

A Squier Jazz Bass: [Growlybass](https://github.com/sfzinstruments/karoryfer.growlybass) by Karoryfer
Lecolds (CC0).
- **Jazz Bass**: its sustained notes (the library's clean mapping), four velocity layers and takes in
  turn.
- **Jazz Bass (Staccato)**: its short notes (the vicious mapping).

The string scrapes aren't mapped.

**How it's made:** the library maps the bass where it's written, an octave over where it sounds. Here
each key plays the note it names, its low E (41 Hz) on key 28. Each note is kept until it falls to
−60 dB (6 s at most), and measured, the loudest at −17 dB at velocity 127.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `growlybass` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Growlybass by Karoryfer Lecolds (CC0): a Squier Jazz Bass. |
| Size | 182 MB on disk, 294 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Karoryfer Growlybass**, or `pnpm packs install growlybass` |

## Where its files come from

Made from 294 recordings, fetched from [sfzinstruments/karoryfer.growlybass](https://github.com/sfzinstruments/karoryfer.growlybass/tree/4f483268fc66b5a6d5781d421c0d11b8d08d3fc6) at `4f48326`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Jazz Bass | `growlybass/bass` | Bass | C#1–D#4 | 4 | 4 |  |
| Jazz Bass (Staccato) | `growlybass/bass_stac` | Bass | C#1–D#4 | 1 | 5 |  |
