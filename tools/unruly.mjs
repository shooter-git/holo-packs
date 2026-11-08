// Karoryfer's Unruly Drums (CC0), as the soul-kit and studio-kit recipes read it: each piece's hits
// from its microphones' folders ("Samples/<piece>/<mic>/rr<n>/<articulation>_vl<layer>_rr<n>.flac").
import { join } from 'node:path';
import { arg, Downloads } from './lib.mjs';
import { buildKit, githubTree, raw } from './kit.mjs';

export const REPO = 'sfzinstruments/karoryfer.unruly-drums';
export const COMMIT = '9bf75c2a1392f190cd1c264645653629f0b3a097';

/** The library's files, and a reader of a piece's hits on its microphones. */
export async function unruly(id) {
  const cache = arg('cache', join(process.env.HOME ?? '.', `.cache/holo-pack-sources/${id}`));
  const downloads = new Downloads(cache, { unruly: raw(REPO, COMMIT) });
  const paths = await githubTree(REPO, COMMIT, downloads);
  /** An articulation's hits on the microphones named ({ layer, rr, mics: { mic: download } }). */
  const hits = (piece, articulation, mics) => {
    const out = new Map();
    const re = new RegExp(`^Samples/${piece}/([a-z]+)/rr\\d+/${articulation}(?:_vl(\\d+))?_rr(\\d+)\\.(?:flac|wav)$`);
    for (const p of paths) {
      const m = re.exec(p);
      if (!m || !mics.includes(m[1])) continue;
      const layer = Number(m[2] ?? 1);
      const rr = Number(m[3]);
      const key = `${layer}:${rr}`;
      if (!out.has(key)) out.set(key, { layer, rr, mics: {} });
      out.get(key).mics[m[1]] = `unruly:${p}`;
    }
    const list = [...out.values()].filter((h) => mics.every((mic) => h.mics[mic]));
    if (!list.length) throw new Error(`No ${articulation} hits in ${piece} on ${mics.join(', ')}`);
    return list.sort((a, b) => a.layer - b.layer || a.rr - b.rr);
  };
  return { downloads, hits, build: (spec) => buildKit({ ...spec, bases: { unruly: raw(REPO, COMMIT) }, downloads }) };
}

/** The microphones each piece is mixed from, at their fader levels and pans (an SFZ pan: 0 left, 127 right). */
export const MICS = {
  kick: { in: [1, 63.5], out: [0.6, 63.5], oh: [0.45] },
  snare: { top: [1, 63.5], btm: [0.35, 63.5], ohl: [0.5, 20], ohr: [0.5, 107] },
  // a snare with its snares off, played as a tom: no bottom microphone
  tom: { top: [1, 63.5], ohl: [0.5, 20], ohr: [0.5, 107] },
  hat: { cl: [1, 85], ohl: [0.45, 20], ohr: [0.45, 107] },
  cymbal: { cl: [0.8, 63.5], oh: [0.7] },
  block: { cl: [1, 63.5], oh: [0.5] },
};
