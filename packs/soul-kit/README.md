# Soul Kit (Karoryfer Unruly Drums)

A small, warm kit from [Unruly Drums](https://github.com/sfzinstruments/karoryfer.unruly-drums) by
Karoryfer Lecolds (CC0):
- the 20" kick played clean;
- the 14" snare (centre, edge, rimshot, side stick);
- the 13" and 22" snares with their snares off, played as toms;
- 14" hi-hats played with the stick's tip at seven openings and the foot;
- the 20" ride (bow, bell, edge), the 16" crash, and two woodblocks.

It's mixed from each piece's close and overhead microphones.

**Levels:** mixed the way an engineer mixes a session, every microphone at its fader level and pan,
the same for every hit. Each hit is trimmed to just before its attack and to where its tail falls away.
Its layers are set where the kit's one velocity curve meets their loudness, as HO[LO]'s other kits are,
the kit as a whole at −19 dB at velocity 127.

The same kit tuned and played another way is the [Studio Kit](../studio-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `soul-kit` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Unruly Drums by Karoryfer Lecolds (CC0). Mixed for HO[LO] from its close and overhead microphones: a soul kit. |
| Size | 222 MB on disk, 520 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Soul Kit (Karoryfer Unruly Drums)**, or `pnpm packs install soul-kit` |

## Where its files come from

Made from 1520 recordings, fetched from [sfzinstruments/karoryfer.unruly-drums](https://github.com/sfzinstruments/karoryfer.unruly-drums/tree/9bf75c2a1392f190cd1c264645653629f0b3a097) at `9bf75c2`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Soul Kit | `soul-kit/kit` | Drum kits | 20 pads | 8 | 4 | chokes (a closed hi-hat stops the open one) |

## Soul Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 22 | A#0 | Hi-hat loose |
| 24 | C1 | Hi-hat quarter open |
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
| 48 | C3 | Tom 13″ |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 53 | F3 | Ride bell |
| 59 | B3 | Ride edge |
| 76 | E5 | Woodblock high |
| 77 | F5 | Woodblock low |
