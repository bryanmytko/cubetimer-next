import { Tutorial } from "../types";
import { twoByTwo } from "./twoByTwo";
import { threeByThree } from "./threeByThree";
import { fiveByFive, fourByFour, sevenBySeven, sixBySix } from "./bigCubes";
import { pyraminx } from "./pyraminx";
import { clock, megaminx, skewb, squareOne } from "./otherPuzzles";

// Same order as the timer's puzzle list
export const TUTORIALS: Array<Tutorial> = [
  twoByTwo,
  threeByThree,
  fourByFour,
  fiveByFive,
  sixBySix,
  sevenBySeven,
  pyraminx,
  megaminx,
  skewb,
  squareOne,
  clock,
];

export const tutorialBySlug = (slug: string): Tutorial | undefined =>
  TUTORIALS.find((t) => t.slug === slug);
