# FreePats Spanish Classical Guitar

A nylon-string Spanish classical guitar from the [FreePats project](https://freepats.zenvoid.org/Guitar/acoustic-guitar.html)
(CC0), sampled note by note.

**How the files are made:**
- FreePats publishes the guitar as one 7z archive of FLAC files, a note each.
- An install fetches that archive and checks its sha256. It decodes each note from its FLAC and writes
  the 16-bit WAV that ffmpeg first wrote from it, INFO tag and all, so every install makes exactly the
  files this pack's checksums name.
- HO[LO] reads the archive itself, with no 7-Zip or ffmpeg needed.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `freepats-guitar` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | The Spanish classical guitar of the FreePats project (CC0). |
| Size | 20 MB on disk, 48 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → FreePats Spanish Classical Guitar**, or `pnpm packs install freepats-guitar` |

## Where its files come from

Decoded from the published archive <https://freepats.zenvoid.org/Guitar/SpanishClassicalGuitar/SpanishClassicalGuitar-SFZ+FLAC-20190618.7z> (sha256 `903916921a21…`): each note from its FLAC, written as the WAV it was first made as. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Classical Guitar | `freepats-guitar/nylon` | Guitars and plucked strings | G1–C6 | 1 | 1 |  |
