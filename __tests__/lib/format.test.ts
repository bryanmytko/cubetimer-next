import { humanReadableTime } from "../../lib/format";

describe("format", () => {
  describe("humanReadableTime", () => {
    it("formats the time properly for mm:ss", () => {
      const formatted = humanReadableTime(15669);

      expect(formatted).toEqual("15:66");
    });

    it("formats the time properly for hh:mm:ss", () => {
      const formatted = humanReadableTime(2315669);

      expect(formatted).toEqual("38:35:66");
    });
  });
});
