# Karoryfer Cowsynth (Bagpipe Synth)

A replica of medieval bagpipes, sampled as a synthesizer's oscillators:
[Cowsynth](https://github.com/sfzinstruments/karoryfer.cowsynth) by Karoryfer Lecolds (CC0). It comes in
two mappings, every note held on its loop:
- **Wheezy**: the bagpipes tuned to equal temperament.
- **Lonely**: pitch-corrected to perfect equal temperament.

The library maps each note an octave under where it sounds; here each key plays the note it names.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `cowsynth` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Cowsynth by Karoryfer Lecolds (CC0): a replica of medieval bagpipes, sampled as a synthesizer's oscillators. |
| Size | 13 MB on disk, 16 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Karoryfer Cowsynth (Bagpipe Synth)**, or `pnpm packs install cowsynth` |

## Where its files come from

Made from 16 recordings, fetched from [sfzinstruments/karoryfer.cowsynth](https://github.com/sfzinstruments/karoryfer.cowsynth/tree/5a5b5afc2dabbe54cf9d75ab64711ce01862b42c) at `5a5b5af`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Bagpipe Synth (Wheezy) | `cowsynth/wheezy` | Other | G3–F#5 | 1 | 1 |  |
| Bagpipe Synth (Lonely) | `cowsynth/lonely` | Other | G3–F#5 | 1 | 1 |  |
