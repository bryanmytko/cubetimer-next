import { TimerState } from "../../types/timer";

export const initialState: TimerState = {
  classicModeEnabled: false,
  classicModeLength: 12,
  countdown: 0,
  inspectionRunning: false,
  inspectionTime: 0,
  puzzleType: "3x3",
  ready: false,
  running: false,
  scramble: "",
  solveTimes: [],
  time: 0,
};
