export enum TimerActionKind {
  INITIALIZE = "INITIALIZE",
  INSPECTION_TIME = "INSPECTION_TIME",
  PUZZLE_TYPE = "PUZZLE_TYPE",
  READY = "READY",
  REMOVE_TIME = "REMOVE_TIME",
  TICK = "TICK",
  TOGGLE = "TOGGLE",
}

export interface TimerState {
  inspectionTime: number;
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
        | TimerActionKind.TOGGLE
        | TimerActionKind.READY
        | TimerActionKind.TICK;
    }
  | { type: TimerActionKind.REMOVE_TIME; index: number }
  | { type: TimerActionKind.PUZZLE_TYPE; puzzle: string }
  | { type: TimerActionKind.INSPECTION_TIME; inspectionTime: number };
