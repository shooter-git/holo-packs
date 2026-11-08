# Karoryfer War Tuba

A tuba played by Jakub Lewicki, recorded and mapped by Drogomir Smolken:
[War Tuba](https://github.com/sfzinstruments/karoryfer.war-tuba) by Karoryfer Lecolds (CC0). Both
instruments are from the library's condenser microphone:

- **Tuba**: sustained, one layer a note. The library swells it with the mod wheel; here velocity sets
  its level.
- **Tuba (Staccato)**: four velocity layers, three takes in turn.

**Levels:** measured and set where HO[LO]'s velocity curve meets them. A low brass note measures quiet
by the loudness HO[LO] levels with (BS.1770 weighs low frequencies down), so the tuba sits a few dB under
−17 dB where its peaks reach −3 dB. Raise its fader for a heavier bottom.

**How it's made:** each note is the library's WAV, kept until it falls to −60 dB and faded there,
otherwise bit for bit.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `war-tuba` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | War Tuba by Karoryfer Lecolds (CC0): a tuba played by Jakub Lewicki, recorded and mapped by Drogomir Smolken. |
| Size | 49 MB on disk, 351 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Karoryfer War Tuba**, or `pnpm packs install war-tuba` |

## Where its files come from

Made from 351 recordings, fetched from [sfzinstruments/karoryfer.war-tuba](https://github.com/sfzinstruments/karoryfer.war-tuba/tree/5b62dd6ef6b00281bb734769e44a63f5e013018a) at `5b62dd6`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Tuba | `war-tuba/tuba` | Brass | F1–G3 | 1 | 1 |  |
| Tuba (Staccato) | `war-tuba/tuba_stac` | Brass | F1–G3 | 4 | 3 |  |
