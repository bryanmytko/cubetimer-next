import { useEffect, useReducer } from "react";
import { useTranslation } from "next-i18next";

import { Scramble } from "../";
import Panel from "./Panel";
import { humanReadableTime } from "../../lib/format";
import { TimerReducer, TimerActionKind } from "../../reducers";

interface TimerState {
  running: boolean;
  ready: boolean;
  time: number;
  solveTimes: Array<number>;
  scramble: string;
}

const Timer = () => {
  const initialState: TimerState = {
    running: false,
    ready: false,
    time: 0,
    solveTimes: [],
    scramble: "",
  };

  const [state, dispatch] = useReducer(TimerReducer, initialState);
  const { t } = useTranslation();

  /* This is necessary due to the random nature of the initial scramble.
   * Just trying to set an initial state with a random scramble will
   * cause hydration errors on rerender due to mismatched text
   */
  useEffect(() => {
    dispatch({ type: TimerActionKind.INITIALIZE });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.running) {
      interval = setInterval(
        () => dispatch({ type: TimerActionKind.TICK }),
        10
      );
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== " ") return;
      e.preventDefault();
      dispatch({ type: TimerActionKind.READY });
    };

    const handleKeyup = (e: KeyboardEvent) => {
      if (e.key !== " ") return;
      e.preventDefault();
      dispatch({ type: TimerActionKind.TOGGLE });
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [state.running]);

  return (
    <>
      <div className="col-span-4">
        <div>
          <Scramble scramble={state.scramble} />
          <div className="card rounded bg-gray-50 dark:bg-slate-700 py-4 mx-auto mt-6 text-center w-4/5">
            <span className="timer text-8xl text-white font-mono font-black">
              {humanReadableTime(state.time, "0:00")}
            </span>
          </div>
          <button
            id="timer-btn"
            className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl rounded-md w-4/5 ${
              state.ready ? "dark:bg-red-500" : "dark:bg-yellow-300"
            }`}
            onClick={() => dispatch({ type: TimerActionKind.TOGGLE })}
          >
            {t("startButton")}
          </button>
          <Panel dispatch={dispatch} solveTimes={state.solveTimes} />
        </div>
      </div>
      {/* TODO: move to a component */}
      <div className="my-6 p-4 bg-orange-200 text-sm">
        <ol>
          {state.solveTimes.map((time: number, index: number) => {
            return (
              <li key={index}>
                {humanReadableTime(time)}
                <button
                  onClick={() =>
                    dispatch({ type: TimerActionKind.REMOVE_TIME, index })
                  }
                >
                  [x]
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default Timer;
