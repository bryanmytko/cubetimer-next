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
    <div className="mt-20 overflow-x-auto relative shadow-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {solveTimes.map((time: number, index: number) => {
            return (
              <tr
                key={index}
                className={`bg-white border-b ${
                  index % 2 == 0 ? "dark:bg-gray-900" : "dark:bg-gray-800"
                } dark:border-gray-800`}
              >
                <td className="py-2 px-6">{humanReadableTime(time)}</td>
                <td className="py-2 px-6">
                  <button
                    onClick={() =>
                      dispatch({ type: TimerActionKind.REMOVE_TIME, index })
                    }
                  >
                    [x]
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Times;
