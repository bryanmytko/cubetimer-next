import Scrambler from "../lib/scrambler";
import { TimerAction, TimerActionKind, TimerState } from "../types/timer";

const scrambler = new Scrambler();

const TimerReducer = (state: TimerState, action: TimerAction) => {
  switch (action.type) {
    case TimerActionKind.ADD_TIME:
      return {
        ...state,
        scramble: scrambler.generate(state.puzzleType),
        solveTimes: state.classicModeEnabled
          ? [
              ...state.solveTimes,
              {
                time: state.time,
                penalty: action.penalty,
                scramble: action.scramble,
              },
            ]
          : [
              {
                time: state.time,
                penalty: action.penalty,
                scramble: action.scramble,
              },
              ...state.solveTimes,
            ],
      };
    case TimerActionKind.ADD_TIMES:
      return {
        ...state,
        solveTimes: [...state.solveTimes, ...action.solves],
      };
    case TimerActionKind.CANCEL_SOLVE:
      return {
        ...state,
        confirmActive: false,
        keyLocked: false,
        locked: false,
        scramble: scrambler.generate(state.puzzleType),
      };
    case TimerActionKind.COUNTDOWN:
      return { ...state, countdown: action.value };
    case TimerActionKind.INITIALIZE:
      return {
        ...state,
        scramble: action.scramble || scrambler.generate(state.puzzleType),
      };
    case TimerActionKind.INSPECTION_TIME:
      return {
        ...state,
        countdown: action.inspectionTime,
        inspectionTime: action.inspectionTime,
      };
    case TimerActionKind.LOCK:
      return { ...state, locked: action.value };
    case TimerActionKind.PUZZLE_TYPE:
      return {
        ...state,
        puzzleType: action.puzzle,
        running: false,
        solveTimes: [],
        scramble: scrambler.generate(action.puzzle),
      };
    case TimerActionKind.READY:
      return state.running ? state : { ...state, ready: true, reset: false };
    case TimerActionKind.REMOVE_TIME:
      return {
        ...state,
        solveTimes: state.solveTimes.filter((_, i) => i !== action.index),
      };
    case TimerActionKind.RESET_CLASSIC_MODE:
      return {
        ...state,
        reset: true,
        running: false,
        scramble: scrambler.generate(state.puzzleType),
        sessionComplete: false,
        solveTimes: [],
      };
    // Sets the mode from settings: first a provisional guess from the
    // browser's cache, then what the server says. Only an undecided or
    // provisional mode changes, so a toggle always wins. A change clears the
    // times like a toggle does, since they belong to the other mode.
    case TimerActionKind.SETTLE_CLASSIC_MODE: {
      const { classicModeEnabled, classicModeProvisional, solveTimes } = state;
      if (classicModeEnabled !== undefined && !classicModeProvisional) return state;

      const changed = classicModeEnabled !== undefined && classicModeEnabled !== action.enabled;
      return {
        ...state,
        classicModeEnabled: action.enabled,
        classicModeProvisional: !!action.provisional,
        solveTimes: changed ? [] : solveTimes,
      };
    }
    case TimerActionKind.SET_SOLVE_SESSION_ID:
      return { ...state, solveSessionId: action.id };
    case TimerActionKind.SET_KEY_LOCKED:
      return { ...state, keyLocked: action.value };
    case TimerActionKind.TICK_UP:
      return { ...state, time: state.time + 60 };
    case TimerActionKind.TOGGLE_CLASSIC_MODE:
      return {
        ...state,
        classicModeEnabled: action.enabled ?? !state.classicModeEnabled,
        classicModeProvisional: false,
        running: false,
        solveTimes: [],
      };
    case TimerActionKind.TOGGLE_CONFIRM_ACTIVE:
      return {
        ...state,
        confirmActive: !state.confirmActive,
        keyLocked: false,
        locked: false,
      };
    case TimerActionKind.TOGGLE_INSPECTION:
      return {
        ...state,
        inspectionRunning: !state.inspectionRunning,
        locked: !state.locked,
      };
    case TimerActionKind.TOGGLE_RUNNING:
      if (state.running) {
        return {
          ...state,
          running: false,
          ready: false,
        };
      }
      return {
        ...state,
        inspectionRunning: false,
        locked: false,
        time: 0,
        ready: false,
        running: true,
      };
  }
};

export { TimerReducer };
