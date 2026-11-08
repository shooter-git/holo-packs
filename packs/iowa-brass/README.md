# University of Iowa MIS: Brass

The University of Iowa Electronic Music Studios' [Musical Instrument Samples](https://theremin.music.uiowa.edu/MIS.html),
free to use for any project without restriction: its newer single-note recordings (the 2012 pages,
published as *MIS Pitches - 2014*), every note recorded on its own, fortissimo, in stereo.

French horn, trumpet (with and without vibrato), tenor and bass trombones, and tuba.

**How it's made:** HO[LO] fetches each note's AIFF from the university's own site, starts it just
before its attack (the recordings have silence before it), keeps it until it falls to −60 dB and fades
it there, otherwise bit for bit. One layer a note, so velocity sets its level, the loudest at −17 dB at
velocity 127 (less where an attack would peak over the limit). Low brass measures quiet by the loudness HO[LO] levels with, so the bass trombone sits a few dB
lower; raise its fader for weight.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `iowa-brass` |
| Licence | Free to use without restriction (University of Iowa Electronic Music Studios) |
| Credit | University of Iowa Musical Instrument Samples (Electronic Music Studios, University of Iowa): free to use for any project, without restriction. |
| Size | 170 MB on disk, 212 sample files |
| Instruments | 6 |
| Install | the studio's Library, **More packs → University of Iowa MIS: Brass**, or `pnpm packs install iowa-brass` |

## Where its files come from

Made from 212 recordings, fetched from <https://theremin.music.uiowa.edu/sound%2520files/MIS%2520Pitches%2520-%25202014/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| French Horn | `iowa-brass/horn` | Brass | A#1–F5 | 1 | 1 |  |
| Trumpet | `iowa-brass/trumpet` | Brass | E3–D6 | 1 | 1 |  |
| Trumpet (No Vibrato) | `iowa-brass/trumpet_novib` | Brass | E3–D#6 | 1 | 1 |  |
| Tenor Trombone | `iowa-brass/trombone` | Brass | E2–C5 | 1 | 1 |  |
| Bass Trombone | `iowa-brass/bass-trombone` | Brass | C#1–D#3 | 1 | 1 |  |
| Tuba | `iowa-brass/tuba` | Brass | C1–C4 | 1 | 1 |  |
