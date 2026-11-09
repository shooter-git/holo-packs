# Salamander Drumkit

Alexander Holm's [Salamander Drumkit](https://archive.org/details/SalamanderDrumkit) (CC BY-SA 3.0): a
kit he built himself in 2009, of birch staves with very thick shells and a rope tuning system of his
own, recorded on a stereo pair of overheads at 48 kHz. A roomy, natural, characterful kit:
- **Drums:** an 18×18″ kick (two takes of it, on 36 and 35), two snares (a 14×5″ and a 14×6″, each with
  its snares on and off) and a stick on the snare, a 12×7″ rack tom and a 14×14″ floor tom.
- **Hi-hats:** 14″ Stagg hi-hats closed, with the pedal, stomped, open, and at seven openings in between
  (semi-open 1 the tightest, 7 the loosest).
- **Cymbals:** a Paiste 20″ ride with its bell, a Stagg 20″ ride with its bell, a crash on it and its
  choke, three crashes (Paiste 18″ Innovations, Paiste 20″ Rude thin, Stagg 16″) and two chinas
  (Masterworks 20″, Paiste 18″ Innovations) with their chokes, a Paiste 8″ splash and a bell chime.
- **Percussion:** a cowbell.

**Playing:**
- Few velocity layers (two to four), but many takes of each: twenty of each closed hi-hat layer, up to
  fourteen of the snare's. They take turns, so a part never sounds the same hit twice running.
- The library brings every take up to full scale and makes it soft or loud with its volume and with
  velocity. Here each layer plays at the library's volume for it and is placed on the kit's one velocity
  curve as loud as the library plays it, so the kit balances as its own program has it.
- The 14×6″ snare is the snare (38), the 14×5″ the second snare (40), each with its snares off on 39 and
  34. The toms sit on every General MIDI tom key.
- What General MIDI has no key for: the hi-hat's stomp and seven openings on 21 to 28, the chokes on 29
  to 33, the third crash, the second china, the bell chime and the second ride's bell and crash on 82 to
  86.
- A cymbal's choke (struck and grabbed) stops that cymbal ringing. The hi-hat chokes itself.
- One take is left out: the library's first soft kick is a 44-second recording with its hit near the end.
- The kit is anchored to the snare at −19 dB loudness. The snare peaks at −2 dBFS at most, and every
  piece at 0 dBFS at most, at velocity 127.

**Where it comes from:** the original release (`salamanderDrumkit.tar.bz2`), as the Internet Archive
keeps it. It's one compressed archive read end to end, so an install takes a minute or two to unpack it.

**Licence:** [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). In the author's words, the
share-alike condition only applies if you modify the samples or make new sample libraries with them;
music and other works made with it can be licensed as you like. This pack, being made from the samples,
is shared under the same licence.

For a kit recorded on many microphones, see [Naked Drums](../naked-drums/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `salamander-drums` |
| Licence | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Credit | Salamander Drumkit by Alexander Holm (CC BY-SA 3.0; the share-alike applies to sample libraries made from it, not music): a birch-stave kit with an 18" kick, 14" snares, 12/14" toms, Paiste, Stagg and Masterworks cymbals, on overheads. Levelled for HO[LO] as its own program plays it. |
| Size | 287 MB on disk, 534 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Salamander Drumkit**, or `pnpm packs install salamander-drums` |

## Where its files come from

Made from 534 recordings, fetched from the archive <https://archive.org/download/SalamanderDrumkit/salamanderDrumkit.tar.bz2> (sha256 `34e746ec1721…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Salamander Drumkit | `salamander-drums/kit` | Drum kits | 38 pads | 4 | 20 | chokes (a closed hi-hat stops the open one) |

## Salamander Drumkit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 21 | A0 | Hi-hat stomp |
| 22 | A#0 | Hi-hat semi-open 1 |
| 23 | B0 | Hi-hat semi-open 2 |
| 24 | C1 | Hi-hat semi-open 3 |
| 25 | C#1 | Hi-hat semi-open 4 |
| 26 | D1 | Hi-hat semi-open 5 |
| 27 | D#1 | Hi-hat semi-open 6 |
| 28 | E1 | Hi-hat semi-open 7 |
| 29 | F1 | Crash choke |
| 30 | F#1 | Crash 2 choke |
| 31 | G1 | China choke |
| 32 | G#1 | China 2 choke |
| 33 | A1 | Ride 2 crash choke |
| 34 | A#1 | Snare 2, snares off |
| 35 | B1 | Kick 2 |
| 36 | C2 | Kick |
| 37 | C#2 | Side stick |
| 38 | D2 | Snare |
| 39 | D#2 | Snare, snares off |
| 40 | E2 | Snare 2 |
| 41 | F2 | Tom 14″ |
| 42 | F#2 | Hi-hat closed |
| 44 | G#2 | Hi-hat pedal |
| 45 | A2 | Tom 12″ |
| 46 | A#2 | Hi-hat open |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 52 | E3 | China |
| 53 | F3 | Ride bell |
| 55 | G3 | Splash |
| 56 | G#3 | Cowbell |
| 57 | A3 | Crash 2 |
| 59 | B3 | Ride 2 |
| 82 | A#5 | Crash 3 |
| 83 | B5 | China 2 |
| 84 | C6 | Bell chime |
| 85 | C#6 | Ride 2 bell |
| 86 | D6 | Ride 2 crash |
