# University of Iowa MIS: Solo Strings

The University of Iowa Electronic Music Studios' [Musical Instrument Samples](https://theremin.music.uiowa.edu/MIS.html),
free to use for any project without restriction: its newer single-note recordings (the 2012 pages,
published as *MIS Pitches - 2014*), every note recorded on its own, fortissimo, in stereo.

Violin, viola, cello and double bass, bowed (*arco*) and plucked (*pizzicato*). Iowa recorded each note
on every string that reaches it; here each key plays it on the highest of those strings, where a player
in first position would.

**How it's made:** HO[LO] fetches each note's AIFF from the university's own site, starts it just
before its attack (the recordings have silence before it), keeps it until it falls to −60 dB and fades
it there, otherwise bit for bit. One layer a note, so velocity sets its level, the loudest at −17 dB at
velocity 127 (less where an attack would peak over the limit). A held note's loudness is measured over its first second, as it swells after its attack. 

For string sections, see [VSCO 2](../vsco2/) and [Orchestral Sections](../orchestral-sections/), which
layers these soloists into VSCO 2's sections.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `iowa-strings` |
| Licence | Free to use without restriction (University of Iowa Electronic Music Studios) |
| Credit | University of Iowa Musical Instrument Samples (Electronic Music Studios, University of Iowa): free to use for any project, without restriction. |
| Size | 239 MB on disk, 364 sample files |
| Instruments | 8 |
| Install | the studio's Library, **More packs → University of Iowa MIS: Solo Strings**, or `pnpm packs install iowa-strings` |

## Where its files come from

Made from 364 recordings, fetched from <https://theremin.music.uiowa.edu/sound%2520files/MIS%2520Pitches%2520-%25202014/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Solo Violin | `iowa-strings/violin` | Strings | G3–E7 | 1 | 1 |  |
| Solo Violin (Pizzicato) | `iowa-strings/violin_pizz` | Strings | G3–E7 | 1 | 1 |  |
| Solo Viola | `iowa-strings/viola` | Strings | C3–A6 | 1 | 1 |  |
| Solo Viola (Pizzicato) | `iowa-strings/viola_pizz` | Strings | C3–A6 | 1 | 1 |  |
| Solo Cello | `iowa-strings/cello` | Strings | C2–A5 | 1 | 1 |  |
| Solo Cello (Pizzicato) | `iowa-strings/cello_pizz` | Strings | C2–A5 | 1 | 1 |  |
| Solo Double Bass | `iowa-strings/bass` | Bass | C1–G4 | 1 | 1 |  |
| Solo Double Bass (Pizzicato) | `iowa-strings/bass_pizz` | Bass | C1–G4 | 1 | 1 |  |
