# Karoryfer x bigcat Cello

A solo cello played by Kamila Borowiak: [Karoryfer x bigcat cello](https://github.com/sfzinstruments/karoryfer-bigcat.cello)
by Karoryfer Lecolds and bigcat instruments (CC0).

Three ways of playing it, each as the library's own maps play them:
- **Solo Cello**: bowed and held, four velocity layers, down and up bows taking turns.
- **Staccato**: four velocity layers, four takes in turn.
- **Pizzicato**: four takes in turn.

**Levels:** each instrument's layers are measured and set where HO[LO]'s velocity curve meets them, the
loudest at −17 dB at velocity 127 (a little less where a note's attack would otherwise peak over
−3 dB).

**How it's made:** the library maps the cello an octave under where it sounds (its low C, 65 Hz, on
key 24); here each key plays the note it names, the low C on key 36. Each note is the library's WAV,
kept until it falls to −60 dB and faded there, otherwise bit for bit.

For a cello section, see VSCO 2's [Cellos](../vsco2/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `bigcat-cello` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Karoryfer x bigcat cello by Karoryfer Lecolds and bigcat instruments (CC0): a cello played by Kamila Borowiak. |
| Size | 131 MB on disk, 458 sample files |
| Instruments | 3 |
| Install | the studio's Library, **More packs → Karoryfer x bigcat Cello**, or `pnpm packs install bigcat-cello` |

## Where its files come from

Made from 458 recordings, fetched from [sfzinstruments/karoryfer-bigcat.cello](https://github.com/sfzinstruments/karoryfer-bigcat.cello/tree/6fd75fbfc1dbb3109bf26220ba1adea46188a18b) at `6fd75fb`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Solo Cello | `bigcat-cello/cello` | Strings | C2–C6 | 4 | 2 |  |
| Solo Cello (Staccato) | `bigcat-cello/cello_stac` | Strings | C2–C6 | 4 | 4 |  |
| Solo Cello (Pizzicato) | `bigcat-cello/cello_pizz` | Strings | C2–B4 | 1 | 4 |  |
