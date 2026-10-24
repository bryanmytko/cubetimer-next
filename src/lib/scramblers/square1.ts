import { randInt } from "../random";

// A layer is 12 slots of 30°, each holding the id of the piece in it. Corners
// fill two slots and edges one. Slots count clockwise as seen looking at that
// layer, starting at the front of the slice, so the slice cuts between slots
// 11|0 and 5|6.
export type Layer = Array<number>;

export const SOLVED_TOP: Layer = [0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7];
export const SOLVED_BOTTOM: Layer = [8, 9, 9, 10, 11, 11, 12, 13, 13, 14, 15, 15];

const SLASHES = 12;

// Turn a layer clockwise by `amount` slots
export const rotate = (layer: Layer, amount: number): Layer =>
  layer.map((_, i) => layer[(i - amount + 12) % 12]);

// The slice can only turn when it doesn't cut through a corner
export const canSlice = (layer: Layer): boolean =>
  layer[0] !== layer[11] && layer[6] !== layer[5];

// "/" turns the right half 180°, swapping the second half of the top layer
// with the first half of the bottom
export const slash = (top: Layer, bottom: Layer): [Layer, Layer] => [
  [...top.slice(0, 6), ...bottom.slice(0, 6)],
  [...top.slice(6), ...bottom.slice(6)],
];

export const legalTwists = (layer: Layer): Array<number> => {
  const twists = [];

  for (let amount = -5; amount <= 6; amount++) {
    if (canSlice(rotate(layer, amount))) twists.push(amount);
  }

  return twists;
};

// WCA notation: (top, bottom) clockwise twists in 30° steps, each followed by
// a slice turn
export const generateSquare1 = (): string => {
  let top = SOLVED_TOP;
  let bottom = SOLVED_BOTTOM;
  const moves = [];

  for (let i = 0; i < SLASHES; i++) {
    const topTwists = legalTwists(top);
    const bottomTwists = legalTwists(bottom);
    let x, y;

    // (0,0) would just undo the previous slice
    do {
      x = topTwists[randInt(0, topTwists.length - 1)];
      y = bottomTwists[randInt(0, bottomTwists.length - 1)];
    } while (x === 0 && y === 0);

    [top, bottom] = slash(rotate(top, x), rotate(bottom, y));
    moves.push(`(${x},${y})`);
  }

  return `${moves.join(" / ")} /`;
};
