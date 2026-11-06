# Steinway Model D (bitKlavier Grand)

A concert grand: a new Steinway Model D recorded in Taplin Auditorium, Princeton University, in 2021 by
the bitKlavier team (Matthew Wang, Andrés Villalta, Jeffrey Gordon, Katie Chou, Christien Ayers and
Daniel Trueman) and published as the *bitKlavier Grand Sample Library* under CC BY 4.0
([doi:10.34770/csaa-6a71](https://doi.org/10.34770/csaa-6a71),
[doi:10.34770/r75s-9j74](https://doi.org/10.34770/r75s-9j74)).

bitKlavier recorded it from nine microphone positions:
- 16 velocity layers every minor third from A0;
- the hammers coming back (a sample a key);
- the strings ringing off as the dampers fall (three layers every minor third);
- the sustain pedal.

This pack takes two of those positions:

- **Stage Lid ORTF** (*Steinway D Grand*): a balanced image of the whole instrument with a little of
  the hall. *Steinway D Grand, Light* plays the same files with half the layers and shorter tails (cut
  as they load), for a device that holds less.
- **Piano Bar** (*Steinway D Grand, Close*): microphones inside the piano. Close, a player's
  perspective, no room.

Its notes ring for up to 74 seconds. Each is kept until it falls to −58 dB, with a fade over its last
second or so and 20 s at most, which is what a device has to hold. Nothing else changes: the files are
the library's 44.1 kHz 16-bit release, bit for bit, up to the fade.

**Levels:**
- bitKlavier recorded and balanced the layers to divide the piano's dynamic range evenly.
- Here each layer is measured (its loudness, as BS.1770 weighs it) and set where HO[LO]'s velocity
  curve meets it. A key played harder gets louder smoothly and changes timbre at each layer, as the
  piano does.
- Every position plays its loudest layer at the same level: the stage pair's, 4 dB down, so a chord
  played hard under the pedal stays under full scale.

**Attribution:** CC BY 4.0 asks that the authors be credited wherever the sound is used. HO[LO] shows
the credit in its Library, and an experience's pinned `packs.json` carries it.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `steinway` |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Credit | bitKlavier Grand Sample Library by Matthew Wang, Andrés Villalta, Jeffrey Gordon, Katie Chou, Christien Ayers and Daniel Trueman, Princeton University (CC BY 4.0, doi:10.34770/csaa-6a71 and doi:10.34770/r75s-9j74): a Steinway D recorded in Taplin Auditorium in 2021. Trimmed for HO[LO]: each note ends where it falls to -58 dB. |
| Size | 1.2 GB on disk, 1324 sample files |
| Instruments | 3 |
| Install | the studio's Library, **More packs → Steinway Model D (bitKlavier Grand)**, or `pnpm packs install steinway` |

## Where its files come from

Made from 1324 recordings, fetched from <https://g-ef94ef.f0ad1.36fe.data.globus.org/10.34770/csaa-6a71/403/bitKlavierGrand_StageLidORTF_44k16b/> and <https://g-ef94ef.f0ad1.36fe.data.globus.org/10.34770/r75s-9j74/36/bitKlavierGrand_PianoBar_44k16b/>. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Steinway D Grand | `steinway/grand` | Pianos and keys | A0–C8 | 16 | 1 | release samples, undamped from F#6 |
| Steinway D Grand, Light | `steinway/grand-light` | Pianos and keys | A0–C8 | 8 | 1 | release samples, undamped from F#6 |
| Steinway D Grand, Close | `steinway/grand-close` | Pianos and keys | A0–C8 | 16 | 1 | release samples, undamped from F#6 |
