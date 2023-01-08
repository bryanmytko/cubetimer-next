import { useEffect, useReducer } from "react";

import { Scramble } from "../";
import Panel from "./Panel";
import Times from "./Times";
import { humanReadableTime } from "../../lib/format";
import { TimerReducer, TimerActionKind } from "../../reducers";
import { TimerState } from "../../types/timer";

const Timer = () => {
  const initialState: TimerState = {
    running: false,
    ready: false,
    time: 0,
    solveTimes: [],
    scramble: "",
    inspectionTime: 0,
  };

  const [state, dispatch] = useReducer(TimerReducer, initialState);

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key !== " ") return;
    e.preventDefault();
    dispatch({ type: TimerActionKind.TOGGLE });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== " ") return;
    e.preventDefault();
    dispatch({ type: TimerActionKind.READY });
  };

  /* This is necessary due to the random nature of the initial scramble.
   * Just trying to set an initial state with a random scramble will
   * cause hydration errors on rerender due to mismatched text
   */
  useEffect(() => {
    dispatch({ type: TimerActionKind.INITIALIZE });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let inspectionTime = state.inspectionTime;

    if (state.running) {
      if (inspectionTime) {
        const toggleTimer = () => {
          console.log("ticking...", inspectionTime);
          // Once inspectionTime ticks to zero we stop but need to reset it for the next solve
          dispatch({ type: TimerActionKind.TICK_DOWN });
          inspectionTime--;
          if (inspectionTime > 0) setTimeout(toggleTimer, 1000);
        };
        toggleTimer();
      } else {
        interval = setInterval(
          () => dispatch({ type: TimerActionKind.TICK_UP }),
          60
        );
      }
    }

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
          <div className="card rounded bg-slate-700 py-4 mx-auto mt-6 text-center w-11/12">
            <span
              id="timer-screen"
              className="timer text-8xl text-white font-mono font-black"
            >
              {(state.running && state.inspectionTime) ||
                humanReadableTime(state.time, "0:00")}
            </span>
          </div>
          <button
            id="timer-btn"
            className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl rounded-md w-11/12 ${
              state.ready ? "bg-red-500" : "bg-yellow-300"
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
