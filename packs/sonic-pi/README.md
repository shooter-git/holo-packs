# Sonic Pi Samples

The samples [Sonic Pi](https://github.com/sonic-pi-net/sonic-pi) ships, all CC0: Freesound users'
recordings, each one's source listed in Sonic Pi's [samples README](https://github.com/sonic-pi-net/sonic-pi/blob/d1393a06266f74dc216bfd8a7e9a8eb7135b4941/etc/samples/README.md),
and beats donated by Arovane (Uwe Zahn). On pads by family: kicks, snares and snaps, hi-hats and
cymbals, toms and hits, blips and glitches, impacts and vinyl, ambient textures, loops, and bass hits
with a few guitar sounds.

**Left out:**
- The two Amen loops, which are cut from a commercial record.
- The "breakbeat" loop, whose origin can't be shown.
- The kick named after a drum machine.
- The tabla strokes, which are in the [tabla](../tabla/) pack.

**Levels:** each family is measured as a whole (its sounds' balance as made), the loudest at −17 dB at
velocity 127 (less where a hit would peak over −1 dB). Each sound is kept until it falls to −60 dB.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `sonic-pi` |
| Licence | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Credit | The samples Sonic Pi ships (CC0): Freesound users' recordings, each listed in Sonic Pi's samples README, and beats by Arovane (Uwe Zahn). |
| Size | 91 MB on disk, 176 sample files |
| Instruments | 9 |
| Install | the studio's Library, **More packs → Sonic Pi Samples**, or `pnpm packs install sonic-pi` |

## Where its files come from

Made from 176 recordings, fetched from [sonic-pi-net/sonic-pi](https://github.com/sonic-pi-net/sonic-pi/tree/d1393a06266f74dc216bfd8a7e9a8eb7135b4941) at `d1393a0`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Kicks | `sonic-pi/kicks` | Percussion | 19 pads | 1 | 1 |  |
| Snares and Snaps | `sonic-pi/snares` | Percussion | 14 pads | 1 | 1 |  |
| Hi-hats and Cymbals | `sonic-pi/hats` | Percussion | 31 pads | 1 | 1 |  |
| Toms and Hits | `sonic-pi/toms` | Percussion | 17 pads | 1 | 1 |  |
| Blips and Glitches | `sonic-pi/electronic` | Other | 29 pads | 1 | 1 |  |
| Impacts and Vinyl | `sonic-pi/fx` | Other | 15 pads | 1 | 1 |  |
| Ambient Textures | `sonic-pi/textures` | Other | 18 pads | 1 | 1 |  |
| Loops | `sonic-pi/loops` | Other | 19 pads | 1 | 1 |  |
| Bass Hits and Guitar | `sonic-pi/bass` | Other | 14 pads | 1 | 1 |  |

## Kicks's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Ada |
| 37 | C#2 | Boom |
| 38 | D2 | Chip |
| 39 | D#2 | Fat |
| 40 | E2 | Gas |
| 41 | F2 | Haus |
| 42 | F#2 | Jazz |
| 43 | G2 | Klub |
| 44 | G#2 | Mehackit |
| 45 | A2 | Pure |
| 46 | A#2 | Sone |
| 47 | B2 | Tek |
| 48 | C3 | Zome |
| 49 | C#3 | Zum |
| 50 | D3 | Bass hard |
| 51 | D#3 | Bass soft |
| 52 | E3 | Heavy kick |
| 53 | F3 | Hollow kick |
| 54 | F#3 | Soft kick |

## Snares and Snaps's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Dub |
| 37 | C#2 | Dolf |
| 38 | D2 | Generic |
| 39 | D#2 | Zome |
| 40 | E2 | Snare hard |
| 41 | F2 | Snare soft |
| 42 | F#2 | Roll |
| 43 | G2 | Snare |
| 44 | G#2 | Hi snare |
| 45 | A2 | Mid snare |
| 46 | A#2 | Lo snare |
| 47 | B2 | Filt snare |
| 48 | C3 | Snap |
| 49 | C#3 | Snap2 |

## Hi-hats and Cymbals's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Bdu |
| 37 | C#2 | Cab |
| 38 | D2 | Cats |
| 39 | D#2 | Gem |
| 40 | E2 | Gnu |
| 41 | F2 | Gump |
| 42 | F#2 | Hier |
| 43 | G2 | Len |
| 44 | G#2 | Mess |
| 45 | A2 | Metal |
| 46 | A#2 | Noiz |
| 47 | B2 | Psych |
| 48 | C3 | Raw |
| 49 | C#3 | Sci |
| 50 | D3 | Snap |
| 51 | D#3 | Star |
| 52 | E3 | Tap |
| 53 | F3 | Yosh |
| 54 | F#3 | Zan |
| 55 | G3 | Zap |
| 56 | G#3 | Zild |
| 57 | A3 | Cymbal closed |
| 58 | A#3 | Cymbal pedal |
| 59 | B3 | Cymbal open |
| 60 | C4 | Cymbal soft |
| 61 | C#4 | Cymbal hard |
| 62 | D4 | Splash soft |
| 63 | D#4 | Splash hard |
| 64 | E4 | Tri |
| 65 | F4 | Via |
| 66 | F#4 | Cymbal |

## Toms and Hits's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Tom lo soft |
| 37 | C#2 | Tom lo hard |
| 38 | D2 | Tom mid soft |
| 39 | D#2 | Tom mid hard |
| 40 | E2 | Tom hi soft |
| 41 | F2 | Tom hi hard |
| 42 | F#2 | Cowbell |
| 43 | G2 | Fuzz tom |
| 44 | G#2 | Wood |
| 45 | A2 | Tick |
| 46 | A#2 | Triangle |
| 47 | B2 | Pop |
| 48 | C3 | Bong |
| 49 | C#3 | Perc tap 1 |
| 50 | D3 | Perc tap 2 |
| 51 | D#3 | Perc hat |
| 52 | E3 | Perc blip |

## Blips and Glitches's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Beep |
| 37 | C#2 | Bell |
| 38 | D2 | Blip |
| 39 | D#2 | Blip2 |
| 40 | E2 | Blup |
| 41 | F2 | Chime |
| 42 | F#2 | Flip |
| 43 | G2 | Ping |
| 44 | G#2 | Plip |
| 45 | A2 | Twang |
| 46 | A#2 | Twip |
| 47 | B2 | Glitch perc1 |
| 48 | C3 | Glitch perc2 |
| 49 | C#3 | Glitch perc3 |
| 50 | D3 | Glitch perc4 |
| 51 | D#3 | Glitch perc5 |
| 52 | E3 | Glitch robot1 |
| 53 | F3 | Glitch robot2 |
| 54 | F#3 | Mehackit phone1 |
| 55 | G3 | Mehackit phone2 |
| 56 | G#3 | Mehackit phone3 |
| 57 | A3 | Mehackit phone4 |
| 58 | A#3 | Mehackit robot1 |
| 59 | B3 | Mehackit robot2 |
| 60 | C4 | Mehackit robot3 |
| 61 | C#4 | Mehackit robot4 |
| 62 | D4 | Mehackit robot5 |
| 63 | D#4 | Mehackit robot6 |
| 64 | E4 | Mehackit robot7 |

## Impacts and Vinyl's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Bell |
| 37 | C#2 | Bell2 |
| 38 | D2 | Door |
| 39 | D#2 | Impact1 |
| 40 | E2 | Impact2 |
| 41 | F2 | Swash |
| 42 | F#2 | Swoosh |
| 43 | G2 | Till |
| 44 | G#2 | Burp |
| 45 | A2 | Cineboom |
| 46 | A#2 | Crow |
| 47 | B2 | Backspin |
| 48 | C3 | Hiss |
| 49 | C#3 | Rewind |
| 50 | D3 | Scratch |

## Ambient Textures's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Choir |
| 37 | C#2 | Dark woosh |
| 38 | D2 | Drone |
| 39 | D#2 | Glass hum |
| 40 | E2 | Glass rub |
| 41 | F2 | Haunted hum |
| 42 | F#2 | Lunar land |
| 43 | G2 | Piano |
| 44 | G#2 | Sauna |
| 45 | A2 | Soft buzz |
| 46 | A#2 | Swoosh |
| 47 | B2 | Pad 1 |
| 48 | C3 | Pad 2 |
| 49 | C#3 | Pad 3 |
| 50 | D3 | Pad 4 |
| 51 | D#3 | Voctone |
| 52 | E3 | Highkey c4 |
| 53 | F3 | Fxbed loop |

## Loops's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | 3d printer |
| 37 | C#2 | Compus |
| 38 | D2 | Drone g 97 |
| 39 | D#2 | Electric |
| 40 | E2 | Garzul |
| 41 | F2 | Industrial |
| 42 | F#2 | Mehackit1 |
| 43 | G2 | Mehackit2 |
| 44 | G#2 | Mika |
| 45 | A2 | Perc1 |
| 46 | A#2 | Perc2 |
| 47 | B2 | Safari |
| 48 | C3 | Tabla |
| 49 | C#3 | Weirdo |
| 50 | D3 | Beat a |
| 51 | D#3 | Beat b |
| 52 | E3 | Beat c |
| 53 | F3 | Beat d |
| 54 | F#3 | Beat e |

## Bass Hits and Guitar's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Dnb f |
| 37 | C#2 | Drop c |
| 38 | D2 | Hard c |
| 39 | D#2 | Hit c |
| 40 | E2 | Thick c |
| 41 | F2 | Trance c |
| 42 | F#2 | Voxy c |
| 43 | G2 | Voxy hit c |
| 44 | G#2 | Woodsy c |
| 45 | A2 | Bass g |
| 46 | A#2 | E fifths |
| 47 | B2 | E slide |
| 48 | C3 | Em9 |
| 49 | C#3 | Harmonics |
