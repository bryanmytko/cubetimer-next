import { randInt } from "../random";

const FRONT_PINS = ["UR", "DR", "DL", "UL", "U", "R", "D", "L", "ALL"];
const BACK_PINS = ["U", "R", "D", "L", "ALL"];

// Clockwise turns are 0+ through 6+, counter-clockwise 1- through 5-
const turn = (pins: string): string => {
  const amount = randInt(-5, 6);

  return `${pins}${Math.abs(amount)}${amount < 0 ? "-" : "+"}`;
};

// WCA notation: front pin turns, flip the clock (y2), then back pin turns
export const generateClock = (): string =>
  [...FRONT_PINS.map(turn), "y2", ...BACK_PINS.map(turn)].join(" ");
