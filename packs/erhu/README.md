# Erhu

A Chinese two-string fiddle, close miked in stereo: the [erhu](https://github.com/sfzinstruments/aliexpress-erhu)
of the SFZ Instruments project (CC0), "a cheap erhu bought from Aliexpress and played by someone who's
more of a violinist", as its readme puts it.

- **Erhu**: long notes, two takes in turn. The library sets their level with the mod wheel; here
  velocity does.
- **Erhu (Short)**: short notes, four takes in turn.

HO[LO] plays them as the library's polyphonic programs do (not its legato or unison voices).

**How it's made:** the library maps each note an octave under where it sounds (its "d5", 291 Hz, on
key 50); here each key plays the note it names. Each note is the library's WAV, kept until it falls to
−60 dB and faded there, otherwise bit for bit. Measured and set where HO[LO]'s velocity curve meets it,
the loudest at −17 dB at velocity 127 (a little less where a bow's attack would peak over −3 dB).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `erhu` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | The erhu of the SFZ Instruments project (CC0): a two-string Chinese fiddle, close miked in stereo. |
| Size | 45 MB on disk, 120 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Erhu**, or `pnpm packs install erhu` |

## Where its files come from

Made from 120 recordings, fetched from [sfzinstruments/aliexpress-erhu](https://github.com/sfzinstruments/aliexpress-erhu/tree/6615047b2fd06126877483e97b8bb4af9d00b080) at `6615047`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Erhu | `erhu/erhu` | Strings | D4–A5 | 1 | 4 |  |
| Erhu (Short) | `erhu/erhu_stac` | Strings | D4–A5 | 1 | 4 |  |
