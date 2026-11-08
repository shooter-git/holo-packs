# Lo-fi Beat Kit (Sonic Pi, FreePats)

A lo-fi beat kit made for HO[LO] from [Sonic Pi](../sonic-pi/)'s samples and the
[FreePats synthesizer percussion](../freepats-synth-percussion/) (both CC0). It sits on General MIDI's
keys:
- fat and analog kicks, a dub snare and a synth one, a side stick and a clap;
- closed, pedal and open hi-hats (the closed ones stop the open);
- three toms, a soft splash, a ride, a cowbell, a shaker, a finger snap and vinyl hiss.

**How it's made:** every sound plays two semitones slow, as old samplers pitched their drums down:
darker, rounder, a little longer. It's resampled by plain arithmetic, the same on every computer, into
16-bit WAVs.

**Levels:** measured as a whole, the kit at −19 dB at velocity 127, the level of HO[LO]'s kits.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `lofi-kit` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Made for HO[LO] from Sonic Pi's samples (CC0, Freesound users' recordings as Sonic Pi's README lists them) and the FreePats synthesizer percussion (CC0, Roberto of FreePats): each played two semitones slow. |
| Size | 3 MB on disk, 18 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Lo-fi Beat Kit (Sonic Pi, FreePats)**, or `pnpm packs install lofi-kit` |

## Where its files come from

Made from 18 recordings, fetched from [sonic-pi-net/sonic-pi](https://github.com/sonic-pi-net/sonic-pi/tree/d1393a06266f74dc216bfd8a7e9a8eb7135b4941) at `d1393a0` and the archive <https://freepats.zenvoid.org/Percussion/SynthesizerPercussion/SynthesizerPercussion-SFZ-20220718.7z> (sha256 `dbb2e5bb8268…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Lo-fi Beat Kit | `lofi-kit/kit` | Drum kits | 18 pads | 1 | 1 | chokes (a closed hi-hat stops the open one) |

## Lo-fi Beat Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 34 | A#1 | Kick 2 |
| 36 | C2 | Kick |
| 37 | C#2 | Side stick |
| 38 | D2 | Snare |
| 39 | D#2 | Clap |
| 40 | E2 | Snare 2 |
| 41 | F2 | Low tom |
| 42 | F#2 | Hi-hat closed |
| 44 | G#2 | Hi-hat pedal |
| 45 | A2 | Mid tom |
| 46 | A#2 | Hi-hat open |
| 48 | C3 | High tom |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 54 | F#3 | Snap |
| 56 | G#3 | Cowbell |
| 60 | C4 | Vinyl hiss |
| 70 | A#4 | Shaker |
