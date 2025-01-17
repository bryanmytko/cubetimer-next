import { PuzzleNameObj, TimerState } from "../../types/timer";

const DEFAULT_CUBE_SIZE = PuzzleNameObj["3x3"];

export const initialState: TimerState = {
  classicModeEnabled: false,
  classicModeLength: 12,
  confirmActive: false,
  countdown: 0,
  inspectionRunning: false,
  inspectionTime: 0,
  keyLocked: false,
  locked: false,
  puzzleType: DEFAULT_CUBE_SIZE,
  ready: false,
  running: false,
  scramble: "",
  solveSessionId: undefined,
  solveTimes: [],
  time: 0,
};
