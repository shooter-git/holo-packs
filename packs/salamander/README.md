# Salamander Grand Piano (Yamaha C5)

A Yamaha C5 grand: Alexander Holm's *Salamander Grand Piano* V3, recorded at 48 kHz, 24-bit with two
AKG C414s in an AB pair about 12 cm above the strings. Its author put it in the public domain on
4 March 2022 ([his page for it](https://rytmenpinne.wordpress.com/sounds-and-such/salamander-grandpiano/));
HO[LO] keeps his credit anyway. The files come from the [SFZ Instruments](https://github.com/sfzinstruments/SalamanderGrandPiano)
project's edition, kinwie's mapping in FLAC (that repository's mapping is CC BY 3.0).

What was recorded:
- 16 velocity layers every minor third from A0;
- the hammers coming back (a sample a key);
- the strings ringing off as the dampers fall (three layers every minor third, up to D#6: the keys
  from F6 up have no dampers);
- the sustain pedal going down and up.

Two instruments play it:
- **Yamaha C5 Grand**: every layer, every release sound and the pedal.
- **Yamaha C5 Grand, Light**: half the layers and shorter tails (cut as they load, from the same
  files), for a device that holds less.

Its tuning is the piano's own (the library's *Natural* set, not its retuned one).

**How it's made:** each note is kept until it falls to −55 dB (16 s at most) and faded over its last
second and a half. Nothing else changes: the files are the library's samples, bit for bit, up to the
fade, written as 24-bit WAVs.

**Levels:**
- The layers are measured (their loudness, as BS.1770 weighs it) and set where HO[LO]'s velocity curve
  meets them, as the [Steinway](../steinway/)'s are.
- The loudest layer plays at −16.4 dB at velocity 127, the Steinway's level, so the two pianos swap
  without touching a fader.
- The hammers and the pedal keep the library's own levels beside the notes.

For another grand, see the [Steinway Model D](../steinway/) and the [Headroom Piano](../headroom/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `salamander` |
| Licence | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| Credit | Salamander Grand Piano V3 by Alexander Holm (public domain since 4 March 2022), mapped in FLAC by kinwie for the SFZ Instruments project: a Yamaha C5 recorded at 48 kHz, 24-bit. Trimmed for HO[LO]: each note ends where it falls to -55 dB. |
| Size | 1.4 GB on disk, 641 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Salamander Grand Piano (Yamaha C5)**, or `pnpm packs install salamander` |

## Where its files come from

Made from 641 recordings, fetched from [sfzinstruments/SalamanderGrandPiano](https://github.com/sfzinstruments/SalamanderGrandPiano/tree/3382bf9496bba2486f5ab0de55a264d1dfc38404) at `3382bf9`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Yamaha C5 Grand | `salamander/grand` | Pianos and keys | A0–C8 | 16 | 1 | release samples, undamped from F6 |
| Yamaha C5 Grand, Light | `salamander/grand-light` | Pianos and keys | A0–C8 | 8 | 1 | release samples, undamped from F6 |
