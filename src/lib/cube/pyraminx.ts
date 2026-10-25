// A sticker-level Pyraminx simulator in WCA notation: U, L, R, B turn the
// two layers at that vertex, u, l, r, b just the tip, clockwise looking at
// the vertex. Used to check tutorial algorithms.

type Vec = [number, number, number];
export type Vertex = "U" | "L" | "R" | "B";

const r = Math.sqrt(8) / 3;
export const VERTICES: Record<Vertex, Vec> = {
  U: [0, 1, 0],
  L: [-r * Math.sin(Math.PI / 3), -1 / 3, r * Math.cos(Math.PI / 3)],
  R: [r * Math.sin(Math.PI / 3), -1 / 3, r * Math.cos(Math.PI / 3)],
  B: [0, -1 / 3, -r],
};

// Faces are named by the vertex they don't touch
const FACE_VERTICES: Record<Vertex, Array<Vertex>> = {
  U: ["L", "R", "B"],
  L: ["U", "R", "B"],
  R: ["U", "L", "B"],
  B: ["U", "L", "R"],
};

export interface PyraSticker {
  pos: Vec;
  color: Vertex;
}

const add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a: Vec, k: number): Vec => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a: Vec, b: Vec): Vec => add(a, scale(b, -1));

export const solvedPyraminx = (): Array<PyraSticker> => {
  const stickers: Array<PyraSticker> = [];

  (Object.keys(FACE_VERTICES) as Array<Vertex>).forEach((face) => {
    const [p, q, s] = FACE_VERTICES[face].map((v) => VERTICES[v]);
    const point = (i: number, j: number): Vec =>
      add(p, add(scale(sub(q, p), i / 3), scale(sub(s, p), j / 3)));
    const centroid = (a: Vec, b: Vec, c: Vec) => scale(add(a, add(b, c)), 1 / 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; i + j < 3; j++) {
        stickers.push({
          pos: centroid(point(i, j), point(i + 1, j), point(i, j + 1)),
          color: face,
        });
        if (i + j < 2) {
          stickers.push({
            pos: centroid(point(i + 1, j), point(i, j + 1), point(i + 1, j + 1)),
            color: face,
          });
        }
      }
    }
  });

  return stickers;
};

// Rotate about a unit axis by an angle (right hand rule)
const rotate = (v: Vec, axis: Vec, angle: number): Vec => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const [x, y, z] = axis;
  const cross: Vec = [y * v[2] - z * v[1], z * v[0] - x * v[2], x * v[1] - y * v[0]];

  return add(add(scale(v, c), scale(cross, s)), scale(axis, dot(axis, v) * (1 - c)));
};

// Distance along the vertex axis: tips beyond the first cut, the two layer
// block beyond the second
const TIP_CUT = 1 - 4 / 9;
const LAYER_CUT = 1 - 8 / 9;

export const applyPyraminx = (
  stickers: Array<PyraSticker>,
  alg: string,
): Array<PyraSticker> =>
  alg
    .split(/\s+/)
    .filter(Boolean)
    .reduce((state, move) => {
      const match = move.match(/^([ULRBulrb])('?)$/);
      if (!match) throw new Error(`Unknown move: ${move}`);

      const vertex = match[1].toUpperCase() as Vertex;
      const axis = VERTICES[vertex];
      const cut = match[1] === vertex ? LAYER_CUT : TIP_CUT;
      // Clockwise looking at the vertex is a negative turn about its axis
      const angle = ((2 * Math.PI) / 3) * (match[2] ? 1 : -1);

      return state.map((s) =>
        dot(s.pos, axis) > cut ? { ...s, pos: rotate(s.pos, axis, angle) } : s,
      );
    }, stickers);

// Rounded, and with -0 folded into 0, so positions survive float drift
const key = (v: Vec) => v.map((x) => Math.round(x * 1000) + 0).join(",");

// Positions whose sticker color differs from solved
export const changedPositions = (stickers: Array<PyraSticker>): Array<Vec> => {
  const start = new Map(solvedPyraminx().map((s) => [key(s.pos), s.color]));
  return stickers.filter((s) => start.get(key(s.pos)) !== s.color).map((s) => s.pos);
};

// Which kind of piece a sticker belongs to, by how close it is to a vertex
export const pieceKind = (pos: Vec): "tip" | "center" | "edge" => {
  const nearest = Math.max(
    ...Object.values(VERTICES).map((v) => dot(pos, v)),
  );
  if (nearest > TIP_CUT) return "tip";
  if (nearest > LAYER_CUT) {
    // Centers sit next to one vertex; edge stickers are halfway between two
    const close = Object.values(VERTICES).filter((v) => dot(pos, v) > LAYER_CUT);
    return close.length === 1 ? "center" : "edge";
  }
  return "edge";
};
