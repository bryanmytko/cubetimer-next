import { generateMegaminx } from "../../../src/lib/scramblers/megaminx";

const RUNS = 200;
const times = (fn: () => void) => Array.from({ length: RUNS }).forEach(fn);

describe("generateMegaminx", () => {
  it("generates 7 lines", () => {
    expect(generateMegaminx().split("\n")).toHaveLength(7);
  });

  it("alternates R and D turns, ending each line with a U turn", () => {
    times(() => {
      generateMegaminx()
        .split("\n")
        .forEach((line) => {
          expect(line).toMatch(/^((R|D)(\+\+|--) ){10}U'?$/);

          const faces = line.split(" ").map((move) => move[0]);
          expect(faces.join("")).toBe("RDRDRDRDRDU");
        });
    });
  });

  it("turns U in the same direction as the last D", () => {
    times(() => {
      generateMegaminx()
        .split("\n")
        .forEach((line) => {
          const moves = line.split(" ");
          const lastD = moves[moves.length - 2];
          const u = moves[moves.length - 1];

          expect(u).toBe(lastD === "D++" ? "U" : "U'");
        });
    });
  });
});
