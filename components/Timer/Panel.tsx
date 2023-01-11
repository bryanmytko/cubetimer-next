import { Dispatch } from "react";
import {
  average,
  averageOfSize,
  fastestTime,
  slowestTime,
} from "../../lib/calculate";
import { humanReadableTime } from "../../lib/format";
import { TimerAction } from "../../types/timer";
import CubeDropdown from "./CubeDropdown";
import InspectionDropdown from "./InspectionDropdown";

interface PanelProps {
  dispatch: Dispatch<TimerAction>;
  preloadAudio: () => void;
  solveTimes: number[];
}

const Panel = (props: PanelProps) => {
  const { dispatch, preloadAudio, solveTimes } = props;

  return (
    <div className="flex card rounded bg-gray-300 px-4 py-6 mt-6 mx-auto w-11/12">
      <div className="flex-1">
        <p>Cubes Solved: {props.solveTimes.length}</p>
        <p>Average: {humanReadableTime(average(solveTimes))}</p>
        <p>Ao5: {humanReadableTime(averageOfSize(solveTimes, 5))}</p>
        <p>Ao10: {humanReadableTime(averageOfSize(solveTimes, 10))}</p>
      </div>
      <div className="flex-1 text-right">
        <p>Fastest: {humanReadableTime(fastestTime(solveTimes))}</p>
        <p>Slowest: {humanReadableTime(slowestTime(solveTimes))}</p>
        <CubeDropdown dispatch={dispatch} />
        <InspectionDropdown dispatch={dispatch} preloadAudio={preloadAudio} />
      </div>
    </div>
  );
};

export default Panel;
