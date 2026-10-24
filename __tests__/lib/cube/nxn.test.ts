import {
  applyAlg,
  faceGrid,
  invertAlg,
  isF2LSolved,
  isSolved,
  normalize,
  solved,
} from "../../../src/lib/cube/nxn";

const column = (grid: string[][], col: number) => grid.map((row) => row[col]);

describe("NxN cube simulator", () => {
  const cube = solved(3);

  it("starts solved", () => {
    expect(isSolved(cube)).toBeTruthy();
    expect(faceGrid(cube, "U").flat()).toEqual(Array(9).fill("U"));
  });

  // These pin the move directions to a real cube
  describe("move directions", () => {
    it("R moves the front right column up to the top", () => {
      const turned = applyAlg(cube, "R");

      expect(column(faceGrid(turned, "U"), 2)).toEqual(["F", "F", "F"]);
      expect(column(faceGrid(turned, "F"), 2)).toEqual(["D", "D", "D"]);
      expect(column(faceGrid(turned, "B"), 0)).toEqual(["U", "U", "U"]);
    });

    it("L moves the front left column down to the bottom", () => {
      const turned = applyAlg(cube, "L");

      expect(column(faceGrid(turned, "D"), 0)).toEqual(["F", "F", "F"]);
      expect(column(faceGrid(turned, "F"), 0)).toEqual(["U", "U", "U"]);
    });

    it("U moves the right face's top row to the front", () => {
      const turned = applyAlg(cube, "U");

      expect(faceGrid(turned, "F")[0]).toEqual(["R", "R", "R"]);
      expect(faceGrid(turned, "L")[0]).toEqual(["F", "F", "F"]);
    });

    it("D moves the front's bottom row to the right", () => {
      const turned = applyAlg(cube, "D");

      expect(faceGrid(turned, "R")[2]).toEqual(["F", "F", "F"]);
    });

    it("F moves the left face's right column to the top", () => {
      const turned = applyAlg(cube, "F");

      expect(faceGrid(turned, "U")[2]).toEqual(["L", "L", "L"]);
      expect(column(faceGrid(turned, "R"), 0)).toEqual(["U", "U", "U"]);
    });

    it("B moves the right face's right column to the top", () => {
      const turned = applyAlg(cube, "B");

      expect(faceGrid(turned, "U")[0]).toEqual(["R", "R", "R"]);
    });

    it("M turns like L, E like D and S like F", () => {
      expect(column(faceGrid(applyAlg(cube, "M"), "F"), 1)).toEqual([
        "U",
        "U",
        "U",
      ]);
      expect(faceGrid(applyAlg(cube, "E"), "R")[1]).toEqual(["F", "F", "F"]);
      expect(faceGrid(applyAlg(cube, "S"), "U")[1]).toEqual(["L", "L", "L"]);
    });

    it("r turns the right two layers and x turns the whole cube", () => {
      const r = applyAlg(cube, "r");
      expect(column(faceGrid(r, "U"), 1)).toEqual(["F", "F", "F"]);
      expect(column(faceGrid(r, "U"), 0)).toEqual(["U", "U", "U"]);

      expect(faceGrid(applyAlg(cube, "x"), "U").flat()).toEqual(
        Array(9).fill("F"),
      );
    });
  });

  describe("big cubes", () => {
    const big = solved(5);

    it("2R turns only the second layer", () => {
      const turned = applyAlg(big, "2R");
      const top = faceGrid(turned, "U");

      expect(column(top, 3)).toEqual(Array(5).fill("F"));
      expect(column(top, 4)).toEqual(Array(5).fill("U"));
    });

    it("3Rw and 3r turn the outer three layers", () => {
      [applyAlg(big, "3Rw"), applyAlg(big, "3r")].forEach((turned) => {
        const top = faceGrid(turned, "U");

        expect(column(top, 2)).toEqual(Array(5).fill("F"));
        expect(column(top, 1)).toEqual(Array(5).fill("U"));
      });
    });

    it("Rw and r both turn two layers", () => {
      expect(applyAlg(big, "Rw")).toEqual(applyAlg(big, "r"));
    });
  });

  describe("algorithms", () => {
    it("returns to solved after a move's inverse", () => {
      const alg = "R U2 F' 3r2 M E' S x y' z2";
      expect(isSolved(applyAlg(applyAlg(solved(5), alg), invertAlg(alg)))).toBeTruthy();
    });

    it("needs six sexy moves to return to solved", () => {
      const sexy = "R U R' U'";
      expect(isSolved(applyAlg(cube, `${sexy} `.repeat(5)))).toBeFalsy();
      expect(isSolved(applyAlg(cube, `${sexy} `.repeat(6)))).toBeTruthy();
    });

    it("knows the sune keeps the first two layers solved", () => {
      const sune = applyAlg(cube, "R U R' U R U2 R'");

      expect(isF2LSolved(sune)).toBeTruthy();
      expect(isSolved(sune)).toBeFalsy();
    });

    it("undoes whole-cube rotations when normalizing", () => {
      expect(isSolved(normalize(applyAlg(cube, "x y2")))).toBeTruthy();
    });
  });
});
