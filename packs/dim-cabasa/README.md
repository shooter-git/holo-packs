# Dim Cabasa

A cabasa turned backward and forward, each on its pad, with 125 takes of each played in turn, so a
pattern never repeats itself: [Dim Cabasa](https://github.com/sfzinstruments/kinwie.dim-cabasa) by
kinwie for the SFZ Instruments project (CC BY 4.0), played as its SFZ program plays it.

**Attribution:** CC BY 4.0 asks that kinwie be credited wherever the sound is used. HO[LO] shows the
credit in its Library, and an experience's pinned `packs.json` carries it.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `dim-cabasa` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | Dim Cabasa by kinwie for the SFZ Instruments project (CC BY 4.0). |
| Size | 22 MB on disk, 250 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Dim Cabasa**, or `pnpm packs install dim-cabasa` |

## Where its files come from

Made from 250 recordings, fetched from [sfzinstruments/kinwie.dim-cabasa](https://github.com/sfzinstruments/kinwie.dim-cabasa/tree/016457e51a3e6558ab49676789260b54ff52ff1b) at `016457e`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Cabasa | `dim-cabasa/cabasa` | Percussion | 2 pads | 1 | 125 |  |

## Cabasa's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Cabasa backward |
| 37 | C#2 | Cabasa forward |
