import { Dispatch, useContext } from "react";
import { useMutation } from "@apollo/client";
import { Session } from "next-auth";

import { HumanReadableTime } from "./";
import {
  Solve,
  TimerState,
  TimerAction,
  TimerActionKind,
} from "../../types/timer";
import { TimerContext, TimerDispatchContext } from "../Timer/TimerContext";
import { DELETE_SOLVE } from "../../graphql/mutations";

interface TimesProps {
  session: Session | null;
}

const Times = (props: TimesProps) => {
  const { session } = props;
  const timer = useContext(TimerContext) as TimerState;
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;
  const [deleteSolve, {}] = useMutation(DELETE_SOLVE);

  const deleteTime = (index: number, solveId: string | undefined) => {
    dispatch({ type: TimerActionKind.REMOVE_TIME, index });
    if (session && solveId) deleteSolve({ variables: { id: solveId } });
  };

  return (
    <div className="w-11/12 mx-auto mt-6 md:mt-12">
      <h3 className="mx-auto mb-2 text-center text-gray-100 text-md">Times</h3>
      <div className="pt-2 pb-4 overflow-auto rounded bg-neutral-800 snap-y snap-mandatory">
        <ul className="w-11/12 pr-4 mx-auto text-gray-300 h-96">
          {timer.solveTimes.map((solve: Solve, index: number) => (
            <li
              key={index}
              className={`px-2 py-1 cursor-pointer last:snap-end ${
                index % 2 == 0 ? "bg-neutral-800" : "bg-neutral-700"
              }`}
              onClick={() => deleteTime(index, solve.id)}
            >
              <HumanReadableTime time={solve.time} penalty={solve.penalty} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Times;
