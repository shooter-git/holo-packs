# Neon Elegy

A palette for cinematic synth-pop: a heavy low end that stays clean, an eighties backbeat and a lead
that soars. It was voiced for a song whose chorus is a stacked harmony on one held note, so every sound
here leaves the voice's range (about 1.5 to 3 kHz) a little room.

**Playing it:**
- **Round Octave Bass** wants octaves: the root and the note an octave up together. Under **Clean 808
  Boom**, tune the boom to the song's key and let the bass carry the harmony.
- **Gated Room Clap** belongs on the backbeat: its tail is cut short on purpose, so it stays big
  without washing over the next beat.
- **Soaring Saw Lead** is for a few long notes high above a chorus; it glides between them.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `neon-elegy` |
| Palette | Cinematic synth-pop: a round octave bass, a clean 808 boom, a gated-room clap and a soaring saw lead, voiced to sit together under a voice. |
| Sounds | 4 |
| Plays | [FreePats Synthesizer Percussion](../freepats-synth-percussion/), HO[LO] Desk's built-in synths |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects, and FreePats Synthesizer Percussion by the FreePats project (CC0). Each pack keeps its own license and credit. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Neon Elegy**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install neon-elegy` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
greyed out until then.

### Drums and percussion

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Clean 808 Boom | Analog Machine synth | Transient Softener, Channel EQ | dry | −4.5 dB | The drum machine with its kick turned into a pure, round boom near 49 Hz: the click and the overtones that crowd a bass taken out, so it hits hard without pushing the master into its limiter. |
| Gated Room Clap | [Synth Percussion Kit](../freepats-synth-percussion/) | Transient Softener, Channel EQ, Space Designer | dry | 0 dB | A big, dense room that is gone a moment after each hit, the eighties way: loud for a tenth of a second, quiet by the next sixteenth. The clap and snare keys (39, 38) suit it; keep it to the backbeat. |

### Bass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Round Octave Bass | FM Bass synth | Channel EQ | dry | −4 dB | Play it in octaves: a clean fundamental under a soft upper voice, all weight and no buzz, with just enough edge to carry on small speakers. |

### Synths

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Soaring Saw Lead | Fat Mono synth | Chorus, Tape Delay, Channel EQ | Night Hall, −9 dB | −6 dB | A gliding saw line for long notes high above a chorus: chorused, echoing in dotted eighths side to side, into a wide hall. |
