# Rock Kit

A big rock kit from Karoryfer Samples' [Big Rusty Drums](https://github.com/sfzinstruments/karoryfer.big-rusty-drums)
(CC0):
- **Drums:** a 24″ kick, a 14×8 wooden snare, 14″, 15″ and 18″ toms, and a 22″ kick played as a floor
  tom.
- **Cymbals:** a 17″ crash, a 17″ sizzle crash, a 22″ ride, an 18″ china and 14″ hi-hats (Sabian and
  Zildjian).
- **Microphones:** recorded on close microphones and overheads.

**The mix:**
- Every hit is mixed from its microphones as the library's own default mixer has it (its faders and
  pans).
- A little of the overheads goes on the kick, for the room it was played in.
- The mix is the same for every hit, so the kit sounds as one instrument in one room.
- Each hit is trimmed to just before its attack (a pad sounds the instant it's hit) and to where its
  tail falls away.

**Playing:**
- Each piece's velocity layers are measured and set on one velocity curve shared by the whole kit, so
  every drum gets louder smoothly as it's hit harder and answers velocity like every other drum.
- Round robins take turns, so a drum hit twice alike never sounds twice alike.
- The hi-hat chokes itself.
- A drum struck again past three times lets its oldest ring go.
- The kit is anchored to the snare at −19 dB loudness. The snare peaks at −2 dBFS at most, and every
  piece at 0 dBFS at most, at velocity 127.

For a tighter kit with six toms, see the [Prog Kit](../prog-kit/). For jazz, see the
[Jazz Kit](../jazz-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `rock-kit` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Big Rusty Drums by Karoryfer Samples (CC0): a 24" kick, a 14x8 snare, 14/15/18" toms and a 22" floor, Sabian and Zildjian cymbals. Mixed for HO[LO] from its close and overhead microphones. |
| Size | 172 MB on disk, 470 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Rock Kit (Karoryfer Big Rusty Drums)**, or `pnpm packs install rock-kit` |

## Where its files come from

Made from 1048 recordings, fetched from [sfzinstruments/karoryfer.big-rusty-drums](https://github.com/sfzinstruments/karoryfer.big-rusty-drums/tree/f07ce00df34a46b6b08375be56fe116cf15782bc) at `f07ce00`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Rock Kit | `rock-kit/kit` | Drum kits | 20 pads | 14 | 4 | chokes (a closed hi-hat stops the open one) |

## Rock Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 22 | A#0 | Hi-hat loose |
| 26 | D1 | Hi-hat half open |
| 36 | C2 | Kick |
| 37 | C#2 | Side stick |
| 38 | D2 | Snare |
| 39 | D#2 | Snare edge |
| 40 | E2 | Rimshot |
| 41 | F2 | Tom 22″ |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Tom 18″ |
| 44 | G#2 | Hi-hat pedal |
| 45 | A2 | Tom 15″ |
| 46 | A#2 | Hi-hat open |
| 48 | C3 | Tom 14″ |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 52 | E3 | China |
| 53 | F3 | Ride bell |
| 57 | A3 | Sizzle crash |
| 59 | B3 | Ride edge |
