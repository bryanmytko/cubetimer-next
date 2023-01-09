import { useEffect, useReducer } from "react";

import { Scramble } from "../";
import Panel from "./Panel";
import Times from "./Times";
import { humanReadableTime } from "../../lib/format";
import { TimerReducer, TimerActionKind } from "../../reducers";
import { TimerState } from "../../types/timer";

const Timer = () => {
  const initialState: TimerState = {
    countdown: 5,
    inspectionRunning: false,
    running: false,
    ready: false,
    time: 0,
    solveTimes: [],
    scramble: "",
    inspectionTime: 5,
  };

  const [state, dispatch] = useReducer(TimerReducer, initialState);

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key !== " ") return;
    e.preventDefault();
    dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
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

    const start = () => {
      // dispatch({
      //   type: TimerActionKind.COUNTDOWN,
      //   value: state.inspectionTime,
      // });
      console.log("RUNNING...");
      console.log(state.running);
      console.log(state.countdown);
      interval = setInterval(
        () => dispatch({ type: TimerActionKind.TICK_UP }),
        60
      );
    };

    if (state.running) {
      // Rewrite this logic in three conditions:
      // 1. running and no inspection -> just start the timer
      // 2. running and inspection has not started -> start inspection
      // 3. running and inspection is over -> start timer
      if (state.countdown > 0) {
        dispatch({ type: TimerActionKind.TOGGLE_INSPECTION });
      }
      const toggleTimer = () => {
        dispatch({
          type: TimerActionKind.COUNTDOWN,
          value: state.countdown--,
        });

        if (state.countdown > 0) setTimeout(toggleTimer, 1000);
        else {
          dispatch({ type: TimerActionKind.TOGGLE_INSPECTION });
        }
      };
      toggleTimer();
    } else {
      start();
    }

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [state.running, state.inspectionRunning]);

  return (
    <>
      <div className="col-span-5">
        <div>
          <Scramble scramble={state.scramble} />
          <div className="w-11/12 py-4 mx-auto mt-6 text-center rounded card bg-slate-700">
            <span
              id="timer-screen"
              className="font-mono font-black text-white timer text-8xl"
            >
              {(state.running && state.countdown) ||
                humanReadableTime(state.time, "0:00")}
            </span>
          </div>
          <button
            id="timer-btn"
            className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl rounded-md w-11/12 ${
              state.ready ? "bg-red-500" : "bg-yellow-300"
            }`}
            onClick={() => dispatch({ type: TimerActionKind.TOGGLE_RUNNING })}
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
