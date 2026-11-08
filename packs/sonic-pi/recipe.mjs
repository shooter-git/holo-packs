// `node packs/sonic-pi/recipe.mjs [--cache DIR] [--out DIR]`: the samples Sonic Pi ships (CC0: each from
// Freesound, its source listed in Sonic Pi's samples README, and Arovane's beats), on pads by family,
// written into packs/sonic-pi/pack.json and packs/sonic-pi/files.sha256.
//
// Left out: the two Amen loops (cut from a commercial record), the "breakbeat" loop (its origin can't
// be shown) and the kick named after a drum machine. The tabla strokes are in the tabla pack. Each
// family is measured as a whole (its sounds' balance as made), the loudest at -17 dB at velocity 127
// (less where a hit would peak over -1 dB); each sound is kept until it falls to -60 dB.
import { join } from 'node:path';
import { arg, Downloads } from '../../tools/lib.mjs';
import { buildInstruments, padSet } from '../../tools/sampler.mjs';

const cache = arg('cache', join(process.env.HOME ?? '.', '.cache/holo-pack-sources/sonic-pi'));
const downloads = new Downloads(cache, {
  sp: 'https://raw.githubusercontent.com/sonic-pi-net/sonic-pi/d1393a06266f74dc216bfd8a7e9a8eb7135b4941/etc/samples/',
});
/** Pieces from sample names: its folder and pad named by the name without its family's prefix. */
const set = (folder, names, strip = /^[a-z]+_/) =>
  padSet(
    folder,
    names.map((n) => {
      const short = n.replace(strip, '').replace(/_/g, ' ');
      const piece = short.replace(/ /g, '-');
      return [piece, short.charAt(0).toUpperCase() + short.slice(1), [{ download: `sp:${n}.flac` }]];
    }),
  );
const SETS = [
  ['kicks', 'Kicks', ['bd_ada', 'bd_boom', 'bd_chip', 'bd_fat', 'bd_gas', 'bd_haus', 'bd_jazz', 'bd_klub', 'bd_mehackit', 'bd_pure', 'bd_sone', 'bd_tek', 'bd_zome', 'bd_zum', 'drum_bass_hard', 'drum_bass_soft', 'drum_heavy_kick', 'elec_hollow_kick', 'elec_soft_kick'], 'Drums'],
  ['snares', 'Snares and Snaps', ['sn_dub', 'sn_dolf', 'sn_generic', 'sn_zome', 'drum_snare_hard', 'drum_snare_soft', 'drum_roll', 'elec_snare', 'elec_hi_snare', 'elec_mid_snare', 'elec_lo_snare', 'elec_filt_snare', 'perc_snap', 'perc_snap2'], 'Drums'],
  ['hats', 'Hi-hats and Cymbals', ['hat_bdu', 'hat_cab', 'hat_cats', 'hat_gem', 'hat_gnu', 'hat_gump', 'hat_hier', 'hat_len', 'hat_mess', 'hat_metal', 'hat_noiz', 'hat_psych', 'hat_raw', 'hat_sci', 'hat_snap', 'hat_star', 'hat_tap', 'hat_yosh', 'hat_zan', 'hat_zap', 'hat_zild', 'drum_cymbal_closed', 'drum_cymbal_pedal', 'drum_cymbal_open', 'drum_cymbal_soft', 'drum_cymbal_hard', 'drum_splash_soft', 'drum_splash_hard', 'ride_tri', 'ride_via', 'elec_cymbal'], 'Drums'],
  ['toms', 'Toms and Hits', ['drum_tom_lo_soft', 'drum_tom_lo_hard', 'drum_tom_mid_soft', 'drum_tom_mid_hard', 'drum_tom_hi_soft', 'drum_tom_hi_hard', 'drum_cowbell', 'elec_fuzz_tom', 'elec_wood', 'elec_tick', 'elec_triangle', 'elec_pop', 'elec_bong', 'tbd_perc_tap_1', 'tbd_perc_tap_2', 'tbd_perc_hat', 'tbd_perc_blip'], 'Drums'],
  ['electronic', 'Blips and Glitches', ['elec_beep', 'elec_bell', 'elec_blip', 'elec_blip2', 'elec_blup', 'elec_chime', 'elec_flip', 'elec_ping', 'elec_plip', 'elec_twang', 'elec_twip', 'glitch_perc1', 'glitch_perc2', 'glitch_perc3', 'glitch_perc4', 'glitch_perc5', 'glitch_robot1', 'glitch_robot2', 'mehackit_phone1', 'mehackit_phone2', 'mehackit_phone3', 'mehackit_phone4', 'mehackit_robot1', 'mehackit_robot2', 'mehackit_robot3', 'mehackit_robot4', 'mehackit_robot5', 'mehackit_robot6', 'mehackit_robot7'], 'Other'],
  ['fx', 'Impacts and Vinyl', ['perc_bell', 'perc_bell2', 'perc_door', 'perc_impact1', 'perc_impact2', 'perc_swash', 'perc_swoosh', 'perc_till', 'misc_burp', 'misc_cineboom', 'misc_crow', 'vinyl_backspin', 'vinyl_hiss', 'vinyl_rewind', 'vinyl_scratch'], 'Other'],
  ['textures', 'Ambient Textures', ['ambi_choir', 'ambi_dark_woosh', 'ambi_drone', 'ambi_glass_hum', 'ambi_glass_rub', 'ambi_haunted_hum', 'ambi_lunar_land', 'ambi_piano', 'ambi_sauna', 'ambi_soft_buzz', 'ambi_swoosh', 'tbd_pad_1', 'tbd_pad_2', 'tbd_pad_3', 'tbd_pad_4', 'tbd_voctone', 'tbd_highkey_c4', 'tbd_fxbed_loop'], 'Other'],
  ['loops', 'Loops', ['loop_3d_printer', 'loop_compus', 'loop_drone_g_97', 'loop_electric', 'loop_garzul', 'loop_industrial', 'loop_mehackit1', 'loop_mehackit2', 'loop_mika', 'loop_perc1', 'loop_perc2', 'loop_safari', 'loop_tabla', 'loop_weirdo', 'arovane_beat_a', 'arovane_beat_b', 'arovane_beat_c', 'arovane_beat_d', 'arovane_beat_e'], 'Other'],
  ['bass', 'Bass Hits and Guitar', ['bass_dnb_f', 'bass_drop_c', 'bass_hard_c', 'bass_hit_c', 'bass_thick_c', 'bass_trance_c', 'bass_voxy_c', 'bass_voxy_hit_c', 'bass_woodsy_c', 'glitch_bass_g', 'guit_e_fifths', 'guit_e_slide', 'guit_em9', 'guit_harmonics'], 'Other'],
];
// a family's own prefix comes off its pads' names (glitch_ and mehackit_ stay: their robots differ)
const STRIP = { electronic: /^elec_/ };
const instruments = SETS.map(([name, title, names, category]) => {
  const long = ['textures', 'loops', 'bass'].includes(name);
  return {
    name,
    title,
    // a set of struck sounds is Percussion (its pads aren't a kit's), the rest Other
    category: category === 'Drums' ? 'Percussion' : 'Other',
    pitched: false,
    ...set(name, names, STRIP[name]),
    peak: -1,
    ...(long ? { window: 2 } : {}),
    tail: { floor: -60, cap: long ? 30 : 6, fade: long ? 1 : 0.2 },
    playing: { release: long ? 0.5 : 0.1, attack: 0, oneShot: !long, polyphony: 32, notePolyphony: 2, offTime: 0.05 },
  };
});

await buildInstruments({
  id: 'sonic-pi',
  name: 'Sonic Pi Samples',
  license: 'CC0-1.0',
  credit:
    "The samples Sonic Pi ships (CC0): Freesound users' recordings, each listed in Sonic Pi's samples README, and beats by Arovane (Uwe Zahn).",
  note: "Sonic Pi's FLACs at the pinned commit, each kept until it falls to -60 dB and faded there, otherwise bit for bit.",
  downloads,
  instruments,
  out: arg('out', null),
});
