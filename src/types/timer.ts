export enum TimerActionKind {
  ADD_TIME = "ADD_TIME",
  COUNTDOWN = "COUNTDOWN",
  INITIALIZE = "INITIALIZE",
  INSPECTION_TIME = "INSPECTION_TIME",
  PUZZLE_TYPE = "PUZZLE_TYPE",
  READY = "READY",
  REMOVE_TIME = "REMOVE_TIME",
  SET_SOLVE_SESSION_ID = "SET_SOLVE_SESSION_ID",
  TICK_UP = "TICK_UP",
  TOGGLE_CONFIRM_ACTIVE = "TOGGLE_CONFIRM_ACTIVE",
  TOGGLE_CLASSIC_MODE = "TOGGLE_CLASSIC_MODE",
  TOGGLE_INSPECTION = "TOGGLE_INSPECTION",
  TOGGLE_RUNNING = "TOGGLE_RUNNING",
}

export interface RecordSolveOptions {
  penalty: number;
}

export interface Solve {
  id: string;
  penalty: number;
  time: number;
}

export interface TimerState {
  classicModeEnabled: boolean;
  classicModeLength: number;
  confirmActive: boolean;
  countdown: number;
  inspectionRunning: boolean;
  inspectionTime: number;
  penalty?: number;
  puzzleType: string;
  ready: boolean;
  running: boolean;
  scramble: string;
  solveSessionId?: string;
  solveTimes: Solve[];
  time: number;
}

export type TimerAction =
  | {
      type:
        | TimerActionKind.INITIALIZE
        | TimerActionKind.READY
        | TimerActionKind.TICK_UP
        | TimerActionKind.TOGGLE_CLASSIC_MODE
        | TimerActionKind.TOGGLE_CONFIRM_ACTIVE
        | TimerActionKind.TOGGLE_INSPECTION
        | TimerActionKind.TOGGLE_RUNNING;
    }
  | { type: TimerActionKind.ADD_TIME; penalty: number; solveId: string }
  | { type: TimerActionKind.COUNTDOWN; value: number }
  | { type: TimerActionKind.INSPECTION_TIME; inspectionTime: number }
  | { type: TimerActionKind.PUZZLE_TYPE; puzzle: string }
  | { type: TimerActionKind.REMOVE_TIME; index: number }
  | { type: TimerActionKind.SET_SOLVE_SESSION_ID; id: string };
