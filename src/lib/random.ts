export const randInt = (a: number, b: number): number => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const diff = upper - lower;

  return Math.floor(Math.random() * (diff + 1) + lower);
};

export const sample = <T>(items: T[]): T => items[randInt(0, items.length - 1)];
