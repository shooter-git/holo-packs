# VSCO 2 Community Edition

A free orchestra: Versilian Studios' [VSCO 2 Community Edition](https://github.com/sgossner/VSCO-2-CE)
(CC0), by Sam Gossner and contributors. The pipe organ is by Simon Dalzell.

- **Strings:** violins, violas, cellos and contrabasses as sections, sustained, pizzicato and spiccato,
  and tremolo for all but the basses. Also a solo violin and a harp.
- **Woodwinds:** flute (with and without vibrato), oboe, clarinet and bassoon, sustained and staccato.
- **Brass:** French horns (open and muted), trombones (with vibrato too) and tuba, sustained and
  staccato.
- **Percussion:**
  - timpani (hits and rolls);
  - a concert bass drum, snare (sticks and brushes), suspended cymbals and cymbal swells;
  - triangle, sleigh bells, a bell tree;
  - congas and tumba;
  - glockenspiel and marimba.
- **Keys:** an upright piano, and a pipe organ (full and soft, with its pedals).

HO[LO] plays the library's own recordings as they're published. Its map comes from measurements of
every sample: true pitch, level, start, end and loop points (from
[Hallowed Lanterns](https://github.com/shooter-git/hallowed-lanterns)' sample catalogues). Sustained
notes loop where they were measured to.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `vsco2` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Using VSCO 2 Community Edition orchestral samples (CC0, Versilian Studios: Sam Gossner and contributors; the pipe organ by Simon Dalzell). |
| Size | 1.5 GB on disk, 1466 sample files |
| Instruments | 57 |
| Install | the studio's Library, **More packs → VSCO 2 Community Edition**, or `pnpm packs install vsco2` |

## Where its files come from

Taken as published from [sgossner/VSCO-2-CE](https://github.com/sgossner/VSCO-2-CE) at commit [`4403009`](https://github.com/sgossner/VSCO-2-CE/tree/440300901dfe9275fd84e0b7763af1f8443ae62e): an install checks out only the files this map plays.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| French Horns | `vsco2/horns` | Brass | A1–F5 | 4 | 1 | looped sustains |
| French Horns Muted | `vsco2/horns_mute` | Brass | A#2–F5 | 3 | 1 | looped sustains |
| French Horns Staccato | `vsco2/horns_stac` | Brass | A1–F5 | 3 | 2 |  |
| Trombones | `vsco2/trombones` | Brass | A#1–F4 | 3 | 1 | looped sustains |
| Trombones Staccato | `vsco2/trombones_stac` | Brass | A#1–F4 | 4 | 2 |  |
| Trombones Vibrato | `vsco2/trombones_vib` | Brass | F2–D#4 | 1 | 2 | looped sustains |
| Tuba | `vsco2/tuba` | Brass | F1–D4 | 3 | 1 | looped sustains |
| Tuba Staccato | `vsco2/tuba_stac` | Brass | A#1–D4 | 2 | 4 |  |
| Organ | `vsco2/organ` | Pianos and keys | C2–C7 | 1 | 1 | looped sustains |
| Organ (Soft) | `vsco2/organ_soft` | Pianos and keys | C2–C7 | 1 | 1 | looped sustains |
| Organ Pedal | `vsco2/organ_pedal` | Pianos and keys | C1–F#3 | 1 | 1 | looped sustains |
| Organ Pedal (Soft) | `vsco2/organ_soft_pedal` | Pianos and keys | C2–F#4 | 1 | 1 | looped sustains |
| Upright Piano | `vsco2/piano` | Pianos and keys | C1–G7 | 3 | 2 |  |
| Bell Tree | `vsco2/belltree` | Percussion | one sound | 1 | 4 |  |
| Concert Bass Drum | `vsco2/bass_drum` | Percussion | one sound | 7 | 2 |  |
| Conga | `vsco2/conga` | Percussion | one sound | 3 | 2 |  |
| Cymbal Bell | `vsco2/cymbal_bell` | Percussion | one sound | 1 | 2 |  |
| Cymbal Swell (Long) | `vsco2/cymbal_swell_long` | Percussion | one sound | 1 | 1 |  |
| Cymbal Swell (Medium) | `vsco2/cymbal_swell_mid` | Percussion | one sound | 1 | 1 |  |
| Cymbal Swell (Short) | `vsco2/cymbal_swell_short` | Percussion | one sound | 1 | 1 |  |
| Glockenspiel | `vsco2/glock` | Tuned percussion | G5–G7 | 1 | 1 |  |
| Marimba | `vsco2/marimba` | Tuned percussion | F2–C7 | 1 | 1 |  |
| Sleigh Bells | `vsco2/sleighbells` | Percussion | one sound | 1 | 2 |  |
| Snare | `vsco2/snare` | Percussion | one sound | 5 | 2 |  |
| Snare (Brushes) | `vsco2/snare_tap` | Percussion | one sound | 4 | 2 |  |
| Suspended Cymbal (Mallet) | `vsco2/cymbal_mallet` | Percussion | one sound | 1 | 4 |  |
| Suspended Cymbal (Stick) | `vsco2/cymbal_stick` | Percussion | one sound | 1 | 4 |  |
| Timpani | `vsco2/timpani` | Tuned percussion | F2–G3 | 3 | 2 |  |
| Timpani Roll | `vsco2/timpani_roll` | Tuned percussion | F#2–F3 | 2 | 1 | looped sustains |
| Triangle | `vsco2/triangle` | Percussion | one sound | 2 | 6 |  |
| Tumba | `vsco2/tumba` | Percussion | one sound | 3 | 2 |  |
| Cellos | `vsco2/cellos` | Strings | C2–F5 | 2 | 2 | looped sustains |
| Cellos Pizzicato | `vsco2/cellos_pizz` | Strings | C2–F5 | 2 | 2 |  |
| Cellos Spiccato | `vsco2/cellos_spic` | Strings | C2–F5 | 2 | 2 |  |
| Cellos Tremolo | `vsco2/cellos_trem` | Strings | C2–F5 | 2 | 1 | looped sustains |
| Contrabass | `vsco2/basses` | Strings | E1–B3 | 2 | 1 | looped sustains |
| Contrabass Pizzicato | `vsco2/basses_pizz` | Strings | E1–B3 | 2 | 2 |  |
| Contrabass Spiccato | `vsco2/basses_spic` | Strings | E1–B3 | 2 | 2 |  |
| Harp | `vsco2/harp` | Strings | E1–F7 | 1 | 1 |  |
| Solo Violin | `vsco2/solo_violin` | Strings | G3–C7 | 2 | 1 | looped sustains |
| Violas | `vsco2/violas` | Strings | C3–D6 | 2 | 1 | looped sustains |
| Violas Pizzicato | `vsco2/violas_pizz` | Strings | C3–D6 | 2 | 2 |  |
| Violas Spiccato | `vsco2/violas_spic` | Strings | C3–D6 | 2 | 2 |  |
| Violas Tremolo | `vsco2/violas_trem` | Strings | C3–D6 | 2 | 1 | looped sustains |
| Violins | `vsco2/violins` | Strings | G3–D6 | 2 | 1 | looped sustains |
| Violins Pizzicato | `vsco2/violins_pizz` | Strings | G3–D6 | 2 | 2 |  |
| Violins Spiccato | `vsco2/violins_spic` | Strings | G3–D6 | 2 | 2 |  |
| Violins Tremolo | `vsco2/violins_trem` | Strings | G3–D6 | 2 | 1 | looped sustains |
| Bassoon | `vsco2/bassoon` | Woodwinds | A#1–D#5 | 2 | 1 | looped sustains |
| Bassoon Staccato | `vsco2/bassoon_stac` | Woodwinds | A#1–C5 | 2 | 2 |  |
| Clarinet | `vsco2/clarinet` | Woodwinds | D3–F#6 | 3 | 1 | looped sustains |
| Clarinet Staccato | `vsco2/clarinet_stac` | Woodwinds | D3–F6 | 3 | 2 |  |
| Flute | `vsco2/flute` | Woodwinds | C4–C7 | 1 | 2 | looped sustains |
| Flute Non-vibrato | `vsco2/flute_nv` | Woodwinds | C4–C7 | 3 | 1 | looped sustains |
| Flute Staccato | `vsco2/flute_stac` | Woodwinds | A4–C7 | 4 | 2 |  |
| Oboe | `vsco2/oboe` | Woodwinds | A#3–F6 | 2 | 1 | looped sustains |
| Oboe Staccato | `vsco2/oboe_stac` | Woodwinds | A#3–F6 | 3 | 2 |  |
