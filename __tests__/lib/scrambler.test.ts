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
});
