# MTG Solo Saxophones

Soprano, alto, tenor and baritone saxophones: the Music Technology Group's (Universitat Pompeu Fabra)
free saxophone recordings on Freesound, trimmed, looped and mapped by kinwie for the
[SFZ Instruments](https://github.com/sfzinstruments/MTG.SoloSax) project (CC BY 4.0), 24-bit, 48 kHz, mono.

Each saxophone plays as its program plays a note a key starts:
- two velocity layers (the baritone three), three takes in turn;
- each note held on the loop the library made for it, so it lasts as long as its key.

The library's legato transitions and its breath and key noises aren't mapped.

**Levels:** the layers are measured and set where HO[LO]'s velocity curve meets them, the loudest at
−17 dB at velocity 127.

**Attribution:** CC BY 4.0 asks that the Music Technology Group and kinwie be credited wherever the
sound is used. HO[LO] shows the credit in its Library, and an experience's pinned `packs.json`
carries it.

For Karoryfer's alto and baritone, see [Weresax](../weresax/) and [Bear Sax](../bear-sax/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `mtg-sax` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | MTG Solo Saxophones (CC BY 4.0): samples by the Music Technology Group, Universitat Pompeu Fabra (Freesound), trimmed, looped and mapped by kinwie for the SFZ Instruments project. Soprano, alto, tenor and baritone. |
| Size | 153 MB on disk, 298 sample files |
| Instruments | 4 |
| Install | the studio's Library, **More packs → MTG Solo Saxophones**, or `pnpm packs install mtg-sax` |

## Where its files come from

Made from 298 recordings, fetched from [sfzinstruments/MTG.SoloSax](https://github.com/sfzinstruments/MTG.SoloSax/tree/b494d256549b3d088fdec176ce82867f8a1f58b2) at `b494d25`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Soprano Sax | `mtg-sax/soprano-sax` | Woodwinds | G#3–E6 | 2 | 3 | looped sustains |
| Alto Sax | `mtg-sax/alto-sax` | Woodwinds | C#3–A5 | 2 | 3 | looped sustains |
| Tenor Sax | `mtg-sax/tenor-sax` | Woodwinds | G#2–E5 | 2 | 3 | looped sustains |
| Baritone Sax | `mtg-sax/baritone-sax` | Woodwinds | C2–A4 | 3 | 3 | looped sustains |
