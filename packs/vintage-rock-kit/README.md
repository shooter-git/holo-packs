# Vintage Rock Kit

A big, deep Ludwig kit in the 1970s rock manner, made from the Red Zeppelin kit of
[AVL Drumkits](https://www.bandshed.net/avldrumkits/) by Glen MacArthur:
- **Drums:** a 26″ kick, a 14″ snare (centre, edge and side stick), a 14″ rack tom and a 16″ floor tom,
  each with its edge.
- **Cymbals:** 13″ Sabian hi-hats (closed, pedal, half open and a swish), a 20″ and a 17″ Zildjian
  crash with their chokes, a 24″ Zildjian ride with its bell, shank and choke, a 10″ Zildjian splash, a
  22″ Paiste crash and an 18″ Wuhan china.
- **Percussion:** hand claps, a tambourine, a cowbell, maracas and a stick click.

The library calls it Red Zeppelin. Its licence asks that a version made from it go under a name of its
own, so it's the Vintage Rock Kit here: named for its sound, a big-shelled kit with a huge kick.

**Playing:**
- Each hit is one mono recording, already mixed, placed where the library pans it (from the drummer's
  point of view: the hi-hat and snare to the left, the floor tom and ride to the right).
- The library brings most of its layers up to full scale and makes them soft or loud by velocity. Here
  each layer plays at the velocities the library gives it (five even bands), and its level follows the
  kit's one velocity curve, so a drum gets louder smoothly as it's hit harder and changes its timbre
  where the library changes it.
- The toms sit on every General MIDI tom key (the floor tom low, the rack tom high). What General MIDI
  has no key for sits below the kick: the stick click on 31 (General MIDI's sticks), the toms' edges on
  23 and 25, the hi-hat swish on 26, and the cymbals' chokes on 27 to 29.
- The library's hi-hat is half open on 46, General MIDI's open hi-hat key.
- A cymbal's choke (struck and grabbed) stops that cymbal ringing. The hi-hat chokes itself.
- The kit is anchored to the snare at −19 dB loudness. The snare peaks at −2 dBFS at most, and every
  piece at 0 dBFS at most, at velocity 127.

For a tighter kit from the same library, see the [Pop Rock Kit](../pop-rock-kit/).

**Licence:** AVL Drumkits are shared under [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
with an exception of the library's own, and this pack is shared under the same terms. Music made with
it can be licensed however you like; a sample library made from it is shared alike, under a name of
its own. The library's licence, in full
([as published](http://bandshed.net/pdf/AVL-Drumkits%20CC-BY-SA%20License.pdf)):

```text
AVL-Drumkits
=======
Created by: Glen MacArthur 2015
Formats: SFZ, SF2, h2drumkit
Website: http://www.bandshed.net/avldrumkits/
Contact: info@bandshed.net

License
=======
CC-BY-SA with the following exception:

The by-sa condition is imperative if you modify the samples
themselves or create new sample libraries with this licensed product.
However, produced music and other non-sample-library works can be
licensed freely.

Attribution means keeping all authors information and this readme-file or
its content in the release

If you want to create a fork, a modified version, of this sample library
you have to release and distribute it under a different name.

http://creativecommons.org/licenses/by-sa/3.0/
```

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `vintage-rock-kit` |
| Licence | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Credit | Made from AVL Drumkits by Glen MacArthur (CC BY-SA 3.0; music made with it can be licensed freely): its Red Zeppelin kit, a Ludwig kit with a 26" kick, 14" snare, 14/16" toms, Sabian, Zildjian, Paiste and Wuhan cymbals. Placed for HO[LO] at the library's own pans. |
| Size | 61 MB on disk, 128 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Vintage Rock Kit**, or `pnpm packs install vintage-rock-kit` |

## Where its files come from

Made from 128 recordings, fetched from the archive <https://www.bandshed.net/sounds/AVLDrumkits_SFZ/RED_ZEPPELIN_2023_repack.zip> (sha256 `9f5c5e5a76de…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Vintage Rock Kit | `vintage-rock-kit/kit` | Drum kits | 28 pads | 5 | 1 | chokes (a closed hi-hat stops the open one) |

## Vintage Rock Kit's pads

Each key plays one piece of the kit. The kick, snare and hi-hats sit where General MIDI has them.

| Key | Note | Pad |
|---|---|---|
| 23 | B0 | Tom 16″ edge |
| 25 | C#1 | Tom 14″ edge |
| 26 | D1 | Hi-hat swish |
| 27 | D#1 | Crash choke |
| 28 | E1 | Crash 2 choke |
| 29 | F1 | Ride choke |
| 30 | F#1 | Crash 3 |
| 31 | G1 | Stick click |
| 36 | C2 | Kick |
| 37 | C#2 | Side stick |
| 38 | D2 | Snare |
| 39 | D#2 | Clap |
| 40 | E2 | Snare edge |
| 41 | F2 | Tom 16″ |
| 42 | F#2 | Hi-hat closed |
| 44 | G#2 | Hi-hat pedal |
| 45 | A2 | Tom 14″ |
| 46 | A#2 | Hi-hat open |
| 49 | C#3 | Crash |
| 51 | D#3 | Ride |
| 52 | E3 | China |
| 53 | F3 | Ride bell |
| 54 | F#3 | Tambourine |
| 55 | G3 | Splash |
| 56 | G#3 | Cowbell |
| 57 | A3 | Crash 2 |
| 59 | B3 | Ride shank |
| 70 | A#4 | Maracas |
