# Six-Op Colors

A palette of HO[LO] Desk's six-operator FM synth, every one of its sounds made ready to play: two
electric pianos and glassy keys, long bells and a music box, two basses, two pads, two leads and two
plucks. Each is fitted as it would be on a mixing desk: a studio EQ to fit it, a character
compressor on the basses, the leads, **Bright Tines** and **Spark Pluck**, an echo in time with the
song where one helps, and a room of its own where one suits it. The pianos, the music box, the leads
and **Spark Pluck** share a bright plate; **Glass Keys**, **Crystal Bells**, the pads and **Harp
Pluck** a wide hall; the basses stay dry.

**Playing it:**
- **Bright Tines** and **Velvet Tines** are one kind of piano at two temperatures: dig into
  **Bright Tines** for its growl, and lean on **Velvet Tines** for soft chords under a voice.
- The echoes on **Crystal Bells**, **Wire Lead** and **Spark Pluck** follow the song's tempo, so set
  the tempo first. Put the Arpeggiator in front of **Spark Pluck** and its dotted echo fills in the
  sixteenths.
- **Solid Bass** for a steady, round low end, **Rubber Bass** when the bass should bounce.
- **Silk Pad** swells slowly: play its chords a little early. **Halo Pad** moves on its own, so hold it.
- Every sound keeps the synth's six knobs: Brightness and Decay are where to start when a sound is
  nearly right.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `six-op-colors` |
| Palette | The six-operator FM synth made ready to play: two tine pianos and glass keys, bells and a music box, two basses, two pads, two leads and two plucks, each fitted with studio EQ, compression, echoes and rooms. |
| Sounds | 13 |
| Plays | HO[LO] Desk's built-in synths |
| License | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | Sounds put together for HO[LO] (CC0): HO[LO] Desk's built-in synths and effects. |
| Install | Nothing to download for the palette itself. In the studio's Library, **Palettes → Six-Op Colors**: a click on a sound installs the packs it plays, then adds it as a track. `pnpm packs install six-op-colors` installs every pack it plays. |

## Sounds

Each sound is a track ready to play: its instrument, its effects, the room it sends to and its level.
Levels are measured with `node tools/levels.mjs`: the same phrase from every sound measures −20 LUFS
(pads and textures −23), unless its peak would pass −4 dBFS. A sound marked *coming* waits for a
synth, an effect or a pack that HO[LO] Desk or this repository doesn't have yet; the Library shows it
grayed out until then.

### Keys

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Bright Tines | Bright Tines synth | Studio EQ, Character Compressor | Tine Plate, −18 dB | +1.5 dB | A bright electric piano: the tine rings out on the attack and growls when hit hard, evened out by a slow optical compressor, the low mids cleared so chords stay open. |
| Velvet Tines | Velvet Tines synth | Studio EQ, Room Reverb | Tine Plate, −20 dB | −0.5 dB | The mellow electric piano, round and soft with a gentle tremolo, in a close studio room, a little presence lifted so it holds its own beside a voice. |
| Glass Keys | Glass Keys synth | Studio EQ | Silk Hall, −16 dB | 0 dB | Glassy keys, bell-like overtones over a sine body held while the key is down, the low mids eased, in a wide hall: for slow chords. |

### Plucked

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Harp Pluck | Harp Pluck synth | Studio EQ, Room Reverb | Silk Hall, −20 dB | 0 dB | A soft, round pluck like a harp, its brightness falling away at once while the note rings on, given a body by a chamber, then the hall. |
| Spark Pluck | Spark Pluck synth | Studio EQ, Character Compressor, Dual Delay | Tine Plate, −20 dB | +4.5 dB | A bright, short pluck for arpeggios and sequences, its attack tightened by a quick compressor, its echo a dotted eighth that crosses from left to right and fills in the sixteenths. |

### Mallets and bells

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Crystal Bells | Crystal Bells synth | Studio EQ, Dual Delay | Silk Hall, −16 dB | +1.5 dB | Long, clear bells over a low hum, echoing in time, a dotted quarter on the left and a half note on the right, each repeat darker, into a wide hall. |
| Music Box | Music Box synth | Studio EQ, Room Reverb | Tine Plate, −20 dB | +2 dB | A small music box on a wooden table: short bright tines, the high ones ringing shorter, with their own soft echo and the small room around them. |

### Bass

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Solid Bass | Solid Bass synth | Studio EQ, Character Compressor | dry | −2 dB | A punchy FM bass, a snap on the attack over a round, solid tone, held steady by a compressor whose rounded peaks add a little edge for small speakers. Dry. |
| Rubber Bass | Rubber Bass synth | Studio EQ, Character Compressor | dry | −3.5 dB | A bouncy bass whose two filters snap open on every note, an optical compressor evening out the notes and leaving the snap. Dry. |

### Synths

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Wire Lead | Wire Lead synth | Studio EQ, Character Compressor, Dual Delay | Tine Plate, −18 dB | −1 dB | A bright, buzzy lead held forward by a fast compressor, echoing in time, a dotted eighth on the left and a quarter on the right; the mod wheel adds vibrato. |
| Hollow Lead | Hollow Lead synth | Studio EQ, Character Compressor, Room Reverb | Tine Plate, −24 dB | −2.5 dB | A hollow, reedy lead whose vibrato arrives once the note settles, smoothed by an optical compressor and played in a chamber. |

### Pads

| Sound | Plays | Through | Room | Level | |
|---|---|---|---|---|---|
| Silk Pad | Silk Pad synth | Studio EQ, Smooth Hall | Silk Hall, −22 dB | −4.5 dB | A slow, wide pad swelling through a drifting filter, with a long, soft hall of its own: chords to hold under everything. |
| Halo Pad | Halo Pad synth | Studio EQ | Silk Hall, −16 dB | −5 dB | An airy pad whose overtones rise and fall on their own while it is held, with its long echoes, cleared below so it floats above a bass. |
