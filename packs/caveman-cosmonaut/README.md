# Karoryfer Caveman Cosmonaut (Transistor Organ)

The voices of an Unitra B-11 transistor organ: [Caveman Cosmonaut](https://github.com/sfzinstruments/karoryfer.caveman-cosmonaut)
by Karoryfer Lecolds (CC0). The library builds a synthesizer around them; here they're the organ's own
voices: flutes, clarinet, trombone, trumpet, violin, tremolo and an 8' bass, every note held on its
loop.

**How it's made:** each voice sounds at its own footage, so the library maps most of them an octave
under where they sound and the bass an octave over. Here each key plays the note it names (each shift
measured, voice by voice). Each voice is measured, the loudest at −17 dB at velocity 127.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `caveman-cosmonaut` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Caveman Cosmonaut by Karoryfer Lecolds (CC0): the voices of an Unitra B-11 transistor organ. |
| Size | 79 MB on disk, 271 sample files |
| Instruments | 7 |
| Install | the studio's Library, **More packs → Karoryfer Caveman Cosmonaut (Transistor Organ)**, or `pnpm packs install caveman-cosmonaut` |

## Where its files come from

Made from 271 recordings, fetched from [sfzinstruments/karoryfer.caveman-cosmonaut](https://github.com/sfzinstruments/karoryfer.caveman-cosmonaut/tree/9de9bcfcbc6d2b20bea5c1116cd07a310febc339) at `9de9bcf`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Transistor Organ Flutes | `caveman-cosmonaut/flutes` | Pianos and keys | G3–C7 | 1 | 1 | looped sustains |
| Transistor Organ Clarinet | `caveman-cosmonaut/clarinet` | Pianos and keys | G3–C7 | 1 | 1 | looped sustains |
| Transistor Organ Trombone | `caveman-cosmonaut/trombone` | Pianos and keys | G2–C6 | 1 | 1 | looped sustains |
| Transistor Organ Trumpet | `caveman-cosmonaut/trumpet` | Pianos and keys | G3–C7 | 1 | 1 | looped sustains |
| Transistor Organ Violin | `caveman-cosmonaut/violin` | Pianos and keys | G3–C7 | 1 | 1 | looped sustains |
| Transistor Organ Tremolo | `caveman-cosmonaut/tremolo` | Pianos and keys | G3–C7 | 1 | 1 | looped sustains |
| Transistor Organ Bass 8' | `caveman-cosmonaut/bass` | Bass | C1–F#2 | 1 | 2 | looped sustains |
