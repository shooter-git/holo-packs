# Headroom Piano (Yamaha C3)

A Yamaha C3 grand: Bengt Nilsson's *Headroom Piano* (CC BY 4.0), first made for Kontakt and mapped in
FLAC by kinwie for the [SFZ Instruments](https://github.com/sfzinstruments/BengtNilsson.HeadroomPiano)
project. Each note was recorded from two places at once, a close pair and a Decca tree, in five
velocity layers every minor third from A0.

Three instruments:
- **Yamaha C3 Grand**: both microphones as the library plays them unless told otherwise (the close
  pair at full level, the tree at half), mixed into one stereo file a note.
- **Yamaha C3 Grand, Close**: the close pair alone, drier and nearer.
- **Yamaha C3 Grand, Close and Tree**: both microphones kept apart, each with a level in the
  instrument's window, turned while it plays. It starts as the library plays them, so it first sounds
  as the first instrument does; bring the tree up for more room, or down to nothing for the close pair
  alone. Its close pair plays the second instrument's files; the tree's are its own (they make the pack
  bigger, as the tree rings longer). Both microphones load, whatever their levels.

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
| Size | 886 MB on disk, 450 sample files |
| Instruments | 3 |
| Install | the studio's Library, **More packs → Headroom Piano (Yamaha C3)**, or `pnpm packs install headroom` |

## Where its files come from

Made from 300 recordings, fetched from [sfzinstruments/BengtNilsson.HeadroomPiano](https://github.com/sfzinstruments/BengtNilsson.HeadroomPiano/tree/2a7df3f7252227a3484202c1d61bc1bfe352a971) at `2a7df3f`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, mixed from its microphones or each of them a file of its own), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Yamaha C3 Grand | `headroom/grand` | Pianos and keys | A0–C8 | 5 | 1 | undamped from F#6 |
| Yamaha C3 Grand, Close | `headroom/grand-close` | Pianos and keys | A0–C8 | 5 | 1 | undamped from F#6 |
| Yamaha C3 Grand, Close and Tree | `headroom/grand-mics` | Pianos and keys | A0–C8 | 5 | 1 | undamped from F#6, 2 microphones, each with its own level |

## Yamaha C3 Grand, Close and Tree's microphones

Each note sounds every microphone together, one strike heard from each place. Each has a knob in the instrument's window, turned while it plays; they start as the library mixes them, or as recorded where it has no mixer.

| Microphone | Id | Starts at | Recorded |
|---|---|---|---|
| Close Pair | `close` | 0 dB | stereo |
| Decca Tree | `tree` | −6 dB | stereo |
