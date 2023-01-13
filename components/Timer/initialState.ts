import { TimerState } from "../../types/timer";

export const initialState: TimerState = {
  countdown: 0,
  inspectionRunning: false,
  running: false,
  ready: false,
  time: 0,
  solveTimes: [],
  scramble: "",
  inspectionTime: 0,
};
