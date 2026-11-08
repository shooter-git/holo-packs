# FreePats Button Accordion HN

A Hohner button accordion from the [FreePats project](https://freepats.zenvoid.org/Organ/accordion.html)
(CC0), played as its tuned SFZ program plays it: each note tuned as the program tunes it and held on
its loop. Measured, the loudest at −17 dB at velocity 127. The notes are taken out of the project's own 7z downloads (an install downloads each, checks it, takes out what it plays and lets it go).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `freepats-accordion` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Button Accordion HN of the FreePats project (CC0): a Hohner button accordion. |
| Size | 7 MB on disk, 34 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → FreePats Button Accordion HN**, or `pnpm packs install freepats-accordion` |

## Where its files come from

Made from 34 recordings, fetched from the archive <https://github.com/freepats/button-accordion-HN/releases/download/2024-03-29/ButtonAccordionHN-SFZ+FLAC-20240329.7z> (sha256 `e5326a8830f0…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Button Accordion | `freepats-accordion/accordion` | Pianos and keys | B2–G5 | 1 | 1 | release samples, looped sustains |
