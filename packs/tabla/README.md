# Tabla (OLPC, Sonic Pi)

Tabla strokes on pads, from two players:
- **Tabla**: ten bols (Dha, Dhin, Ge, Ke, Na, Re, Ta, Te, Tin, Tu) recorded by Mihir Sarkar for the One
  Laptop per Child sound library ([archive.org/details/MihirSarkar](https://archive.org/details/MihirSarkar),
  CC BY 3.0).
- **Tabla, Strokes**: twelve strokes by dio_333 from Freesound, as [Sonic Pi](https://github.com/sonic-pi-net/sonic-pi)
  ships them (CC0). The strokes with several takes (Tun, Te, Tas, Ke, Ghe) play them in turn.

**Provenance:** the OLPC bols carry their editor's markers and nothing else; Sonic Pi's README gives
each stroke's Freesound source.

**How it's made:** each set is measured as a whole, so its strokes keep their balance as recorded, the
loudest at −17 dB at velocity 127 (a little less where a stroke's crack would peak over −1 dB). Each is
kept until it falls to −60 dB.

**Attribution:** CC BY 3.0 asks that Mihir Sarkar be credited wherever the bols are used. HO[LO] shows
the credit in its Library, and an experience's pinned `packs.json` carries it.

<!-- Below here is written from pack.json by `node tools/readme.mjs`: change the map, not this. -->

## At a glance

| | |
|---|---|
| Id | `tabla` |
| Licence | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Credit | Tabla bols by Mihir Sarkar for the One Laptop per Child sound library (CC BY 3.0, archive.org/details/MihirSarkar), and dio_333's tabla strokes from Freesound as Sonic Pi ships them (CC0). |
| Size | 4 MB on disk, 36 sample files |
| Instruments | 2 |
| Install | the studio's Library, **More packs → Tabla (OLPC, Sonic Pi)**, or `pnpm packs install tabla` |

## Where its files come from

Made from 36 recordings, fetched from <https://archive.org/download/MihirSarkar/MihirSarkar44.zip/MihirSarkar44/> and [sonic-pi-net/sonic-pi](https://github.com/sonic-pi-net/sonic-pi/tree/d1393a06266f74dc216bfd8a7e9a8eb7135b4941) at `d1393a0`. Each file is made from its recordings by fixed arithmetic (a note trimmed and faded, a drum hit mixed from its microphones), the same in every install, so every install makes the same bytes, each checked against `files.sha256`. [`recipe.mjs`](recipe.mjs) wrote this map; run it again to make it anew.

## Instruments

| Instrument | Id | Family | Keys | Velocity layers | Round robins | Also |
|---|---|---|---|---|---|---|
| Tabla | `tabla/tabla` | Percussion | 10 pads | 1 | 1 |  |
| Tabla, Strokes | `tabla/tabla_strokes` | Percussion | 12 pads | 1 | 8 |  |

## Tabla's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Dha |
| 37 | C#2 | Dhin |
| 38 | D2 | Ge |
| 39 | D#2 | Ke |
| 40 | E2 | Na |
| 41 | F2 | Re |
| 42 | F#2 | Ta |
| 43 | G2 | Te |
| 44 | G#2 | Tin |
| 45 | A2 | Tu |

## Tabla, Strokes's pads

Each key plays one of its sounds.

| Key | Note | Pad |
|---|---|---|
| 36 | C2 | Na |
| 37 | C#2 | Na open |
| 38 | D2 | Na s |
| 39 | D#2 | Tun |
| 40 | E2 | Te |
| 41 | F2 | Te m |
| 42 | F#2 | Te ne |
| 43 | G2 | Re |
| 44 | G#2 | Tas |
| 45 | A2 | Ke |
| 46 | A#2 | Ghe |
| 47 | B2 | Dhec |
