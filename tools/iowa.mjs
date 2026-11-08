// The University of Iowa Electronic Music Studios' Musical Instrument Samples, as the recipes of the
// Iowa packs read them: the 2012 pages' single notes ("MIS Pitches - 2014": one stereo AIFF a note,
// fortissimo), listed from the pages themselves.
import { keyRanges, noteKey } from './sampler.mjs';

export const SITE = 'https://theremin.music.uiowa.edu/';
/** Where the single notes are (the downloads' base). */
export const BASE = `${SITE}sound%20files/MIS%20Pitches%20-%202014/`;
export const LICENSE = 'Free to use without restriction (University of Iowa Electronic Music Studios)';
export const CREDIT =
  'University of Iowa Musical Instrument Samples (Electronic Music Studios, University of Iowa): free to use for any project, without restriction.';

/** Every note a 2012 page lists, as its path under BASE ("Strings/Violin/Violin.arco.ff.sulG.G3.stereo.aif"). */
export async function pageFiles(page) {
  const res = await fetch(`${SITE}MIS-Pitches-2012/${page}.html`);
  if (!res.ok) throw new Error(`${page}: ${res.status}`);
  const html = await res.text();
  const out = [];
  for (const m of html.matchAll(/href="([^"]+\.(?:aif|aiff))"/gi)) {
    const url = new URL(m[1].replace(/ /g, '%20'), `${SITE}MIS-Pitches-2012/${page}.html`).href;
    const path = decodeURIComponent(url.slice(BASE.length));
    if (!url.startsWith(BASE)) throw new Error(`${url} isn't under ${BASE}`);
    out.push(path);
  }
  return [...new Set(out)];
}

/** A file's note ("...ff.Db4.stereo.aif" is 61), or null. */
export function noteOf(path) {
  const m = /\.([A-G]b?\d)\.(?:stereo\.)?aiff?$/i.exec(path);
  return m ? noteKey(m[1]) : null;
}

/**
 * Pitched samples from notes: `pick(path)` keeps the files of one instrument and way of playing; where
 * two files play one note (a violin's G4 on two strings), `prefer(a, b)` chooses (the first kept by
 * default). Each note covers the keys halfway to its neighbours.
 */
export function notes(paths, { pick, prefer, bottom, top } = {}) {
  const byKey = new Map();
  for (const p of paths) {
    if (!pick(p)) continue;
    const key = noteOf(p);
    if (key === null) continue;
    const had = byKey.get(key);
    byKey.set(key, had && prefer ? prefer(had, p) : had ?? p);
  }
  const keys = [...byKey.keys()].sort((a, b) => a - b);
  const ranges = keyRanges(keys, bottom ?? Math.max(0, keys[0] - 3), top ?? Math.min(127, keys.at(-1) + 3));
  return keys.map((key, i) => ({
    download: `iowa:${byKey.get(key)}`,
    root: key,
    lo: ranges[i][0],
    hi: ranges[i][1],
    layer: 1,
    rr: 1,
  }));
}

const pages = new Map();
/** A 2012 page's notes (fetched once). */
export async function page(name) {
  if (!pages.has(name)) pages.set(name, await pageFiles(name));
  return pages.get(name);
}

/** Pads from single files: [piece, title, path] (path under BASE). */
export function iowaPads(folder, pieces) {
  return pieces.map(([piece, title, path]) => [piece, title, [{ download: `iowa:${path}` }]]);
}
