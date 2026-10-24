import {
  TWO_OLL,
  TWO_PBL,
  twoByTwo,
} from "../../../src/components/Tutorials/content/twoByTwo";
import {
  Vec,
  applyAlg,
  faceGrid,
  isF2LSolved,
  normalize,
  solved,
} from "../../../src/lib/cube/nxn";
import { ollKey, pieceMovements } from "../../../src/lib/cube/lastLayer";

const after = (alg: string) => normalize(applyAlg(solved(2), alg));

describe("2x2 algorithms", () => {
  it.each(TWO_OLL.map((a) => [a.name, a.alg]))(
    "%s keeps the bottom layer solved",
    (_, alg) => {
      expect(isF2LSolved(after(alg))).toBeTruthy();
    },
  );

  it("has seven different OLL cases", () => {
    expect(new Set(TWO_OLL.map((a) => ollKey(2, a.alg))).size).toBe(7);
  });

  it("uses the same T perm in the beginner method", () => {
    const tPerm = twoByTwo.stages[0].steps[2].algs?.[0].alg;
    expect(TWO_PBL.find((a) => a.name === "Adjacent top")?.alg).toBe(tPerm);
  });

  describe("PBL", () => {
    // Corners that swapped places in one layer, after the best U or D turn
    const swapIn = (alg: string, layer: number) => {
      const turns = layer > 0 ? ["", "U", "U2", "U'"] : ["", "D", "D2", "D'"];
      const swaps = turns.map((turn) => {
        const cube = normalize(applyAlg(applyAlg(solved(2), alg), turn));
        return cube.stickers
          .filter((s) => s.pos[1] === layer && s.normal[1] === 0)
          .reduce((moved, s) => {
            const id = s.home.join();
            if (s.home.join() !== s.pos.join() && !moved.some((m) => m[0].join() === id))
              moved.push([s.home, s.pos]);
            return moved;
          }, [] as Array<[Vec, Vec]>);
      });
      return swaps.reduce((a, b) => (b.length < a.length ? b : a));
    };

    const kind = (moved: Array<[Vec, Vec]>) => {
      if (moved.length === 0) return "none";
      if (moved.length !== 2) return "other";
      const [from, to] = moved[0];
      const differs = from.filter((v, i) => v !== to[i]).length;
      return differs === 1 ? "adjacent" : "diagonal";
    };

    it.each(TWO_PBL.map((a) => [a.name, a]))(
      "%s keeps both faces a single color",
      (_, { alg }) => {
        const cube = after(alg);
        expect(faceGrid(cube, "U").flat().every((c) => c === "U")).toBeTruthy();
        expect(faceGrid(cube, "D").flat().every((c) => c === "D")).toBeTruthy();
      },
    );

    it.each(TWO_PBL.map((a) => [a.name, a]))(
      "%s swaps the right corners",
      (_, { alg, top, bottom }) => {
        expect(kind(swapIn(alg, 1))).toBe(top);
        expect(kind(swapIn(alg, -1))).toBe(bottom);
      },
    );

    it("swaps the right headlights for the T perm", () => {
      // Headlights on the left means the two right corners swap
      const moved = pieceMovements(2, TWO_PBL[0].alg).map((m) => m.from[0]);
      expect(moved).toEqual([1, 1]);
    });
  });
});
