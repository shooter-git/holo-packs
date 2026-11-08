# Singing Bowls (OLPC)

Three singing bowls, struck and left to ring for up to a minute, recorded by OpenPath Music for the One
Laptop per Child sound library ([archive.org/details/OpenPathMusic44V1](https://archive.org/details/OpenPathMusic44V1),
CC BY 3.0).

The bowls are named for their notes (D♭, G, B♭). A bowl's partials aren't a string's, so a spectrum,
not a pitch tracker, says where each sits: each is rooted at its lowest strong partial (546, 789 and
958 Hz) and plays the keys nearest it, so a melody can be played across the three.

**How it's made:** each bowl is kept until it falls to −60 dB (30 s at most) and faded over its last
three seconds, otherwise bit for bit, fetched on its own out of the published zip.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `singing-bowls` |
| Licence | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Credit | Singing bowl samples by OpenPath Music for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/OpenPathMusic44V1). |
| Size | 8 MB on disk, 3 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Singing Bowls (OLPC)**, or `pnpm packs install singing-bowls` |

## Where its files come from

Made from 3 recordings, fetched from <https://archive.org/download/OpenPathMusic44V1/OpenPathMusic44V1.zip/OpenPathMusic44V1/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Singing Bowls | `singing-bowls/bowls` | Tuned percussion | C#5–A#5 | 1 | 1 |  |
