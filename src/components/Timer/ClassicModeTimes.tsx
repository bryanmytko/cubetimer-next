import { useContext } from "react";
import { TimerContext } from "../Timer/TimerContext";

import { HumanReadableTime } from "./";
import { Solve, TimerState } from "../../types/timer";

const ClassicModeTimes = () => {
  const timer = useContext(TimerContext) as TimerState;

  return (
    <div className="content-center w-8/12 mx-auto">
      <ol className="grid grid-cols-6 mt-5 text-xl text-gray-300 lg:grid-cols-12 content-evenly">
        {timer.solveTimes.map((solve: Solve, index: number) => (
          <li key={index} id={String(index)} className="pr-2">
            <HumanReadableTime
              time={solve.time}
              penalty={solve.penalty}
              compact={true}
              initialValue={"0:00"}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ClassicModeTimes;
