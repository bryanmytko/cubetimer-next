import { humanReadableTime } from "../../lib/format";

interface ClockProps {
  countdown: number;
  inspectionRunning: boolean;
  time: number;
}

const Clock = (props: ClockProps) => {
  const { countdown, inspectionRunning, time } = props;

  return (
    <div
      className={`w-11/12 py-4 mx-auto mt-6 text-center rounded card ${
        inspectionRunning ? "bg-transparent animate-iping-slow" : "bg-slate-700"
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
