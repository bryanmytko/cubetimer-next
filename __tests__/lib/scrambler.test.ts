import Scrambler from "../../src/lib/scrambler";
import { PuzzleNameObj } from "../../src/types/timer";

describe("Scrambler", () => {
  it("generates a scramble", () => {
    const scrambler = new Scrambler();
    const scramble = scrambler.generate();

    expect(scramble).toMatch(/^[UDRLBF'2\s]*$/);
  });

  it("generates a scramble of the appropriate size", () => {
    const scrambler = new Scrambler();
    const scramble = scrambler.generate(PuzzleNameObj["3x3"]);

    expect(scramble.split(" ")).toHaveLength(21);
  });

  it("does not turn the same face consecutively", () => {
    const scrambler = new Scrambler();
    const scramble = scrambler.generate(PuzzleNameObj["3x3"]);

    // We can simplify the scramble to contain only the face turned by
    // by ignoring primes & double turns
    const condensedScramble = scramble.replace(/[0-9\s\']/g, "");

    expect(
      condensedScramble
        .split("")
        .some((char, index, arr) => char === arr[index + 1]),
    ).toBeFalsy();
  });

  it("does not contain redundant moves", () => {
    const scrambler = new Scrambler();
    const scramble = scrambler.generate(PuzzleNameObj["3x3"]);
    const condensedScramble = scramble.replace(/[0-9\s\']/g, "");

    // A move is considered redundant when the move is followed by
    // another move which does not affect the previously turned layer
    const redundantMoves = ["UD", "DU", "RL", "LR", "FB", "BF"];

    expect(
      condensedScramble
        .split("")
        .some((char, index, arr) =>
          redundantMoves.includes(`${char}${arr[index + 1]}`),
        ),
    ).toBeFalsy();
  });

  it("generates a scramble for every puzzle", () => {
    const scrambler = new Scrambler();

    Object.values(PuzzleNameObj).forEach((puzzle) => {
      expect(scrambler.generate(puzzle)).not.toHaveLength(0);
    });
  });

  it("keeps using the last puzzle when none is given", () => {
    const scrambler = new Scrambler();
    scrambler.generate(PuzzleNameObj.Clock);

    expect(scrambler.generate()).toMatch(/y2/);
  });

  it.each([
    ["2x2", 11],
    ["3x3", 21],
    ["4x4", 40],
    ["5x5", 60],
    ["6x6", 80],
    ["7x7", 100],
    ["Skewb", 11],
  ])("generates a %s scramble of %i moves", (puzzle, length) => {
    const scrambler = new Scrambler();

    expect(scrambler.generate(puzzle).split(" ")).toHaveLength(length);
  });

  it("uses three layer wide turns on 6x6 and 7x7", () => {
    const scrambler = new Scrambler();
    const scrambles = Array.from({ length: 20 }, () =>
      scrambler.generate(PuzzleNameObj["7x7"]),
    ).join(" ");

    expect(scrambles).toMatch(/\b3[rludfb]/);
  });
});
