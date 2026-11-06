# Jazz Kit

A contemporary jazz kit from [Virtuosity Drums](https://github.com/sfzinstruments/virtuosity_drums) by
Versilian Studios and Karoryfer Samples (CC0). It was recorded at 48 kHz on six microphones at once.

**The mix:**
- Every hit is mixed from the same four microphones (kick, snare, the overheads and a little of the
  room), as a jazz session is mixed.
- The overheads lead and the close microphones fill in.
- Each drum's sound carries what the others' microphones heard of it.

**Playing:**
- The snare has 36 velocity layers at the centre and 36 off it, and they take turns. A snare played twice
  alike never sounds twice alike. The toms do likewise (centre and off centre).
- The hi-hat plays closed, open, half open and three-quarter open, plus its pedal.
- The ride has its bell, and there's a flat ride.

Levels follow the same rules as HO[LO]'s other kits: one velocity curve for the whole kit, anchored to
the snare at −19 dB loudness.

For a bigger rock sound, see the [Rock Kit](../rock-kit/) and the [Prog Kit](../prog-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `jazz-kit` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Virtuosity Drums by Versilian Studios and Karoryfer Samples (CC0): a contemporary jazz kit. Mixed for HO[LO] from its kick, snare, overhead and room microphones. |
| Size | 168 MB on disk, 321 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Jazz Kit (Virtuosity Drums)**, or `pnpm packs install jazz-kit` |

## Where its files come from

Made from 1284 recordings, fetched from [sfzinstruments/virtuosity_drums](https://github.com/sfzinstruments/virtuosity_drums/tree/9f04cf9a734527edfbb0a4eee1f674e45bbf71bc) at `9f04cf9`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Jazz Kit | `jazz-kit/kit` | Drum kits | 18 pads | 36 | 4 | chokes (a closed hi-hat stops the open one) |

## Jazz Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 22 | A#0 | Hi-hat half open |
| 26 | D1 | Hi-hat ¾ open |
| 36 | C2 | Kick |
| 37 | C#2 | Cross-stick |
| 38 | D2 | Snare |
| 39 | D#2 | Snare buzz |
| 40 | E2 | Rimshot |
| 41 | F2 | Floor tom |
| 42 | F#2 | Hi-hat closed |
| 44 | G#2 | Hi-hat pedal |
| 46 | A#2 | Hi-hat open |
| 47 | B2 | Rack tom |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 53 | F3 | Ride bell |
| 55 | G3 | Flat ride crash |
| 57 | A3 | Sizzle crash |
| 59 | B3 | Flat ride |
