# Heavy Kit

A big metal and rock kit, the MuldjordKit from [DrumGizmo](https://www.drumgizmo.org/), in kinwie's SFZ
and FLAC version ([sfzinstruments/DrumGizmo.MuldjordKit](https://github.com/sfzinstruments/DrumGizmo.MuldjordKit),
CC BY 4.0). Drum samples provided by DrumGizmo.org.
- **Drums:** a Tama Superstar recorded by Lars Muldjord in 2010: two kicks, three rack toms and a
  floor tom, and a snare.
- **Cymbals:** hi-hats, two crashes, two rides and a china.
- **Microphones:** fifteen at once: inside each kick, on the snare's top and under it, one on each
  tom, on the hi-hat and on each ride, a pair of overheads and a pair of room microphones. (The
  library's kick trigger channel is left out.)

**Its microphones, kept apart:**
- Each microphone is a file of its own, and each has a knob in the kit's window, turned while it
  plays: bring the room up for a big kit, or take it away for a tight one.
- They start where the library's own mixer has them: every fader at its default, the close
  microphones panned where its pan knobs start, the overheads and the room hard left and right. The
  snare's bottom microphone is turned over, as the library turns it, so it adds to the top's.
- Every piece is heard on every microphone, as it was recorded (the library's sixteen-channel
  programs play it so): the toms in the snare microphone, the cymbals in the tom microphones.
- Ten knobs: the four tom microphones are one knob, each tom panned where the library has it; the
  overheads are one stereo pair and the room another.

**Playing:**
- Every piece the library has, each on its own pad: both kicks, the snare and its cross-stick, the
  four toms, the hi-hat closed and open, both rides' bows and bells, both crashes and the china.
- The two kicks are two drums, each with its own microphone, played by the right foot and the left:
  the right kick is the kick (36), the left one Kick 2 (35), where the library keys them. A double-kick
  part written on 35 and 36 alternates feet; a part written on 36 alone plays the main kick.
- DrumGizmo records each drum as dozens of single hits at every strength. Every hit is measured
  here, and the hits are grouped into velocity layers about 3 dB apart, so a drum gets louder
  smoothly as it's hit harder and its round robins are alike in level. The layers are set on the
  kit's one velocity curve, so the kit answers velocity like HO[LO]'s other kits.
- Round robins take turns, so a drum hit twice alike never sounds twice alike. The hi-hat chokes itself.
  A drum struck again past three times lets its oldest ring go.
- Levels follow the same rules as HO[LO]'s other kits, with every microphone at its starting level: one
  velocity curve for the whole kit, anchored to the snare at −19 dB loudness. The snare peaks at −2 dBFS
  at most, and every piece at 0 dBFS at most, at velocity 127.

**What's kept:** every hit the library has but one (a ride hit the library's notes say was struck
twice): about 260 MB of memory with every microphone kept apart, as its recordings are short. The
library has no hi-hat pedal or half-open hi-hat; its cymbal chokes, played by grabbing a cymbal pad
(aftertouch), aren't here.

For a lighter kit played with sticks and brushes, see the [Classic Rock Kit](../classic-rock-kit/). For
another kit with every microphone kept apart, see [Naked Drums](../naked-drums/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `heavy-kit` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | Drum samples provided by DrumGizmo.org: the MuldjordKit by Lars Muldjord (CC BY 4.0), in kinwie's SFZ and FLAC version (sfzinstruments/DrumGizmo.MuldjordKit): a Tama Superstar with two kicks, four toms, a snare, hi-hats, crashes, rides and a china. Its microphones kept apart for HO[LO], each with its own level. |
| Size | 185 MB on disk, 2520 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Heavy Kit (DrumGizmo MuldjordKit)**, or `pnpm packs install heavy-kit` |

## Where its files come from

Made from 3780 recordings, fetched from [sfzinstruments/DrumGizmo.MuldjordKit](https://github.com/sfzinstruments/DrumGizmo.MuldjordKit/tree/fc165714974aa843125ce88597f341b31376e1d5) at `fc16571`. Each file is made from its recordings by fixed arithmetic (a drum hit trimmed and faded, each of its microphones a file of its own), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Heavy Kit | `heavy-kit/kit` | Drum kits | 17 pads | 7 | 14 | chokes (a closed hi-hat stops the open one), 10 microphones, each with its own level |

## Heavy Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 35 | B1 | Kick 2 |
| 36 | C2 | Kick |
| 37 | C#2 | Cross-stick |
| 38 | D2 | Snare |
| 41 | F2 | Floor tom |
| 42 | F#2 | Hi-hat closed |
| 45 | A2 | Rack tom 3 |
| 46 | A#2 | Hi-hat open |
| 47 | B2 | Rack tom 2 |
| 48 | C3 | Rack tom 1 |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 52 | E3 | China |
| 53 | F3 | Ride bell |
| 56 | G#3 | Ride 2 bell |
| 57 | A3 | Crash 2 |
| 59 | B3 | Ride 2 |

## Heavy Kit's microphones

Each hit sounds every microphone together. Each has a knob in the instrument's window, turned while it plays; they start where the library's own mixer has them.

| Microphone | Id | Starts at | Recorded |
|---|---|---|---|
| Kick right | `kick-right` | 0 dB | mono, centre |
| Kick left | `kick-left` | 0 dB | mono, centre |
| Snare top | `snare-top` | 0 dB | mono, centre |
| Snare bottom | `snare-bottom` | 0 dB | mono, centre |
| Toms | `toms` | 0 dB | stereo |
| Hi-hat | `hat` | 0 dB | mono, 40% left |
| Ride right | `ride-right` | 0 dB | mono, 50% right |
| Ride left | `ride-left` | 0 dB | mono, 50% left |
| Overheads | `overheads` | 0 dB | stereo |
| Room | `room` | 0 dB | stereo |
