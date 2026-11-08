# FreePats Upright Piano KW

An upright piano from the [FreePats project](https://freepats.zenvoid.org/Piano/acoustic-grand-piano.html)
(CC0): two velocity layers every minor third, each note held on its loop as its SFZ program loops it.
The program's per-note filters aren't played: the notes are as recorded.

**Levels:** its layers were recorded to one level, so they keep the program's velocity splits and each
plays at the level HO[LO]'s velocity curve has there, the loudest at −16.4 dB at velocity 127, the
[Steinway](../steinway/)'s level. The notes are taken out of the project's own 7z downloads (an install downloads each, checks it, takes out what it plays and lets it go).

For layered and honky-tonk versions of it, see [Vintage Keys](../vintage-keys/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `freepats-upright` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Upright Piano KW of the FreePats project (CC0). |
| Size | 86 MB on disk, 66 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → FreePats Upright Piano KW**, or `pnpm packs install freepats-upright` |

## Where its files come from

Made from 66 recordings, fetched from the archive <https://freepats.zenvoid.org/Piano/UprightPianoKW/UprightPianoKW-SFZ+FLAC-20220221.7z> (sha256 `3a66da3b25a2…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Upright Piano | `freepats-upright/upright` | Pianos and keys | A0–C8 | 2 | 1 | looped sustains |
