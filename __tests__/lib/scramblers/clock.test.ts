import { generateClock } from "../../../src/lib/scramblers/clock";

const RUNS = 200;
const times = (fn: () => void) => Array.from({ length: RUNS }).forEach(fn);

describe("generateClock", () => {
  it("turns the front pins, flips the clock, then turns the back pins", () => {
    times(() => {
      const pins = generateClock()
        .split(" ")
        .map((move) => move.replace(/\d[+-]$/, ""));

      expect(pins).toEqual([
        "UR",
        "DR",
        "DL",
        "UL",
        "U",
        "R",
        "D",
        "L",
        "ALL",
        "y2",
        "U",
        "R",
        "D",
        "L",
        "ALL",
      ]);
    });
  });

  it("uses turn amounts from 5- to 6+", () => {
    times(() => {
      generateClock()
        .split(" ")
        .filter((move) => move !== "y2")
        .forEach((move) => expect(move).toMatch(/([0-6]\+|[1-5]-)$/));
    });
  });
});
