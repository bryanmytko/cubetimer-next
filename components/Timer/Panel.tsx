import { Dispatch } from "react";
import {
  average,
  averageOfSize,
  fastestTime,
  slowestTime,
} from "../../lib/calculate";
import { humanReadableTime } from "../../lib/format";
import { TimerAction } from "../../types/timer";
import { TimerActionKind } from "../../reducers";
import CubeDropdown from "./CubeDropdown";
import InspectionDropdown from "./InspectionDropdown";

interface PanelProps {
  classicModeEnabled: boolean;
  dispatch: Dispatch<TimerAction>;
  inspectionRunning: boolean;
  solveTimes: number[];
}

const Panel = (props: PanelProps) => {
  const { classicModeEnabled, dispatch, inspectionRunning, solveTimes } = props;
  const runningTimes = () => {
    if (classicModeEnabled) {
      return <p>Session Average: {humanReadableTime(averageOfSize(solveTimes, 12))}</p>
    } else {
      return <>
        <p>Ao5: {humanReadableTime(averageOfSize(solveTimes, 5))}</p>
        <p>Ao10: {humanReadableTime(averageOfSize(solveTimes, 10))}</p>
      </>
    }
  }

  return (
    <div className="flex w-11/12 px-4 py-6 mx-auto mt-6 bg-gray-300 rounded card">
      <div className="flex-1">
        <p>Cubes Solved: {solveTimes.length}</p>
        <p>Average: {humanReadableTime(average(solveTimes))}</p>
        {runningTimes()}
      </div>
      <div className="flex-1 text-right">
        <p>Fastest: {humanReadableTime(fastestTime(solveTimes))}</p>
        <p>Slowest: {humanReadableTime(slowestTime(solveTimes))}</p>
        <CubeDropdown
          dispatch={dispatch}
          inspectionRunning={inspectionRunning}
        />
        <InspectionDropdown
          dispatch={dispatch}
          inspectionRunning={inspectionRunning}
        />
        <div>
          <label htmlFor="classicMode" className="mr-2">Classic mode:</label>
          <input id="classicMode" type="checkbox" onChange={() => dispatch({ type: TimerActionKind.TOGGLE_CLASSIC_MODE })} />
        </div>
      </div>
    </div>
  );
};

export default Panel;
