import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  average,
  averageCurved,
  averageOfSize,
  fastestTime,
  slowestTime,
} from "../../lib/calculate";
import { humanReadableTime } from "../../lib/format";
import { Solve, TimerAction } from "../../types/timer";
import { TimerActionKind } from "../../reducers";
import CubeDropdown from "./CubeDropdown";
import InspectionDropdown from "./InspectionDropdown";
import { CREATE_SOLVE_SESSION } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";

interface PanelProps {
  classicModeEnabled: boolean;
  dispatch: Dispatch<TimerAction>;
  inspectionRunning: boolean;
  setSolveSessionId: Dispatch<SetStateAction<null>>;
  solveTimes: Solve[];
}

const SESSION_LENGTH = 12;

const Panel = (props: PanelProps) => {
  const {
    classicModeEnabled,
    dispatch,
    inspectionRunning,
    setSolveSessionId,
    solveTimes,
  } = props;
  const { data: session } = useSession();
  const [createSolveSession, {}] = useMutation(CREATE_SOLVE_SESSION);
  const times = solveTimes.map((s) => s.time);

  const runningTimes = () => {
    if (classicModeEnabled) {
      return (
        <p>
          Session Average:{" "}
          {humanReadableTime(averageCurved(times, SESSION_LENGTH))}
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
        variables: { userId, size: 12 },
      });
      setSolveSessionId(response.data?.createSolveSession.id);
    }

    dispatch({ type: TimerActionKind.TOGGLE_CLASSIC_MODE });
  };

  return (
    <div className="flex w-11/12 px-4 py-6 mx-auto mt-6 bg-gray-300 rounded card">
      <div className="flex-1">
        <p>Cubes Solved: {solveTimes.length}</p>
        <p>Average: {humanReadableTime(average(times))}</p>
        {runningTimes()}
      </div>
      <div className="flex-1 text-right">
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
        <div>
          <label htmlFor="classicMode" className="mr-2">
            Classic mode:
          </label>
          <input
            id="classicMode"
            type="checkbox"
            onChange={toggleClassicMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Panel;
