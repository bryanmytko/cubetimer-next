import { formatDayLabel, humanReadableTime } from "../../src/lib/format";

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

  describe("formatDayLabel", () => {
    const now = new Date(2026, 9, 29, 9, 0);

    it("calls today's solves Today", () => {
      expect(formatDayLabel(new Date(2026, 9, 29, 0, 5).toISOString(), now)).toEqual("Today");
    });

    it("calls the day before Yesterday, even late at night", () => {
      expect(formatDayLabel(new Date(2026, 9, 28, 23, 59).toISOString(), now)).toEqual(
        "Yesterday",
      );
    });

    it("shows the weekday and date for older solves", () => {
      expect(formatDayLabel(new Date(2026, 9, 24, 12).toISOString(), now)).toEqual(
        "Sat, Oct 24",
      );
    });

    it("adds the year for solves from another year", () => {
      expect(formatDayLabel(new Date(2025, 11, 31, 12).toISOString(), now)).toEqual(
        "Wed, Dec 31, 2025",
      );
    });
  });
});
