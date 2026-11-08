// A DrumGizmo kit, read as DrumGizmo reads it (packs/metal-kit and extreme-metal-kit's `recipe.mjs`).
//
// A DrumGizmo kit is a drumkit XML (its microphone channels, and its instruments with each one's file,
// its choke group and how its recordings' channels map to the kit's), a MIDI map (a note for each
// instrument), and an XML for each instrument: its hits, each with its "power" (how hard it was
// struck, as DrumGizmo measured it) and the multichannel WAV that holds every microphone of it.
//
// DrumGizmo has no velocity layers: it plays the hit whose power is nearest the velocity asked for,
// with a little randomness. Here a piece's hits are put in layers by their power, evenly in decibels
// from its softest to its hardest, and the hits of a layer take turns as its round robins. The kit's
// one velocity curve (tools/kit.mjs) then places each layer where it's heard.
//
// DrumGizmo has no mixer either: it hands every microphone to the host at full level. So every
// microphone starts at 0 dB here, as recorded, and the close microphones, which DrumGizmo leaves
// unpanned, are panned where the overheads place their drum.

/** An XML element's attributes. */
function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([A-Za-z_:][\w:.-]*)\s*=\s*"([^"]*)"/g)) out[m[1]] = m[2];
  return out;
}

/** Every element of a name in an XML text, as [attributes, its body], in order. */
function elements(xml, name) {
  const out = [];
  const re = new RegExp(`<${name}\\b([^>]*?)(/>|>([\\s\\S]*?)</${name}>)`, 'g');
  for (const m of xml.matchAll(re)) out.push([attrs(m[1]), m[3] ?? '']);
  return out;
}

const text = new TextDecoder();

/**
 * A DrumGizmo kit: `prefix` the downloads' name before its files' paths (an archive's "<name>:<dir>/"),
 * `kit` the drumkit XML and `midimap` the MIDI map, by their paths under it.
 *
 * Returns { name, rate, channels, instruments: Map(name, { name, group, note, samples }) }, each
 * sample being { name, power, mics: { channel: [download, channel counted from 0] } } by the kit's
 * own channel names.
 */
export async function readDrumkit(downloads, prefix, kit, midimap) {
  const read = async (path) => text.decode(await downloads.get(`${prefix}${path}`)).replace(/^﻿/, '');
  const xml = await read(kit);
  const [[head]] = elements(xml, 'drumkit');
  const channels = elements(xml, 'channel').map(([a]) => a.name);
  const notes = new Map(elements(await read(midimap), 'map').map(([a]) => [a.instr, Number(a.note)]));
  const instruments = new Map();
  for (const [a, body] of elements(xml, 'instrument')) {
    // the instrument's own channel names to the kit's (a channel left unmapped isn't the kit's)
    const map = new Map(elements(body, 'channelmap').map(([c]) => [c.in, c.out]));
    const dir = a.file.includes('/') ? a.file.slice(0, a.file.lastIndexOf('/') + 1) : '';
    const own = await read(a.file);
    const samples = elements(own, 'sample').map(([s, files]) => {
      const mics = {};
      for (const [f] of elements(files, 'audiofile')) {
        const to = map.get(f.channel);
        if (!to || !channels.includes(to)) continue;
        if (mics[to]) throw new Error(`${a.name} ${s.name}: two recordings of ${to}`);
        mics[to] = [`${prefix}${dir}${f.file}`, Number(f.filechannel) - 1];
      }
      return { name: s.name, power: Number(s.power), mics };
    });
    if (!samples.length) throw new Error(`${a.name}: no samples`);
    instruments.set(a.name, {
      name: a.name,
      group: a.group ?? null,
      note: notes.get(a.name) ?? null,
      samples,
    });
  }
  return {
    name: head.name,
    rate: Number(head.samplerate) || null,
    channels,
    instruments,
  };
}

/**
 * A piece of a kit for buildKit, from a DrumGizmo instrument: its hits in `layers` layers by power
 * (evenly in dB from its softest hit to its hardest; an empty one dropped), its hits the round robins.
 * `mics` names the kit's channels it's heard on: { channel: [input, gain, pan] } (pan 0 to 127, SFZ's,
 * left out for a microphone that sits where `pans` places it). `opts` as buildKit's pieces take.
 */
export function drumgizmoPiece(kit, instrument, name, keys, { layers = 6, minRR = 3, mics, ...opts }) {
  const ins = kit.instruments.get(instrument);
  if (!ins) throw new Error(`${name}: the kit has no instrument ${instrument}`);
  const db = ins.samples.map((s) => 10 * Math.log10(Math.max(s.power, 1e-12)));
  const lo = Math.min(...db);
  const hi = Math.max(...db);
  const width = (hi - lo) / layers || 1;
  const bins = new Map();
  ins.samples.forEach((s, i) => {
    const bin = Math.min(layers - 1, Math.floor((db[i] - lo) / width));
    if (!bins.has(bin)) bins.set(bin, []);
    bins.get(bin).push(s);
  });
  // a layer of fewer than `minRR` hits (a kit has few of its softest) joins the next louder one, the
  // loudest the one under it, so no layer repeats one hit
  const groups = [...bins.keys()].sort((a, b) => a - b).map((b) => bins.get(b));
  for (let i = 0; i < groups.length && groups.length > 1; ) {
    if (groups[i].length >= Math.min(minRR, ins.samples.length)) {
      i++;
      continue;
    }
    const into = i < groups.length - 1 ? i + 1 : i - 1;
    groups[into] = into > i ? [...groups[i], ...groups[into]] : [...groups[into], ...groups[i]];
    groups.splice(i, 1);
    if (into < i) i--;
  }
  const hits = [];
  groups.forEach((group, n) => {
    // each layer's hits soft to hard: its round robins in the order they were struck
    group.forEach((s, rr) => {
      const hit = { layer: n + 1, rr: rr + 1, mics: {}, channels: {} };
      for (const [channel, [input]] of Object.entries(mics)) {
        const at = s.mics[channel];
        if (!at) throw new Error(`${name}: ${s.name} has no ${channel}`);
        hit.mics[input] = at[0];
        hit.channels[input] = at[1];
      }
      hits.push(hit);
    });
  });
  const pieceMics = {};
  for (const [, [input, gain, pan]] of Object.entries(mics))
    pieceMics[input] = pan === undefined ? [gain] : [gain, pan];
  return { name, keys, hits, mics: pieceMics, ...opts };
}

/**
 * Where each close microphone's drum sits between the overheads: `homes` gives each channel its drum
 * (an instrument), and each gets the pan (SFZ's 0 to 127) of a mono microphone that puts its drum
 * where its loudest hit's left and right overheads hear it, constant power, as panGains places it.
 * Measured from the `centre` drums (the kick): a pair of overheads is seldom exactly balanced, so a
 * drum's place is how far it sits from the kick's, the kick in the middle.
 */
export async function overheadPans(downloads, kit, homes, [left, right], centre) {
  const top = (instrument) => {
    const ins = kit.instruments.get(instrument);
    if (!ins) throw new Error(`The kit has no instrument ${instrument}`);
    return ins.samples.reduce((a, s) => (s.power > a.power ? s : a));
  };
  const drums = [...new Set([...Object.values(homes), ...centre])];
  await downloads.all([...new Set(drums.flatMap((i) => [top(i).mics[left][0], top(i).mics[right][0]]))]);
  const angle = (instrument) => {
    const energy = (channel) => {
      const [name, ch] = top(instrument).mics[channel];
      const x = downloads.decoded(name).channels[ch];
      let e = 0;
      // the first half second: the hit itself, before the room's tail
      for (let i = 0; i < Math.min(x.length, 24000); i++) e += x[i] * x[i];
      return Math.sqrt(e);
    };
    return Math.atan2(energy(right), energy(left));
  };
  const middle = centre.reduce((a, i) => a + angle(i), 0) / centre.length;
  const pans = {};
  for (const [channel, instrument] of Object.entries(homes)) {
    const p = Math.max(-1, Math.min(1, (4 * (angle(instrument) - middle)) / Math.PI));
    pans[channel] = Math.round((63.5 + 63.5 * p) * 10) / 10;
  }
  return pans;
}
