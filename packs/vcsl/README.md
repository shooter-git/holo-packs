# Versilian Community Sample Library

Instruments from Versilian Studios' [Versilian Community Sample Library](https://github.com/sgossner/VCSL)
(CC0), a broad collection of orchestral, folk and world instruments. This pack maps the following:

- **Drums and percussion:**
  - bongos (high, muted and low);
  - a snare drum, its cross-stick and a roll;
  - hi-hats (closed, open and pedal);
  - shakers (down and up strokes);
  - finger cymbals and a gong;
  - temple blocks.
- **Mallets:** a vibraphone, struck and bowed.
- **Plucked:** the Vietnamese *đàn tranh* zither: plucked, tremolo, and glissandi up and down.
- **Woodwinds:** an ocarina, plain and with vibrato.

As with [VSCO 2](../vsco2/), HO[LO] plays the library's own recordings, mapped from measurements of every
sample (from [Hallowed Lanterns](https://github.com/shooter-git/hallowed-lanterns)' sample catalogues).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `vcsl` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Using the Versilian Community Sample Library (CC0, Versilian Studios). |
| Size | 198 MB on disk, 173 sample files |
| Instruments | 22 |
| Install | the studio's Library, **More packs → Versilian Community Sample Library**, or `pnpm packs install vcsl` |

## Where its files come from

Taken as published from [sgossner/VCSL](https://github.com/sgossner/VCSL) at commit [`c1ea7bc`](https://github.com/sgossner/VCSL/tree/c1ea7bcc3c7309650ab0da9d15c9cd1fbc4a4c7e): an install checks out only the files this map plays.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Bongo High | `vcsl/bongo_hi` | Percussion | one sound | 3 | 2 |  |
| Bongo High (Muted) | `vcsl/bongo_hi_muted` | Percussion | one sound | 3 | 2 |  |
| Bongo Low | `vcsl/bongo_lo` | Percussion | one sound | 3 | 2 |  |
| Snare Cross-stick | `vcsl/drum_xstick` | Percussion | one sound | 1 | 2 |  |
| Snare Drum | `vcsl/drum_snare` | Percussion | one sound | 4 | 2 |  |
| Snare Roll | `vcsl/drum_roll` | Percussion | one sound | 2 | 1 |  |
| Finger Cymbals | `vcsl/finger_cymbal` | Tuned percussion | G7 | 1 | 1 |  |
| Gong | `vcsl/gong` | Tuned percussion | D3 | 4 | 1 |  |
| Hi-Hat (Closed) | `vcsl/hihat` | Percussion | one sound | 4 | 2 |  |
| Hi-Hat (Open) | `vcsl/hihat_open` | Percussion | one sound | 1 | 2 |  |
| Hi-Hat (Pedal) | `vcsl/hihat_pedal` | Percussion | one sound | 1 | 2 |  |
| Shaker (Down) | `vcsl/shaker_down` | Percussion | one sound | 1 | 2 |  |
| Shaker (Up) | `vcsl/shaker_up` | Percussion | one sound | 1 | 2 |  |
| Temple Block | `vcsl/woodblock` | Tuned percussion | E6–F6 | 4 | 1 |  |
| Vibraphone | `vcsl/vibes` | Tuned percussion | F3–E6 | 2 | 1 |  |
| Vibraphone (Bowed) | `vcsl/vibes_bowed` | Tuned percussion | A3–E6 | 1 | 1 |  |
| Dan Tranh (Zither) | `vcsl/zither` | Guitars and plucked strings | B2–B5 | 3 | 1 |  |
| Dan Tranh Glissando Down | `vcsl/zither_gliss_down` | Guitars and plucked strings | B4 | 1 | 1 |  |
| Dan Tranh Glissando Up | `vcsl/zither_gliss_up` | Guitars and plucked strings | B4 | 1 | 1 |  |
| Dan Tranh Tremolo | `vcsl/zither_trem` | Guitars and plucked strings | B2–B5 | 1 | 1 |  |
| Ocarina | `vcsl/ocarina` | Woodwinds | A4–C#6 | 1 | 1 | looped sustains |
| Ocarina Vibrato | `vcsl/ocarina_vib` | Woodwinds | A4–C6 | 1 | 1 | looped sustains |
