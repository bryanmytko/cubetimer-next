import sessionSummary, { shareTime } from "../../../src/components/Statistics/sessionSummary";

const solve = (id: string, time: number, penalty = 0) => ({
  id,
  puzzle: "3x3",
  scramble: `R U ${id}`,
  time,
  penalty,
  createdAt: "2026-10-30T15:00:00.000Z",
});

describe("shareTime", () => {
  it("writes times under a minute as seconds", () => {
    expect(shareTime(13450)).toEqual("13.45");
    expect(shareTime(9070)).toEqual("9.07");
  });

  it("adds minutes past a minute", () => {
    expect(shareTime(62330)).toEqual("1:02.33");
  });
});

describe("sessionSummary", () => {
  const summary = sessionSummary({
    id: "a",
    createdAt: "2026-10-30T15:00:00.000Z",
    // Out of order on purpose; the summary lists them in solve order
    solves: [solve("3", 11000), solve("1", 10000), solve("2", 12000, 2000), solve("5", 9000), solve("4", 20000)],
  });

  it("starts with the puzzle, date and averages", () => {
    expect(summary.split("\n").slice(0, 3)).toEqual([
      "Cubetimer.io · 3x3 · Oct 30, 2026",
      "Session average: 11.66 (best and worst dropped)",
      "Best 9.00 · Worst 20.00 · Mean 12.80",
    ]);
  });

  it("lists every solve with best and worst in parentheses and +2s marked", () => {
    expect(summary.split("\n").slice(4)).toEqual([
      "1.  10.00     R U 1",
      "2.  14.00+    R U 2",
      "3.  11.00     R U 3",
      "4.  (20.00)   R U 4",
      "5.  (9.00)    R U 5",
    ]);
  });
});
