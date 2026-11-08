# Karoryfer Black And Blue Basses

Two 5-string bass guitars (B E A D G), [Black And Blue Basses](https://github.com/sfzinstruments/karoryfer.black-and-blue-basses)
by Karoryfer Lecolds (CC0):
- **Finger Bass:** a black bass played with the fingers on its neck pickup. Its plucks come in four
  dynamics, two takes of each in turn, alongside its staccato and its ghost notes (four takes each).
- **Pick Bass:** a light blue bass played with a pick on its bridge pickup. It has two dynamics, four
  takes of each. Its notes go down to E, under the low B, from its B string shifted down.

They play as the library's programs do with their controls at rest: poly, no unison voices, no release
noises (the library starts with them off). Its behind-the-bridge sounds are left out.

**How it's made:** each note is kept until it falls to −60 dB (4 s at most; staccato 2 s, ghost notes
1.5 s), written as a 16-bit WAV. The library has more takes than these: four of each finger pluck and
eight of the loud pick. A few takes in turn keep repeated notes alive, and each instrument still loads
in about the memory HO[LO]'s other basses take.

**Tuning:** the library maps each bass an octave above where it sounds, the way bass is written. Here
each key plays the note it names, the low B (31 Hz) on B0.

**Levels:** the dynamics are measured and set where one velocity curve meets them, the loudest at
−17 dB at velocity 127.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `black-blue-basses` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Black And Blue Basses by Karoryfer Lecolds (CC0): two 5-string bass guitars, one played with the fingers, one with a pick. |
| Size | 292 MB on disk, 1224 sample files |
| Instruments | 4 |
| Install | the studio's Library, **More packs → Karoryfer Black And Blue Basses**, or `pnpm packs install black-blue-basses` |

## Where its files come from

Made from 1224 recordings, fetched from [sfzinstruments/karoryfer.black-and-blue-basses](https://github.com/sfzinstruments/karoryfer.black-and-blue-basses/tree/6e7d674cdb41be7a54dbccb15472401ad01099b9) at `6e7d674`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Finger Bass (5-string) | `black-blue-basses/finger` | Bass | B0–E4 | 4 | 2 |  |
| Finger Bass (Staccato) | `black-blue-basses/finger-staccato` | Bass | B0–E4 | 1 | 4 |  |
| Finger Bass (Ghost Notes) | `black-blue-basses/finger-ghost` | Bass | B0–E4 | 2 | 4 |  |
| Pick Bass (5-string) | `black-blue-basses/pick` | Bass | E0–D#4 | 2 | 8 |  |
