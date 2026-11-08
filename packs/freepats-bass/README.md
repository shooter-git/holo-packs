# FreePats Bass Guitar YR

An electric bass from the [FreePats project](https://freepats.zenvoid.org/ElectricGuitar/clean-electric-bass.html)
(CC0), picked and played with the fingers, a note a key as its SFZ programs play it.

**Levels:** measured, the loudest at −17 dB at velocity 127; each note kept until it falls to −60 dB.
The notes are taken out of the project's own 7z downloads (an install downloads each, checks it, takes out what it plays and lets it go).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `freepats-bass` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Bass Guitar YR of the FreePats project (CC0): an electric bass, picked and played with the fingers. |
| Size | 12 MB on disk, 25 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → FreePats Bass Guitar YR**, or `pnpm packs install freepats-bass` |

## Where its files come from

Made from 25 recordings, fetched from the archive <https://github.com/freepats/electric-bass-YR/releases/download/2019-09-30/FingerBassYR-SFZ+FLAC-20190930.7z> (sha256 `36f87ec9eb08…`) and the archive <https://github.com/freepats/electric-bass-YR/releases/download/2019-09-30/PickedBassYR-SFZ+FLAC-20190930.7z> (sha256 `aa7650fc206a…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Electric Bass (Picked) | `freepats-bass/picked` | Bass | E1–E2 | 1 | 1 |  |
| Electric Bass (Fingered) | `freepats-bass/finger` | Bass | E1–D#2 | 1 | 1 |  |
