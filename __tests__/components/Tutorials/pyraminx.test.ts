import {
  applyPyraminx,
  changedPositions,
  pieceKind,
  solvedPyraminx,
} from "../../../src/lib/cube/pyraminx";
import { PYRAMINX_L3E } from "../../../src/components/Tutorials/content/pyraminx";

const solved = solvedPyraminx();
const changed = (alg: string) => changedPositions(applyPyraminx(solved, alg));
// The bottom face is the one not touching the top vertex
const onBottom = (pos: number[]) => Math.abs(pos[1] + 1 / 3) < 1e-6;

describe("Pyraminx simulator", () => {
  it("has 36 stickers: 12 each on tips, centers and edges", () => {
    const kinds = solved.map((s) => pieceKind(s.pos));
    expect(kinds.filter((k) => k === "tip")).toHaveLength(12);
    expect(kinds.filter((k) => k === "center")).toHaveLength(12);
    expect(kinds.filter((k) => k === "edge")).toHaveLength(12);
  });

  it("turns only the tip for lowercase moves", () => {
    expect(changed("u").map(pieceKind)).toEqual(["tip", "tip", "tip"]);
  });

  it.each(["U", "L", "R", "B", "u", "l", "r", "b"])(
    "returns to solved after three %s turns",
    (move) => {
      expect(changed(`${move} ${move} ${move}`)).toEqual([]);
      expect(changed(`${move} ${move}'`)).toEqual([]);
    },
  );
});

describe("Pyraminx last three edges", () => {
  it.each(PYRAMINX_L3E.map((a) => [a.name, a.alg]))(
    "%s only moves top edges",
    (_, alg) => {
      const moved = changed(alg);

      expect(moved.length).toBeGreaterThan(0);
      expect(moved.every((p) => pieceKind(p) === "edge")).toBeTruthy();
      expect(moved.some(onBottom)).toBeFalsy();
    },
  );

  it("cycles three edges with the cycle algorithms", () => {
    // Three moving edges, two stickers each
    expect(changed(PYRAMINX_L3E[0].alg)).toHaveLength(6);
    expect(changed(PYRAMINX_L3E[1].alg)).toHaveLength(6);
  });

  it("cycles opposite ways with the right and left cycles", () => {
    expect(changed(`${PYRAMINX_L3E[0].alg} ${PYRAMINX_L3E[1].alg}`)).toEqual([]);
  });

  it("gets back to solved after three right cycles", () => {
    // So doing it twice is the same as the left cycle
    expect(changed(`${PYRAMINX_L3E[0].alg} `.repeat(3))).toEqual([]);
  });

  it("flips two edges in place with the flip", () => {
    expect(changed(PYRAMINX_L3E[2].alg)).toHaveLength(4);
  });
});
