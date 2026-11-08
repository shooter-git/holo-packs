# University of Iowa MIS: Woodwinds

The University of Iowa Electronic Music Studios' [Musical Instrument Samples](https://theremin.music.uiowa.edu/MIS.html),
free to use for any project without restriction: its newer single-note recordings (the 2012 pages,
published as *MIS Pitches - 2014*), every note recorded on its own, fortissimo, in stereo.

Flute (with and without vibrato), alto flute, bass flute, oboe, E♭ clarinet, bass clarinet, and soprano
and alto saxophones (with and without vibrato). The B♭ clarinet and bassoon, cut from the older
recordings in three dynamics, are in the [iowa](../iowa/) pack.

**How it's made:** HO[LO] fetches each note's AIFF from the university's own site, starts it just
before its attack (the recordings have silence before it), keeps it until it falls to −60 dB and fades
it there, otherwise bit for bit. One layer a note, so velocity sets its level, the loudest at −17 dB at
velocity 127 (less where an attack would peak over the limit).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `iowa-winds` |
| Licence | Free to use without restriction (University of Iowa Electronic Music Studios) |
| Credit | University of Iowa Musical Instrument Samples (Electronic Music Studios, University of Iowa): free to use for any project, without restriction. |
| Size | 281 MB on disk, 399 sample files |
| Instruments | 11 |
| Install | the studio's Library, **More packs → University of Iowa MIS: Woodwinds**, or `pnpm packs install iowa-winds` |

## Where its files come from

Made from 399 recordings, fetched from <https://theremin.music.uiowa.edu/sound%2520files/MIS%2520Pitches%2520-%25202014/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Flute | `iowa-winds/flute` | Woodwinds | B3–C#7 | 1 | 1 |  |
| Flute (No Vibrato) | `iowa-winds/flute_nonvib` | Woodwinds | B3–C#7 | 1 | 1 |  |
| Alto Flute | `iowa-winds/alto-flute` | Woodwinds | G3–G6 | 1 | 1 |  |
| Bass Flute | `iowa-winds/bass-flute` | Woodwinds | C3–C#6 | 1 | 1 |  |
| Oboe | `iowa-winds/oboe` | Woodwinds | A#3–G#6 | 1 | 1 |  |
| E♭ Clarinet | `iowa-winds/eb-clarinet` | Woodwinds | G3–A6 | 1 | 1 |  |
| Bass Clarinet | `iowa-winds/bass-clarinet` | Woodwinds | C#2–A#5 | 1 | 1 |  |
| Soprano Sax | `iowa-winds/soprano-sax` | Woodwinds | G#3–E6 | 1 | 1 |  |
| Soprano Sax (No Vibrato) | `iowa-winds/soprano-sax_nonvib` | Woodwinds | G#3–E6 | 1 | 1 |  |
| Alto Sax | `iowa-winds/alto-sax` | Woodwinds | C#3–G#5 | 1 | 1 |  |
| Alto Sax (No Vibrato) | `iowa-winds/alto-sax_nonvib` | Woodwinds | C#3–G#5 | 1 | 1 |  |
