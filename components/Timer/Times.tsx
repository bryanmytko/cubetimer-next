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
    <div className="w-11/12 mx-auto mt-6 md:mt-12">
      <h3 className="mx-auto mb-2 text-center text-gray-100 text-md">Times</h3>
      <div className="pt-2 pb-4 overflow-auto rounded bg-neutral-800 snap-y snap-mandatory">
        <ul className="w-11/12 pr-4 mx-auto text-gray-300 h-96">
          {solveTimes.map((time: number, index: number) => (
            <li
              key={index}
              id={String(index)}
              className={`px-2 py-1 cursor-pointer last:snap-end ${index % 2 == 0 ? "bg-neutral-800" : "bg-neutral-700"
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
