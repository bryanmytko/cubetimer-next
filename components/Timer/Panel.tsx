import { Dispatch } from "react";
import {
  average,
  averageOfSize,
  fastestTime,
  slowestTime,
} from "../../lib/calculate";
import { humanReadableTime } from "../../lib/format";
import CubeDropdown from "./CubeDropdown";

enum TimerActionKind {
  TOGGLE = "TOGGLE",
  READY = "READY",
  REMOVE_TIME = "REMOVE_TIME",
  TICK = "TICK",
  PUZZLE_TYPE = "PUZZLE_TYPE",
}

type TimerAction =
  | {
      type:
        | TimerActionKind.TOGGLE
        | TimerActionKind.READY
        | TimerActionKind.TICK;
    }
  | { type: TimerActionKind.REMOVE_TIME; index: number }
  | { type: TimerActionKind.PUZZLE_TYPE; puzzle: string };

interface PanelProps {
  dispatch: Dispatch<TimerAction>;
  solveTimes: number[];
}

const Panel = (props: PanelProps) => {
  const { solveTimes } = props;
  return (
    <div className="flex card rounded bg-gray-300 px-4 py-6 mt-6 mx-auto w-4/5">
      <div className="flex-1">
        <p>Cubes Solved: {props.solveTimes.length}</p>
        <p>Average: {humanReadableTime(average(solveTimes))}</p>
        <p>Ao5: {humanReadableTime(averageOfSize(solveTimes, 5))}</p>
        <p>Ao10: {humanReadableTime(averageOfSize(solveTimes, 10))}</p>
      </div>
      <div className="flex-1 text-right">
        <p>Fastest: {humanReadableTime(fastestTime(solveTimes))}</p>
        <p>Slowest: {humanReadableTime(slowestTime(solveTimes))}</p>
        <CubeDropdown />
      </div>
    </div>
  );
};

export default Panel;
