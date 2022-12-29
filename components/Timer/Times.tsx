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
    <div className="mt-6 md:mt-12 w-11/12 mx-auto">
      <h3 className="text-md text-gray-100 mx-auto text-center mb-2">Times</h3>
      <div className="bg-slate-700 rounded pt-2 pb-4 overflow-auto snap-y snap-mandatory">
        <ul className="h-96 text-gray-300 mx-auto w-11/12 pr-4">
          {solveTimes.map((time: number, index: number) => (
            <li
              key={index}
              id={String(index)}
              className={`px-2 py-1 cursor-pointer last:snap-end ${
                index % 2 == 0 ? "bg-slate-700" : "bg-slate-600"
              }`}
              onClick={() =>
                dispatch({ type: TimerActionKind.REMOVE_TIME, index })
              }
            >
              {humanReadableTime(time)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Times;
