# HO[LO] Packs

The free sample packs [HO[LO] Desk](https://github.com/shooter-git/holo-desk) plays: pianos, drum kits,
an orchestra, basses, guitars and more. Every one is free to use: CC0, CC BY 4.0, or free without
restriction.

**There's no audio in this repository.** Each pack here is a map: its instruments, where each sample
comes from (a git commit, published downloads, an archive, or recordings mixed into new files), and
every sample's sha256. When you install a pack, HO[LO] fetches the samples from their own source and
checks every file against these checksums. So everyone's copy is the same, bit for bit.

- **Find a pack:** browse by family under [Instruments](#instruments), or see [Every pack](#every-pack)
  at a glance. Each pack's page says where its sounds come from, what's in it, its licence, its size
  and its kit pads.
- **Install or remove one:** in the studio's Library, use **More packs → Install**, or **Remove** on
  an installed pack to free the disk it takes. On the command line, `pnpm packs install <id>` and
  `pnpm packs remove <id>` do the same.
- **Credits:** authors and sources are in [CREDITS.md](CREDITS.md).

## Instruments

Grouped by family. Each instrument's other ways of playing (pizzicato, staccato, muted, a lighter
version…) are listed with it, and every pack links to its own page.

<!-- catalog: written from the maps by `node tools/readme.mjs` -->

### Every pack

| Pack | Families | Instruments | Size | Licence |
|---|---|---|---|---|
| [FreePats Spanish Classical Guitar](packs/freepats-guitar/) | Guitars and plucked strings | 1 | 20 MB | CC0 1.0 |
| [Jazz Kit (Virtuosity Drums)](packs/jazz-kit/) | Drum kits | 1 | 168 MB | CC0 1.0 |
| [Karoryfer Meatbass](packs/meatbass/) | Bass | 1 | 116 MB | CC0 1.0 |
| [Naked Drums (Wilkinson Audio)](packs/naked-drums/) | Drum kits | 1 | 388 MB | CC BY 4.0 |
| [Prog Kit (Big Rusty Drums, Frankensnare, VSCO 2)](packs/prog-kit/) | Drum kits | 1 | 223 MB | CC0 1.0 |
| [Rock Kit (Karoryfer Big Rusty Drums)](packs/rock-kit/) | Drum kits | 1 | 172 MB | CC0 1.0 |
| [Steinway Model D (bitKlavier Grand)](packs/steinway/) | Pianos and keys | 3 | 1.2 GB | CC BY 4.0 |
| [University of Iowa MIS: Clarinet and Bassoon](packs/iowa/) | Woodwinds | 4 | 101 MB | Free to use without restriction |
| [Versilian Community Sample Library](packs/vcsl/) | Percussion, Tuned percussion, Guitars and plucked strings, Woodwinds | 22 | 198 MB | CC0 1.0 |
| [VSCO 2 Community Edition](packs/vsco2/) | Pianos and keys, Percussion, Tuned percussion, Strings, Woodwinds, Brass | 57 | 1.5 GB | CC0 1.0 |

### Pianos and keys

| Instrument | Also played as | Pack |
|---|---|---|
| Organ | Soft, Pedal, Pedal (Soft) | [VSCO 2 Community Edition](packs/vsco2/) |
| Steinway D Grand | Light, Close | [Steinway Model D (bitKlavier Grand)](packs/steinway/) |
| Upright Piano |  | [VSCO 2 Community Edition](packs/vsco2/) |

### Drum kits

| Instrument | Also played as | Pack |
|---|---|---|
| Jazz Kit |  | [Jazz Kit (Virtuosity Drums)](packs/jazz-kit/) |
| Naked Drums |  | [Naked Drums (Wilkinson Audio)](packs/naked-drums/) |
| Prog Kit |  | [Prog Kit (Big Rusty Drums, Frankensnare, VSCO 2)](packs/prog-kit/) |
| Rock Kit |  | [Rock Kit (Karoryfer Big Rusty Drums)](packs/rock-kit/) |

### Percussion

| Instrument | Also played as | Pack |
|---|---|---|
| Bell Tree |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Bongo High | Muted | [Versilian Community Sample Library](packs/vcsl/) |
| Bongo Low |  | [Versilian Community Sample Library](packs/vcsl/) |
| Concert Bass Drum |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Conga |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Cymbal Bell |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Cymbal Swell (Long) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Cymbal Swell (Medium) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Cymbal Swell (Short) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Hi-Hat (Closed) | Open, Pedal | [Versilian Community Sample Library](packs/vcsl/) |
| Shaker (Down) |  | [Versilian Community Sample Library](packs/vcsl/) |
| Shaker (Up) |  | [Versilian Community Sample Library](packs/vcsl/) |
| Sleigh Bells |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Snare | Brushes | [VSCO 2 Community Edition](packs/vsco2/) |
| Snare Cross-stick |  | [Versilian Community Sample Library](packs/vcsl/) |
| Snare Drum |  | [Versilian Community Sample Library](packs/vcsl/) |
| Snare Roll |  | [Versilian Community Sample Library](packs/vcsl/) |
| Suspended Cymbal (Mallet) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Suspended Cymbal (Stick) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Triangle |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Tumba |  | [VSCO 2 Community Edition](packs/vsco2/) |

### Tuned percussion

| Instrument | Also played as | Pack |
|---|---|---|
| Finger Cymbals |  | [Versilian Community Sample Library](packs/vcsl/) |
| Glockenspiel |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Gong |  | [Versilian Community Sample Library](packs/vcsl/) |
| Marimba |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Temple Block |  | [Versilian Community Sample Library](packs/vcsl/) |
| Timpani | Roll | [VSCO 2 Community Edition](packs/vsco2/) |
| Vibraphone | Bowed | [Versilian Community Sample Library](packs/vcsl/) |

### Strings

| Instrument | Also played as | Pack |
|---|---|---|
| Cellos | Pizzicato, Spiccato, Tremolo | [VSCO 2 Community Edition](packs/vsco2/) |
| Contrabass | Pizzicato, Spiccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Harp |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Solo Violin |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Violas | Pizzicato, Spiccato, Tremolo | [VSCO 2 Community Edition](packs/vsco2/) |
| Violins | Pizzicato, Spiccato, Tremolo | [VSCO 2 Community Edition](packs/vsco2/) |

### Bass

| Instrument | Also played as | Pack |
|---|---|---|
| Jazz Double Bass |  | [Karoryfer Meatbass](packs/meatbass/) |

### Guitars and plucked strings

| Instrument | Also played as | Pack |
|---|---|---|
| Classical Guitar |  | [FreePats Spanish Classical Guitar](packs/freepats-guitar/) |
| Dan Tranh (Zither) | Glissando Down, Glissando Up, Tremolo | [Versilian Community Sample Library](packs/vcsl/) |

### Woodwinds

| Instrument | Also played as | Pack |
|---|---|---|
| Bassoon | Staccato | [University of Iowa MIS: Clarinet and Bassoon](packs/iowa/) |
| Bassoon | Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Clarinet | Staccato | [University of Iowa MIS: Clarinet and Bassoon](packs/iowa/) |
| Clarinet | Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Flute | Non-vibrato, Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Oboe | Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Ocarina | Vibrato | [Versilian Community Sample Library](packs/vcsl/) |

### Brass

| Instrument | Also played as | Pack |
|---|---|---|
| French Horns | Muted, Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Trombones | Staccato, Vibrato | [VSCO 2 Community Edition](packs/vsco2/) |
| Tuba | Staccato | [VSCO 2 Community Edition](packs/vsco2/) |

<!-- end of catalog -->

## How HO[LO] Desk uses this

HO[LO] Desk pins one commit of this repository in its `packs.lock.json`, with every pack's hash.

- The studio fetches each map from GitHub at that commit and keeps it only if its hash is the one the
  lock names.
- So every studio on one version of HO[LO] Desk offers the same packs.
- An *experience* (a project that builds its own music with a pinned copy of HO[LO]'s engine) pins
  exactly the maps its songs play.

New packs, and changes to a pack, reach the studio when HO[LO] Desk's lock moves to a newer commit of
this repository. In a HO[LO] Desk checkout:

```bash
pnpm packs lock
```

Then commit the lock there, as any other change.

## Layout

```
packs/<id>/README.md      the pack's page: where its sounds come from, what's in it
packs/<id>/pack.json      the map: instruments, zones, levels, pads, the source and how files are made
packs/<id>/files.sha256   every sample's sha256, as `sha256sum -c` reads them
packs/<id>/recipe.mjs     how pack.json was made, for the packs made from recordings
tools/lib.mjs, kit.mjs    what the recipes share: fetching, measuring, levelling, writing a pack
tools/sfz.mjs             an SFZ instrument read as a player reads it, for libraries whose samples' names are codes
tools/private.mjs         what makes a pack someone's own, which never comes here
tools/checksums.mjs       files.sha256 and the pack's size, from a pack installed in HO[LO]'s data folder
tools/readme.mjs          the parts of the READMEs that come from the maps (the catalog, each pack's facts)
tools/check.mjs           every pack checked with HO[LO] Desk's own code (what CI runs)
```

## Adding a pack

The recipes and the check run HO[LO] Desk's own code, the code an install makes files with, so a recipe
makes exactly the bytes an install makes. Keep a HO[LO] Desk checkout beside this one with its packages
installed, or point `HOLO_DESK` at one. Use the Node.js its `.nvmrc` names.

```bash
git clone https://github.com/shooter-git/holo-desk ../holo-desk
```

```bash
pnpm --dir ../holo-desk install
```

1. **Make the folder.** Create `packs/<id>/`, named by the pack's id. A pack you imported into HO[LO]
   from your own files (its id starts with `mine-`) stays on your computer: this repository is public,
   and its tools and check refuse one.
   - A recipe (`recipe.mjs`) writes `pack.json` and `files.sha256` itself.
   - A library taken whole from git needs only its `pack.json`. Then
     `node tools/checksums.mjs <id>` writes its checksums and its size from the pack installed in
     HO[LO]'s data folder.
2. **Credit it.** Give it a `credit` and a `license` in `pack.json`, and a row in
   [CREDITS.md](CREDITS.md). Check that the licence lets anyone fetch and play the samples, and that a
   script can fetch the source at a pinned version.
3. **Write its page.** Put `packs/<id>/README.md` above the line `tools/readme.mjs` leaves: where its
   sounds come from, how they were recorded, and what's special about it. Then run:

   ```bash
   node tools/readme.mjs
   ```

   That writes the pack's facts below the line, and the catalog above.
4. **Check it:**

   ```bash
   node tools/check.mjs
   ```

5. **Open a pull request.** Once it's merged, `pnpm packs lock` in HO[LO] Desk brings it to the studio.

## Licence

The maps, checksums, recipes and tools are MIT ([LICENSE](LICENSE)). Each pack's samples keep their own
licence, which its `pack.json` names (`license`) and its page links.
