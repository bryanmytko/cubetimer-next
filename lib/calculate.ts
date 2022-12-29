const average = (times: number[]): number => {
  if (!times.length) return 0;
  return times.reduce((prev, cur) => prev + cur) / times.length;
};

const averageOfSize = (times: number[], size: number): number => {
  if (times.length < size) return 0;
  return times.slice(-size).reduce((prev, cur) => prev + cur) / size;
};

const fastestTime = (times: number[]): number => {
  if (!times.length) return 0;
  return Math.min(...times);
};

const slowestTime = (times: number[]): number => {
  if (!times.length) return 0;
  return Math.max(...times);
};

export { average, averageOfSize, fastestTime, slowestTime };
