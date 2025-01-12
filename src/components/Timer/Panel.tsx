import { ChangeEvent, Dispatch, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";

import {
  average,
  averageCurved,
  averageOfSize,
  fastestTime,
  slowestTime,
} from "../../lib/calculate";
import { humanReadableTime } from "../../lib/format";
import { TimerAction, TimerActionKind, TimerState } from "../../types/timer";
import CubeDropdown from "./CubeDropdown";
import InspectionDropdown from "./InspectionDropdown";
import { CREATE_SOLVE_SESSION } from "../../graphql/mutations";
import { TimerContext, TimerDispatchContext } from "../Timer/TimerContext";

const Panel = () => {
  const timer = useContext(TimerContext) as TimerState;
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;
  const { classicModeEnabled, inspectionRunning, solveTimes } = timer;
  const { data: session } = useSession();
  const [createSolveSession, {}] = useMutation(CREATE_SOLVE_SESSION);
  const times = solveTimes.map((s) => s.time + s.penalty);

  const runningTimes = () => {
    if (classicModeEnabled) {
      return (
        <p>
          Session Average:{" "}
          {humanReadableTime(averageCurved(times, timer.classicModeLength))}
        </p>
      );
    } else {
      return (
        <>
          <p>Ao5: {humanReadableTime(averageOfSize(times, 5))}</p>
          <p>Ao10: {humanReadableTime(averageOfSize(times, 10))}</p>
        </>
      );
    }
  };

  const toggleClassicMode = async (event: ChangeEvent<HTMLInputElement>) => {
    event.target.blur();

    if (!classicModeEnabled && session) {
      const userId = session.user.id;
      const response = await createSolveSession({
        variables: { userId, size: timer.classicModeLength },
      });
      dispatch({
        type: TimerActionKind.SET_SOLVE_SESSION_ID,
        id: response.data?.createSolveSession.id,
      });
    }

    dispatch({ type: TimerActionKind.TOGGLE_CLASSIC_MODE });
  };

  return (
    <div className="flex justify-between px-4 py-6 mx-auto mt-6 bg-gray-300 rounded card w-11/12">
      <div className="flex flex-col gap-2">
        <p>Cubes Solved: {solveTimes.length}</p>
        <p>Average: {humanReadableTime(average(times))}</p>
        {runningTimes()}
      </div>
      <div className="flex flex-col text-right gap-2">
        <p>Fastest: {humanReadableTime(fastestTime(times))}</p>
        <p>Slowest: {humanReadableTime(slowestTime(times))}</p>
        <CubeDropdown
          dispatch={dispatch}
          inspectionRunning={inspectionRunning}
        />
        <InspectionDropdown
          dispatch={dispatch}
          inspectionRunning={inspectionRunning}
        />
        <div className="flex justify-end">
          <label htmlFor="classicMode" className="mr-2">
            Classic mode:
          </label>
          <input
            id="classicMode"
            type="checkbox"
            className="accent-cyan-600 scale-125"
            onChange={toggleClassicMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Panel;
