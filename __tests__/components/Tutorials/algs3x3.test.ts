import {
  OLL,
  OLL_CORNERS,
  OLL_EDGES,
  PLL,
  PllCycles,
} from "../../../src/components/Tutorials/content/algs3x3";
import {
  applyAlg,
  faceGrid,
  isF2LSolved,
  normalize,
  solved,
} from "../../../src/lib/cube/nxn";
import {
  bestPostAuf,
  caseFor,
  cycleLengths,
  ollKey,
  orientationPattern,
  pieceMovements,
  pllKey,
} from "../../../src/lib/cube/lastLayer";

const after = (alg: string) => normalize(applyAlg(solved(3), alg));
const SOLVED_PATTERN = orientationPattern(solved(3));

describe("3x3 algorithms", () => {
  describe.each([
    ["OLL", OLL],
    ["2-look OLL edges", OLL_EDGES],
    ["2-look OLL corners", OLL_CORNERS],
    ["PLL", PLL],
  ])("%s", (_, algs) => {
    it.each(algs.map((a) => [a.name, a.alg]))(
      "%s keeps the first two layers solved",
      (_, alg) => {
        expect(isF2LSolved(after(alg))).toBeTruthy();
      },
    );
  });

  describe("OLL", () => {
    it("covers all 57 cases exactly once", () => {
      const keys = OLL.map((a) => ollKey(3, a.alg));

      expect(new Set(keys).size).toBe(57);
      expect(keys).not.toContain(SOLVED_PATTERN);
    });

    it.each(OLL.map((a) => [a.name, a.alg]))(
      "%s solves a case that needs orienting",
      (_, alg) => {
        expect(orientationPattern(caseFor(3, alg))).not.toBe(SOLVED_PATTERN);
      },
    );
  });

  describe("2-look OLL", () => {
    // Edge stickers on the top face: back, left, right, front
    const topEdges = (alg: string) => {
      const top = faceGrid(caseFor(3, alg), "U");
      return [top[0][1], top[1][0], top[1][2], top[2][1]];
    };

    it.each(OLL_EDGES.map((a) => [a.name, a.alg]))(
      "%s orients the edges without needing corners oriented",
      (_, alg) => {
        expect(topEdges(alg).some((c) => c !== "U")).toBeTruthy();
      },
    );

    it("has the three edge cases", () => {
      const counts = OLL_EDGES.map(
        (a) => topEdges(a.alg).filter((c) => c === "U").length,
      );
      expect(counts).toEqual([2, 2, 0]);
    });

    it("has seven different corner cases with edges already oriented", () => {
      const keys = OLL_CORNERS.map((a) => ollKey(3, a.alg));
      expect(new Set(keys).size).toBe(7);

      OLL_CORNERS.forEach((a) => {
        expect(topEdges(a.alg).every((c) => c === "U")).toBeTruthy();
      });
    });
  });

  describe("PLL", () => {
    it.each(PLL.map((a) => [a.name, a.alg]))(
      "%s keeps the last layer oriented",
      (_, alg) => {
        expect(faceGrid(after(alg), "U").flat().every((c) => c === "U")).toBeTruthy();
      },
    );

    const expected: Record<PllCycles, { corners: number[]; edges: number[] }> =
      {
        corners3: { corners: [3], edges: [] },
        edges3: { corners: [], edges: [3] },
        corners2x2: { corners: [2, 2], edges: [] },
        edges2x2: { corners: [], edges: [2, 2] },
        swap: { corners: [2], edges: [2] },
        both3: { corners: [3], edges: [3] },
      };

    it.each(PLL.map((a) => [a.name, a.alg, a.cycles]))(
      "%s moves the pieces it should",
      (_, alg, cycles) => {
        const movements = pieceMovements(3, alg, bestPostAuf(3, alg));
        expect(cycleLengths(movements, 3)).toEqual(expected[cycles as PllCycles]);
      },
    );

    it("covers all 21 cases exactly once", () => {
      expect(new Set(PLL.map((a) => pllKey(3, a.alg))).size).toBe(21);
    });
  });
});
