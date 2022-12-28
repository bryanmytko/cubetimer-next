import { useEffect, useReducer } from "react";

import { Scramble } from "../";
import Panel from "./Panel";
import Times from "./Times";
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
      <div className="col-span-5">
        <div>
          <Scramble scramble={state.scramble} />
          <div className="card rounded bg-gray-50 dark:bg-slate-700 py-4 mx-auto mt-6 text-center w-11/12">
            <span className="timer text-8xl text-white font-mono font-black">
              {humanReadableTime(state.time, "0:00")}
            </span>
          </div>
          <button
            id="timer-btn"
            className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl rounded-md w-11/12 ${
              state.ready ? "dark:bg-red-500" : "dark:bg-yellow-300"
            }`}
            onClick={() => dispatch({ type: TimerActionKind.TOGGLE })}
          >
            Press spacebar or click to start!
          </button>
          <Panel dispatch={dispatch} solveTimes={state.solveTimes} />
        </div>
      </div>
      <Times dispatch={dispatch} solveTimes={state.solveTimes} />
    </>
  );
};

export default Timer;
