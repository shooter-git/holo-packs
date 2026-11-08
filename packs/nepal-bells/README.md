# Nepalese Hand Bells (VCSL)

Three Nepalese hand bells from the [Versilian Community Sample Library](https://github.com/sgossner/VCSL)
(CC0), each on its own pad, as recorded (24-bit stereo). They're measured together, so they keep their
balance, the loudest at −17 dB at velocity 127 (less where a bell's strike would peak over −1 dB).

VCSL's other instruments, its đàn tranh zither among them, are in the [vcsl](../vcsl/) pack.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `nepal-bells` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Nepalese hand bells from the Versilian Community Sample Library (CC0, Versilian Studios). |
| Size | 1 MB on disk, 3 sample files |
| Instruments | 1 |
| Install | the studio's Library, **More packs → Nepalese Hand Bells (VCSL)**, or `pnpm packs install nepal-bells` |

## Where its files come from

Made from 3 recordings, fetched from [sgossner/VCSL](https://github.com/sgossner/VCSL/tree/c1ea7bcc3c7309650ab0da9d15c9cd1fbc4a4c7e) at `c1ea7bc`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Nepalese Hand Bells | `nepal-bells/bells` | Percussion | 3 pads | 1 | 1 |  |

## Nepalese Hand Bells's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Bell 1 |
| 37 | C#2 | Bell 2 |
| 38 | D2 | Bell 3 |
