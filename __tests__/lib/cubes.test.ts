import {
  cube2x2,
  cube3x3,
  cube4x4,
  cube5x5,
  cube6x6,
  cube7x7,
  cubePyraminx,
  cubeMegaminx,
} from "../../lib/cubes";

describe("cubes", () => {
  describe("2x2", () => {
    it("describes the 2x2 cube", () => {
      const moves = cube2x2.moves.map((m) => m.name);
      expect(moves).toEqual(["R", "L", "U", "D", "F", "B"]);
    });
  });

  describe("3x3", () => {
    it("describes the 3x3 cube", () => {
      const moves = cube3x3.moves.map((m) => m.name);
      expect(moves).toEqual(["R", "L", "U", "D", "F", "B"]);
    });
  });

  describe("4x4", () => {
    it("describes the 4x4 cube", () => {
      const moves = cube4x4.moves.map((m) => m.name);
      expect(moves).toEqual([
        "R",
        "L",
        "U",
        "D",
        "F",
        "B",
        "r",
        "l",
        "u",
        "d",
        "f",
        "b",
      ]);
    });
  });

  describe("5x5", () => {
    it("describes the 5x5 cube", () => {
      const moves = cube5x5.moves.map((m) => m.name);
      expect(moves).toEqual([
        "R",
        "L",
        "U",
        "D",
        "F",
        "B",
        "r",
        "l",
        "u",
        "d",
        "f",
        "b",
      ]);
    });
  });

  describe("6x6", () => {
    it("describes the 6x6 cube", () => {
      const moves = cube6x6.moves.map((m) => m.name);
      expect(moves).toEqual([
        "R",
        "L",
        "U",
        "D",
        "F",
        "B",
        "r",
        "l",
        "u",
        "d",
        "f",
        "b",
      ]);
    });
  });

  describe("7x7", () => {
    it("describes the 7x7 cube", () => {
      const moves = cube7x7.moves.map((m) => m.name);
      expect(moves).toEqual([
        "R",
        "L",
        "U",
        "D",
        "F",
        "B",
        "r",
        "l",
        "u",
        "d",
        "f",
        "b",
      ]);
    });
  });

  describe("Pyraminx", () => {
    it("describes the pyraminx", () => {
      const moves = cubePyraminx.moves.map((m) => m.name);
      expect(moves).toEqual(["U", "R", "L", "B", "u", "r", "l", "b"]);
    });
  });

  describe("Megaminx", () => {
    it("describes the megaminx", () => {
      const moves = cubeMegaminx.moves.map((m) => m.name);
      const final = cubeMegaminx.final.map((m) => m.name);

      expect(moves).toEqual(["R", "D"]);
      expect(final).toEqual(["U", "U'"]);
    });
  });
});
