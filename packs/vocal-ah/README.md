# Male Voice "Ah"

A deep male voice singing "ah", sustained, without vibrato, from C2 to A#3: the
[legato vocal tutorial](https://github.com/sfzinstruments/legato_vocal_tutorial) of the SFZ Instruments
project (CC0), the "a" vowel of Karoryfer's Hadzi-Fia sample library.

HO[LO] plays it as the tutorial's polyphonic program does, each note held on its own loop, so a choir
of one can hold a chord. One layer: the library sets its level with the mod wheel; here velocity does.

**How it's made:** the library's SFZ maps each note an octave over where it sounds (its "d3", 74 Hz,
on key 50); here each key plays the note it names. The files are the library's WAVs, bit for bit.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `vocal-ah` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | A male voice singing "ah": the legato vocal tutorial of the SFZ Instruments project (CC0), the a vowel from Karoryfer's Hadzi-Fia sample library. |
| Size | 38 MB on disk, 23 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Male Voice "Ah"**, or `pnpm packs install vocal-ah` |

## Where its files come from

Made from 23 recordings, fetched from [sfzinstruments/legato_vocal_tutorial](https://github.com/sfzinstruments/legato_vocal_tutorial/tree/fac6461ee4c7f498b23246eced644616fa58d2ec) at `fac6461`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Male Voice Ah | `vocal-ah/ah` | Voices | C2–A#3 | 1 | 1 | looped sustains |
