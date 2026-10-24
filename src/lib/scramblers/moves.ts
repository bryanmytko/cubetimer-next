import { randInt, sample } from "../random";

export interface MovesType {
  name: string;
  turns: Array<string>;
  restricted: Array<string>;
}

export interface MovePuzzle {
  moves: Array<MovesType>;
  tips?: Array<string>;
}

const isValidFace = (curr: MovesType, prev: MovesType): boolean =>
  curr.name !== prev.name && curr.restricted.indexOf(prev.name) === -1;

// Random-move scramble for puzzles described by a list of faces (cubes,
// pyraminx, skewb)
export const generateMoves = (puzzle: MovePuzzle, length: number): string => {
  const moves = [];
  let prevFace: MovesType | undefined;

  for (let i = 0; i < length; i++) {
    let face: MovesType;

    do {
      face = sample(puzzle.moves);
    } while (prevFace && !isValidFace(face, prevFace));

    moves.push(sample(face.turns));
    prevFace = face;
  }

  // Tips don't affect the rest of the puzzle, so each is turned at most once
  puzzle.tips?.forEach((tip) => {
    const turn = randInt(0, 2);

    if (turn === 1) moves.push(tip);
    if (turn === 2) moves.push(`${tip}'`);
  });

  return moves.join(" ");
};
