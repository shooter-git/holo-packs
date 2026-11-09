# Metal Kit (DrumGizmo CrocellKit)

A metal kit, the CrocellKit from [DrumGizmo](https://www.drumgizmo.org/) (version 1.1, CC BY 4.0): the
kit of a Danish metal band, sampled for five hours in the studio where they had just recorded an
album, on its engineer's own microphones. Set up by the band's drummer, its microphones placed by
Jacob Olsen of JBOSound, sampled and prepared by Lars Muldjord. Drum samples provided by DrumGizmo.org.
- **Drums:** a kick played with a double pedal, a snare, two rack toms and two floor toms.
- **Cymbals:** hi-hats, three crashes, a ride, two chinas and two splashes.
- **Microphones:** fifteen at once: inside the kick's shell and behind it, on the snare's top and under
  it, one on each tom, on the hi-hat and on the ride, a pair of overheads and a centre one, and a pair
  of room microphones.

**Its microphones, kept apart:**
- Each microphone is a file of its own, and each has a knob in the kit's window, turned while it
  plays: bring the room up for a big kit, or take it away for a tight one.
- DrumGizmo has no mixer: it hands every microphone to the host at full level. So every knob starts at
  0 dB, the kit as it was recorded, with nothing turned over or turned down.
- DrumGizmo leaves its close microphones unpanned. Here each is panned where the overheads place its
  drum (measured from its loudest hit), counted from the kick, which sits in the middle. The overheads
  and the room are stereo pairs, hard left and right, as recorded; the centre overhead sits in the
  middle.
- Every piece is heard on every microphone, as it was recorded: the toms ring in the snare microphones,
  the cymbals in the tom microphones.
- Ten knobs: the four tom microphones are one knob, each tom panned at its own place.

**Playing:**
- Every instrument the kit has, each on its own pad, on the key DrumGizmo's own MIDI map gives it: the
  kick from each foot, the snare, its rim click and rimshot and its "rest" hits (the library's
  SnareRest), the two rack and two floor toms, the hi-hat closed, closed without the foot down (loose), half open and
  open, its pedal and a foot splash, the ride and its bell, the three crashes and the first two's
  chokes, both chinas and both splashes.
- The toms are on General MIDI's other tom keys too (the rack toms on 50 and 45 as well), so a part
  written for any General MIDI kit plays.
- The kick is one drum played by two feet: the right foot on 36, the left on 35 (Kick 2), each foot's
  own recordings. A double-kick part on 35 and 36 alternates them.
- A choke (grabbing a crash as it's struck) stops its crash's ring.
- DrumGizmo has no velocity layers: it records each drum as dozens of single hits at every strength,
  each with its "power", and plays the one nearest the velocity. Here a piece's hits are grouped into
  layers by their power, evenly in decibels, with no layer of fewer than three hits; the hits of a
  layer are its round robins. The layers are set on the kit's one velocity curve, so the kit answers
  velocity like HO[LO]'s other kits.
- Round robins take turns, so a drum hit twice alike never sounds twice alike. The hi-hat chokes itself.
  A drum struck again past three times lets its oldest ring go.
- Levels follow the same rules as HO[LO]'s other kits, with every microphone at its starting level: one
  velocity curve for the whole kit, anchored to the snare at −19 dB loudness. The snare peaks at −2 dBFS
  at most, and every piece at 0 dBFS at most, at velocity 127.

**What's kept:** every velocity layer, and as many of each layer's hits as fit in about 450 MB of
memory: up to five for the snare, four for the kick, three for each tom, two to four for each cymbal
and hi-hat.

**Installing it:** DrumGizmo publishes the kit as one 5.6 GB ZIP. An install fetches it, takes out the
hits it keeps, makes the pack's files from them (each microphone one channel of a hit's multichannel
recording) and lets the ZIP go.

**Credits:** CC BY 4.0 asks music made with the kit to credit it where other credits appear: "Drum
samples provided by DrumGizmo.org".

DrumGizmo's other kits here: the [Extreme Metal Kit](../extreme-metal-kit/), the
[Heavy Kit](../heavy-kit/) and the [Classic Rock Kit](../classic-rock-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `metal-kit` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | CrocellKit 1.1 by the DrumGizmo team (CC BY 4.0): sampled and prepared by Lars Muldjord, the kit set up by Andreas of Crocell, its microphones by Jacob Olsen of JBOSound. Drum samples provided by DrumGizmo.org. Its fifteen microphones kept apart for HO[LO], each with its own level. |
| Size | 347 MB on disk, 2810 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Metal Kit (DrumGizmo CrocellKit)**, or `pnpm packs install metal-kit` |

## Where its files come from

Made from 281 recordings, fetched from the archive <https://drumgizmo.org/kits/CrocellKit/CrocellKit1_1.zip> (sha256 `341d1f23e586…`). Each file is made from its recordings by fixed arithmetic (a drum hit trimmed and faded, each of its microphones a file of its own), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Metal Kit | `metal-kit/kit` | Drum kits | 27 pads | 8 | 5 | chokes (a closed hi-hat stops the open one), 10 microphones, each with its own level |

## Metal Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 35 | B1 | Kick 2 (left foot) |
| 36 | C2 | Kick |
| 37 | C#2 | Side stick |
| 38 | D2 | Snare |
| 39 | D#2 | Snare rest stroke |
| 40 | E2 | Rimshot |
| 41 | F2 | Floor tom 2 |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Floor tom |
| 44 | G#2 | Hi-hat pedal |
| 46 | A#2 | Hi-hat open |
| 47 | B2 | Rack tom 2 |
| 48 | C3 | Rack tom 1 |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 52 | E3 | China |
| 53 | F3 | Ride bell |
| 54 | F#3 | China 2 |
| 55 | G3 | Splash |
| 56 | G#3 | Crash choke |
| 57 | A3 | Crash 2 |
| 58 | A#3 | Splash 2 |
| 59 | B3 | Crash 3 |
| 73 | C#5 | Hi-hat foot splash |
| 75 | D#5 | Crash 2 choke |
| 78 | F#5 | Hi-hat loose |
| 80 | G#5 | Hi-hat half open |

## Metal Kit's microphones

Each hit sounds every microphone together. Each has a knob in the instrument's window, turned while it plays; they start where the library's own mixer has them.

| Microphone | Id | Starts at | Recorded |
|---|---|---|---|
| Kick in | `kick-in` | 0 dB | mono, 3% left |
| Kick out | `kick-out` | 0 dB | mono, 3% left |
| Snare top | `snare-top` | 0 dB | mono, 4% right |
| Snare bottom | `snare-bottom` | 0 dB | mono, 4% right |
| Toms | `toms` | 0 dB | stereo |
| Hi-hat | `hat` | 0 dB | mono, 1% right |
| Ride | `ride` | 0 dB | mono, 12% left |
| Overheads | `overheads` | 0 dB | stereo |
| Centre overhead | `oh-centre` | 0 dB | mono, centre |
| Room | `room` | 0 dB | stereo |
