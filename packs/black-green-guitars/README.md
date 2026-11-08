# Karoryfer Black And Green Guitars

Two hollow-body electric guitars, [Black And Green Guitars](https://github.com/sfzinstruments/karoryfer.black-and-green-guitars)
by Karoryfer Lecolds (CC0):
- **Black Guitar:** a small black single-cutaway.
- **Green Guitar:** a two-tone green archtop with f-holes and a vibrato tailpiece.

Each guitar has two instruments:
- **Plucked notes:** three dynamics, played in turn from two to four takes, with each guitar's release
  noises.
- **Staccato notes:** four takes.

They play as the library's programs do with their controls at rest. The library's extras are left out:
its unison voices, its feedback layers and its tailpiece bends. Its hammer-ons and behind-the-bridge
sounds are left out too.

**How it's made:** each note is kept until it falls to −60 dB (6 s at most; staccato 2 s), written as a
16-bit WAV.

**Levels:** the dynamics are measured and set where one velocity curve meets them, the loudest at
−17 dB at velocity 127.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `black-green-guitars` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Black And Green Guitars by Karoryfer Lecolds (CC0): two hollow-body electric guitars. |
| Size | 299 MB on disk, 1612 sample files |
| Instruments | 4 |
| Install | the studio's Library, **More packs → Karoryfer Black And Green Guitars**, or `pnpm packs install black-green-guitars` |

## Where its files come from

Made from 1612 recordings, fetched from [sfzinstruments/karoryfer.black-and-green-guitars](https://github.com/sfzinstruments/karoryfer.black-and-green-guitars/tree/b3b3249d37dc977a1a297bd2dc053e6d9b6b805c) at `b3b3249`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Green Guitar | `black-green-guitars/green` | Guitars and plucked strings | E2–D6 | 3 | 4 | release samples |
| Green Guitar (Staccato) | `black-green-guitars/green-staccato` | Guitars and plucked strings | E2–D6 | 1 | 4 |  |
| Black Guitar | `black-green-guitars/black` | Guitars and plucked strings | E2–D6 | 3 | 4 | release samples |
| Black Guitar (Staccato) | `black-green-guitars/black-staccato` | Guitars and plucked strings | E2–D6 | 1 | 4 |  |
