# jSteelDrum

A steel pan: Jeff Learman's [jSteelDrum](https://github.com/sfzinstruments/jlearman.SteelDrum), shared
under the Unlicense (free to use for anything). HO[LO] plays it as its SFZ program without crossfades
does: velocity layers, and takes in turn.

**Levels:** its notes were each recorded to one level, so the layers keep the program's velocity
splits and each plays at the level HO[LO]'s velocity curve has there, the loudest at −17 dB at velocity
127. Each note is kept until it falls to −60 dB and faded there.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `steel-drum` |
| Licence | [The Unlicense](https://unlicense.org/) |
| Credit | jSteelDrum by Jeff Learman (the Unlicense), from the SFZ Instruments project: a steel pan. |
| Size | 111 MB on disk, 368 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → jSteelDrum**, or `pnpm packs install steel-drum` |

## Where its files come from

Made from 368 recordings, fetched from [sfzinstruments/jlearman.SteelDrum](https://github.com/sfzinstruments/jlearman.SteelDrum/tree/dc15a36ad69a43b0d240fcbd0cc78fbc61b2b47e) at `dc15a36`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Steel Pan | `steel-drum/steel-pan` | Tuned percussion | C4–B5 | 5 | 6 |  |
