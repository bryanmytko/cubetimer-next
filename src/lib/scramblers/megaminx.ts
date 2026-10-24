import { sample } from "../random";

const LINES = 7;
const MOVES_PER_LINE = 10;

// WCA (Pochmann) notation: each line alternates R and D double turns and ends
// with a U turn in the same direction as the last D
export const generateMegaminx = (): string => {
  const lines = [];

  for (let i = 0; i < LINES; i++) {
    const moves = [];

    for (let j = 0; j < MOVES_PER_LINE; j++) {
      moves.push(`${j % 2 === 0 ? "R" : "D"}${sample(["++", "--"])}`);
    }

    moves.push(moves[moves.length - 1] === "D++" ? "U" : "U'");
    lines.push(moves.join(" "));
  }

  return lines.join("\n");
};
