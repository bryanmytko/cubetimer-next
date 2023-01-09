export enum TimerActionKind {
  COUNTDOWN = "COUNTDOWN",
  INITIALIZE = "INITIALIZE",
  INSPECTION_TIME = "INSPECTION_TIME",
  PUZZLE_TYPE = "PUZZLE_TYPE",
  READY = "READY",
  REMOVE_TIME = "REMOVE_TIME",
  TICK_UP = "TICK_UP",
  TOGGLE_RUNNING = "TOGGLE_RUNNING",
  TOGGLE_INSPECTION = "TOGGLE_INSPECTION",
}

export interface TimerState {
  countdown: number;
  inspectionTime: number;
  inspectionRunning: boolean;
  ready: boolean;
  running: boolean;
  scramble: string;
  solveTimes: Array<number>;
  time: number;
}

export type TimerAction =
  | {
      type:
        | TimerActionKind.INITIALIZE
        | TimerActionKind.TOGGLE_RUNNING
        | TimerActionKind.TOGGLE_INSPECTION
        | TimerActionKind.READY
        | TimerActionKind.TICK_UP;
    }
  | { type: TimerActionKind.REMOVE_TIME; index: number }
  | { type: TimerActionKind.PUZZLE_TYPE; puzzle: string }
  | { type: TimerActionKind.INSPECTION_TIME; inspectionTime: number }
  | { type: TimerActionKind.COUNTDOWN; value: number };
