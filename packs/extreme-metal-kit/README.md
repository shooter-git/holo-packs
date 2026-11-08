# Extreme Metal Kit (DrumGizmo Aasimonster)

A large death-metal kit, the Aasimonster from [DrumGizmo](https://www.drumgizmo.org/) (version 2.1,
CC BY 4.0), the kit a Danish death-metal band recorded its debut album on. Set up and sampled by Deva,
prepared for DrumGizmo by Chaot4 and Deva. Drum samples provided by DrumGizmo.org.
- **Drums:** two kicks, a snare, three rack toms and a floor tom.
- **Cymbals:** hi-hats, two 16″ crashes, an 18″, a 10″ and an 8″ china, a ride with two bells, and a
  bell cymbal.
- **Microphones:** fourteen at once: one in each kick, on the snare's top and under it, one on each tom,
  on the hi-hat and on the ride, a pair of overheads and a pair of room microphones. (Its two trigger
  channels, a snare trigger's signal and an electronic drum module's output, aren't microphones, and
  are left out.)

**Its microphones, kept apart:**
- Each microphone is a file of its own, and each has a knob in the kit's window, turned while it
  plays: bring the room up for a big kit, or take it away for a tight one.
- DrumGizmo has no mixer: it hands every microphone to the host at full level. So every knob starts at
  0 dB, the kit as it was recorded, with nothing turned over or turned down.
- DrumGizmo leaves its close microphones unpanned. Here each is panned where the overheads place its
  drum (measured from its loudest hit), so the close microphones and the overheads agree. The
  overheads and the room are stereo pairs, hard left and right.
- Every piece is heard on every microphone, as it was recorded: the toms ring in the snare microphones,
  the cymbals in the tom microphones.
- Nine knobs: the four tom microphones are one knob, each tom panned at its own place.

**Playing:**
- Every instrument the kit has, each on its own pad, on the keys DrumGizmo's own MIDI map gives them:
  both kicks, the snare's centre and edge and its rimshot, the four toms, three closed hi-hats (the
  library's own three) and the open one, the ride and its two bells, both crashes and their
  chokes, the three chinas and the bell cymbal.
- A few keys move off DrumGizmo's map to General MIDI's: the crashes' chokes (DrumGizmo puts one on
  General MIDI's high tom) go on 60 and 58, and the second closed hi-hat (on a tom's key there) on 22.
  The toms are on General MIDI's other tom keys too, so a part written for any General MIDI kit plays.
- The two kicks are two drums, each with its own microphone: the kick on 36 and Kick 2 on 35, where
  DrumGizmo keys them. A double-kick part on 35 and 36 alternates them.
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

**What's kept:** every velocity layer, and as many of each layer's hits as fit in about 330 MB of
memory: up to eight for the snare, six or seven for the kicks and toms, three to six for each cymbal.

**Installing it:** DrumGizmo publishes the kit as one 2.4 GB ZIP. An install fetches it, takes out the
hits it keeps, makes the pack's files from them (each microphone one channel of a hit's multichannel
recording) and lets the ZIP go.

**Credits:** CC BY 4.0 asks music made with the kit to credit it where other credits appear: "Drum
samples provided by DrumGizmo.org".

DrumGizmo's other kits here: the [Metal Kit](../metal-kit/), the [Heavy Kit](../heavy-kit/) and the
[Classic Rock Kit](../classic-rock-kit/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `extreme-metal-kit` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | Aasimonster 2.1 by the DrumGizmo team (CC BY 4.0): set up and sampled by Deva, prepared by Chaot4 and Deva, bleed control by Henry Järvinen. Drum samples provided by DrumGizmo.org. Its fourteen microphones kept apart for HO[LO], each with its own level. |
| Size | 235 MB on disk, 3222 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Extreme Metal Kit (DrumGizmo Aasimonster)**, or `pnpm packs install extreme-metal-kit` |

## Where its files come from

Made from 358 recordings, fetched from the archive <https://drumgizmo.org/kits/Aasimonster/aasimonster2_1.zip> (sha256 `e0eb6337dae3…`). Each file is made from its recordings by fixed arithmetic (a drum hit trimmed and faded, each of its microphones a file of its own), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Extreme Metal Kit | `extreme-metal-kit/kit` | Drum kits | 24 pads | 9 | 8 | chokes (a closed hi-hat stops the open one), 9 microphones, each with its own level |

## Extreme Metal Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 22 | A#0 | Hi-hat closed 2 |
| 35 | B1 | Kick 2 |
| 36 | C2 | Kick |
| 37 | C#2 | Rimshot |
| 38 | D2 | Snare |
| 40 | E2 | Snare edge |
| 42 | F#2 | Hi-hat closed |
| 43 | G2 | Floor tom 4 |
| 44 | G#2 | Hi-hat closed 3 |
| 45 | A2 | Tom 3 |
| 46 | A#2 | Hi-hat open |
| 47 | B2 | Tom 2 |
| 48 | C3 | Tom 1 |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 52 | E3 | China 18″ |
| 53 | F3 | Ride bell |
| 54 | F#3 | China 2, 10″ |
| 55 | G3 | Bell cymbal |
| 56 | G#3 | China 3, 8″ |
| 57 | A3 | Crash 2 |
| 58 | A#3 | Crash 2 choke |
| 59 | B3 | Ride bell 2 |
| 60 | C4 | Crash choke |

## Extreme Metal Kit's microphones

Each hit sounds every microphone together. Each has a knob in the instrument's window, turned while it plays; they start where the library's own mixer has them.

| Microphone | Id | Starts at | Recorded |
|---|---|---|---|
| Kick 1 | `kick-1` | 0 dB | mono, 0% left |
| Kick 2 | `kick-2` | 0 dB | mono, 0% right |
| Snare top | `snare-top` | 0 dB | mono, 20% right |
| Snare bottom | `snare-bottom` | 0 dB | mono, 20% right |
| Toms | `toms` | 0 dB | stereo |
| Hi-hat | `hat` | 0 dB | mono, 49% right |
| Ride | `ride` | 0 dB | mono, 11% right |
| Overheads | `overheads` | 0 dB | stereo |
| Room | `room` | 0 dB | stereo |
