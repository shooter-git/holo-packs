# FreePats Electric Guitars (FSBS)

A Fender electric guitar sampled direct and played through an amplifier and effects: the [FreePats
project](https://freepats.zenvoid.org/ElectricGuitar/clean-electric-guitar.html)'s FSBS sets (CC0) from
the bridge pickup, a soft and a hard layer with four takes in turn.
- **Electric Guitar (Clean)**
- **Electric Guitar (Jazz)**: warm and dark.
- **Electric Guitar (Distorted)**: the project's second distorted set.

Its programs hold each note on a loop; a guitar's note dies away, so here each plays as recorded, kept
until it falls to −60 dB (6 s at most), as 16-bit WAVs (the full sets would take 1.3 GB held on their
loops; this takes 394 MB).

**Levels:** its layers were recorded to one level, so they keep the programs' velocity splits and each
plays at the level HO[LO]'s velocity curve has there, the loudest at −17 dB at velocity 127.
The notes are taken out of the project's own 7z downloads (an install downloads each, checks it, takes out what it plays and lets it go).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `freepats-electric-guitars` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Electric Guitar FSBS of the FreePats project (CC0): a Fender electric guitar, clean, jazz and distorted. |
| Size | 394 MB on disk, 360 sample files |
| Instruments | 3 |
| Install | the studio's Library, **More packs → FreePats Electric Guitars (FSBS)**, or `pnpm packs install freepats-electric-guitars` |

## Where its files come from

Made from 360 recordings, fetched from the archive <https://github.com/freepats/electric-guitar-FSBS-clean/releases/download/2026-08-07/EGuitarFSBS-clean-SFZ+FLAC-20260807.7z> (sha256 `a929a3cbfc82…`) and the archive <https://github.com/freepats/electric-guitar-FSBS-dist2/releases/download/2022-09-11/EGuitarFSBS-dist2-SFZ+FLAC-20220911.7z> (sha256 `fee513712e10…`) and the archive <https://github.com/freepats/electric-guitar-FSBS-jazz/releases/download/2026-08-07/EGuitarFSBS-jazz-SFZ+FLAC-20260807.7z> (sha256 `c584f2e17657…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Electric Guitar (Clean) | `freepats-electric-guitars/clean` | Guitars and plucked strings | C2–C#6 | 2 | 4 |  |
| Electric Guitar (Jazz) | `freepats-electric-guitars/jazz` | Guitars and plucked strings | C2–C#6 | 2 | 4 |  |
| Electric Guitar (Distorted) | `freepats-electric-guitars/distorted` | Guitars and plucked strings | C2–C#6 | 2 | 4 |  |
