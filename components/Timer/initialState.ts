import { TimerState } from "../../types/timer";

export const initialState: TimerState = {
  countdown: 0,
  inspectionRunning: false,
  inspectionTime: 0,
  ready: false,
  running: false,
  scramble: "",
  solveTimes: [],
  time: 0,
};
