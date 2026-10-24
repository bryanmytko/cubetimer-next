import {
  cube2x2,
  cube3x3,
  cube4x4,
  cube5x5,
  cube6x6,
  cube7x7,
  cubePyraminx,
  cubeSkewb,
} from "./cubes";
import { generateMoves } from "./scramblers/moves";
import { generateMegaminx } from "./scramblers/megaminx";
import { generateSquare1 } from "./scramblers/square1";
import { generateClock } from "./scramblers/clock";

import { PuzzleNameObj, PuzzleValueType } from "../types/timer";

// Lengths roughly match official WCA scrambles
const generators: { [index: string]: () => string } = {
  [PuzzleNameObj["2x2"]]: () => generateMoves(cube2x2, 11),
  [PuzzleNameObj["3x3"]]: () => generateMoves(cube3x3, 21),
  [PuzzleNameObj["4x4"]]: () => generateMoves(cube4x4, 40),
  [PuzzleNameObj["5x5"]]: () => generateMoves(cube5x5, 60),
  [PuzzleNameObj["6x6"]]: () => generateMoves(cube6x6, 80),
  [PuzzleNameObj["7x7"]]: () => generateMoves(cube7x7, 100),
  [PuzzleNameObj.Pyraminx]: () => generateMoves(cubePyraminx, 11),
  [PuzzleNameObj.Megaminx]: generateMegaminx,
  [PuzzleNameObj.Skewb]: () => generateMoves(cubeSkewb, 11),
  [PuzzleNameObj["Square-1"]]: generateSquare1,
  [PuzzleNameObj.Clock]: generateClock,
};

class Scrambler {
  private puzzleName: PuzzleValueType;

  constructor() {
    this.puzzleName = PuzzleNameObj["3x3"];
  }

  public generate = (puzzleName?: PuzzleValueType): string => {
    if (puzzleName) this.puzzleName = puzzleName;

    return generators[this.puzzleName]();
  };
}

export default Scrambler;
