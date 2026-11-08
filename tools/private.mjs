// Packs that are someone's own never come here. HO[LO] Desk imports a pack from a person's own files
// (its source "imported", its id "mine-…"), and an experience can play files only its maker has (its
// source "local"). This repository is public, and everything in it is published, so the tools that
// write a pack into it refuse those before writing anything, and the check fails on them.

/** Source kinds of packs made from someone's own files. */
export const PRIVATE_KINDS = new Set(['imported', 'local']);

/** Why a pack is private (so never belongs in this repository), or null when it isn't. */
export function privateReason(pack) {
  const kind = pack?.source?.kind;
  if (PRIVATE_KINDS.has(kind))
    return (
      `its source is "${kind}": a pack made from someone's own files, which stays on their computer. ` +
      'This repository is public, so a private pack must never be written into it'
    );
  if (typeof pack?.id === 'string' && pack.id.startsWith('mine-'))
    return `its id starts with "mine-", which HO[LO] Desk keeps for packs people import from their own files`;
  return null;
}

/** Throws before anything is written when a pack is private. */
export function refusePrivate(pack, doing) {
  const why = privateReason(pack);
  if (why) throw new Error(`Not ${doing} ${pack?.id ?? 'this pack'}: ${why}.`);
}
