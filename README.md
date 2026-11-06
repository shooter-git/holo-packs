# HO[LO] Packs

The sample packs [HO[LO] Desk](https://github.com/shooter-git/holo-desk) installs: each pack's instrument
maps, where its samples come from, and every sample's checksum. **There's no audio here.** An install
fetches the samples from their own source (a git commit, published downloads, an archive, or files made
from a library's recordings) and checks every file against the checksums kept here.

The studio installs and removes packs from its Library (**More packs → Install**, and **Remove** on an
installed one), or from the command line with `pnpm packs install ID` and `pnpm packs remove ID`.

## Layout

```
packs/<id>/pack.json      the map: instruments, zones, levels, pads, the source and how files are made
packs/<id>/files.sha256   every file's sha256, as `sha256sum -c` reads them
packs/<id>/recipe.mjs     how pack.json was made, for the packs that are made rather than taken whole
tools/lib.mjs, kit.mjs    what the recipes share: fetching, measuring, levelling, writing a pack
tools/checksums.mjs       files.sha256 from a pack installed in HO[LO]'s data folder
tools/check.mjs           every pack checked with HO[LO] Desk's own code (what CI runs)
```

| Pack | id | Licence |
|---|---|---|
| VSCO 2 Community Edition | `vsco2` | CC0 1.0 |
| Versilian Community Sample Library | `vcsl` | CC0 1.0 |
| Meatbass | `meatbass` | CC0 1.0 |
| Spanish Classical Guitar (FreePats) | `freepats-guitar` | CC0 1.0 |
| Clarinet and Bassoon (University of Iowa) | `iowa` | Free to use without restriction |
| Steinway Model D (bitKlavier Grand) | `steinway` | CC BY 4.0 |
| Rock Kit | `rock-kit` | CC0 1.0 |
| Prog Kit | `prog-kit` | CC0 1.0 |
| Jazz Kit | `jazz-kit` | CC0 1.0 |

Authors and sources are in [CREDITS.md](CREDITS.md).

## How HO[LO] Desk uses this

HO[LO] Desk pins one commit of this repository in its `packs.lock.json`, with every pack's hash. The
studio fetches each map from GitHub at that commit and keeps it only if its hash is the one the lock
names. So every studio on one HO[LO] Desk version offers the same packs, and an experience (a project
that builds its own music with a pinned copy of HO[LO]'s engine) pins exactly the maps its songs play.

New packs, and changes to a pack, reach the studio when HO[LO] Desk's lock moves to a newer commit of
this repository. In a HO[LO] Desk checkout:

```bash
pnpm packs lock
```

Commit the lock there as any other change.

## Adding a pack

The recipes and the check run HO[LO] Desk's own code (the code an install makes files with), so a
recipe makes exactly the bytes an install makes. Keep a HO[LO] Desk checkout beside this one, with its
packages installed, or point `HOLO_DESK` at one. Use the Node.js its `.nvmrc` names.

```bash
git clone https://github.com/shooter-git/holo-desk ../holo-desk
```

```bash
pnpm --dir ../holo-desk install
```

1. Make `packs/<id>/`, named by the pack's id. A recipe (`recipe.mjs`) writes `pack.json` and
   `files.sha256` itself. A library taken whole from git needs only its `pack.json`, and
   `node tools/checksums.mjs <id>` writes the checksums from the pack installed in HO[LO]'s data folder.
2. Give it a `credit` and a `license` in `pack.json`, and a row in [CREDITS.md](CREDITS.md). Check that
   the licence lets anyone fetch and play the samples, and that the source can be fetched by a script at
   a pinned version.
3. Run the check:

   ```bash
   node tools/check.mjs
   ```

4. Open a pull request. Once it's merged, `pnpm packs lock` in HO[LO] Desk brings it to the studio.

## Licence

The maps, checksums, recipes and tools are MIT ([LICENSE](LICENSE)). Each pack's samples keep their own
licence, which its `pack.json` names (`license`).
