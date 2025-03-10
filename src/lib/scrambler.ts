import {
  cube2x2,
  cube3x3,
  cube4x4,
  cube5x5,
  //   cube6x6,
  //   cube7x7,
  //   cubePyraminx,
  //   cubeMegaminx
} from "./cubes";

import { PuzzleNameObj, PuzzleValueType } from "../types/timer";

const puzzles: PuzzleArray = {
  "2x2": cube2x2,
  "3x3": cube3x3,
  "4x4": cube4x4,
  "5x5": cube5x5,
  // "6x6": cube6x6,
  // '7x7': cube7x7,
  // 'pyraminx': cubePyraminx,
  // 'megaminx': cubeMegaminx
};

/* TODO Refactor and move this stuff */

interface PuzzleType {
  moves: Array<MovesType>;
  final?: Array<MovesType>;
}

interface MovesType {
  name: string;
  turns: Array<string>;
  restricted: Array<string>;
}

interface PuzzleArray {
  [index: string]: PuzzleType;
}

class Scrambler {
  private puzzle: PuzzleType;
  private scrambleLength: number;

  constructor() {
    this.puzzle = puzzles[PuzzleNameObj["3x3"]];
    this.scrambleLength = 21;
  }

  public generate = (puzzleName?: PuzzleValueType): string => {
    const moves = [];
    let currMove, currFace, prevFace;
    if (puzzleName) this.puzzle = puzzles[puzzleName];

    for (let i = 0; i < this.scrambleLength; i++) {
      currFace = this.getRandomFace(prevFace);
      currMove = this.getRandomMove(currFace);

      moves.push(currMove);
      prevFace = currFace;
    }

    if (this.puzzle.final) {
      moves.push(
        this.puzzle.final[this.randInt(0, this.puzzle.final.length - 1)],
      );
    }

    return moves.join(" ");
  };

  private randInt = (a: number, b: number): number => {
    const lower = Math.min(a, b);
    const upper = Math.max(a, b);
    const diff = upper - lower;

    return Math.floor(Math.random() * (diff + 1) + lower);
  };

  private getRandomFace = (prevFace?: MovesType): MovesType => {
    if (prevFace) {
      let randomFace;

      do {
        randomFace =
          this.puzzle.moves[this.randInt(0, this.puzzle.moves.length - 1)];
      } while (!this.isValidFace(randomFace, prevFace));

      return randomFace;
    }

    return this.puzzle.moves[this.randInt(0, this.puzzle.moves.length - 1)];
  };

  private getRandomMove = (face: MovesType): string => {
    return face.turns[this.randInt(0, face.turns.length - 1)];
  };

  private isValidFace = (curr: MovesType, prev: MovesType): boolean =>
    curr.name !== prev.name && curr.restricted.indexOf(prev.name) === -1;
}

export default Scrambler;
