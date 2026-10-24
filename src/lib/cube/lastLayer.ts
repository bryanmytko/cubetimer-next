import { Cube, Vec, applyAlg, faceGrid, invertAlg, normalize, solved } from "./nxn";

// The state an algorithm solves: run it backwards from solved
export const caseFor = (n: number, alg: string, preAuf = ""): Cube =>
  normalize(applyAlg(solved(n), `${preAuf} ${invertAlg(alg)}`));

const SIDES = ["F", "R", "B", "L"] as const;

// Which last layer stickers are yellow: the top face, then the top row of
// each side face
export const orientationPattern = (cube: Cube): string =>
  [
    ...faceGrid(cube, "U").flat(),
    ...SIDES.flatMap((side) => faceGrid(cube, side)[0]),
  ]
    .map((color) => (color === "U" ? "1" : "0"))
    .join("");

const AUFS = ["", "U", "U2", "U'"];

// The same orientation case seen from any side gives the same key
export const ollKey = (n: number, alg: string): string =>
  AUFS.map((auf) => orientationPattern(applyAlg(caseFor(n, alg), auf)))
    .sort()[0];

const lastLayerColors = (cube: Cube): string =>
  SIDES.flatMap((side) => faceGrid(cube, side)[0]).join("");

// The same permutation case, whatever the U turns before and after, gives
// the same key
export const pllKey = (n: number, alg: string): string =>
  AUFS.flatMap((pre) =>
    AUFS.map((post) => lastLayerColors(applyAlg(caseFor(n, alg, pre), post))),
  ).sort()[0];

export interface Movement {
  from: Vec;
  to: Vec;
}

// Where each last layer piece goes when the algorithm is done. Positions are
// cubie coordinates; only pieces that move are listed.
export const pieceMovements = (n: number, alg: string, postAuf = ""): Array<Movement> => {
  const cube = applyAlg(normalize(applyAlg(solved(n), alg)), postAuf);
  const seen = new Set<string>();
  const movements: Array<Movement> = [];

  cube.stickers.forEach(({ pos, home }) => {
    const id = home.join(",");
    if (pos[1] !== n - 1 || seen.has(id)) return;
    seen.add(id);

    if (id !== pos.join(",")) movements.push({ from: home, to: pos });
  });

  return movements;
};

const isCorner = ([x, , z]: Vec, n: number) =>
  Math.abs(x) === n - 1 && Math.abs(z) === n - 1;

// Lengths of the cycles pieces move in, e.g. [3] for a three piece cycle
export const cycleLengths = (
  movements: Array<Movement>,
  n: number,
): { corners: Array<number>; edges: Array<number> } => {
  const next = new Map(movements.map((m) => [m.from.join(","), m]));
  const visited = new Set<string>();
  const corners: Array<number> = [];
  const edges: Array<number> = [];

  movements.forEach((start) => {
    let length = 0;
    let current: Movement | undefined = start;

    while (current && !visited.has(current.from.join(","))) {
      visited.add(current.from.join(","));
      length++;
      current = next.get(current.to.join(","));
    }

    if (length > 0) (isCorner(start.from, n) ? corners : edges).push(length);
  });

  return { corners: corners.sort(), edges: edges.sort() };
};

// The U turn to do after an algorithm, if any, so it moves the fewest pieces
// in the shortest cycles (how PLL charts draw them)
export const bestPostAuf = (n: number, alg: string): string => {
  const cost = (auf: string) => {
    const movements = pieceMovements(n, alg, auf);
    const { corners, edges } = cycleLengths(movements, n);
    return movements.length * 10 + Math.max(0, ...corners, ...edges);
  };

  return AUFS.reduce((best, auf) => (cost(auf) < cost(best) ? auf : best));
};
