# FreePats Synthesizer Percussion

A drum kit of the sounds vintage analog machines made, synthesized by Roberto of the
[FreePats project](https://freepats.zenvoid.org/Percussion/electric-percussion.html) with the free
Yoshimi and Geonkick synthesizers (CC0): two kicks, two snares, a clap, closed and open hi-hats (the
closed ones stop the open), two cymbals, six toms, shakers and claves, on General MIDI's keys.

**Levels:** measured as a whole, so its sounds keep their balance as made, the kit at −19 dB at
velocity 127, the level of HO[LO]'s kits (less where a hit would peak over −1 dB). The notes are taken out of the project's own 7z downloads (an install downloads each, checks it, takes out what it plays and lets it go).

For a lo-fi kit made partly from it, see [Lo-fi Beat Kit](../lofi-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `freepats-synth-percussion` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | The synthesizer percussion of the FreePats project (CC0), made by Roberto with the Yoshimi and Geonkick synthesizers. |
| Size | 2 MB on disk, 21 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → FreePats Synthesizer Percussion**, or `pnpm packs install freepats-synth-percussion` |

## Where its files come from

Made from 21 recordings, fetched from the archive <https://freepats.zenvoid.org/Percussion/SynthesizerPercussion/SynthesizerPercussion-SFZ-20220718.7z> (sha256 `dbb2e5bb8268…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Synth Percussion Kit | `freepats-synth-percussion/kit` | Drum kits | 19 pads | 1 | 3 | chokes (a closed hi-hat stops the open one) |

## Synth Percussion Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 34 | A#1 | Kick 2 |
| 36 | C2 | Kick |
| 38 | D2 | Snare |
| 39 | D#2 | Clap |
| 40 | E2 | Snare 2 |
| 41 | F2 | Low tom 2 |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Low tom 1 |
| 44 | G#2 | Hi-hat closed 2 |
| 45 | A2 | Mid tom 2 |
| 46 | A#2 | Hi-hat open |
| 47 | B2 | Mid tom 1 |
| 48 | C3 | High tom 2 |
| 49 | C#3 | Crash |
| 50 | D3 | High tom 1 |
| 57 | A3 | Crash 2 |
| 70 | A#4 | Shaker |
| 75 | D#5 | Claves |
| 82 | A#5 | Shaker long |
