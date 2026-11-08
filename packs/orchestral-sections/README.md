# Orchestral Sections (VSCO 2, Iowa, Karoryfer)

Orchestral sections made for HO[LO] by layering the free libraries' recordings of the same notes:
[VSCO 2 Community Edition](../vsco2/)'s section recordings (CC0), with the
[University of Iowa](../iowa-strings/)'s soloists (free to use without restriction) and Karoryfer's
[cello](../bigcat-cello/) and [tuba](../war-tuba/) (CC0) playing with them at their loudest. Nothing
of any commercial library is in them: each is a new mix of free recordings.

Eleven sections: violins, violas, cellos, basses, horns, trombones, tubas, flutes, oboes, clarinets
and bassoons.

**How each note is made:**
- It is made where VSCO 2 sampled it (its measured pitch).
- Each soloist's nearest note plays at the rate that brings it to that pitch: resampled by a windowed
  sinc whose arithmetic is the same on every computer.
- Each soloist starts where its attack meets the section's, 8 ms behind it (players never land
  together), 6 dB under the section, and placed where it sits in the orchestra (violins left, cellos and
  basses right, and so on).
- The softer layers are the section alone, so a section grows fuller and brighter as it's played
  harder.

**Levels:** the layers are measured and set where HO[LO]'s velocity curve meets them, the loudest at
−17 dB at velocity 127. Each note is kept until it falls to −60 dB (8 s at most) and faded there,
written as 16-bit WAVs.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `orchestral-sections` |
| Licence | Free to use without restriction (VSCO 2 and Karoryfer CC0; University of Iowa EMS) |
| Credit | Made for HO[LO] from VSCO 2 Community Edition (CC0, Versilian Studios), the University of Iowa Musical Instrument Samples (Electronic Music Studios, free to use without restriction), Karoryfer x bigcat cello and War Tuba (CC0, Karoryfer Lecolds and bigcat instruments). |
| Size | 361 MB on disk, 275 sample files |
| Instruments | 11 |
| Install | the studio's Library, **More packs → Orchestral Sections (VSCO 2, Iowa, Karoryfer)**, or `pnpm packs install orchestral-sections` |

## Where its files come from

Made from 407 recordings, fetched from [sgossner/VSCO-2-CE](https://github.com/sgossner/VSCO-2-CE/tree/440300901dfe9275fd84e0b7763af1f8443ae62e) at `4403009` and <https://theremin.music.uiowa.edu/sound%2520files/MIS%2520Pitches%2520-%25202014/> and [sfzinstruments/karoryfer-bigcat.cello](https://github.com/sfzinstruments/karoryfer-bigcat.cello/tree/6fd75fbfc1dbb3109bf26220ba1adea46188a18b) at `6fd75fb` and [sfzinstruments/karoryfer.war-tuba](https://github.com/sfzinstruments/karoryfer.war-tuba/tree/5b62dd6ef6b00281bb734769e44a63f5e013018a) at `5b62dd6`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Violins (Layered) | `orchestral-sections/violins` | Strings | G3–D6 | 2 | 1 |  |
| Violas (Layered) | `orchestral-sections/violas` | Strings | C3–D6 | 2 | 1 |  |
| Cellos (Layered) | `orchestral-sections/cellos` | Strings | C2–F5 | 2 | 2 |  |
| Basses (Layered) | `orchestral-sections/basses` | Strings | E1–B3 | 2 | 1 |  |
| Horns (Layered) | `orchestral-sections/horns` | Brass | A1–F5 | 4 | 1 |  |
| Trombones (Layered) | `orchestral-sections/trombones` | Brass | A#1–F4 | 3 | 1 |  |
| Tubas (Layered) | `orchestral-sections/tubas` | Brass | F1–D4 | 3 | 1 |  |
| Flutes (Layered) | `orchestral-sections/flutes` | Woodwinds | C4–C7 | 1 | 2 |  |
| Oboes (Layered) | `orchestral-sections/oboes` | Woodwinds | A#3–F6 | 2 | 1 |  |
| Clarinets (Layered) | `orchestral-sections/clarinets` | Woodwinds | D3–F#6 | 3 | 1 |  |
| Bassoons (Layered) | `orchestral-sections/bassoons` | Woodwinds | A#1–D#5 | 2 | 1 |  |
