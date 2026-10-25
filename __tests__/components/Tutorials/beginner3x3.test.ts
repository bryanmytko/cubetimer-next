import { threeByThree } from "../../../src/components/Tutorials/content/threeByThree";
import { OLL_EDGES } from "../../../src/components/Tutorials/content/algs3x3";
import {
  Vec,
  applyAlg,
  faceGrid,
  invertAlg,
  isSolvedWhere,
  normalize,
  solved,
} from "../../../src/lib/cube/nxn";
import { caseFor, pieceMovements } from "../../../src/lib/cube/lastLayer";

const algByName = (name: string) => {
  const alg = threeByThree.stages
    .flatMap((stage) => stage.steps)
    .flatMap((step) => [...(step.algs || []), ...(step.followUp?.algs || [])])
    .find((a) => a.name === name);
  if (!alg) throw new Error(`No algorithm named ${name}`);
  return alg.alg;
};

const same = (a: Vec, b: Vec) => a.every((v, i) => v === b[i]);

// Where the piece that started at `home` ends up, and which way its
// stickers face
const track = (alg: string, home: Vec) =>
  normalize(applyAlg(solved(3), alg)).stickers.filter((s) => same(s.home, home));

describe("3x3 beginner method", () => {
  it("inserts a white corner with 1, 3 or 5 repeats", () => {
    // Each repeat twists the corner a third of the way around in place
    const insert = algByName("Insert corner");
    const twice = applyAlg(solved(3), `${insert} ${insert}`);
    const corner = twice.stickers.filter((s) => same(s.home, [2, -2, 2]));

    expect(corner.every((s) => same(s.pos, [2, -2, 2]))).toBeTruthy();
    expect(isSolvedWhere(applyAlg(solved(3), `${insert} `.repeat(6)), () => true)).toBeTruthy();
  });

  it("shows a corner case that one insert solves, with white facing right", () => {
    const corners = threeByThree.stages[0].steps.find((step) => step.title.includes("corners"));
    const setup = corners?.setup?.alg || "";
    const white = track(setup, [2, -2, 2]).find((s) => s.color === "D");

    expect(white?.pos).toEqual([2, 2, 2]);
    expect(white?.normal).toEqual([1, 0, 0]);
    expect(isSolvedWhere(applyAlg(applyAlg(solved(3), setup), algByName("Insert corner")), () => true))
      .toBeTruthy();
  });

  it("inserts a corner with white facing front in one inverse instead of five", () => {
    const insert = algByName("Insert corner");
    const inverse = algByName("Insert corner (inverse)");
    // The case five repeats would solve
    const setup = invertAlg(`${insert} `.repeat(5).trim());
    const white = track(setup, [2, -2, 2]).find((s) => s.color === "D");

    expect(white?.pos).toEqual([2, 2, 2]);
    expect(white?.normal).toEqual([0, 0, 1]);
    expect(isSolvedWhere(applyAlg(applyAlg(solved(3), setup), inverse), () => true)).toBeTruthy();
  });

  it.each([
    ["Insert right", [2, 0, 2], "R"],
    ["Insert left", [-2, 0, 2], "L"],
  ])("%s takes the front top edge into its slot", (name, slot, topColor) => {
    // Running it backwards from solved takes the slot's edge to the front
    // top, with its side color on top
    const edge = track(invertAlg(algByName(name)), slot as Vec);

    expect(edge.every((s) => same(s.pos, [0, 2, 2]))).toBeTruthy();
    expect(edge.find((s) => s.normal[1] === 1)?.color).toBe(topColor);
  });

  it.each(["Insert right", "Insert left"])("%s keeps the first layer", (name) => {
    const cube = applyAlg(solved(3), algByName(name));
    expect(isSolvedWhere(cube, (s) => s.pos[1] === -2)).toBeTruthy();
  });

  it("swaps the front right and back right corners", () => {
    const corners = pieceMovements(3, algByName("Swap corners"))
      .map((m) => `${m.from}>${m.to}`)
      // Corners are the pieces with no 0 coordinate
      .filter((m) => !m.split(">")[0].split(",").includes("0"));

    expect(corners.sort()).toEqual(["2,2,-2>2,2,2", "2,2,2>2,2,-2"]);
  });

  it("draws step 5's picture with the corners Swap corners moves", () => {
    const step = threeByThree.stages[0].steps.find((s) => s.title.includes("Place"))!;
    const sig = (alg: string) =>
      pieceMovements(3, alg).map((m) => `${m.from}>${m.to}`).sort();

    const corners = (alg: string) =>
      sig(alg).filter((m) => !m.split(">")[0].split(",").includes("0"));
    expect(corners(step.cases![0].alg)).toEqual(corners(algByName("Swap corners")));
  });

  it("keeps the corners in their spots with the Sune, up to a U2", () => {
    const moved = pieceMovements(3, `${algByName("Sune")} U2`).map((m) => m.from.join());
    // Corners are the pieces with no 0 coordinate
    expect(moved.filter((pos) => !pos.split(",").includes("0"))).toEqual([]);
  });

  // Looking down at the top with the front at the bottom: left, front, right
  // is counterclockwise
  it.each([
    ["Ua", ["-2,2,0>0,2,2", "0,2,2>2,2,0", "2,2,0>-2,2,0"]],
    ["Ub", ["-2,2,0>2,2,0", "0,2,2>-2,2,0", "2,2,0>0,2,2"]],
  ])("%s cycles the front, left and right edges the way the text says", (name, expected) => {
    const moves = pieceMovements(3, algByName(name)).map((m) => `${m.from}>${m.to}`);
    expect(moves.sort()).toEqual([...expected].sort());
  });
});

describe("3x3 F2L inserts", () => {
  const slot = {
    right: (s: { pos: Vec }) => s.pos[0] === 2 && s.pos[2] === 2,
    left: (s: { pos: Vec }) => s.pos[0] === -2 && s.pos[2] === 2,
  };

  it.each([
    ["Basic insert", "right"],
    ["Split and pair", "right"],
    ["Basic insert (left)", "left"],
  ])("%s only uses the top layer and its own slot", (name, side) => {
    const cube = normalize(applyAlg(solved(3), algByName(name)));

    expect(
      isSolvedWhere(
        cube,
        (s) => s.pos[1] < 2 && !slot[side as "right" | "left"](s),
      ),
    ).toBeTruthy();
  });
});

describe("2-look OLL edge cases", () => {
  // Top face edge stickers: back, left, right, front
  const yellowEdges = (alg: string) => {
    const top = faceGrid(caseFor(3, alg), "U");
    return [top[0][1], top[1][0], top[1][2], top[2][1]].map((c) => c === "U");
  };

  it("solves a horizontal line", () => {
    expect(yellowEdges(OLL_EDGES[0].alg)).toEqual([false, true, true, false]);
  });

  it("solves an L in the back left", () => {
    expect(yellowEdges(OLL_EDGES[1].alg)).toEqual([true, true, false, false]);
  });

  it("solves a dot", () => {
    expect(yellowEdges(OLL_EDGES[2].alg)).toEqual([false, false, false, false]);
  });
});
