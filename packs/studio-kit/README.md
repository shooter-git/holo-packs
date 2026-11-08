# Studio Kit (Karoryfer Unruly Drums)

[Unruly Drums](https://github.com/sfzinstruments/karoryfer.unruly-drums) by Karoryfer Lecolds (CC0),
tuned and played for a tighter studio sound:
- the 20" kick played dirty (a harder, rattling beater);
- the 13" snare (tighter, higher);
- toms from the 14" and 22" snares with their snares off, played dirty;
- the 14" hi-hats played with the stick's shank;
- the ride and the crash.

It's mixed from each piece's close and overhead microphones.

**Levels:** mixed the way an engineer mixes a session, every microphone at its fader level and pan,
the same for every hit. Each hit is trimmed to just before its attack and to where its tail falls away.
Its layers are set where the kit's one velocity curve meets their loudness, as HO[LO]'s other kits are,
the kit as a whole at −19 dB at velocity 127.

The same kit played warmer is the [Soul Kit](../soul-kit/); for brushes, see the
[Brushes Kit](../brushes-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `studio-kit` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Unruly Drums by Karoryfer Lecolds (CC0). Mixed for HO[LO] from its close and overhead microphones: a studio kit. |
| Size | 143 MB on disk, 376 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Studio Kit (Karoryfer Unruly Drums)**, or `pnpm packs install studio-kit` |

## Where its files come from

Made from 1160 recordings, fetched from [sfzinstruments/karoryfer.unruly-drums](https://github.com/sfzinstruments/karoryfer.unruly-drums/tree/9bf75c2a1392f190cd1c264645653629f0b3a097) at `9bf75c2`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Studio Kit | `studio-kit/kit` | Drum kits | 15 pads | 8 | 4 | chokes (a closed hi-hat stops the open one) |

## Studio Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 26 | D1 | Hi-hat half open |
| 33 | A1 | Hi-hat tight |
| 36 | C2 | Kick |
| 37 | C#2 | Side stick |
| 38 | D2 | Snare |
| 39 | D#2 | Rimshot |
| 40 | E2 | Snare edge |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Tom 22″ |
| 44 | G#2 | Hi-hat pedal |
| 46 | A#2 | Hi-hat open |
| 48 | C3 | Tom 14″ |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 53 | F3 | Ride bell |
