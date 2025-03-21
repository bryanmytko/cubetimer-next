export enum TimerActionKind {
  ADD_TIME = "ADD_TIME",
  ADD_TIMES = "ADD_TIMES",
  CANCEL_SOLVE = "CANCEL_SOLVE",
  COUNTDOWN = "COUNTDOWN",
  INITIALIZE = "INITIALIZE",
  INSPECTION_TIME = "INSPECTION_TIME",
  LOCK = "LOCK",
  PUZZLE_TYPE = "PUZZLE_TYPE",
  READY = "READY",
  REMOVE_TIME = "REMOVE_TIME",
  RESET_CLASSIC_MODE = "RESET_CLASSIC_MODE",
  SET_KEY_LOCKED = "SET_KEY_LOCKED",
  SET_SOLVE_SESSION_ID = "SET_SOLVE_SESSION_ID",
  TICK_UP = "TICK_UP",
  TOGGLE_CONFIRM_ACTIVE = "TOGGLE_CONFIRM_ACTIVE",
  TOGGLE_CLASSIC_MODE = "TOGGLE_CLASSIC_MODE",
  TOGGLE_INSPECTION = "TOGGLE_INSPECTION",
  TOGGLE_RUNNING = "TOGGLE_RUNNING",
}

type PuzzleName = {
  "2x2": string;
  "3x3": string;
  "4x4": string;
  "5x5": string;
};

export const PuzzleNameObj: PuzzleName = {
  "2x2": "2x2",
  "3x3": "3x3",
  "4x4": "4x4",
  "5x5": "5x5",
};

export type PuzzleValueType = PuzzleName[keyof PuzzleName];

export interface RecordSolveOptions {
  penalty: number;
}

export interface Solve {
  penalty: number;
  time: number;
  scramble?: string;
}

export interface TimerState {
  classicModeEnabled: boolean | undefined;
  classicModeLength: number;
  confirmActive: boolean;
  countdown: number;
  inspectionRunning: boolean;
  inspectionTime: number;
  keyLocked: boolean;
  locked: boolean;
  reset: boolean;
  penalty?: number;
  puzzleType: PuzzleValueType;
  ready: boolean;
  running: boolean;
  scramble: string;
  solveSessionId?: string | null;
  solveTimes: Solve[];
  time: number;
}

export type TimerAction =
  | {
      type:
        | TimerActionKind.CANCEL_SOLVE
        | TimerActionKind.READY
        | TimerActionKind.RESET_CLASSIC_MODE
        | TimerActionKind.TICK_UP
        | TimerActionKind.TOGGLE_CONFIRM_ACTIVE
        | TimerActionKind.TOGGLE_INSPECTION
        | TimerActionKind.TOGGLE_RUNNING;
    }
  | {
      type: TimerActionKind.ADD_TIME;
      penalty: number;
      scramble: string;
    }
  | { type: TimerActionKind.ADD_TIMES; solves: Solve[] }
  | { type: TimerActionKind.COUNTDOWN; value: number }
  | {
      type: TimerActionKind.INITIALIZE;
      scramble?: string;
      defaultClassicMode?: boolean;
    }
  | { type: TimerActionKind.INSPECTION_TIME; inspectionTime: number }
  | { type: TimerActionKind.LOCK; value: boolean }
  | { type: TimerActionKind.PUZZLE_TYPE; puzzle: string }
  | { type: TimerActionKind.REMOVE_TIME; index: number }
  | { type: TimerActionKind.SET_KEY_LOCKED; value: boolean }
  | { type: TimerActionKind.SET_SOLVE_SESSION_ID; id: string | null }
  | { type: TimerActionKind.TOGGLE_CLASSIC_MODE; enabled?: boolean };
