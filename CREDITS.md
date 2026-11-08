# Credits

These are the sample libraries [HO[LO] Desk](https://github.com/shooter-git/holo-desk) installs. Their
audio isn't stored here. This repository holds only their sample maps (`packs/<id>/pack.json`, made from
measurements of the samples) and every file's checksum (`packs/<id>/files.sha256`).

An install, and an experience's own build, fetch the audio from its source:
- the git libraries at a pinned commit;
- the Iowa notes cut from the university's own downloads;
- the FreePats guitar decoded from the project's own archive;
- the Steinway, the other pianos and keys, the solo instruments and the drum kits made from their
  libraries' own recordings (trimmed, the kits mixed from their microphones) by the recipes in
  `packs/<id>/recipe.mjs`.

| Pack | Authors | Licence | Source |
|---|---|---|---|
| [VSCO 2 Community Edition](packs/vsco2/) | Versilian Studios: Sam Gossner and contributors; the pipe organ by Simon Dalzell | CC0 1.0 | <https://github.com/sgossner/VSCO-2-CE> |
| [Versilian Community Sample Library](packs/vcsl/) | Versilian Studios: Sam Gossner and contributors | CC0 1.0 | <https://github.com/sgossner/VCSL> |
| [Meatbass](packs/meatbass/) | Karoryfer Samples: a 1958 Otto Rubner double bass, played and sampled by Drogomir Smolken | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.meatbass> |
| [Spanish Classical Guitar](packs/freepats-guitar/) | The FreePats project | CC0 1.0 | <https://freepats.zenvoid.org/Guitar/acoustic-guitar.html> |
| [Clarinet and Bassoon](packs/iowa/) | University of Iowa Electronic Music Studios (Musical Instrument Samples) | Free to use without restriction | <https://theremin.music.uiowa.edu/MIS.html> |
| [Steinway Model D (bitKlavier Grand)](packs/steinway/) | Matthew Wang, Andrés Villalta, Jeffrey Gordon, Katie Chou, Christien Ayers and Daniel Trueman, Princeton University | CC BY 4.0 | <https://doi.org/10.34770/csaa-6a71>, <https://doi.org/10.34770/r75s-9j74> |
| [Rock Kit](packs/rock-kit/) and [Prog Kit](packs/prog-kit/) (Big Rusty Drums) | Karoryfer Samples | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.big-rusty-drums> |
| [Prog Kit](packs/prog-kit/)'s snare (Frankensnare) | Karoryfer Samples | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.frankensnare> |
| [Prog Kit](packs/prog-kit/)'s gong | Versilian Studios (VSCO 2 Community Edition) | CC0 1.0 | <https://github.com/sgossner/VSCO-2-CE> |
| [Jazz Kit (Virtuosity Drums)](packs/jazz-kit/) | Versilian Studios and Karoryfer Samples | CC0 1.0 | <https://github.com/sfzinstruments/virtuosity_drums> |
| [Salamander Grand Piano](packs/salamander/) | Alexander Holm; mapped in FLAC by kinwie (SFZ Instruments) | Public domain (since 4 March 2022) | <https://github.com/sfzinstruments/SalamanderGrandPiano>, <https://rytmenpinne.wordpress.com/sounds-and-such/salamander-grandpiano/> |
| [Headroom Piano](packs/headroom/) | Bengt Nilsson; mapped in FLAC by kinwie (SFZ Instruments) | CC BY 4.0 | <https://github.com/sfzinstruments/BengtNilsson.HeadroomPiano> |
| [E-Pianos](packs/epianos/) (CP80, Pianet T, Wurlitzer EP200) | Greg Sullivan; mapped in FLAC by kinwie (SFZ Instruments) | CC BY 3.0 | <https://github.com/sfzinstruments/GregSullivan.E-Pianos>, <http://www.sullivang.net/> |
| [Karoryfer x bigcat Cello](packs/bigcat-cello/) | Karoryfer Lecolds and bigcat instruments: played by Kamila Borowiak | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer-bigcat.cello> |
| [War Tuba](packs/war-tuba/) | Karoryfer Lecolds: played by Jakub Lewicki, recorded and mapped by Drogomir Smolken | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.war-tuba> |
| [Weresax](packs/weresax/) | Karoryfer Lecolds | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.weresax> |
| [Bear Sax](packs/bear-sax/) | Karoryfer Lecolds | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.bear-sax> |
| [MTG Solo Saxophones](packs/mtg-sax/) | Music Technology Group, Universitat Pompeu Fabra (Freesound); trimmed, looped and mapped by kinwie (SFZ Instruments) | CC BY 4.0 | <https://github.com/sfzinstruments/MTG.SoloSax> |
| [Erhu](packs/erhu/) | SFZ Instruments | CC0 1.0 | <https://github.com/sfzinstruments/aliexpress-erhu> |
| [Male Voice "Ah"](packs/vocal-ah/) | SFZ Instruments' legato vocal tutorial; the a vowel of Karoryfer's Hadzi-Fia | CC0 1.0 | <https://github.com/sfzinstruments/legato_vocal_tutorial> |

The samples' measurements (true pitch, level, start, end and loop points) come from
[Hallowed Lanterns](https://github.com/shooter-git/hallowed-lanterns)' sample catalogues.

Each pack's map also carries its own `credit` and `license`, which the studio shows in its Library and an
experience's pinned `packs.json` keeps.
