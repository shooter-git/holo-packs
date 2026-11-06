# Credits

These are the sample libraries [HO[LO] Desk](https://github.com/shooter-git/holo-desk) installs. Their
audio isn't stored here. This repository holds only their sample maps (`packs/<id>/pack.json`, made from
measurements of the samples) and every file's checksum (`packs/<id>/files.sha256`).

An install, and an experience's own build, fetch the audio from its source:
- the git libraries at a pinned commit;
- the Iowa notes cut from the university's own downloads;
- the FreePats guitar decoded from the project's own archive;
- the Steinway and the drum kits made from their libraries' own recordings (trimmed, and the kits mixed
  from their microphones) by the recipes in `packs/<id>/recipe.mjs`.

| Pack | Authors | Licence | Source |
|---|---|---|---|
| VSCO 2 Community Edition | Versilian Studios: Sam Gossner and contributors; the pipe organ by Simon Dalzell | CC0 1.0 | <https://github.com/sgossner/VSCO-2-CE> |
| Versilian Community Sample Library | Versilian Studios: Sam Gossner and contributors | CC0 1.0 | <https://github.com/sgossner/VCSL> |
| Meatbass | Karoryfer Samples: a 1958 Otto Rubner double bass, played and sampled by Drogomir Smolken | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.meatbass> |
| Spanish Classical Guitar | The FreePats project | CC0 1.0 | <https://freepats.zenvoid.org/Guitar/acoustic-guitar.html> |
| Clarinet and Bassoon | University of Iowa Electronic Music Studios (Musical Instrument Samples) | Free to use without restriction | <https://theremin.music.uiowa.edu/MIS.html> |
| Steinway Model D (bitKlavier Grand) | Matthew Wang, Andrés Villalta, Jeffrey Gordon, Katie Chou, Christien Ayers and Daniel Trueman, Princeton University | CC BY 4.0 | <https://doi.org/10.34770/csaa-6a71>, <https://doi.org/10.34770/r75s-9j74> |
| Rock Kit and Prog Kit (Big Rusty Drums) | Karoryfer Samples | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.big-rusty-drums> |
| Prog Kit's snare (Frankensnare) | Karoryfer Samples | CC0 1.0 | <https://github.com/sfzinstruments/karoryfer.frankensnare> |
| Prog Kit's gong | Versilian Studios (VSCO 2 Community Edition) | CC0 1.0 | <https://github.com/sgossner/VSCO-2-CE> |
| Jazz Kit (Virtuosity Drums) | Versilian Studios and Karoryfer Samples | CC0 1.0 | <https://github.com/sfzinstruments/virtuosity_drums> |

The samples' measurements (true pitch, level, start, end and loop points) come from
[Hallowed Lanterns](https://github.com/shooter-git/hallowed-lanterns)' sample catalogues.

Each pack's map also carries its own `credit` and `license`, which the studio shows in its Library and an
experience's pinned `packs.json` keeps.
