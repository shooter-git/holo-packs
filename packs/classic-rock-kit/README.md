# Classic Rock Kit

A warm, open studio kit, the DRSKit from [DrumGizmo](https://www.drumgizmo.org/), in kinwie's SFZ and
FLAC version ([sfzinstruments/DrumGizmo.DRSKit](https://github.com/sfzinstruments/DrumGizmo.DRSKit),
CC BY 4.0). Drum samples provided by DrumGizmo.org.
- **Drums:** a handmade DRSDrums kit, lent by Jes Eiler: a kick, a hanging tom and two floor toms,
  and a snare.
- **Cymbals:** Paiste Formula 602 medium hi-hats, a Paiste Giant Beat crash, a Formula 602 crash, and
  a Formula 602 thin crash played as the ride.
- **Microphones:** thirteen at once: two on the kick (at the beater and at the front head), on the
  snare's top and under it, one on each tom, on the hi-hat and on the ride, a pair of overheads and a
  pair of room microphones.

**Its microphones, kept apart:**
- Each microphone is a file of its own, and each has a knob in the kit's window, turned while it
  plays: bring the room up for a big kit, or take it away for a dry one.
- They start where the library's own mixer has them: the close microphones, overheads and room at
  full, the hi-hat and ride microphones 14 dB down; the close microphones panned where its pan knobs
  start, the overheads and the room hard left and right.
- Every piece is heard on every microphone, as it was recorded (the library's thirteen-channel
  programs play it so).
- Nine knobs: the three tom microphones are one knob, each tom panned where the library has it; the
  overheads are one stereo pair and the room another.
- The SFZ version's kick front channel plays the left overhead by mistake; here it plays the kick
  front microphone the library recorded.

**Playing:**
- Every stroke the library has, each on its own pad:
  - the kick with the beater left against the head (36) and let off it to ring (35);
  - the snare, a cross-stick and a rim click;
  - the toms;
  - the hi-hat closed, closed on its edge, half open, open, open on its bow, and with its pedal;
  - the ride's bow, its edge (a ride crash), its bell with the stick's tip and shoulder, the bow and
    bell again with a chain on it (a sizzle ride), and the library's "rest" stroke;
  - both crashes on their edges and with the stick's tip.
- The brushes: the library also has the kit played with brushes (DrumGizmo calls them whiskers),
  each stroke on its own pad, as the library's full kit has them: the snare struck and swept, the
  toms, the hi-hat closed and open, the ride and both crashes. Brushes are far quieter than sticks,
  so they come up together, by what brings the brushed snare to the struck one: a part played with
  brushes is as loud as one played with sticks, with the brushes' own balance.
- DrumGizmo records each drum as dozens of single hits at every strength. Every hit is measured
  here, and the hits are grouped into velocity layers about 3 dB apart, so a drum gets louder
  smoothly as it's hit harder and its round robins are alike in level. The layers are set on the
  kit's one velocity curve, so the kit answers velocity like HO[LO]'s other kits.
- Round robins take turns, so a drum hit twice alike never sounds twice alike. The hi-hat chokes itself.
  A drum struck again past three times lets its oldest ring go.
- Levels follow the same rules as HO[LO]'s other kits, with every microphone at its starting level: one
  velocity curve for the whole kit, anchored to the snare at −19 dB loudness. The snare peaks at −2 dBFS
  at most, and every piece at 0 dBFS at most, at velocity 127.

**What's kept:** every velocity layer, and of each layer's hits as many as fit in about 580 MB of
memory: the most for the kick, the snare and the closed hi-hat, two for each cymbal stroke and brush.
The library's e-drum modes (its hi-hat on a pedal controller) and its cymbal chokes, played by
grabbing a cymbal pad (aftertouch), aren't here.

For a bigger kit with two kicks and four toms, see the [Heavy Kit](../heavy-kit/). For a kit played
with brushes alone, see the [Brushes Kit](../brushes-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `classic-rock-kit` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | Drum samples provided by DrumGizmo.org: the DRSKit by the DrumGizmo team and Jes Eiler of DRSDrums (CC BY 4.0), in kinwie's SFZ and FLAC version (sfzinstruments/DrumGizmo.DRSKit): a kick, three toms, a snare, Paiste hi-hats, crashes and ride, played with sticks and with brushes. Its microphones kept apart for HO[LO], each with its own level. |
| Size | 421 MB on disk, 3168 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Classic Rock Kit (DrumGizmo DRSKit)**, or `pnpm packs install classic-rock-kit` |

## Where its files come from

Made from 4576 recordings, fetched from [sfzinstruments/DrumGizmo.DRSKit](https://github.com/sfzinstruments/DrumGizmo.DRSKit/tree/b01448990a31f722542f1812e56159a97a6a2a82) at `b014489`. Each file is made from its recordings by fixed arithmetic (a drum hit trimmed and faded, each of its microphones a file of its own), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Classic Rock Kit | `classic-rock-kit/kit` | Drum kits | 35 pads | 8 | 5 | chokes (a closed hi-hat stops the open one), 9 microphones, each with its own level |

## Classic Rock Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 22 | A#0 | Hi-hat closed edge |
| 24 | C1 | Hi-hat open tip |
| 26 | D1 | Hi-hat half open |
| 31 | G1 | Rim click |
| 35 | B1 | Kick open |
| 36 | C2 | Kick |
| 37 | C#2 | Cross-stick |
| 38 | D2 | Snare |
| 41 | F2 | Floor tom 2 |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Floor tom 1 |
| 44 | G#2 | Hi-hat pedal |
| 46 | A#2 | Hi-hat open |
| 48 | C3 | Rack tom |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 53 | F3 | Ride bell |
| 54 | F#3 | Crash tip |
| 55 | G3 | Crash 2 tip |
| 57 | A3 | Crash 2 |
| 59 | B3 | Sizzle ride |
| 60 | C4 | Crash brush |
| 62 | D4 | Crash 2 brush |
| 63 | D#4 | Ride rest |
| 64 | E4 | Hi-hat closed brush |
| 65 | F4 | Hi-hat open brush |
| 66 | F#4 | Ride crash |
| 67 | G4 | Ride brush |
| 68 | G#4 | Ride bell tip |
| 69 | A4 | Snare brush sweep |
| 70 | A#4 | Sizzle ride bell |
| 71 | B4 | Snare brush |
| 72 | C5 | Rack tom brush |
| 74 | D5 | Floor tom 1 brush |
| 76 | E5 | Floor tom 2 brush |

## Classic Rock Kit's microphones

Each hit sounds every microphone together. Each has a knob in the instrument's window, turned while it plays; they start where the library's own mixer has them.

| Microphone | Id | Starts at | Recorded |
|---|---|---|---|
| Kick back | `kick-back` | 0 dB | mono, centre |
| Kick front | `kick-front` | 0 dB | mono, centre |
| Snare top | `snare-top` | 0 dB | mono, centre |
| Snare bottom | `snare-bottom` | 0 dB | mono, centre |
| Toms | `toms` | 0 dB | stereo |
| Hi-hat | `hat` | −14 dB | mono, 40% left |
| Ride | `ride` | −14 dB | mono, 40% right |
| Overheads | `overheads` | 0 dB | stereo |
| Room | `room` | 0 dB | stereo |
