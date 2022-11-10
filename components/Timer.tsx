import React, { useEffect, useReducer } from "react";

import Scrambler from "../lib/scrambler";
import { TimerReducer, TimerActionKind } from "../reducers";
/* import { FormatService, ScrambleService } from '../../services'; */

//const { humanReadableTime } = FormatService;

interface TimerState {
  running: boolean;
  ready: boolean;
  time: number;
  solveTimes: Array<number>;
  scramble: string;
}

const initialState: TimerState = {
  running: false,
  ready: false,
  time: 0,
  solveTimes: [],
  scramble: new Scrambler("3x3").generate(),
};

const Timer = () => {
  const [state, dispatch] = useReducer(TimerReducer, initialState);

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
    <div>
      <div className="card rounded bg-gray-50 dark:bg-slate-700 py-4 mx-auto mt-6 text-center w-4/5">
        <span className="text-6xl text-white">{state.time}</span>
      </div>
      <button
        id="timer-btn"
        className={`timer-btn-start block mx-auto mt-6 px-20 py-5 rounded-md ${state.ready ? "dark:bg-red-500" : "dark:bg-green-500"
          }`}
        onClick={() => dispatch({ type: TimerActionKind.TOGGLE })}
      >
        Press spacebar or click to begin!
      </button>
    </div>
  );
};

export default Timer;
