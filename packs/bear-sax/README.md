# Karoryfer Bear Sax

A 1926 Conn baritone saxophone: [Bear Sax](https://github.com/sfzinstruments/karoryfer.bear-sax) by
Karoryfer Lecolds (CC0).

- **Baritone Sax**: each note soft and loud, looped where the library loops it, so a note holds as long
  as its key. The library fades between them with the mod wheel; here velocity chooses.
- **Baritone Sax (Staccato)**: four velocity layers, three takes in turn.

**Levels:** measured and set where HO[LO]'s velocity curve meets them, the loudest at −17 dB at velocity
127 (less where a note's attack would otherwise peak over −3 dB).

**How it's made:** each note is the library's WAV, a looped one whole, a staccato one kept until it
falls to −60 dB and faded there; otherwise bit for bit.

For an alto, see [Weresax](../weresax/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `bear-sax` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Bear Sax by Karoryfer Lecolds (CC0): a 1926 Conn baritone saxophone. |
| Size | 87 MB on disk, 512 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Karoryfer Bear Sax**, or `pnpm packs install bear-sax` |

## Where its files come from

Made from 512 recordings, fetched from [sfzinstruments/karoryfer.bear-sax](https://github.com/sfzinstruments/karoryfer.bear-sax/tree/7abb3c652525a15dfac80e1b5dfbba9964ee568f) at `7abb3c6`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Baritone Sax | `bear-sax/baritone-sax` | Woodwinds | C#2–G#4 | 2 | 1 | looped sustains |
| Baritone Sax (Staccato) | `bear-sax/baritone-sax_stac` | Woodwinds | C#2–G#4 | 4 | 4 |  |
