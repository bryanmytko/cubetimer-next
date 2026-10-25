import {
  EDGE_FLIP,
  OLL_PARITY,
  OLL_PARITY_SLICE,
  PLL_PARITY,
  fiveByFive,
  fourByFour,
  sevenBySeven,
  sixBySix,
} from "../../../src/components/Tutorials/content/bigCubes";
import {
  applyAlg,
  invertAlg,
  isF2LSolved,
  isSolvedWhere,
  normalize,
  solved,
} from "../../../src/lib/cube/nxn";
import { caseFor, pieceMovements } from "../../../src/lib/cube/lastLayer";
import { unpairedEdges } from "../../../src/lib/cube/edges";
import { isCenter } from "../../../src/components/Tutorials/content/masks";

const after = (n: number, alg: string) => normalize(applyAlg(solved(n), alg));
const centersSolved = (n: number, alg: string) =>
  isSolvedWhere(after(n, alg), isCenter(n));

// Positions of top layer pieces an algorithm moves. Center pieces of the
// same color are interchangeable, so they're left out
const moved = (n: number, alg: string, auf = "") =>
  pieceMovements(n, alg, auf)
    .filter((m) => m.from.filter((v) => Math.abs(v) === n - 1).length > 1)
    .map((m) => m.from.join())
    .sort();

const allAlgs = [fourByFour, fiveByFive, sixBySix, sevenBySeven].flatMap((t) =>
  [
    ...t.stages.flatMap((s) => s.steps.flatMap((step) => step.algs || [])),
    ...(t.algSets || []).flatMap((set) => set.algs),
  ].map((a) => [t.n as number, a.name, a.alg] as const),
);

describe("big cube algorithms", () => {
  it.each(allAlgs.filter(([, name]) => name !== EDGE_FLIP.name))(
    "%ix%i: %s keeps the first layers and centers",
    (n, _, alg) => {
      expect(isF2LSolved(after(n, alg))).toBeTruthy();
      expect(centersSolved(n, alg)).toBeTruthy();
    },
  );

  it.each([4, 5, 6, 7])("%ix%i: edge pairing keeps the centers", (n) => {
    expect(centersSolved(n, EDGE_FLIP.alg)).toBeTruthy();
  });

  it.each([4, 5, 6, 7])("%ix%i: edge pairing pairs the front two edges", (n) => {
    const broken = applyAlg(solved(n), invertAlg(EDGE_FLIP.alg));
    expect(unpairedEdges(broken)).toEqual(["FL", "FR"]);
  });

  describe("4x4", () => {
    it("pure OLL parity swaps just the two front top edge pieces", () => {
      expect(moved(4, OLL_PARITY_SLICE.alg)).toEqual(["-1,3,3", "1,3,3"]);
    });

    it("OLL parity fixes a flipped edge and keeps edges paired", () => {
      const flipped = caseFor(4, OLL_PARITY_SLICE.alg);
      const fixed = normalize(applyAlg(flipped, OLL_PARITY.alg));

      expect(unpairedEdges(fixed)).toEqual([]);
      expect(isF2LSolved(fixed)).toBeTruthy();
      // Edges in the top layer that still show a side color on top
      const flippedEdges = fixed.stickers.filter(
        (s) => s.pos[1] === 3 && s.normal[1] === 1 && Math.abs(s.pos[0]) !== Math.abs(s.pos[2]) && s.color !== "U",
      );
      expect((flippedEdges.length / 2) % 2).toBe(0);
    });

    it("PLL parity swaps the front and back top edges after U2", () => {
      expect(moved(4, PLL_PARITY.alg, "U2")).toEqual([
        "-1,3,-3",
        "-1,3,3",
        "1,3,-3",
        "1,3,3",
      ]);
    });
  });

  describe("5x5", () => {
    it("edge parity swaps the two outer pieces of the front top edge", () => {
      const alg = fiveByFive.algSets?.find((s) => s.id === "parity")?.algs[0].alg as string;
      expect(moved(5, alg)).toEqual(["-2,4,4", "2,4,4"]);
    });
  });

  describe("6x6", () => {
    const parity = sixBySix.stages.find((s) => s.id === "parity")!.steps;
    const named = (name: string) =>
      parity.flatMap((s) => s.algs || []).find((a) => a.name === name)!.alg;

    it("OLL parity fixes the piece it says", () => {
      expect(moved(6, named("OLL parity, outer pieces"))).toEqual(["-3,5,5", "3,5,5"]);
      expect(moved(6, named("OLL parity, inner pieces"))).toEqual(["-1,5,5", "1,5,5"]);
    });

    it("PLL parity swaps the pieces it says after U2", () => {
      expect(moved(6, named("PLL parity, outer pieces"), "U2")).toEqual([
        "-3,5,-5",
        "-3,5,5",
        "3,5,-5",
        "3,5,5",
      ]);
      expect(moved(6, named("PLL parity, inner pieces"), "U2")).toEqual([
        "-1,5,-5",
        "-1,5,5",
        "1,5,-5",
        "1,5,5",
      ]);
    });
  });

  describe("7x7", () => {
    it("edge parity fixes the pair it says", () => {
      const [outer, inner] = sevenBySeven.algSets![0].algs;

      expect(moved(7, outer.alg)).toEqual(["-4,6,6", "4,6,6"]);
      expect(moved(7, inner.alg)).toEqual(["-2,6,6", "2,6,6"]);
    });
  });
});
