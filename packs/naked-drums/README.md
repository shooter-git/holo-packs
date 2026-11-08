# Naked Drums

A full studio kit from Wilkinson Audio's Naked Drums, in kinwie's SFZ and FLAC version
([sfzinstruments/WilkinsonAudio.NakedDrums](https://github.com/sfzinstruments/WilkinsonAudio.NakedDrums),
CC BY 4.0):
- **Drums:** a 22″ kick, 10″, 12″, 13″, 14″ and 16″ toms, and two snares (a 14″×5″ and a 13″×6.5″).
- **Cymbals:** hi-hats, a ride, two crashes, two splashes and two chinas.
- **Microphones:** sixteen at once, through vintage and modern preamps: inside and outside the kick,
  two on the snare's top and one under it, one on each tom, on the hi-hat and on the ride, overheads,
  wide overheads, a close room, far rooms and a mid-side pair.

**Its microphones, kept apart:**
- Each microphone is a file of its own, and each has a knob in the kit's window, turned while it
  plays: bring the rooms up for a big kit, or take them away for a dry one.
- They start where the library's own mixer has them: the close microphones, overheads and rooms at
  full, the hi-hat and ride microphones and the wide overheads 14 dB down. Each piece's trims, and
  each velocity layer's balance of microphones, are the library's own too.
- A hit's microphones start together, sample for sample, so they add up as they were recorded. At the
  starting levels they make the kit as the library mixes it.
- Twelve knobs: the snare's two top microphones are one knob, and the five tom microphones are one,
  each tom panned where the library has it. The mid-side pair comes already decoded to left and right,
  so it plays as a stereo pair.

**Playing:**
- Every way the library plays the kit: both snares and the side stick, the hi-hat tight, closed, half
  open and open and with its pedal, the ride's bow and bell, both crashes' edges and bells, both
  splashes and both chinas.
- The toms are tuned as the library tunes them: the 13″ down two semitones and the 14″ down a little.
- The library evens out its velocity layers and makes them soft or loud by velocity. Here each layer is
  placed where the kit's one velocity curve meets it as the library plays it, so the kit answers
  velocity like HO[LO]'s other kits.
- Round robins take turns, so a drum hit twice alike never sounds twice alike. The hi-hat chokes itself.
  A drum struck again past three times lets its oldest ring go.
- Levels follow the same rules as HO[LO]'s other kits, with every microphone at its starting level: one
  velocity curve for the whole kit, anchored to the snare at −19 dB loudness. The snare peaks at −2 dBFS
  at most, and every piece at 0 dBFS at most, at velocity 127.

**What's kept:** every velocity layer, and of the library's ten round robins as many as fit in about
600 MB of memory: more for the kick, the snare and the closed hi-hat, two or three for each cymbal. The
library's cymbal chokes, played by grabbing a cymbal pad (aftertouch), aren't here.

For a kit mixed down to one stereo file a hit, see the [Rock Kit](../rock-kit/), the
[Prog Kit](../prog-kit/) and the [Jazz Kit](../jazz-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `naked-drums` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | Naked Drums by Wilkinson Audio (CC BY 4.0), SFZ and FLAC version by kinwie: a 22" kick, two snares, 10/12/13/14/16" toms, hi-hats, ride, crashes, splashes and chinas. Its microphones kept apart for HO[LO], each with its own level. |
| Size | 388 MB on disk, 1941 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Naked Drums (Wilkinson Audio)**, or `pnpm packs install naked-drums` |

## Where its files come from

Made from 2021 recordings, fetched from [sfzinstruments/WilkinsonAudio.NakedDrums](https://github.com/sfzinstruments/WilkinsonAudio.NakedDrums/tree/407732a548606ac715ad8f3fbac63d9f4df77c0d) at `407732a`. Each file is made from its recordings by fixed arithmetic (a drum hit trimmed and faded, each of its microphones a file of its own), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Naked Drums | `naked-drums/kit` | Drum kits | 24 pads | 5 | 10 | chokes (a closed hi-hat stops the open one), 12 microphones, each with its own level |

## Naked Drums's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 22 | A#0 | Hi-hat tight |
| 26 | D1 | Hi-hat half open |
| 36 | C2 | Kick |
| 37 | C#2 | Side stick |
| 38 | D2 | Snare |
| 40 | E2 | Snare 2 |
| 41 | F2 | Tom 16″ |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Tom 14″ |
| 44 | G#2 | Hi-hat pedal |
| 45 | A2 | Tom 13″ |
| 46 | A#2 | Hi-hat open |
| 47 | B2 | Tom 12″ |
| 48 | C3 | Tom 10″ |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 52 | E3 | China |
| 53 | F3 | Ride bell |
| 54 | F#3 | China 2 |
| 55 | G3 | Splash |
| 56 | G#3 | Splash 2 |
| 57 | A3 | Crash 2 |
| 58 | A#3 | Crash bell |
| 59 | B3 | Crash 2 bell |

## Naked Drums's microphones

Each hit sounds every microphone together. Each has a knob in the instrument's window, turned while it plays; they start where the library's own mixer has them.

| Microphone | Id | Starts at | Recorded |
|---|---|---|---|
| Kick in | `kick-in` | 0 dB | mono, centre |
| Kick sub | `kick-sub` | 0 dB | mono, centre |
| Snare top | `snare-top` | 0 dB | mono, centre |
| Snare bottom | `snare-bottom` | 0 dB | mono, centre |
| Toms | `toms` | 0 dB | mono, each drum at its own place |
| Hi-hat | `hat` | −14 dB | mono, 30% left |
| Ride | `ride` | −14 dB | mono, 30% right |
| Overheads | `overheads` | 0 dB | stereo |
| Wide overheads | `wide` | −14 dB | stereo |
| Close room | `close-room` | 0 dB | mono, centre |
| Far room | `far-room` | 0 dB | stereo |
| Mid-side room | `mid-side` | 0 dB | stereo |
