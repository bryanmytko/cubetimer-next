import { average, averageCurved, fastestTime, slowestTime } from "../../lib/calculate";
import type { SessionNode } from "./SessionCard";

// Times the way cubers write them when sharing: 13.45, or 1:02.33 past a
// minute (the site itself shows 13:45)
export const shareTime = (ms: number): string => {
  const hundredths = Math.floor(ms / 10);
  const minutes = Math.floor(hundredths / 6000);
  const seconds = Math.floor((hundredths % 6000) / 100);
  const fraction = (hundredths % 100).toString().padStart(2, "0");

  return minutes
    ? `${minutes}:${seconds.toString().padStart(2, "0")}.${fraction}`
    : `${seconds}.${fraction}`;
};

// A plain-text session report for pasting into chats and forums. Best and
// worst go in parentheses since the average drops them, and "+" marks a +2.
const sessionSummary = (session: SessionNode): string => {
  const solves = [...session.solves].sort((a, b) => Number(a.id) - Number(b.id));
  const times = solves.map((solve) => solve.time + (solve.penalty ?? 0));
  const best = fastestTime(times);
  const worst = slowestTime(times);
  const bestIndex = times.indexOf(best);
  const worstIndex = times.indexOf(worst);

  const date = new Date(session.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const rows = solves.map((solve, index) => {
    let time = shareTime(times[index]) + (solve.penalty ? "+" : "");
    if (index === bestIndex || index === worstIndex) time = `(${time})`;
    const number = `${index + 1}.`.padEnd(4);

    return `${number}${time.padEnd(10)}${solve.scramble}`;
  });

  return [
    `Cubetimer.io · ${solves[0]?.puzzle} · ${date}`,
    `Session average: ${shareTime(averageCurved([...times], times.length))} (best and worst dropped)`,
    `Best ${shareTime(best)} · Worst ${shareTime(worst)} · Mean ${shareTime(average(times))}`,
    "",
    ...rows,
  ].join("\n");
};

export default sessionSummary;
