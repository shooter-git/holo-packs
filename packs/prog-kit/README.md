# Prog Kit

A big progressive-rock kit, built for fast tom runs and double kicks. It has six toms, a bright metal
snare, trashy cymbals and a gong, put together from three CC0 libraries:

- Karoryfer Samples' [Big Rusty Drums](https://github.com/sfzinstruments/karoryfer.big-rusty-drums):
  - **drums:** the 24″ kick and the 14″, 15″, 18″ and 22″ toms, with the 14″ also tuned up two and four
    semitones for the two highest toms;
  - **cymbals:** a 17″ crash, a 17″ sizzle crash, an 18″ china, a three-cymbal stack, a 22″ ride and
    its bell, a 19″ sizzle ride and 14″ hi-hats.
- Karoryfer Samples' [Frankensnare](https://github.com/sfzinstruments/karoryfer.frankensnare): a 14×8
  aluminium snare, with its hits, rimshots and side sticks.
- Versilian Studios' [VSCO 2 Community Edition](https://github.com/sgossner/VSCO-2-CE): an orchestral
  gong, seven layers from *p* to *fff*.

**The mix:**
- It's mixed tighter than the [Rock Kit](../rock-kit/): the close microphones are forward, with less of
  the overheads on the toms.
- Both kick keys play the one kick, taking turns, so double-kick patterns alternate takes.

**Playing:** velocity, round robins, chokes and levels follow the same rules as the Rock Kit:
- one velocity curve for the whole kit;
- the kit anchored to the snare at −19 dB loudness;
- the snare peaking at −2 dBFS at most at velocity 127.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `prog-kit` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Big Rusty Drums and Frankensnare by Karoryfer Samples (CC0), and the gong of VSCO 2 Community Edition by Versilian Studios (CC0). Put together and mixed for HO[LO]: six toms, a 14x8 aluminium snare, a gong. |
| Size | 223 MB on disk, 520 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Prog Kit (Big Rusty Drums, Frankensnare, VSCO 2)**, or `pnpm packs install prog-kit` |

## Where its files come from

Made from 1010 recordings, fetched from [sfzinstruments/karoryfer.big-rusty-drums](https://github.com/sfzinstruments/karoryfer.big-rusty-drums/tree/f07ce00df34a46b6b08375be56fe116cf15782bc) at `f07ce00` and [sfzinstruments/karoryfer.frankensnare](https://github.com/sfzinstruments/karoryfer.frankensnare/tree/9151c2d79fcbb73c65d63f78918d4ba7abc91a81) at `9151c2d` and [sgossner/VSCO-2-CE](https://github.com/sgossner/VSCO-2-CE/tree/440300901dfe9275fd84e0b7763af1f8443ae62e) at `4403009`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Prog Kit | `prog-kit/kit` | Drum kits | 23 pads | 14 | 4 | chokes (a closed hi-hat stops the open one) |

## Prog Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 22 | A#0 | Hi-hat loose |
| 26 | D1 | Hi-hat half open |
| 36 | C2 | Kick |
| 37 | C#2 | Side stick |
| 38 | D2 | Snare |
| 39 | D#2 | Gong |
| 40 | E2 | Rimshot |
| 41 | F2 | Tom 22″ |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Tom 18″ |
| 44 | G#2 | Hi-hat pedal |
| 45 | A2 | Tom 15″ |
| 46 | A#2 | Hi-hat open |
| 47 | B2 | Tom 14″ |
| 48 | C3 | Tom 14″ up 2 |
| 49 | C#3 | Crash |
| 50 | D3 | Tom 14″ up 4 |
| 51 | D#3 | Ride |
| 52 | E3 | China |
| 53 | F3 | Ride bell |
| 55 | G3 | Stack |
| 57 | A3 | Sizzle crash |
| 59 | B3 | Sizzle ride |
