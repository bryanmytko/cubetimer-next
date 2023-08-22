export enum TimerActionKind {
  ADD_TIME = "ADD_TIME",
  COUNTDOWN = "COUNTDOWN",
  INITIALIZE = "INITIALIZE",
  INSPECTION_TIME = "INSPECTION_TIME",
  PUZZLE_TYPE = "PUZZLE_TYPE",
  PENALTY = "PENALTY",
  READY = "READY",
  REMOVE_TIME = "REMOVE_TIME",
  TICK_UP = "TICK_UP",
  TOGGLE_CLASSIC_MODE = "TOGGLE_CLASSIC_MODE",
  TOGGLE_RUNNING = "TOGGLE_RUNNING",
  TOGGLE_INSPECTION = "TOGGLE_INSPECTION",
}

export interface Solve {
  time: number;
  id: string;
  penalty?: number;
}

export interface TimerState {
  classicModeEnabled: boolean;
  countdown: number;
  inspectionTime: number;
  inspectionRunning: boolean;
  penalty?: number;
  puzzleType: string;
  ready: boolean;
  running: boolean;
  scramble: string;
  solveTimes: Solve[];
  time: number;
}

export type TimerAction =
  | {
      type:
        | TimerActionKind.INITIALIZE
        | TimerActionKind.TOGGLE_CLASSIC_MODE
        | TimerActionKind.TOGGLE_INSPECTION
        | TimerActionKind.TOGGLE_RUNNING
        | TimerActionKind.READY
        | TimerActionKind.TICK_UP;
    }
  | { type: TimerActionKind.ADD_TIME; solveId: string }
  | { type: TimerActionKind.COUNTDOWN; value: number }
  | { type: TimerActionKind.INSPECTION_TIME; inspectionTime: number }
  | { type: TimerActionKind.PENALTY; value: number }
  | { type: TimerActionKind.PUZZLE_TYPE; puzzle: string }
  | { type: TimerActionKind.REMOVE_TIME; index: number };
