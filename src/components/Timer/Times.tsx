import { Dispatch, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Session } from "next-auth";

import { HumanReadableTime } from "./";
import {
  Solve,
  TimerState,
  TimerAction,
  TimerActionKind,
} from "../../types/timer";
import { TimerContext, TimerDispatchContext } from "../Timer/TimerContext";
import { SOLVES_FOR_USER } from "../../graphql/queries";

interface TimesProps {
  session: Session | null;
}

const PAST_SOLVES = 20;

const Times = (props: TimesProps) => {
  const { session } = props;
  const timer = useContext(TimerContext) as TimerState;
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;

  useQuery(SOLVES_FOR_USER, {
    skip: timer.classicModeEnabled || !session || timer.puzzleType !== "3x3",
    variables: { userId: session?.user?.id, first: PAST_SOLVES },
    onCompleted: (data): void => setSolves(data.solves.edges),
  });

  const setSolves = (data: any) => {
    const solves = data.map(({ node }: any) => ({
      time: node.time,
      id: node.id,
      penalty: node.penalty,
      scramble: node.scramble,
    }));

    dispatch({ type: TimerActionKind.ADD_TIMES, solves });
  };

  return (
    <div className="w-11/12 mx-auto mt-6 md:mt-12">
      <h3 className="mx-auto mb-2 text-center text-gray-100 text-md">Times</h3>
      <div className="pt-2 pb-4 overflow-auto rounded bg-neutral-800">
        <ul className="w-11/12 pr-4 mx-auto text-gray-300 h-[652px] relative overflow-y-scroll">
          {timer.solveTimes.map((solve: Solve, index: number) => (
            <li
              key={index}
              className={`has-tooltip px-2 py-1 cursor-pointer last:snap-end ${
                index % 2 == 0 ? "bg-neutral-800" : "bg-neutral-700"
              }`}
            >
              <HumanReadableTime
                time={solve.time}
                penalty={solve.penalty}
                initialValue={"0:00"}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Times;
