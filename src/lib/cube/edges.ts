import { Cube, Sticker } from "./nxn";

const EDGE_NAMES: Record<string, string> = {
  "0,1,1": "UF", "1,1,0": "UR", "0,1,-1": "UB", "-1,1,0": "UL",
  "0,-1,1": "DF", "1,-1,0": "DR", "0,-1,-1": "DB", "-1,-1,0": "DL",
  "1,0,1": "FR", "-1,0,1": "FL", "1,0,-1": "BR", "-1,0,-1": "BL",
};

// Which edge slot a sticker's position is in, if it's an edge piece
const slotOf = (cube: Cube, s: Sticker): string | undefined => {
  const m = cube.n - 1;
  const outer = s.pos.map((v) => (Math.abs(v) === m ? Math.sign(v) : 0));
  if (outer.filter((v) => v !== 0).length !== 2) return undefined;
  return EDGE_NAMES[outer.join()];
};

// Edge slots whose pieces don't all match, e.g. ["FL", "FR"]
export const unpairedEdges = (cube: Cube): Array<string> => {
  const colors = new Map<string, Set<string>>();

  cube.stickers.forEach((s) => {
    const slot = slotOf(cube, s);
    if (!slot) return;
    const key = `${slot}|${s.normal.join()}`;
    if (!colors.has(key)) colors.set(key, new Set());
    colors.get(key)?.add(s.color);
  });

  const broken = new Set<string>();
  colors.forEach((set, key) => {
    if (set.size > 1) broken.add(key.split("|")[0]);
  });
  return Array.from(broken).sort();
};
