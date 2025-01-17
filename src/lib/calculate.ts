const average = (times: number[]): number =>
  !times.length ? 0 : times.reduce((prev, cur) => prev + cur) / times.length;

const averageOfSize = (times: number[], size: number): number =>
  times.length < size
    ? 0
    : times.slice(-size).reduce((prev, cur) => prev + cur) / size;

const averageCurved = (times: number[], size: number): number =>
  times.length < size
    ? 0
    : times
        .sort((a, b) => a - b)
        .slice(0, -1)
        .slice(1)
        .reduce((prev, cur) => prev + cur) /
      (times.length - 2);

const fastestTime = (times: number[]): number =>
  !times.length ? 0 : Math.min(...times);

const slowestTime = (times: number[]): number =>
  !times.length ? 0 : Math.max(...times);

export { average, averageCurved, averageOfSize, fastestTime, slowestTime };
