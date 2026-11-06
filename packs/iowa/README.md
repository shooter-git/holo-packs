# University of Iowa: Clarinet and Bassoon

A B♭ clarinet and a bassoon from the University of Iowa Electronic Music Studios'
[Musical Instrument Samples](https://theremin.music.uiowa.edu/MIS.html), free to use for any project
without restriction.

Each was recorded note by note at three dynamics (*pp*, *mf* and *ff*), and each is played sustained or
staccato.

**How the files are made:**
- The university publishes each dynamic as one long run of single notes.
- An install fetches the runs, checks each by its sha256, and cuts every note out of its run, from just
  before its attack to the end of its decay, with a 2 ms fade at each end. Nothing else changes.
- Every install makes exactly the files this pack's checksums name.

For a fuller woodwind section (flute, oboe, clarinet and bassoon), see [VSCO 2](../vsco2/).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `iowa` |
| Licence | Free to use without restriction (University of Iowa Electronic Music Studios) |
| Credit | University of Iowa Musical Instrument Samples (Electronic Music Studios, University of Iowa). |
| Size | 101 MB on disk, 256 sample files |
| Instruments | 4 |
| Install | the studio's Library, **More packs → University of Iowa MIS: Clarinet and Bassoon**, or `pnpm packs install iowa` |

## Where its files come from

Cut from 28 downloads at <https://theremin.music.uiowa.edu/sound%20files/MIS/Woodwinds/>: each note is cut from its run as it is, but for a 2 ms fade at each end. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Bassoon | `iowa/bassoon_iowa` | Woodwinds | A#1–D5 | 3 | 1 | looped sustains |
| Bassoon Staccato | `iowa/bassoon_iowa_stac` | Woodwinds | A#1–D5 | 3 | 1 |  |
| Clarinet | `iowa/clarinet_iowa` | Woodwinds | D3–C7 | 3 | 1 | looped sustains |
| Clarinet Staccato | `iowa/clarinet_iowa_stac` | Woodwinds | D3–C7 | 3 | 1 |  |
