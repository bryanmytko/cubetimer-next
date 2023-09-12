import { humanReadableTime } from "../../src/lib/format";

describe("format", () => {
  describe("humanReadableTime", () => {
    it("formats the time properly for ss:ms", () => {
      const formatted = humanReadableTime(15669);

      expect(formatted).toEqual("15:66");
    });

    it("formats the time properly for mm:ss:ms", () => {
      const formatted = humanReadableTime(2315669);

      expect(formatted).toEqual("38:35:66");
    });

    it("adds leading zeroes to seconds when time is over a minute", () => {
      const formatted = humanReadableTime(1022330);

      expect(formatted).toEqual("17:02:33");
    });

    it("does not add leading zeroes when time is under a minute", () => {
      const formatted = humanReadableTime(2330);

      expect(formatted).toEqual("2:33");
    });
  });
});
