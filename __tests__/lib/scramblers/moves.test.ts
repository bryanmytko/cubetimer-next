import { generateMoves } from "../../../src/lib/scramblers/moves";
import { cubePyraminx, cubeSkewb } from "../../../src/lib/cubes";

// Scrambles are random, so check each property against many of them
const RUNS = 200;
const times = (fn: () => void) => Array.from({ length: RUNS }).forEach(fn);

describe("generateMoves", () => {
  describe("Pyraminx", () => {
    it("generates the requested number of face turns", () => {
      times(() => {
        const faceTurns = generateMoves(cubePyraminx, 11)
          .split(" ")
          .filter((move) => /^[ULRB]/.test(move));

        expect(faceTurns).toHaveLength(11);
      });
    });

    it("only uses pyraminx notation", () => {
      times(() => {
        generateMoves(cubePyraminx, 11)
          .split(" ")
          .forEach((move) => expect(move).toMatch(/^[ULRBulrb]'?$/));
      });
    });

    it("turns each tip at most once, after the face turns", () => {
      times(() => {
        const moves = generateMoves(cubePyraminx, 11).split(" ");
        const tips = moves.slice(11).map((move) => move[0]);

        expect(tips.every((tip) => /[ulrb]/.test(tip))).toBeTruthy();
        expect(new Set(tips).size).toBe(tips.length);
        // Tips are added in a fixed order
        expect(tips).toEqual(
          ["u", "l", "r", "b"].filter((tip) => tips.includes(tip)),
        );
      });
    });

    it("does not turn the same face consecutively", () => {
      times(() => {
        const faces = generateMoves(cubePyraminx, 11)
          .split(" ")
          .map((move) => move[0]);

        expect(faces.some((face, i) => face === faces[i + 1])).toBeFalsy();
      });
    });
  });

  describe("Skewb", () => {
    it("generates the requested number of moves in skewb notation", () => {
      times(() => {
        const moves = generateMoves(cubeSkewb, 11).split(" ");

        expect(moves).toHaveLength(11);
        moves.forEach((move) => expect(move).toMatch(/^[ULRB]'?$/));
      });
    });

    it("does not turn the same face consecutively", () => {
      times(() => {
        const faces = generateMoves(cubeSkewb, 11)
          .split(" ")
          .map((move) => move[0]);

        expect(faces.some((face, i) => face === faces[i + 1])).toBeFalsy();
      });
    });
  });
});
