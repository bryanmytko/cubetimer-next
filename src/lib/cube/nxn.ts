// A sticker-level NxN cube simulator, used to draw tutorial diagrams and to
// check that tutorial algorithms do what they claim.
//
// Coordinates: x points right, y up, z towards the viewer (front). Cubie
// positions run from -(n-1) to n-1 in steps of 2, so the cube is centered on
// the origin for any size.

export type Face = "U" | "D" | "F" | "B" | "R" | "L";
export type Vec = [number, number, number];

export interface Sticker {
  pos: Vec;
  normal: Vec;
  color: Face;
  // Where this sticker's cubie started, to track pieces as well as colors
  home: Vec;
}

export interface Cube {
  n: number;
  stickers: Array<Sticker>;
}

export const FACES: Array<Face> = ["U", "R", "F", "D", "L", "B"];

export const NORMALS: Record<Face, Vec> = {
  U: [0, 1, 0],
  D: [0, -1, 0],
  R: [1, 0, 0],
  L: [-1, 0, 0],
  F: [0, 0, 1],
  B: [0, 0, -1],
};

const AXIS: Record<Face, number> = { R: 0, L: 0, U: 1, D: 1, F: 2, B: 2 };

const coords = (n: number): Array<number> =>
  Array.from({ length: n }, (_, i) => -(n - 1) + 2 * i);

export const solved = (n: number): Cube => {
  const stickers: Array<Sticker> = [];

  FACES.forEach((face) => {
    const normal = NORMALS[face];
    const axis = AXIS[face];
    const [a, b] = [0, 1, 2].filter((i) => i !== axis);

    coords(n).forEach((u) => {
      coords(n).forEach((v) => {
        const pos: Vec = [0, 0, 0];
        pos[axis] = normal[axis] * (n - 1);
        pos[a] = u;
        pos[b] = v;
        stickers.push({ pos, normal, color: face, home: [...pos] as Vec });
      });
    });
  });

  return { n, stickers };
};

// A quarter turn counter-clockwise, looking from the positive end of the axis
const rotateCCW = (v: Vec, axis: number): Vec => {
  const [x, y, z] = v;

  if (axis === 0) return [x, -z, y];
  if (axis === 1) return [z, y, -x];
  return [-y, x, z];
};

interface Turn {
  axis: number;
  // Which layers turn, by cubie coordinate along the axis
  layers: (coord: number) => boolean;
  // Counter-clockwise quarter turns about the positive axis
  quarters: number;
}

const turn = (cube: Cube, { axis, layers, quarters }: Turn): Cube => {
  const q = ((quarters % 4) + 4) % 4;

  return {
    n: cube.n,
    stickers: cube.stickers.map((sticker) => {
      if (!layers(sticker.pos[axis])) return sticker;

      let { pos, normal } = sticker;
      for (let i = 0; i < q; i++) {
        pos = rotateCCW(pos, axis);
        normal = rotateCCW(normal, axis);
      }
      return { ...sticker, pos, normal };
    }),
  };
};

const MOVE = /^(\d*)([RLUDFBrludfbMESxyz])(w?)(\d*)('?)$/;

// Parses one move in WCA/SiGN notation:
//   R    outer layer             2R   second layer only
//   Rw   outer two layers        3Rw  outer three layers
//   r    same as Rw              3r   same as 3Rw
//   M/E/S slices, x/y/z whole cube rotations
export const parseMove = (n: number, move: string): Turn => {
  const match = move.match(MOVE);
  if (!match) throw new Error(`Unknown move: ${move}`);

  const [, prefix, letter, wide, amountStr, prime] = match;
  const amount = (amountStr ? Number(amountStr) : 1) * (prime ? -1 : 1);
  const upper = letter.toUpperCase();

  if ("xyz".includes(letter)) {
    // Rotations turn like R, U and F
    return {
      axis: "xyz".indexOf(letter),
      layers: () => true,
      quarters: -amount,
    };
  }

  if ("MES".includes(letter)) {
    // M turns like L, E like D, S like F; all inner layers on big cubes
    const axis = "MES".indexOf(letter);
    return {
      axis,
      layers: (c) => Math.abs(c) < n - 1,
      quarters: letter === "S" ? -amount : amount,
    };
  }

  const face = upper as Face;
  const sign = NORMALS[face][AXIS[face]];
  const isWide = wide === "w" || letter !== upper;
  const depth = prefix ? Number(prefix) : isWide ? 2 : 1;
  // Layer k (1 = outermost) sits at this coordinate along the axis
  const layerCoord = (k: number) => sign * (n - 1 - 2 * (k - 1));

  const layers = isWide
    ? (c: number) => c * sign >= layerCoord(depth) * sign
    : (c: number) => c === layerCoord(depth);

  return { axis: AXIS[face], layers, quarters: -sign * amount };
};

const tokens = (alg: string): Array<string> =>
  alg.replace(/[()[\]]/g, " ").split(/\s+/).filter(Boolean);

export const applyAlg = (cube: Cube, alg: string): Cube =>
  tokens(alg).reduce((c, move) => turn(c, parseMove(c.n, move)), cube);

const invertMove = (move: string): string => {
  if (move.endsWith("'")) return move.slice(0, -1);
  if (/2$/.test(move)) return move;
  return `${move}'`;
};

export const invertAlg = (alg: string): string =>
  tokens(alg).reverse().map(invertMove).join(" ");

export type FaceGrid = Array<Array<Face>>;

// A face's stickers as seen looking straight at it, in the usual net layout:
// U with B at the top, D with F at the top, side faces with U at the top
export const faceGrid = (cube: Cube, face: Face): FaceGrid => {
  const { n } = cube;
  const m = n - 1;
  const grid: FaceGrid = Array.from({ length: n }, () => Array(n));
  const normal = NORMALS[face];

  cube.stickers.forEach(({ pos: [x, y, z], normal: nv, color }) => {
    if (nv[0] !== normal[0] || nv[1] !== normal[1] || nv[2] !== normal[2])
      return;

    const cell: Record<Face, [number, number]> = {
      U: [z + m, x + m],
      D: [m - z, x + m],
      F: [m - y, x + m],
      B: [m - y, m - x],
      R: [m - y, m - z],
      L: [m - y, z + m],
    };
    const [row, col] = cell[face];
    grid[row / 2][col / 2] = color;
  });

  return grid;
};

const key = (pos: Vec, normal: Vec) => `${pos.join(",")}|${normal.join(",")}`;

// True if every sticker matching `where` is back where it started
export const isSolvedWhere = (
  cube: Cube,
  where: (sticker: Sticker) => boolean,
): boolean => {
  const start = new Map(
    solved(cube.n).stickers.map((s) => [key(s.pos, s.normal), s.color]),
  );

  return cube.stickers
    .filter(where)
    .every((s) => start.get(key(s.pos, s.normal)) === s.color);
};

// Everything below the top layer
export const isF2LSolved = (cube: Cube): boolean =>
  isSolvedWhere(cube, (s) => s.pos[1] < cube.n - 1);

export const isSolved = (cube: Cube): boolean => isSolvedWhere(cube, () => true);

const ORIENTATIONS = ["", "y", "y2", "y'"].flatMap((y) =>
  ["", "x", "x2", "x'", "z", "z'"].map((r) => `${r} ${y}`),
);

// Undo any whole-cube rotation an algorithm leaves behind, by picking the
// orientation that matches the solved cube best
export const normalize = (cube: Cube): Cube => {
  const start = new Map(
    solved(cube.n).stickers.map((s) => [key(s.pos, s.normal), s.color]),
  );
  const score = (c: Cube) =>
    c.stickers.filter((s) => start.get(key(s.pos, s.normal)) === s.color)
      .length;

  return ORIENTATIONS.map((rotation) => applyAlg(cube, rotation)).reduce(
    (best, c) => (score(c) > score(best) ? c : best),
  );
};
