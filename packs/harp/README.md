# Etherealwinds Harp II CE

A 34-string Iona Celtic lever harp, played by Jordi Francis (etherealwinds) and sampled chromatically in
stereo with Versilian Studios: [Etherealwinds Harp II: Community Edition](https://versilian-studios.com/etherealwinds-harp/)
(CC BY 4.0). Two velocity layers, two takes of each in turn, as its SFZ program plays them. The
library's vocal phrases and effects aren't mapped.

**Levels:** its two layers were recorded to one level, so they keep the program's velocity splits and
each plays at the level HO[LO]'s velocity curve has there, the loudest at −17 dB at velocity 127 (less
where a pluck's attack would peak over −1 dB).

**How it's made:** the harp is published as one zip (215 MB); an install downloads it, checks it,
takes the 232 notes out, keeps each until it falls to −60 dB (12 s at most) and fades it there,
otherwise bit for bit, and lets the zip go.

**Attribution:** CC BY 4.0 asks that Jordi Francis and Versilian Studios be credited wherever the sound
is used. HO[LO] shows the credit in its Library, and an experience's pinned `packs.json` carries it.

For an orchestral pedal harp, see VSCO 2's [Harp](../vsco2/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `harp` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | Etherealwinds Harp II: Community Edition by Jordi Francis (etherealwinds) and Versilian Studios (CC BY 4.0): a 34-string Iona Celtic harp, sampled chromatically. |
| Size | 179 MB on disk, 232 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Etherealwinds Harp II CE**, or `pnpm packs install harp` |

## Where its files come from

Made from 232 recordings, fetched from the archive <https://versilian-studios.com/Distro/EWHarp2CE_SFZ-Raw.zip> (sha256 `18b78e3c309f…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Celtic Harp | `harp/harp` | Strings | C2–A6 | 2 | 2 |  |
