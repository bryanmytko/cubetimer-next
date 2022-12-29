import {
  average,
  averageOfSize,
  fastestTime,
  slowestTime,
} from "../../lib/calculate";

describe("calculate", () => {
  describe(".average", () => {
    it("calculates the average", () => {
      const times = [4.68, 5.33, 4.56];
      expect(average(times)).toEqual(4.8566666666666665);
    });
  });

  describe(".averageOfSize", () => {
    it("calculates the average of the last n times", () => {
      const times = [22.34, 12.9, 4.68, 5.33, 4.56];
      expect(averageOfSize(times, 3)).toEqual(4.8566666666666665);
    });
  });

  describe(".fastestTime", () => {
    it("returns the fastest time", () => {
      const times = [22.34, 12.9, 4.68, 5.33, 4.56];
      expect(fastestTime(times)).toEqual(4.56);
    });
  });

  describe(".slowestTime", () => {
    it("returns the slowest time", () => {
      const times = [22.34, 12.9, 4.68, 5.33, 4.56];
      expect(slowestTime(times)).toEqual(22.34);
    });
  });
});
