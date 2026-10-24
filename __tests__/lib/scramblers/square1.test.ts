import {
  SOLVED_BOTTOM,
  SOLVED_TOP,
  canSlice,
  generateSquare1,
  legalTwists,
  rotate,
  slash,
} from "../../../src/lib/scramblers/square1";

const RUNS = 200;
const times = (fn: () => void) => Array.from({ length: RUNS }).forEach(fn);

const parse = (scramble: string): Array<[number, number]> =>
  Array.from(scramble.matchAll(/\((-?\d+),(-?\d+)\)/g)).map((match) => [
    Number(match[1]),
    Number(match[2]),
  ]);

describe("Square-1", () => {
  describe("puzzle model", () => {
    // These match what a real Square-1 can do from cube shape
    it("allows the correct top twists from solved", () => {
      expect(legalTwists(SOLVED_TOP).sort((a, b) => a - b)).toEqual([
        -5, -3, -2, 0, 1, 3, 4, 6,
      ]);
    });

    it("allows the correct bottom twists from solved", () => {
      expect(legalTwists(SOLVED_BOTTOM).sort((a, b) => a - b)).toEqual([
        -4, -3, -1, 0, 2, 3, 5, 6,
      ]);
    });

    it("returns to solved after two slices", () => {
      const [top, bottom] = slash(...slash(SOLVED_TOP, SOLVED_BOTTOM));

      expect(top).toEqual(SOLVED_TOP);
      expect(bottom).toEqual(SOLVED_BOTTOM);
    });

    it("returns to the start after a full rotation", () => {
      expect(rotate(rotate(SOLVED_TOP, 5), 7)).toEqual(SOLVED_TOP);
    });
  });

  describe("generateSquare1", () => {
    it("uses WCA notation", () => {
      times(() => {
        expect(generateSquare1()).toMatch(
          /^(\(-?[0-6],-?[0-6]\) \/ )*\(-?[0-6],-?[0-6]\) \/$/,
        );
      });
    });

    it("generates 12 twists", () => {
      expect(parse(generateSquare1())).toHaveLength(12);
    });

    it("uses twists between -5 and 6 and never (0,0)", () => {
      times(() => {
        parse(generateSquare1()).forEach(([x, y]) => {
          expect(x).toBeGreaterThanOrEqual(-5);
          expect(x).toBeLessThanOrEqual(6);
          expect(y).toBeGreaterThanOrEqual(-5);
          expect(y).toBeLessThanOrEqual(6);
          expect(x === 0 && y === 0).toBeFalsy();
        });
      });
    });

    it("only generates scrambles that can be done on a real puzzle", () => {
      times(() => {
        let top = SOLVED_TOP;
        let bottom = SOLVED_BOTTOM;

        parse(generateSquare1()).forEach(([x, y]) => {
          top = rotate(top, x);
          bottom = rotate(bottom, y);

          expect(canSlice(top)).toBeTruthy();
          expect(canSlice(bottom)).toBeTruthy();

          [top, bottom] = slash(top, bottom);
        });
      });
    });
  });
});
