# University of Iowa MIS: Mallets

The University of Iowa Electronic Music Studios' [Musical Instrument Samples](https://theremin.music.uiowa.edu/MIS.html),
free to use for any project without restriction: its newer single-note recordings (the 2012 pages,
published as *MIS Pitches - 2014*), every note recorded on its own, fortissimo, in stereo.

- **Marimba**: yarn, cord and rubber mallets, rolled, and dead strokes.
- **Xylophone**: hard rubber and rosewood mallets, and rolled.
- **Vibraphone**: ringing, damped, short and bowed.
- **Glockenspiel**: plastic and brass mallets.
- **Crotales**.

**How it's made:** HO[LO] fetches each note's AIFF from the university's own site, starts it just
before its attack (the recordings have silence before it), keeps it until it falls to −60 dB and fades
it there, otherwise bit for bit. One layer a note, so velocity sets its level, the loudest at −17 dB at
velocity 127 (less where an attack would peak over the limit). A bowed bar swells, so its loudness is measured over its first three seconds.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `iowa-mallets` |
| Licence | Free to use without restriction (University of Iowa Electronic Music Studios) |
| Credit | University of Iowa Musical Instrument Samples (Electronic Music Studios, University of Iowa): free to use for any project, without restriction. |
| Size | 615 MB on disk, 707 sample files |
| Instruments | 15 |
| Install | the studio's Library, **More packs → University of Iowa MIS: Mallets**, or `pnpm packs install iowa-mallets` |

## Where its files come from

Made from 707 recordings, fetched from <https://theremin.music.uiowa.edu/sound%2520files/MIS%2520Pitches%2520-%25202014/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Marimba | `iowa-mallets/marimba` | Tuned percussion | C2–C7 | 1 | 1 |  |
| Marimba (Cord Mallets) | `iowa-mallets/marimba_cord` | Tuned percussion | C2–C7 | 1 | 1 |  |
| Marimba (Rubber Mallets) | `iowa-mallets/marimba_rubber` | Tuned percussion | C2–C7 | 1 | 1 |  |
| Marimba (Roll) | `iowa-mallets/marimba_roll` | Tuned percussion | C2–C7 | 1 | 1 |  |
| Marimba (Dead Strokes) | `iowa-mallets/marimba_dead` | Tuned percussion | C2–C7 | 1 | 1 |  |
| Xylophone | `iowa-mallets/xylophone` | Tuned percussion | F4–C8 | 1 | 1 |  |
| Xylophone (Rosewood Mallets) | `iowa-mallets/xylophone_rosewood` | Tuned percussion | F4–C8 | 1 | 1 |  |
| Xylophone (Roll) | `iowa-mallets/xylophone_roll` | Tuned percussion | F4–C8 | 1 | 1 |  |
| Vibraphone | `iowa-mallets/vibraphone` | Tuned percussion | C3–F6 | 1 | 1 |  |
| Vibraphone (Damped) | `iowa-mallets/vibraphone_damped` | Tuned percussion | C3–F6 | 1 | 1 |  |
| Vibraphone (Short) | `iowa-mallets/vibraphone_short` | Tuned percussion | C3–F6 | 1 | 1 |  |
| Vibraphone (Bowed) | `iowa-mallets/vibraphone_bowed` | Tuned percussion | C3–F6 | 1 | 1 |  |
| Glockenspiel | `iowa-mallets/glockenspiel` | Tuned percussion | C5–E8 | 1 | 1 |  |
| Glockenspiel (Brass Mallets) | `iowa-mallets/glockenspiel_brass` | Tuned percussion | C5–E8 | 1 | 1 |  |
| Crotales | `iowa-mallets/crotales` | Tuned percussion | C6–C8 | 1 | 1 |  |
