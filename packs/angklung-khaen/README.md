# Angklung and Khaen (OLPC)

An angklung and a khaen recorded by Berklee College of Music students for the One Laptop per Child
sound library ([archive.org/details/Berklee44v1](https://archive.org/details/Berklee44v1), CC BY 3.0).

What the recordings allow:
- **Angklung**: a shake of the bamboo frame, two takes in turn. The set has no single angklung notes
  to play a melody with, only fast runs whose notes blur into each other, so this is a sound to play,
  not a scale.
- **Angklung Ensemble**: a group of players' long shaken chord, as one sound.
- **Khaen**: the free-reed mouth organ's drone, two chords rooted at their lowest notes (A3, and G3 a
  quarter tone sharp), played on the keys around them.

No free library has a melodic angklung yet; a modelled one would fill the gap.

**Provenance:** the set has no notes on each file, so each was checked before it was mapped: mono
44.1 kHz recordings with nothing pointing at a commercial library. Its many other sounds aren't mapped.

**How it's made:** each file is fetched on its own out of the published zip and kept until it falls to
−60 dB. The recordings were normalised close to full scale, so each plays at its own level under a
−3 dB peak.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `angklung-khaen` |
| Licence | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Credit | Angklung and khaen samples by Berklee College of Music students for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/Berklee44v1). |
| Size | 3 MB on disk, 5 sample files |
| Instruments | 3 |
| Install | the studio's Library, **More packs → Angklung and Khaen (OLPC)**, or `pnpm packs install angklung-khaen` |

## Where its files come from

Made from 5 recordings, fetched from <https://archive.org/download/Berklee44v1/Berklee44v1.zip/Berklee44v1/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Angklung | `angklung-khaen/angklung` | Percussion | one sound | 1 | 2 |  |
| Angklung Ensemble | `angklung-khaen/angklung_ensemble` | Percussion | one sound | 1 | 1 |  |
| Khaen | `angklung-khaen/khaen` | Woodwinds | G3–A3 | 1 | 1 |  |
