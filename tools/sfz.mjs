// An SFZ instrument read the way a player reads it, for the recipes whose libraries say what each sample
// is only in their SFZ files (their samples' names are codes): its `#include` files and `#define`
// variables resolved, and each region with every opcode it inherits from its <global>, <master> and
// <group> headers, and the <control> header's defaults (each CC's starting value).

/** A path joined to a folder, its `..` and `.` resolved ("a/b" + "../c" is "a/c"). */
function joinPath(dir, rel) {
  const out = dir ? dir.split('/') : [];
  for (const part of rel.split('/')) {
    if (part === '..') out.pop();
    else if (part && part !== '.') out.push(part);
  }
  return out.join('/');
}

/**
 * Every region of the SFZ file at `path` (a path in the library). `read(path)` returns a file's text
 * (async). Returns { regions, control, defines }: `regions` each an object of its opcodes (the
 * headers' it inherits, overridden by its own); `control` the <control> header's opcodes (set_ccN,
 * set_hdccN, default_path, labels); `defines` every variable as last defined.
 */
export async function readSfz(path, read) {
  const base = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
  const defines = new Map();
  // a variable is the longest defined name at the `$` ($CODE_01, not $CODE; $MIC in "$MIC_$ART")
  const expand = (text) =>
    text.replace(/\$[A-Za-z0-9_]+/g, (word) => {
      for (let n = word.length; n > 1; n--) {
        const v = defines.get(word.slice(0, n));
        if (v !== undefined) return v + word.slice(n);
      }
      return word;
    });

  // the text with its includes in place and its variables expanded, in the order a player reads it
  // (an include is found from the main file's folder, as ARIA and sfizz find them)
  const chunks = [];
  const load = async (file, depth = 0) => {
    if (depth > 16) throw new Error(`${file}: includes nested too deep`);
    const text = (await read(file)).replace(/\/\*[\s\S]*?\*\//g, '');
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.replace(/\/\/.*$/, '');
      const parts = line.split(/(?=#define\s|#include\s)/);
      for (const part of parts) {
        const def = /^#define\s+(\$[A-Za-z0-9_]+)\s*(.*)$/.exec(part.trim());
        const inc = /^#include\s+"([^"]+)"/.exec(part.trim());
        if (def) defines.set(def[1], expand(def[2].trim()));
        else if (inc) await load(joinPath(base, inc[1]), depth + 1);
        else if (part.trim()) chunks.push(expand(part));
      }
    }
  };
  await load(path);

  const control = {};
  const regions = [];
  let header = null;
  let global = {};
  let master = {};
  let group = {};
  let region = null;
  const levels = { control, global, master, group };
  const close = () => {
    if (region) regions.push({ ...global, ...master, ...group, ...region });
    region = null;
  };
  // headers (<group>) and opcodes (name=value, a value running to the next opcode or header)
  const token = /<([a-z]+)>|([A-Za-z0-9_]+)=/g;
  const text = chunks.join('\n');
  let m;
  let pending = null;
  const flush = (end) => {
    if (!pending) return;
    const value = text.slice(pending.from, end).trim();
    if (header === 'region') region[pending.name] = value;
    else if (levels[header]) levels[header][pending.name] = value;
    pending = null;
  };
  while ((m = token.exec(text))) {
    flush(m.index);
    if (m[1]) {
      header = m[1];
      if (header === 'region') {
        close();
        region = {};
      } else {
        close();
        if (header === 'global') {
          global = {};
          master = {};
          group = {};
        } else if (header === 'master') {
          master = {};
          group = {};
        } else if (header === 'group') group = {};
        levels.global = global;
        levels.master = master;
        levels.group = group;
      }
    } else pending = { name: m[2], from: m.index + m[0].length };
  }
  flush(text.length);
  close();
  return { regions, control, defines: Object.fromEntries(defines) };
}

/** A CC's starting value (0 to 1) as the <control> header sets it (set_hdccN, else set_ccN / 127). */
export function ccDefault(control, cc) {
  if (control[`set_hdcc${cc}`] !== undefined) return Number(control[`set_hdcc${cc}`]);
  if (control[`set_cc${cc}`] !== undefined) return Number(control[`set_cc${cc}`]) / 127;
  return 0;
}
