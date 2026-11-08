// `node tools/checksums.mjs [--data DIR] [ID…]`: every file of each pack, by its sha256, into
// packs/<id>/files.sha256 (the lines `sha256sum -c` reads, run in the pack's samples folder), and their
// size on disk into its map's `bytes`. Read from the packs installed in HO[LO]'s data folder
// (HOLO_DATA_DIR, else the HO[LO] Desk checkout's data). An install and an experience's build check
// every sample they fetch against these, so a song plays exactly the files the studio plays.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { dataDir, holo, repo } from './holo.mjs';
import { privateReason } from './private.mjs';

const { formatChecksums, packPaths } = await holo('packages/music/src/packs.ts');

const args = process.argv.slice(2);
const at = args.indexOf('--data');
const data = at >= 0 ? resolve(args.splice(at, 2)[1]) : dataDir;
const packs = join(repo, 'packs');

/** A map with its `bytes` set, the rest of its text as it was (after its credit, one space in). */
function withBytes(text, bytes) {
  if (/^ "bytes": \d+,$/m.test(text)) return text.replace(/^ "bytes": \d+,$/m, ` "bytes": ${bytes},`);
  const credit = /^ "credit": .*,$/m.exec(text);
  if (!credit) throw new Error('the map has no "credit" line to put its size after');
  const at = credit.index + credit[0].length;
  return `${text.slice(0, at)}\n "bytes": ${bytes},${text.slice(at)}`;
}

for (const id of readdirSync(packs).sort()) {
  const mapFile = join(packs, id, 'pack.json');
  if (!existsSync(mapFile) || (args.length && !args.includes(id))) continue;
  const pack = JSON.parse(readFileSync(mapFile, 'utf8'));
  // someone's own pack never goes in this public repository: nothing of it is written
  const why = privateReason(pack);
  if (why) {
    console.error(`${pack.id ?? id}: nothing written, as ${why}.`);
    process.exitCode = 1;
    continue;
  }
  if (!packPaths(pack).length) {
    console.log(`${pack.id}: no files of its own (a palette): its files.sha256 is only its comment`);
    continue;
  }
  const dir = join(data, 'packs', pack.id, pack.root || 'samples');
  if (!existsSync(dir)) {
    console.log(`${pack.id}: not installed in ${data} (skipped)`);
    continue;
  }
  const files = {};
  const missing = [];
  let bytes = 0;
  for (const p of packPaths(pack)) {
    const file = join(dir, p);
    if (!existsSync(file)) missing.push(p);
    else {
      files[p] = createHash('sha256').update(readFileSync(file)).digest('hex');
      bytes += statSync(file).size;
    }
  }
  if (missing.length) {
    console.error(`${pack.id}: ${missing.length} file(s) missing, e.g. ${missing[0]}: install it fully first`);
    process.exitCode = 1;
    continue;
  }
  writeFileSync(join(packs, id, 'files.sha256'), formatChecksums(files));
  writeFileSync(mapFile, withBytes(readFileSync(mapFile, 'utf8'), bytes));
  console.log(`${pack.id}: ${Object.keys(files).length} files, ${(bytes / 1e6).toFixed(0)} MB`);
}
