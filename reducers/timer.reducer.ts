import Scrambler from "../lib/scrambler";
import { TimerAction, TimerActionKind, TimerState } from "../types/timer";

// import prisma from '../lib/prismadb';
//const user = await prisma.user.

const TimerReducer = (state: TimerState, action: TimerAction) => {
  const saveTime = async () => {
    // const user = await prisma.user.count;
    // console.log("Session in TimerReducer:", user);
  };

  switch (action.type) {
    case TimerActionKind.TOGGLE_CLASSIC_MODE:
      return {
        ...state,
        classicModeEnabled: !state.classicModeEnabled,
        running: false,
        solveTimes: [],
      };
    case TimerActionKind.INITIALIZE:
      return { ...state, scramble: new Scrambler("3x3").generate() };
    case TimerActionKind.TOGGLE_INSPECTION:
      return { ...state, inspectionRunning: !state.inspectionRunning };
    case TimerActionKind.TOGGLE_RUNNING:
      if (state.running) {
        saveTime();
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
    case TimerActionKind.TICK_UP:
      return { ...state, time: state.time + 60 };
    case TimerActionKind.COUNTDOWN:
      return { ...state, countdown: action.value };
    case TimerActionKind.PUZZLE_TYPE:
      return {
        ...state,
        running: false,
        solveTimes: [],
        scramble: new Scrambler(action.puzzle).generate(),
      };
    case TimerActionKind.INSPECTION_TIME:
      return {
        ...state,
        countdown: action.inspectionTime,
        inspectionTime: action.inspectionTime,
      };
  }
};

export { TimerReducer, TimerActionKind };
