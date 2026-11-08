# Busker Kit

A street percussionist's kit, made from the Buskman's Holiday kit of
[AVL Drumkits](https://www.bandshed.net/avldrumkits/) by Glen MacArthur:
- **Cajon:** a Meinl cajon's bass and its slaps, with the left hand and the right.
- **Hand drums:** a large and a small Meinl conga, each with either hand.
- **Shakers and jingles:** a triple shaker, a tambourine shaken and struck, and bell trees down and up.
- **The rest:** claves, a 16″ Paiste 2002 cymbal and its bell, an LP cowbell, a foot stomp, a 20-litre
  bucket, hand claps, finger snaps and a stick click.

**Playing:**
- The library lays it out as a drum kit made of percussion, and its keys are kept: the cajon's bass on
  the kick's key (36), its slaps on the snare's (38 and 40), the shaker and tambourines on the hi-hat's
  (42, 44 and 46), the congas on the toms' (41 to 47), the cymbal on the crash's (49). A drum part
  played on it comes out as the busker's version of it.
- It has no hi-hat or snare drum, so it's listed with percussion rather than with the drum kits.
- Ten velocity layers a piece (five for the bell trees). Each layer plays at the velocities the library
  gives it, and its level follows one velocity curve, so every piece answers velocity alike.
- Each hit is one mono recording, placed where the library pans it (from the percussionist's point of
  view).
- The kit is anchored to the cajon's slap at −19 dB loudness.

The library calls it Buskman's Holiday. Its licence asks that a version made from it go under a name of
its own, so it's the Busker Kit here.

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
| Id | `busker-kit` |
| Licence | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Credit | Made from AVL Drumkits by Glen MacArthur (CC BY-SA 3.0; music made with it can be licensed freely): its Buskman's Holiday kit, a Meinl cajon, Meinl congas, shakers, tambourines, claves, a Paiste cymbal, a cowbell, a stomp, a bucket and bell trees. Placed for HO[LO] at the library's own pans. |
| Size | 56 MB on disk, 200 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Busker Kit**, or `pnpm packs install busker-kit` |

## Where its files come from

Made from 200 recordings, fetched from the archive <https://www.bandshed.net/sounds/AVLDrumkits_SFZ/BUSKMANS_HOLIDAY_SFZ.zip> (sha256 `ed0108935710…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Busker Kit | `busker-kit/kit` | Percussion | 21 pads | 10 | 1 |  |

## Busker Kit's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 35 | B1 | Stick click |
| 36 | C2 | Cajon bass |
| 37 | C#2 | Finger snaps |
| 38 | D2 | Cajon slap left |
| 39 | D#2 | Hand claps |
| 40 | E2 | Cajon slap right |
| 41 | F2 | Low conga left |
| 42 | F#2 | Shaker |
| 43 | G2 | Low conga right |
| 44 | G#2 | Tambourine shake |
| 45 | A2 | High conga left |
| 46 | A#2 | Tambourine hit |
| 47 | B2 | High conga right |
| 48 | C3 | Claves |
| 49 | C#3 | Cymbal |
| 50 | D3 | Cymbal bell |
| 51 | D#3 | Cowbell |
| 52 | E3 | Foot stomp |
| 53 | F3 | Bucket |
| 54 | F#3 | Bell tree down |
| 55 | G3 | Bell tree up |
