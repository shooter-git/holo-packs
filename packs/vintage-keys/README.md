# Vintage Keys (Greg Sullivan, FreePats)

Vintage keyboards made for HO[LO] by mixing [Greg Sullivan's electric pianos](../epianos/) (CC BY 3.0)
and the [FreePats Upright Piano KW](../freepats-upright/) (CC0). Each is a new mix of those recordings:
- **Honky-tonk Upright:** the upright with a copy of itself 14 cents sharp and 6 ms late, the beating of
  an old upright's unisons out of tune.
- **Stage Piano Layer:** the CP80 electric grand with the upright's matching layer under it (the
  upright's nearest note resampled to each CP80 note's pitch and lined up at its attack), the classic
  layered stage sound.
- **Wurlitzer Chorus:** the Wurlitzer EP200 with copies 7 cents flat and 7 cents sharp, one to each
  side, a wide, shimmering reed piano.

**How it's made:** every mix is plain arithmetic (the retuning is resampling), the same on every
computer, into 16-bit WAVs. Each note is kept until it falls to −60 dB (8 s at most). The layers keep
their sources' velocity splits, each at the level HO[LO]'s velocity curve has there, the loudest at
−17 dB at velocity 127.

**Attribution:** CC BY 3.0 asks that Greg Sullivan be credited wherever the sound is used. HO[LO] shows
the credit in its Library, and an experience's pinned `packs.json` carries it.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `vintage-keys` |
| Licence | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Credit | Made for HO[LO] from Greg Sullivan's E-Pianos (CC BY 3.0, sullivang.net; mapped in FLAC by kinwie for the SFZ Instruments project) and the FreePats Upright Piano KW (CC0): honky-tonk, layered and chorused mixes. |
| Size | 149 MB on disk, 190 sample files |
| Instruments | 3 |
| Install | the studio's Library, **More packs → Vintage Keys (Greg Sullivan, FreePats)**, or `pnpm packs install vintage-keys` |

## Where its files come from

Made from 189 recordings, fetched from [sfzinstruments/GregSullivan.E-Pianos](https://github.com/sfzinstruments/GregSullivan.E-Pianos/tree/8c3e581acda3594b553948ff0222d4f84a698376) at `8c3e581` and the archive <https://freepats.zenvoid.org/Piano/UprightPianoKW/UprightPianoKW-SFZ+FLAC-20220221.7z> (sha256 `3a66da3b25a2…`). Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Honky-tonk Upright | `vintage-keys/honky-tonk` | Pianos and keys | A0–C8 | 2 | 1 |  |
| Stage Piano Layer (CP80 and Upright) | `vintage-keys/stage-layer` | Pianos and keys | D#1–B7 | 4 | 1 |  |
| Wurlitzer Chorus | `vintage-keys/wurlitzer-chorus` | Pianos and keys | A1–G#6 | 4 | 1 |  |
