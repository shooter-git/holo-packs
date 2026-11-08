# Session Kit

A warm, natural rock and pop kit: Sam Greene's Sonor Force 3001, in kinwie's SFZ and FLAC version of
[Sam's Sonor](https://github.com/sfzinstruments/SamsSonor) (CC BY-SA 4.0):
- **Drums:** a kick (eight velocity layers), a snare played by the left hand and the right (ten layers
  each), at the centre, as a rimshot and with its snares off, a rack tom and a floor tom, and a click on
  the rack tom.
- **Cymbals:** hi-hats closed, with the pedal, half open, and open (struck with the shoulder or the tip),
  a ride and its bell, and a crash (its shoulder and its tip).
- Recorded in stereo, one file a hit.

**Playing:**
- The snare's two hands take turns on the snare's key (left, right, left), so a roll or a run of repeated
  hits falls hand to hand, as Sam meant his two snares to be played. The snare with its snares off
  likewise (on 34, below the kick, where the library keeps it).
- Each piece's level in the mix is the library's own (each group's volume in its SFZ).
- Each piece's velocity layers are measured and set on one velocity curve shared by the whole kit, so
  every drum gets louder smoothly as it's hit harder and answers velocity like every other drum.
- The toms sit on every General MIDI tom key (the floor tom low, the rack tom high); the rack tom's click
  is on 25, the half-open hi-hat on 26 and the open tip on 22.
- The hi-hat chokes itself. The library's two choke keys (silent notes that stop the ride and the crash)
  have no sound to play here, so they're left out.
- The kit is anchored to the snare at −19 dB loudness. The snare peaks at −2 dBFS at most, and every
  piece at 0 dBFS at most, at velocity 127.

**Licence:** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) ("CC Share and share alike",
in Sam's words). The pack is shared under the same licence, as the library asks.

For a bigger rock sound, see the [Rock Kit](../rock-kit/); for a roomier, more characterful kit, the
[Salamander Drumkit](../salamander-drums/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `session-kit` |
| Licence | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Credit | Sam's Sonor by Sam Greene (CC BY-SA 4.0), SFZ and FLAC version by kinwie: a Sonor Force 3001 kit with left- and right-hand snares and a snares-off snare. Levelled for HO[LO] at the library's own mix. |
| Size | 37 MB on disk, 114 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Session Kit (Sam's Sonor)**, or `pnpm packs install session-kit` |

## Where its files come from

Made from 114 recordings, fetched from [sfzinstruments/SamsSonor](https://github.com/sfzinstruments/SamsSonor/tree/ef3e32058924ed1c3335e86d03094d3f310a9104) at `ef3e320`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Session Kit | `session-kit/kit` | Drum kits | 17 pads | 10 | 2 | chokes (a closed hi-hat stops the open one) |

## Session Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 22 | A#0 | Hi-hat open tip |
| 25 | C#1 | Rack tom click |
| 26 | D1 | Hi-hat half open |
| 34 | A#1 | Snare, snares off |
| 36 | C2 | Kick |
| 38 | D2 | Snare |
| 39 | D#2 | Snare centre |
| 40 | E2 | Rimshot |
| 41 | F2 | Floor tom |
| 42 | F#2 | Hi-hat closed |
| 44 | G#2 | Hi-hat pedal |
| 45 | A2 | Rack tom |
| 46 | A#2 | Hi-hat open |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 53 | F3 | Ride bell |
| 57 | A3 | Crash tip |
