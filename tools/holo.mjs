// Where HO[LO] Desk is. The recipes and the checks use its own code (the code that installs a pack and
// builds an experience's music), so a recipe makes the same bytes an install makes. HOLO_DESK names its
// checkout; else it is a holo-desk checkout beside this one, with its packages installed (pnpm install).
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/** This repository. */
export const repo = resolve(import.meta.dirname, '..');

/** HO[LO] Desk's checkout. */
export const desk = resolve(process.env.HOLO_DESK ?? join(repo, '../holo-desk'));

if (!existsSync(join(desk, 'packages/music/src/packs.ts'))) {
  throw new Error(
    `HO[LO] Desk isn't at ${desk}: clone it there (git clone https://github.com/shooter-git/holo-desk ` +
      `${join(repo, '../holo-desk')}, then pnpm install in it), or set HOLO_DESK to a checkout`,
  );
}

/** One of HO[LO] Desk's modules, by its path in that repository. */
export function holo(path) {
  return import(pathToFileURL(join(desk, path)).href);
}

/** HO[LO]'s data folder (where its packs are installed): HOLO_DATA_DIR, else the checkout's own. */
export const dataDir = resolve(process.env.HOLO_DATA_DIR ?? join(desk, 'data'));
