// `node packs/harp/recipe.mjs [--cache DIR] [--out DIR]`: Etherealwinds Harp II: Community Edition by
// Jordi Francis (etherealwinds) and Versilian Studios (CC BY 4.0), written into packs/harp/pack.json and
// packs/harp/files.sha256.
//
// A 34-string Iona Celtic lever harp sampled chromatically in stereo: two velocity layers, two takes of
// each in turn, as its SFZ program plays them. Its vocal phrases and effects aren't mapped. Its layers
// were recorded to one level, so they keep the program's velocity splits and each plays at the level
// one velocity curve has there, the loudest at -17 dB at velocity 127 (less where a pluck would peak
// over -1 dB);
// each note is kept until it falls to -60 dB (12 s at most) and faded there. The notes are taken out of
// the published zip, the only form it's published in.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { holo } from '../../tools/holo.mjs';
import { buildInstruments, sfzSamples } from '../../tools/sampler.mjs';
import { readSfz } from '../../tools/sfz.mjs';

const { unpack } = await holo('packages/music/src/archives.ts');
const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/harp'));
const downloads = new Downloads(cache, {}, { harp: { url: 'https://versilian-studios.com/Distro/EWHarp2CE_SFZ-Raw.zip' } });
// its program, read out of the zip
const { file, format } = await downloads.archive('harp');
let text = '';
await unpack(file, format, new Set(['Harp_Normal.sfz']), (_, data) => {
  text = new TextDecoder().decode(data);
});
const program = await readSfz('Harp_Normal.sfz', async () => text);
const samples = sfzSamples(program, { tag: 'harp' });

await buildInstruments({
  id: 'harp',
  name: 'Etherealwinds Harp II CE',
  license: 'CC-BY-4.0',
  credit:
    'Etherealwinds Harp II: Community Edition by Jordi Francis (etherealwinds) and Versilian Studios (CC BY 4.0): ' +
    'a 34-string Iona Celtic harp, sampled chromatically.',
  note: "The harp's WAVs, taken out of the published zip, each kept until it falls to -60 dB (12 s at most) and faded there, otherwise bit for bit.",
  downloads,
  instruments: [
    {
      name: 'harp',
      title: 'Celtic Harp',
      category: 'Strings',
      samples,
      // its two layers were recorded to one level: the program's own velocity splits
      layers: 'fixed',
      tail: { floor: -60, cap: 12, fade: 1 },
      // a pluck's peak is sharp: up to -1 dB at velocity 127
      peak: -1,
      playing: { release: 1.2, attack: 0, oneShot: false, polyphony: 64, notePolyphony: 2, offTime: 0.2 },
    },
  ],
  out: arg('out', null),
});
