import { Dispatch } from "react";

import { humanReadableTime } from "../../lib/format";

interface TimesProps {
  dispatch: Dispatch<TimerAction>;
  solveTimes: number[];
}

enum TimerActionKind {
  REMOVE_TIME = "REMOVE_TIME",
}

type TimerAction = { type: TimerActionKind.REMOVE_TIME; index: number };

const Times = (props: TimesProps) => {
  const { dispatch, solveTimes } = props;
  return (
    <div className="mt-6 md:mt-20">
      <ul className="h-96 overflow-scroll text-gray-400 mx-auto w-11/12">
        {solveTimes.map((time: number, index: number) => {
          return (
            <li
              key={index}
              className={`bg-white border-b px-2 cursor-pointer ${
                index % 2 == 0 ? "dark:bg-gray-900" : "dark:bg-gray-800"
              } dark:border-gray-800`}
              onClick={() =>
                dispatch({ type: TimerActionKind.REMOVE_TIME, index })
              }
            >
              {humanReadableTime(time)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Times;
