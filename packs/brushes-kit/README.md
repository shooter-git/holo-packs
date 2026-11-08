# Brushes Kit (Karoryfer Swirly Drums)

A drum kit played with brushes: [Swirly Drums](https://github.com/sfzinstruments/karoryfer.swirly-drums)
by Karoryfer Lecolds (CC0).
- a 20" marching kick (its beater and resonant-head microphones);
- the snare struck in the centre and at the edge, dug, stirred and fluttered (its top and bottom
  microphones);
- hi-hats at six openings and the foot (the closed ones stop the open);
- 16", 13", 12", 10" and 8" toms;
- crash, ride, China, splash and a cracked crash.

It's made from the library's dry recordings. Its "wet" and "wetter" ones are the same takes through a
room, and HO[LO] adds its own space.

**Levels:** mixed the way an engineer mixes a session, every microphone at its fader level and pan,
the same for every hit. Each hit is trimmed to just before its attack and to where its tail falls away.
Its layers are set where the kit's one velocity curve meets their loudness, as HO[LO]'s other kits are,
the kit as a whole at −19 dB at velocity 127.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `brushes-kit` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Swirly Drums by Karoryfer Lecolds (CC0): a drum kit played with brushes. Mixed for HO[LO] from its dry close microphones. |
| Size | 373 MB on disk, 788 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Brushes Kit (Karoryfer Swirly Drums)**, or `pnpm packs install brushes-kit` |

## Where its files come from

Made from 928 recordings, fetched from [sfzinstruments/karoryfer.swirly-drums](https://github.com/sfzinstruments/karoryfer.swirly-drums/tree/c40dafe0011cb2e54c0c220ff0fa308a11fc60f5) at `c40dafe`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Brushes Kit | `brushes-kit/kit` | Drum kits | 22 pads | 10 | 4 | chokes (a closed hi-hat stops the open one) |

## Brushes Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 24 | C1 | Hi-hat quarter open |
| 26 | D1 | Hi-hat half open |
| 33 | A1 | Hi-hat tight |
| 34 | A#1 | Snare flutter |
| 36 | C2 | Kick |
| 37 | C#2 | Snare stir |
| 38 | D2 | Snare |
| 39 | D#2 | Snare dig |
| 40 | E2 | Snare edge |
| 41 | F2 | Tom 16″ |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Tom 13″ |
| 44 | G#2 | Hi-hat pedal |
| 45 | A2 | Tom 12″ |
| 46 | A#2 | Hi-hat open |
| 47 | B2 | Tom 10″ |
| 48 | C3 | Tom 8″ |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 52 | E3 | China |
| 55 | G3 | Splash |
| 57 | A3 | Cracked crash |
