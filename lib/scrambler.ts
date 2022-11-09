// import {
//   cube2x2,
//   cube3x3,
//   cube4x4,
//   cube5x5,
//   cube6x6,
//   cube7x7,
//   cubePyraminx,
//   cubeMegaminx
// } from '../lib/cubes';

export const cube3x3 = {
  moves: [
    { name: 'R', turns: ['R', 'R\'', 'R2'], restricted: ['R', 'L'] },
    { name: 'L', turns: ['L', 'L\'', 'L2'], restricted: ['L', 'R'] },
    { name: 'U', turns: ['U', 'U\'', 'U2'], restricted: ['U', 'D'] },
    { name: 'D', turns: ['D', 'D\'', 'D2'], restricted: ['D', 'U'] },
    { name: 'F', turns: ['F', 'F\'', 'F2'], restricted: ['F', 'B'] },
    { name: 'B', turns: ['B', 'B\'', 'B2'], restricted: ['B', 'F'] },
  ]
};

const puzzles: PuzzleArray = {
  // '2x2': cube2x2,
  '3x3': cube3x3,
  // '4x4': cube4x4,
  // '5x5': cube5x5,
  // '6x6': cube6x6,
  // '7x7': cube7x7,
  // 'pyraminx': cubePyraminx,
  // 'megaminx': cubeMegaminx
};

/* TODO Refactor and move this stuff */

interface PuzzleType {
  moves: Array<MovesType>,
  final?: Array<MovesType>
}

interface MovesType {
  name: string,
  turns: Array<string>,
  restricted: Array<string>
}

interface PuzzleArray {
  [index: string]: PuzzleType
}

class Scrambler {
  puzzle: PuzzleType;
  scrambleLength: number;

  constructor(puzzleName: string = '3x3') {
    this.puzzle = puzzles[puzzleName];
    this.scrambleLength = 21;
  }

  generate = (): string => {
    const moves = [];
    let currMove, currFace, prevFace;

    for(let i=0; i<this.scrambleLength; i++){
      currFace = this.getRandomFace(prevFace);
      currMove = this.getRandomMove(currFace);

      moves.push(currMove);
      prevFace = currFace;
    }

    if(this.puzzle.final) {
      moves.push(
        this.puzzle.final[
          this.randInt(0, this.puzzle.final.length - 1)
        ]
      );
    }

    return moves.join(' ');
  }

  randInt = (a: number, b: number): number => {
    const lower = Math.min(a, b);
    const upper = Math.max(a, b);
    const diff = upper - lower;

    return Math.floor((Math.random() * (diff + 1)) + lower);
  }

  getRandomFace = (prevFace?: MovesType): MovesType => {
    if(prevFace) {
      let randomFace;

      do {
        randomFace = this.puzzle.moves[
          this.randInt(0, this.puzzle.moves.length - 1)
        ];
      } while(!this.isValidFace(randomFace, prevFace));

      return randomFace;
    }

    return this.puzzle.moves[this.randInt(0, this.puzzle.moves.length - 1)];
  }

  getRandomMove = (face: MovesType): string => {
    return face.turns[this.randInt(0, face.turns.length - 1)];
  }

  isValidFace = (curr: MovesType, prev: MovesType): boolean => (
    (curr.name !== prev.name) && (curr.restricted.indexOf(prev.name) === -1)
  )
}

export default Scrambler;
