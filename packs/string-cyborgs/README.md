# Karoryfer String Cyborgs (Synth Voices)

Three synthesizer voices from [String Cyborgs](https://github.com/sfzinstruments/karoryfer.string-cyborgs)
by Karoryfer Lecolds (CC0), each recorded note by note and held on its loop:
- **Zinc**, a tone with a sub-octave running through it;
- **Blackheart**;
- **Ironface**, clean and distorted.

The library builds a synthesizer around them: unison voices, single-cycle variants and a noise
oscillator. Here each is its plain voice, and HO[LO]'s own effects do the rest.

**Tuning:** each key plays the note it sounds.
- The library maps Ironface an octave above its recordings.
- Zinc's tone carries a whole sub-octave series: from its A2 up, the sub-octave is as loud as the note
  it's named for, or louder. So each Zinc recording repeats an octave under its name, and here each
  plays an octave down.

**Levels:** each voice is measured, the loudest at −17 dB at velocity 127 (less where a note would
peak over −3 dB).

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `string-cyborgs` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | String Cyborgs by Karoryfer Lecolds (CC0): the synthesizer voices Zinc, Blackheart and Ironface. |
| Size | 31 MB on disk, 100 sample files |
| Instruments | 4 |
| Install | the studio's Library, **More packs → Karoryfer String Cyborgs (Synth Voices)**, or `pnpm packs install string-cyborgs` |

## Where its files come from

Made from 100 recordings, fetched from [sfzinstruments/karoryfer.string-cyborgs](https://github.com/sfzinstruments/karoryfer.string-cyborgs/tree/f2238b3e36ae64c6383356221dc89c9c476c7b11) at `f2238b3`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Zinc | `string-cyborgs/zinc` | Other | A0–A4 | 1 | 1 | looped sustains |
| Blackheart | `string-cyborgs/blackheart` | Other | C2–C6 | 1 | 1 | looped sustains |
| Ironface | `string-cyborgs/ironface` | Other | A0–A4 | 1 | 1 | looped sustains |
| Ironface (Distorted) | `string-cyborgs/ironface-distorted` | Other | A0–A4 | 1 | 1 | looped sustains |
