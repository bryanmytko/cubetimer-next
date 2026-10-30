const humanReadableTime = (t: number, initialValue?: string): string => {
  if (!t) return initialValue || "--";

  let str = "";

  if (t > 60000) {
    str += `${Math.floor((t / 60000) % 60)}:`;
    str += `${Math.floor((t / 1000) % 60)
      .toString()
      .padStart(2, "0")}:`;
    str += Math.floor((t / 10) % 100)
      .toString()
      .padStart(2, "0");
    return str;
  }

  str += `${Math.floor((t / 1000) % 60)}:`;
  str += Math.floor((t / 10) % 100)
    .toString()
    .padStart(2, "0");

  return str;
};

const formatDate = (input: string) =>
  new Date(input).toLocaleDateString("en-US", { timeZone: "UTC" });

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const DAY_MS = 24 * 60 * 60 * 1000;

// "Today", "Yesterday", or a short date like "Sat, Oct 24" (with the year
// when it isn't this year). Uses the viewer's time zone so days line up
// with when they actually cubed.
const formatDayLabel = (input: string, now: Date = new Date()): string => {
  const date = new Date(input);
  const daysAgo = Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS);

  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...(date.getFullYear() !== now.getFullYear() && { year: "numeric" }),
  });
};

const formatTimeOfDay = (input: string): string =>
  new Date(input).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

export { humanReadableTime, formatDate, formatDayLabel, formatTimeOfDay };
