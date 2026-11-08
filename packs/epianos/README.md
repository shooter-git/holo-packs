# Greg Sullivan E-Pianos (CP80, Pianet T, Wurlitzer)

Three classic electric pianos sampled by [Greg Sullivan](http://www.sullivang.net/), shared with his
permission on condition of attribution (CC BY 3.0) and mapped in FLAC by kinwie for the
[SFZ Instruments](https://github.com/sfzinstruments/GregSullivan.E-Pianos) project:

- **Yamaha CP80 Electric Grand**: the stage piano with strings and pickups, four velocity layers.
- **Hohner Pianet T**: reeds plucked by sticky pads, two layers, and the pads letting go as a key comes up.
- **Wurlitzer EP200**: struck reeds through the amplifier, four layers.

Each plays as its SFZ program plays it: its keys, its velocity layers, each note's own tuning and level
trim, and where a note starts and ends.

**Levels:** each note was recorded to one level (the programs leave the dynamics to the sampler), so
the layers keep the programs' own velocity splits, and each plays at the level HO[LO]'s velocity curve
has there. The loudest plays at −17 dB at velocity 127.

**How it's made:** each note is kept until it falls to −60 dB (15 s at most) and faded there,
otherwise bit for bit, as 16-bit WAVs.

**Attribution:** CC BY 3.0 asks that Greg Sullivan be credited wherever the sound is used. HO[LO] shows
the credit in its Library, and an experience's pinned `packs.json` carries it.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `epianos` |
| Licence | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Credit | Greg Sullivan's E-Pianos (CC BY 3.0, sullivang.net): a Yamaha CP80 electric grand, a Hohner Pianet T and a Wurlitzer EP200, mapped in FLAC by kinwie for the SFZ Instruments project. Trimmed for HO[LO]: each note ends where it falls to -60 dB. |
| Size | 78 MB on disk, 172 sample files |
| Instruments | 3 |
| Install | the studio's Library, **More packs → Greg Sullivan E-Pianos (CP80, Pianet T, Wurlitzer)**, or `pnpm packs install epianos` |

## Where its files come from

Made from 172 recordings, fetched from [sfzinstruments/GregSullivan.E-Pianos](https://github.com/sfzinstruments/GregSullivan.E-Pianos/tree/8c3e581acda3594b553948ff0222d4f84a698376) at `8c3e581`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Yamaha CP80 Electric Grand | `epianos/cp80` | Pianos and keys | D#1–B7 | 4 | 1 |  |
| Hohner Pianet T | `epianos/pianet` | Pianos and keys | F1–E6 | 2 | 1 | release samples |
| Wurlitzer EP200 | `epianos/wurlitzer` | Pianos and keys | A1–G#6 | 4 | 1 |  |
