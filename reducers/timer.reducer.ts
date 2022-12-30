import Scrambler from "../lib/scrambler";

interface TimerState {
  running: boolean;
  ready: boolean;
  time: number;
  solveTimes: Array<number>;
  scramble: string;
}

enum TimerActionKind {
  INITIALIZE = "INITIALIZE",
  TOGGLE = "TOGGLE",
  READY = "READY",
  REMOVE_TIME = "REMOVE_TIME",
  TICK = "TICK",
  PUZZLE_TYPE = "PUZZLE_TYPE",
}

type TimerAction =
  | {
      type:
        | TimerActionKind.INITIALIZE
        | TimerActionKind.TOGGLE
        | TimerActionKind.READY
        | TimerActionKind.TICK;
    }
  | { type: TimerActionKind.REMOVE_TIME; index: number }
  | { type: TimerActionKind.PUZZLE_TYPE; puzzle: string };

const TimerReducer = (state: TimerState, action: TimerAction) => {
  switch (action.type) {
    case TimerActionKind.INITIALIZE:
      return { ...state, scramble: new Scrambler("3x3").generate() };
    case TimerActionKind.TOGGLE:
      if (state.running) {
        return {
          ...state,
          running: false,
          ready: false,
          solveTimes: [...state.solveTimes, state.time],
          scramble: new Scrambler("3x3").generate(),
        };
      }
      return { ...state, time: 0, ready: false, running: true };
    case TimerActionKind.READY:
      return state.running ? state : { ...state, ready: true };
    case TimerActionKind.REMOVE_TIME:
      return {
        ...state,
        solveTimes: state.solveTimes.filter((_, i) => i !== action.index),
      };
    case TimerActionKind.TICK:
      return { ...state, time: state.time + 60 };
    case TimerActionKind.PUZZLE_TYPE:
      return {
        ...state,
        running: false,
        solveTimes: [],
        scramble: new Scrambler(action.puzzle).generate(),
      };
  }
};

export { TimerReducer, TimerActionKind };
