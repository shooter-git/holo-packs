# Viennese Grand

A concert grand voiced in the Viennese manner: darker and rounder than a modern concert grand, with a
softer hammer, a singing rather than brilliant treble, fuller low-mids and a long, warm bloom in the
hall. It suits classical and romantic repertoire, and anything that should sound warm rather than
bright.

**How it's made:** it plays the [Steinway Model D](../steinway/) recordings (bitKlavier Grand), voiced
with HO[LO] Desk's own effects. No other piano's recordings are used.
- **Transient Softener:** the first milliseconds of each hammer strike pulled down against the body of
  the note, for a rounder attack.
- **Channel EQ:** +2 dB around 220 Hz for fuller low-mids, −2.5 dB around 3.2 kHz and a −3.5 dB shelf
  from 7 kHz for a darker, singing treble.
- **Warm Hall:** a concert hall with its highs damped (high cut at 6.5 kHz) and its decay lengthened
  by 15%.

**Coming:** **Viennese Grand, Resonant** adds String Resonance, the sympathetic ringing of undamped
strings, including extra bass strings below the lowest A, once HO[LO] Desk has that effect.

**Measured:** against the plain Steinway, the treble's spectral centroid is lower and the attack
softer, while the decay is the same (the voicing changes tone, not length). The numbers are in the
pull request that added this palette.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `viennese-grand` |
| Palette | A concert grand voiced darker and rounder: soft hammers, a singing treble, full low-mids and a warm hall. |
| Sounds | 3 (1 coming) |
| Plays | [Steinway Model D (bitKlavier Grand)](../steinway/) |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and the bitKlavier Grand (a Steinway D) by Princeton University (CC BY 4.0). Each pack keeps its own licence and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Viennese Grand**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install viennese-grand` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Keys

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Viennese Grand | [Steinway D Grand](../steinway/) | Transient Softener, Channel EQ | Warm Hall, −12 dB | +1.5 dB | The grand voiced darker and rounder, in a warm hall. |
| Viennese Grand, Close | [Steinway D Grand, Close](../steinway/) | Transient Softener, Channel EQ | Warm Hall, −18 dB | +6 dB | Close to the strings: more detail, the same round, singing voice. |
| Viennese Grand, Resonant *(coming)* | [Steinway D Grand](../steinway/) | Transient Softener, Channel EQ, String Resonance | Warm Hall, −12 dB | 0 dB | With sympathetic ringing from extra bass strings (coming with String Resonance). |
