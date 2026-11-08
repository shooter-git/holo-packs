# Headroom Piano (Yamaha C3)

A Yamaha C3 grand: Bengt Nilsson's *Headroom Piano* (CC BY 4.0), first made for Kontakt and mapped in
FLAC by kinwie for the [SFZ Instruments](https://github.com/sfzinstruments/BengtNilsson.HeadroomPiano)
project. Each note was recorded from two places at once, a close pair and a Decca tree, in five
velocity layers every minor third from A0.

Two instruments:
- **Yamaha C3 Grand**: both microphones as the library plays them unless told otherwise (the close
  pair at full level, the tree at half), mixed into one stereo file a note.
- **Yamaha C3 Grand, Close**: the close pair alone, drier and nearer.

**How it's made:** each note is kept until it falls to −58 dB (20 s at most) and faded over its last
second and a half. The keys from F#6 up ring on when released, as a grand's undamped strings do.

**Levels:** the layers are measured and set where HO[LO]'s velocity curve meets them. Each instrument's
loudest layer aims at −16.4 dB at velocity 127, as the [Steinway](../steinway/)'s does; the close
microphones' sharp attacks hold it a little under that, so no note peaks over −3 dB.

**Attribution:** CC BY 4.0 asks that Bengt Nilsson be credited wherever the sound is used. HO[LO] shows
the credit in its Library, and an experience's pinned `packs.json` carries it.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `headroom` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | Headroom Piano by Bengt Nilsson (CC BY 4.0), mapped in FLAC by kinwie for the SFZ Instruments project: a Yamaha C3 grand from a close pair and a Decca tree. Mixed and trimmed for HO[LO]: each note ends where it falls to -58 dB. |
| Size | 512 MB on disk, 300 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Headroom Piano (Yamaha C3)**, or `pnpm packs install headroom` |

## Where its files come from

Made from 300 recordings, fetched from [sfzinstruments/BengtNilsson.HeadroomPiano](https://github.com/sfzinstruments/BengtNilsson.HeadroomPiano/tree/2a7df3f7252227a3484202c1d61bc1bfe352a971) at `2a7df3f`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Yamaha C3 Grand | `headroom/grand` | Pianos and keys | A0–C8 | 5 | 1 | undamped from F#6 |
| Yamaha C3 Grand, Close | `headroom/grand-close` | Pianos and keys | A0–C8 | 5 | 1 | undamped from F#6 |
