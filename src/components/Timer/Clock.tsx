import { useContext } from "react";

import { TimerContext } from "../Timer/TimerContext";
import { humanReadableTime } from "../../lib/format";
import { TimerState } from "../../types/timer";

const Clock = () => {
  const timer = useContext(TimerContext) as TimerState;
  const { countdown, inspectionRunning, time } = timer;

  return (
    <div
      className={`w-11/12 py-4 mx-auto mt-6 text-center rounded card ${
        inspectionRunning
          ? "bg-transparent animate-iping-slow"
          : "bg-neutral-800"
      }`}
    >
      <span
        id="timer-screen"
        className="font-mono font-black text-white timer text-8xl"
      >
        {inspectionRunning ? countdown : humanReadableTime(time, "0:00")}
      </span>
    </div>
  );
};

export default Clock;
