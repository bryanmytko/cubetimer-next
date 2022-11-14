import { useEffect, useReducer } from "react";
import { useTranslation } from "next-i18next";

import { humanReadableTime } from "../../lib/format";
import Scrambler from "../../lib/scrambler";
import { TimerReducer, TimerActionKind } from "../../reducers";
import Panel from "./Panel";

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
  const { t } = useTranslation();

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
        <span className="text-6xl text-white font-mono">
          {humanReadableTime(state.time, "0:00")}
        </span>
      </div>
      <button
        id="timer-btn"
        className={`timer-btn-start block mx-auto mt-6 px-20 py-5 rounded-md ${state.ready ? "dark:bg-red-500" : "dark:bg-green-500"
          }`}
        onClick={() => dispatch({ type: TimerActionKind.TOGGLE })}
      >
        {t("startButton")}
      </button>
      <Panel dispatch={dispatch} solveTimes={state.solveTimes} />
    </div>
  );
};

export default Timer;
