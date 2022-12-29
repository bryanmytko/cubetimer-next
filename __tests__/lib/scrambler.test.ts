import Scrambler from "../../lib/scrambler";

describe("Scrambler", () => {
  it("generates a scramble", () => {
    const scrambler = new Scrambler("3x3");
    const scramble = scrambler.generate();

    expect(scramble).toMatch(/^[UDRLBF'2\s]*$/);
  });

  it("generates a scramble of the appropriate size", () => {
    const scrambler = new Scrambler("3x3");
    const scramble = scrambler.generate();

    expect(scramble.split(" ")).toHaveLength(21);
  });
});
