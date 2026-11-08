# HO[LO] Packs

The free sample packs [HO[LO] Desk](https://github.com/shooter-git/holo-desk) plays: pianos, drum kits,
an orchestra, basses, guitars, gamelan and more. Every one is free to use and to share: CC0, CC BY 3.0
or 4.0, public domain, the Unlicense, the Artistic License 2.0, or free without restriction.

**There's no audio in this repository.** Each pack here is a map: its instruments, where each sample
comes from (a git commit, published downloads, an archive, or recordings mixed into new files), and
every sample's sha256. When you install a pack, HO[LO] fetches the samples from their own source and
checks every file against these checksums. So everyone's copy is the same, bit for bit.

- **Find a pack:** browse by family under [Instruments](#instruments), or see [Every pack](#every-pack)
  at a glance. Each pack's page says where its sounds come from, what's in it, its licence, its size
  and its kit pads.
- **Palettes** are sets of ready-made sounds for a style of music: each sound an instrument with its
  effects, its room and its level, one click from a track in the studio. A palette has no audio of
  its own: its sounds play the packs here and HO[LO] Desk's built-in synths, and a click installs the
  packs a sound plays. See [Palettes](#palettes).
- **Install or remove one:** in the studio's Library, use **More packs → Install**, or **Remove** on
  an installed pack to free the disk it takes. On the command line, `pnpm packs install <id>` and
  `pnpm packs remove <id>` do the same.
- **Credits:** authors and sources are in [CREDITS.md](CREDITS.md).

## Instruments

Grouped by family. Each instrument's other ways of playing (pizzicato, staccato, muted, a lighter
version…) are listed with it, and every pack links to its own page.

<!-- catalog: written from the maps by `node tools/readme.mjs` -->

### Every pack

| Pack | Families | Instruments | Size | Licence |
|---|---|---|---|---|
| [Angklung and Khaen (OLPC)](packs/angklung-khaen/) | Percussion, Woodwinds | 3 | 3 MB | CC BY 3.0 |
| [Balinese Gamelan (OLPC)](packs/gamelan-bali/) | Percussion, Tuned percussion | 6 | 14 MB | CC BY 3.0 |
| [Brushes Kit (Karoryfer Swirly Drums)](packs/brushes-kit/) | Drum kits | 1 | 373 MB | CC0 1.0 |
| [Dim Cabasa](packs/dim-cabasa/) | Percussion | 1 | 22 MB | CC BY 4.0 |
| [Erhu](packs/erhu/) | Strings | 2 | 45 MB | CC0 1.0 |
| [Ethan Winer's Instruments](packs/ethan-winer/) | Percussion, Tuned percussion, Strings, Woodwinds | 14 | 32 MB | Free to use without restriction |
| [Etherealwinds Harp II CE](packs/harp/) | Strings | 1 | 179 MB | CC BY 4.0 |
| [FreePats Bass Guitar YR](packs/freepats-bass/) | Bass | 2 | 12 MB | CC0 1.0 |
| [FreePats Button Accordion HN](packs/freepats-accordion/) | Pianos and keys | 1 | 7 MB | CC0 1.0 |
| [FreePats Electric Guitars (FSBS)](packs/freepats-electric-guitars/) | Guitars and plucked strings | 3 | 394 MB | CC0 1.0 |
| [FreePats Spanish Classical Guitar](packs/freepats-guitar/) | Guitars and plucked strings | 1 | 20 MB | CC0 1.0 |
| [FreePats Synthesizer Percussion](packs/freepats-synth-percussion/) | Drum kits | 1 | 2 MB | CC0 1.0 |
| [FreePats Upright Piano KW](packs/freepats-upright/) | Pianos and keys | 1 | 86 MB | CC0 1.0 |
| [Greg Sullivan E-Pianos (CP80, Pianet T, Wurlitzer)](packs/epianos/) | Pianos and keys | 3 | 78 MB | CC BY 3.0 |
| [Headroom Piano (Yamaha C3)](packs/headroom/) | Pianos and keys | 2 | 512 MB | CC BY 4.0 |
| [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) | Percussion, Tuned percussion | 27 | 363 MB | Artistic License 2.0 |
| [Javanese Gongs (OLPC)](packs/java-gongs/) | Percussion | 1 | 8 MB | CC BY 3.0 |
| [Jazz Kit (Virtuosity Drums)](packs/jazz-kit/) | Drum kits | 1 | 168 MB | CC0 1.0 |
| [jSteelDrum](packs/steel-drum/) | Tuned percussion | 1 | 111 MB | The Unlicense |
| [Karoryfer Bear Sax](packs/bear-sax/) | Woodwinds | 2 | 87 MB | CC0 1.0 |
| [Karoryfer Black And Blue Basses](packs/black-blue-basses/) | Bass | 4 | 292 MB | CC0 1.0 |
| [Karoryfer Black And Green Guitars](packs/black-green-guitars/) | Guitars and plucked strings | 4 | 299 MB | CC0 1.0 |
| [Karoryfer Caveman Cosmonaut (Transistor Organ)](packs/caveman-cosmonaut/) | Pianos and keys, Bass | 7 | 79 MB | CC0 1.0 |
| [Karoryfer Cowsynth (Bagpipe Synth)](packs/cowsynth/) | Other | 2 | 13 MB | CC0 1.0 |
| [Karoryfer Gogodze Phu (Bobobo Drums)](packs/gogodze-phu/) | Percussion | 1 | 8 MB | CC0 1.0 |
| [Karoryfer Growlybass](packs/growlybass/) | Bass | 2 | 182 MB | CC0 1.0 |
| [Karoryfer Meatbass](packs/meatbass/) | Bass | 1 | 116 MB | CC0 1.0 |
| [Karoryfer String Cyborgs (Synth Voices)](packs/string-cyborgs/) | Other | 4 | 26 MB | CC0 1.0 |
| [Karoryfer War Tuba](packs/war-tuba/) | Brass | 2 | 49 MB | CC0 1.0 |
| [Karoryfer Weresax](packs/weresax/) | Woodwinds | 1 | 101 MB | CC0 1.0 |
| [Karoryfer x bigcat Cello](packs/bigcat-cello/) | Strings | 3 | 131 MB | CC0 1.0 |
| [Lo-fi Beat Kit (Sonic Pi, FreePats)](packs/lofi-kit/) | Drum kits | 1 | 3 MB | CC0 1.0 |
| [Male Voice "Ah"](packs/vocal-ah/) | Voices | 1 | 38 MB | CC0 1.0 |
| [MTG Solo Saxophones](packs/mtg-sax/) | Woodwinds | 4 | 153 MB | CC BY 4.0 |
| [Naked Drums (Wilkinson Audio)](packs/naked-drums/) | Drum kits | 1 | 388 MB | CC BY 4.0 |
| [Nepalese Hand Bells (VCSL)](packs/nepal-bells/) | Percussion | 1 | 1 MB | CC0 1.0 |
| [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) | Strings, Woodwinds, Brass | 11 | 361 MB | Free to use without restriction |
| [Prog Kit (Big Rusty Drums, Frankensnare, VSCO 2)](packs/prog-kit/) | Drum kits | 1 | 223 MB | CC0 1.0 |
| [Rock Kit (Karoryfer Big Rusty Drums)](packs/rock-kit/) | Drum kits | 1 | 172 MB | CC0 1.0 |
| [Salamander Grand Piano (Yamaha C5)](packs/salamander/) | Pianos and keys | 2 | 1.4 GB | Public domain |
| [Singing Bowls (OLPC)](packs/singing-bowls/) | Tuned percussion | 1 | 8 MB | CC BY 3.0 |
| [Sonic Pi Samples](packs/sonic-pi/) | Percussion, Other | 9 | 91 MB | CC0 1.0 |
| [Soul Kit (Karoryfer Unruly Drums)](packs/soul-kit/) | Drum kits | 1 | 222 MB | CC0 1.0 |
| [Steinway Model D (bitKlavier Grand)](packs/steinway/) | Pianos and keys | 3 | 1.2 GB | CC BY 4.0 |
| [Studio Kit (Karoryfer Unruly Drums)](packs/studio-kit/) | Drum kits | 1 | 143 MB | CC0 1.0 |
| [Tabla (OLPC, Sonic Pi)](packs/tabla/) | Percussion | 2 | 4 MB | CC BY 3.0 |
| [University of Iowa MIS: Brass](packs/iowa-brass/) | Brass | 6 | 170 MB | Free to use without restriction |
| [University of Iowa MIS: Clarinet and Bassoon](packs/iowa/) | Woodwinds | 4 | 101 MB | Free to use without restriction |
| [University of Iowa MIS: Mallets](packs/iowa-mallets/) | Tuned percussion | 15 | 615 MB | Free to use without restriction |
| [University of Iowa MIS: Percussion and Thai Gongs](packs/iowa-percussion/) | Percussion, Tuned percussion | 5 | 96 MB | Free to use without restriction |
| [University of Iowa MIS: Solo Strings](packs/iowa-strings/) | Strings, Bass | 8 | 239 MB | Free to use without restriction |
| [University of Iowa MIS: Woodwinds](packs/iowa-winds/) | Woodwinds | 11 | 281 MB | Free to use without restriction |
| [Versilian Community Sample Library](packs/vcsl/) | Percussion, Tuned percussion, Guitars and plucked strings, Woodwinds | 22 | 198 MB | CC0 1.0 |
| [Vintage Keys (Greg Sullivan, FreePats)](packs/vintage-keys/) | Pianos and keys | 3 | 149 MB | CC BY 3.0 |
| [VSCO 2 Community Edition](packs/vsco2/) | Pianos and keys, Percussion, Tuned percussion, Strings, Woodwinds, Brass | 57 | 1.5 GB | CC0 1.0 |

### Palettes

| Palette | Sounds | Plays |
|---|---|---|
| [Breath and Pipes](packs/breath-and-pipes/) | 12 | Steinway Model D (bitKlavier Grand), VSCO 2 Community Edition, built-in synths |
| [Classic Symphonic](packs/classic-symphonic/) | 16 (1 coming) | VSCO 2 Community Edition, built-in synths |
| [Crystal Pulse](packs/crystal-pulse/) | 13 | Versilian Community Sample Library, VSCO 2 Community Edition, built-in synths |
| [Felt and Strings](packs/felt-and-strings/) | 11 | VSCO 2 Community Edition, built-in synths |
| [Gamelan](packs/gamelan/) | 8 (8 coming) | packs still to come |
| [Heroic Orchestra](packs/heroic-orchestra/) | 14 | VSCO 2 Community Edition, built-in synths |
| [Hybrid Epic](packs/hybrid-epic/) | 14 (1 coming) | VSCO 2 Community Edition, built-in synths |
| [Korean](packs/korean/) | 3 | built-in synths |
| [Koto and Taiko](packs/koto-and-taiko/) | 7 | built-in synths |
| [Minimal Ensemble](packs/minimal-ensemble/) | 14 (1 coming) | University of Iowa MIS: Clarinet and Bassoon, Steinway Model D (bitKlavier Grand), VSCO 2 Community Edition, built-in synths |
| [Silk and Bamboo](packs/silk-and-bamboo/) | 8 (1 coming) | Versilian Community Sample Library, built-in synths |
| [Sitar and Tabla](packs/sitar-and-tabla/) | 7 (3 coming) | Versilian Community Sample Library, built-in synths |
| [Southeast Asian](packs/southeast-asian/) | 6 (3 coming) | Versilian Community Sample Library |
| [Viennese Grand](packs/viennese-grand/) | 3 | Steinway Model D (bitKlavier Grand) |

### Pianos and keys

| Instrument | Also played as | Pack |
|---|---|---|
| Button Accordion |  | [FreePats Button Accordion HN](packs/freepats-accordion/) |
| Hohner Pianet T |  | [Greg Sullivan E-Pianos (CP80, Pianet T, Wurlitzer)](packs/epianos/) |
| Honky-tonk Upright |  | [Vintage Keys (Greg Sullivan, FreePats)](packs/vintage-keys/) |
| Organ | Soft, Pedal, Pedal (Soft) | [VSCO 2 Community Edition](packs/vsco2/) |
| Stage Piano Layer (CP80 and Upright) |  | [Vintage Keys (Greg Sullivan, FreePats)](packs/vintage-keys/) |
| Steinway D Grand | Light, Close | [Steinway Model D (bitKlavier Grand)](packs/steinway/) |
| Transistor Organ Clarinet |  | [Karoryfer Caveman Cosmonaut (Transistor Organ)](packs/caveman-cosmonaut/) |
| Transistor Organ Flutes |  | [Karoryfer Caveman Cosmonaut (Transistor Organ)](packs/caveman-cosmonaut/) |
| Transistor Organ Tremolo |  | [Karoryfer Caveman Cosmonaut (Transistor Organ)](packs/caveman-cosmonaut/) |
| Transistor Organ Trombone |  | [Karoryfer Caveman Cosmonaut (Transistor Organ)](packs/caveman-cosmonaut/) |
| Transistor Organ Trumpet |  | [Karoryfer Caveman Cosmonaut (Transistor Organ)](packs/caveman-cosmonaut/) |
| Transistor Organ Violin |  | [Karoryfer Caveman Cosmonaut (Transistor Organ)](packs/caveman-cosmonaut/) |
| Upright Piano |  | [FreePats Upright Piano KW](packs/freepats-upright/) |
| Upright Piano |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Wurlitzer Chorus |  | [Vintage Keys (Greg Sullivan, FreePats)](packs/vintage-keys/) |
| Wurlitzer EP200 |  | [Greg Sullivan E-Pianos (CP80, Pianet T, Wurlitzer)](packs/epianos/) |
| Yamaha C3 Grand | Close | [Headroom Piano (Yamaha C3)](packs/headroom/) |
| Yamaha C5 Grand | Light | [Salamander Grand Piano (Yamaha C5)](packs/salamander/) |
| Yamaha CP80 Electric Grand |  | [Greg Sullivan E-Pianos (CP80, Pianet T, Wurlitzer)](packs/epianos/) |

### Drum kits

| Instrument | Also played as | Pack |
|---|---|---|
| Brushes Kit |  | [Brushes Kit (Karoryfer Swirly Drums)](packs/brushes-kit/) |
| Jazz Kit |  | [Jazz Kit (Virtuosity Drums)](packs/jazz-kit/) |
| Lo-fi Beat Kit |  | [Lo-fi Beat Kit (Sonic Pi, FreePats)](packs/lofi-kit/) |
| Naked Drums |  | [Naked Drums (Wilkinson Audio)](packs/naked-drums/) |
| Prog Kit |  | [Prog Kit (Big Rusty Drums, Frankensnare, VSCO 2)](packs/prog-kit/) |
| Rock Kit |  | [Rock Kit (Karoryfer Big Rusty Drums)](packs/rock-kit/) |
| Soul Kit |  | [Soul Kit (Karoryfer Unruly Drums)](packs/soul-kit/) |
| Studio Kit |  | [Studio Kit (Karoryfer Unruly Drums)](packs/studio-kit/) |
| Synth Percussion Kit |  | [FreePats Synthesizer Percussion](packs/freepats-synth-percussion/) |

### Percussion

| Instrument | Also played as | Pack |
|---|---|---|
| African Slit Drums |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Angklung | Ensemble | [Angklung and Khaen (OLPC)](packs/angklung-khaen/) |
| Bell Tree |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Bobobo Drums |  | [Karoryfer Gogodze Phu (Bobobo Drums)](packs/gogodze-phu/) |
| Bongo High | Muted | [Versilian Community Sample Library](packs/vcsl/) |
| Bongo Low |  | [Versilian Community Sample Library](packs/vcsl/) |
| Brush Snare Hits and Rolls |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Cabasa |  | [Dim Cabasa](packs/dim-cabasa/) |
| Claves |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Concert Bass Drum |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Conga |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Cymbal Bell |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Cymbal Swell (Long) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Cymbal Swell (Medium) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Cymbal Swell (Short) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Gong Ageng and Suwukan |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Gong, Kempur, Kemong, Kempli |  | [Balinese Gamelan (OLPC)](packs/gamelan-bali/) |
| Hand Percussion |  | [University of Iowa MIS: Percussion and Thai Gongs](packs/iowa-percussion/) |
| Hi-Hat (Closed) | Open, Pedal | [Versilian Community Sample Library](packs/vcsl/) |
| Hi-hats and Cymbals |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Javanese Gongs |  | [Javanese Gongs (OLPC)](packs/java-gongs/) |
| Kendhang |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Kethuk and Kempyang |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Kicks |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Nepalese Hand Bells |  | [Nepalese Hand Bells (VCSL)](packs/nepal-bells/) |
| Shaker (Down) |  | [Versilian Community Sample Library](packs/vcsl/) |
| Shaker (Up) |  | [Versilian Community Sample Library](packs/vcsl/) |
| Shakers |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Sleigh Bells |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Sleigh Bells |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Slide Whistle |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Snare | Brushes | [VSCO 2 Community Edition](packs/vsco2/) |
| Snare Cross-stick |  | [Versilian Community Sample Library](packs/vcsl/) |
| Snare Drum |  | [Versilian Community Sample Library](packs/vcsl/) |
| Snare Roll |  | [Versilian Community Sample Library](packs/vcsl/) |
| Snares and Snaps |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Suspended and Orchestral Cymbals |  | [University of Iowa MIS: Percussion and Thai Gongs](packs/iowa-percussion/) |
| Suspended Cymbal (Mallet) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Suspended Cymbal (Stick) |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Tabla | Strokes | [Tabla (OLPC, Sonic Pi)](packs/tabla/) |
| Tam-tams and Wind Gong |  | [University of Iowa MIS: Percussion and Thai Gongs](packs/iowa-percussion/) |
| Tambourine |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Tambourines |  | [University of Iowa MIS: Percussion and Thai Gongs](packs/iowa-percussion/) |
| Temple Blocks |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Toms and Hits |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Triangle |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Triangle |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Tumba |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Turtle Drum |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Wind Chimes |  | [Ethan Winer's Instruments](packs/ethan-winer/) |

### Tuned percussion

| Instrument | Also played as | Pack |
|---|---|---|
| Bonang Barung (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Bonang Barung (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Bonang Penerus (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Bonang Penerus (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Calung |  | [Balinese Gamelan (OLPC)](packs/gamelan-bali/) |
| Crotales |  | [University of Iowa MIS: Mallets](packs/iowa-mallets/) |
| Finger Cymbals |  | [Versilian Community Sample Library](packs/vcsl/) |
| Gambang (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Gambang (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Gangsa Kantilan |  | [Balinese Gamelan (OLPC)](packs/gamelan-bali/) |
| Gangsa Pemade |  | [Balinese Gamelan (OLPC)](packs/gamelan-bali/) |
| Gendèr Barung (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Gendèr Barung (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Gendèr Penerus (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Gendèr Penerus (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Glockenspiel |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Glockenspiel | Brass Mallets | [University of Iowa MIS: Mallets](packs/iowa-mallets/) |
| Glockenspiel |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Gong |  | [Versilian Community Sample Library](packs/vcsl/) |
| Jegogan |  | [Balinese Gamelan (OLPC)](packs/gamelan-bali/) |
| Kempul (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Kempul (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Kenong (Pelog) | Pelog, Damped | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Kenong (Slendro) | Slendro, Damped | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Marimba | Cord Mallets, Rubber Mallets, Roll, Dead Strokes | [University of Iowa MIS: Mallets](packs/iowa-mallets/) |
| Marimba |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Reyong |  | [Balinese Gamelan (OLPC)](packs/gamelan-bali/) |
| Saron Barung (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Saron Barung (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Saron Demung (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Saron Demung (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Saron Peking (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Saron Peking (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Singing Bowls |  | [Singing Bowls (OLPC)](packs/singing-bowls/) |
| Slenthem (Pelog) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Slenthem (Slendro) |  | [Javanese Gamelan (Casa da Música)](packs/gamelan-java/) |
| Steel Pan |  | [jSteelDrum](packs/steel-drum/) |
| Temple Block |  | [Versilian Community Sample Library](packs/vcsl/) |
| Thai Gongs |  | [University of Iowa MIS: Percussion and Thai Gongs](packs/iowa-percussion/) |
| Timpani | Roll | [VSCO 2 Community Edition](packs/vsco2/) |
| Vibraphone | Damped, Short, Bowed | [University of Iowa MIS: Mallets](packs/iowa-mallets/) |
| Vibraphone | Bowed | [Versilian Community Sample Library](packs/vcsl/) |
| Xylophone | Rosewood Mallets, Roll | [University of Iowa MIS: Mallets](packs/iowa-mallets/) |

### Strings

| Instrument | Also played as | Pack |
|---|---|---|
| Basses (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| Cello |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Cellos | Pizzicato, Spiccato, Tremolo | [VSCO 2 Community Edition](packs/vsco2/) |
| Cellos (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| Celtic Harp |  | [Etherealwinds Harp II CE](packs/harp/) |
| Contrabass | Pizzicato, Spiccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Erhu | Short | [Erhu](packs/erhu/) |
| Harp |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Solo Cello | Staccato, Pizzicato | [Karoryfer x bigcat Cello](packs/bigcat-cello/) |
| Solo Cello | Pizzicato | [University of Iowa MIS: Solo Strings](packs/iowa-strings/) |
| Solo Viola | Pizzicato | [University of Iowa MIS: Solo Strings](packs/iowa-strings/) |
| Solo Violin | Pizzicato | [University of Iowa MIS: Solo Strings](packs/iowa-strings/) |
| Solo Violin |  | [VSCO 2 Community Edition](packs/vsco2/) |
| Violas | Pizzicato, Spiccato, Tremolo | [VSCO 2 Community Edition](packs/vsco2/) |
| Violas (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| Violins | Pizzicato, Spiccato, Tremolo | [VSCO 2 Community Edition](packs/vsco2/) |
| Violins (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |

### Bass

| Instrument | Also played as | Pack |
|---|---|---|
| Electric Bass (Fingered) |  | [FreePats Bass Guitar YR](packs/freepats-bass/) |
| Electric Bass (Picked) |  | [FreePats Bass Guitar YR](packs/freepats-bass/) |
| Finger Bass (5-string) | Staccato, Ghost Notes | [Karoryfer Black And Blue Basses](packs/black-blue-basses/) |
| Jazz Bass | Staccato | [Karoryfer Growlybass](packs/growlybass/) |
| Jazz Double Bass |  | [Karoryfer Meatbass](packs/meatbass/) |
| Pick Bass (5-string) |  | [Karoryfer Black And Blue Basses](packs/black-blue-basses/) |
| Solo Double Bass | Pizzicato | [University of Iowa MIS: Solo Strings](packs/iowa-strings/) |
| Transistor Organ Bass 8' |  | [Karoryfer Caveman Cosmonaut (Transistor Organ)](packs/caveman-cosmonaut/) |

### Guitars and plucked strings

| Instrument | Also played as | Pack |
|---|---|---|
| Black Guitar | Staccato | [Karoryfer Black And Green Guitars](packs/black-green-guitars/) |
| Classical Guitar |  | [FreePats Spanish Classical Guitar](packs/freepats-guitar/) |
| Dan Tranh (Zither) | Glissando Down, Glissando Up, Tremolo | [Versilian Community Sample Library](packs/vcsl/) |
| Electric Guitar (Clean) |  | [FreePats Electric Guitars (FSBS)](packs/freepats-electric-guitars/) |
| Electric Guitar (Distorted) |  | [FreePats Electric Guitars (FSBS)](packs/freepats-electric-guitars/) |
| Electric Guitar (Jazz) |  | [FreePats Electric Guitars (FSBS)](packs/freepats-electric-guitars/) |
| Green Guitar | Staccato | [Karoryfer Black And Green Guitars](packs/black-green-guitars/) |

### Woodwinds

| Instrument | Also played as | Pack |
|---|---|---|
| Alto Flute |  | [University of Iowa MIS: Woodwinds](packs/iowa-winds/) |
| Alto Sax |  | [Karoryfer Weresax](packs/weresax/) |
| Alto Sax |  | [MTG Solo Saxophones](packs/mtg-sax/) |
| Alto Sax | No Vibrato | [University of Iowa MIS: Woodwinds](packs/iowa-winds/) |
| Baritone Sax | Staccato | [Karoryfer Bear Sax](packs/bear-sax/) |
| Baritone Sax |  | [MTG Solo Saxophones](packs/mtg-sax/) |
| Bass Clarinet |  | [University of Iowa MIS: Woodwinds](packs/iowa-winds/) |
| Bass Flute |  | [University of Iowa MIS: Woodwinds](packs/iowa-winds/) |
| Bassoon |  | [Ethan Winer's Instruments](packs/ethan-winer/) |
| Bassoon | Staccato | [University of Iowa MIS: Clarinet and Bassoon](packs/iowa/) |
| Bassoon | Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Bassoons (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| Clarinet | Staccato | [University of Iowa MIS: Clarinet and Bassoon](packs/iowa/) |
| Clarinet | Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Clarinets (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| E♭ Clarinet |  | [University of Iowa MIS: Woodwinds](packs/iowa-winds/) |
| Flute | No Vibrato | [University of Iowa MIS: Woodwinds](packs/iowa-winds/) |
| Flute | Non-vibrato, Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Flutes (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| Khaen |  | [Angklung and Khaen (OLPC)](packs/angklung-khaen/) |
| Oboe |  | [University of Iowa MIS: Woodwinds](packs/iowa-winds/) |
| Oboe | Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Oboes (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| Ocarina | Vibrato | [Versilian Community Sample Library](packs/vcsl/) |
| Soprano Sax |  | [MTG Solo Saxophones](packs/mtg-sax/) |
| Soprano Sax | No Vibrato | [University of Iowa MIS: Woodwinds](packs/iowa-winds/) |
| Tenor Sax |  | [MTG Solo Saxophones](packs/mtg-sax/) |

### Brass

| Instrument | Also played as | Pack |
|---|---|---|
| Bass Trombone |  | [University of Iowa MIS: Brass](packs/iowa-brass/) |
| French Horn |  | [University of Iowa MIS: Brass](packs/iowa-brass/) |
| French Horns | Muted, Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Horns (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| Tenor Trombone |  | [University of Iowa MIS: Brass](packs/iowa-brass/) |
| Trombones | Staccato, Vibrato | [VSCO 2 Community Edition](packs/vsco2/) |
| Trombones (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |
| Trumpet | No Vibrato | [University of Iowa MIS: Brass](packs/iowa-brass/) |
| Tuba | Staccato | [Karoryfer War Tuba](packs/war-tuba/) |
| Tuba |  | [University of Iowa MIS: Brass](packs/iowa-brass/) |
| Tuba | Staccato | [VSCO 2 Community Edition](packs/vsco2/) |
| Tubas (Layered) |  | [Orchestral Sections (VSCO 2, Iowa, Karoryfer)](packs/orchestral-sections/) |

### Voices

| Instrument | Also played as | Pack |
|---|---|---|
| Male Voice Ah |  | [Male Voice "Ah"](packs/vocal-ah/) |

### Other

| Instrument | Also played as | Pack |
|---|---|---|
| Ambient Textures |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Bagpipe Synth (Lonely) |  | [Karoryfer Cowsynth (Bagpipe Synth)](packs/cowsynth/) |
| Bagpipe Synth (Wheezy) |  | [Karoryfer Cowsynth (Bagpipe Synth)](packs/cowsynth/) |
| Bass Hits and Guitar |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Blackheart |  | [Karoryfer String Cyborgs (Synth Voices)](packs/string-cyborgs/) |
| Blips and Glitches |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Impacts and Vinyl |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Ironface | Distorted | [Karoryfer String Cyborgs (Synth Voices)](packs/string-cyborgs/) |
| Loops |  | [Sonic Pi Samples](packs/sonic-pi/) |
| Zinc |  | [Karoryfer String Cyborgs (Synth Voices)](packs/string-cyborgs/) |

<!-- end of catalog -->

## Libraries that aren't here, and why

Only libraries whose licence lets anyone fetch, play and share the samples, and whose samples are
clearly their authors' own, become packs. These were looked at and left out:

| Library | Why not |
|---|---|
| Sonatina Symphonic Orchestra | Its licence (Creative Commons Sampling Plus) isn't one that allows this, and it carries Philharmonia samples inside it. |
| Philharmonia Orchestra samples | Their terms don't allow them to be redistributed. |
| jRhodes | Non-commercial only. |
| Spitfire LABS | Its licence forbids redistributing the samples. |
| Hydrogen drum kits | Where many of their samples came from isn't documented. |
| "Public domain" 808 and 909 sample sets | Recordings of commercial machines' sounds whose provenance can't be shown. |
| SM Drums | Unclear provenance. |
| Splendid Grand Piano | Unclear provenance. |
| Any Bösendorfer sample set | None has a licence that allows this. |
| Freesound | A script gets only lossy previews: the original files need each user's own login. |

**Not here yet:** DrumGizmo's MuldjordKit and DRSKit. Each is recorded through many microphones, so they
wait for kits that keep their microphones apart.

## How HO[LO] Desk uses this

HO[LO] Desk pins one commit of this repository in its `packs.lock.json`, with every pack's hash.

- The studio fetches each map from GitHub at that commit and keeps it only if its hash is the one the
  lock names.
- So every studio on one version of HO[LO] Desk offers the same packs.
- An *experience* (a project that builds its own music with a pinned copy of HO[LO]'s engine) pins
  exactly the maps its songs play.

New packs, and changes to a pack, reach the studio when HO[LO] Desk's lock moves to a newer commit of
this repository. In a HO[LO] Desk checkout:

```bash
pnpm packs lock
```

Then commit the lock there, as any other change.

## Layout

```
packs/<id>/README.md      the pack's page: where its sounds come from, what's in it
packs/<id>/pack.json      the map: instruments, zones, levels, pads, the source and how files are made
packs/<id>/files.sha256   every sample's sha256, as `sha256sum -c` reads them
packs/<id>/recipe.mjs     how pack.json was made, for the packs made from recordings
tools/lib.mjs, kit.mjs    what the recipes share: fetching, measuring, levelling, writing a pack
tools/iowa.mjs, unruly.mjs  the Iowa pages and Unruly Drums' folders, as their recipes read them
tools/sampler.mjs         played instruments (pianos, strings, winds…) from a library's recordings
tools/sfz.mjs             an SFZ program read as a player reads it, for the recipes that map one
tools/private.mjs         what makes a pack someone's own, which never comes here
tools/checksums.mjs       files.sha256 and the pack's size, from a pack installed in HO[LO]'s data folder
tools/readme.mjs          the parts of the READMEs that come from the maps (the catalog, each pack's facts)
tools/check.mjs           every pack checked with HO[LO] Desk's own code (what CI runs)
```

## Adding a pack

The recipes and the check run HO[LO] Desk's own code, the code an install makes files with, so a recipe
makes exactly the bytes an install makes. Keep a HO[LO] Desk checkout beside this one with its packages
installed, or point `HOLO_DESK` at one. Use the Node.js its `.nvmrc` names.

```bash
git clone https://github.com/shooter-git/holo-desk ../holo-desk
```

```bash
pnpm --dir ../holo-desk install
```

1. **Make the folder.** Create `packs/<id>/`, named by the pack's id. A pack you imported into HO[LO]
   from your own files (its id starts with `mine-`) stays on your computer: this repository is public,
   and its tools and check refuse one.
   - A recipe (`recipe.mjs`) writes `pack.json` and `files.sha256` itself.
   - A library taken whole from git needs only its `pack.json`. Then
     `node tools/checksums.mjs <id>` writes its checksums and its size from the pack installed in
     HO[LO]'s data folder.
2. **Credit it.** Give it a `credit` and a `license` in `pack.json`, and a row in
   [CREDITS.md](CREDITS.md). Check that the licence lets anyone fetch and play the samples, and that a
   script can fetch the source at a pinned version.
3. **Write its page.** Put `packs/<id>/README.md` above the line `tools/readme.mjs` leaves: where its
   sounds come from, how they were recorded, and what's special about it. Then run:

   ```bash
   node tools/readme.mjs
   ```

   That writes the pack's facts below the line, and the catalog above.
4. **Check it:**

   ```bash
   node tools/check.mjs
   ```

5. **Open a pull request.** Once it's merged, `pnpm packs lock` in HO[LO] Desk brings it to the studio.

## Licence

The maps, checksums, recipes and tools are MIT ([LICENSE](LICENSE)). Each pack's samples keep their own
licence, which its `pack.json` names (`license`) and its page links.
