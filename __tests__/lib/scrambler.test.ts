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
});
