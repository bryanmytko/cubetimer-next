import { useEffect, useReducer } from "react";
import useSound from "use-sound";

import { Clock, Panel, Times, ClockButton } from "./";
import { Scramble } from "../";
import { TimerReducer, TimerActionKind } from "../../reducers";
import { initialState } from "./initialState";

const AUDIO_DING = "/assets/audio/ding.mp3";

const Timer = () => {
  const [state, dispatch] = useReducer(TimerReducer, initialState);
  const [playDing] = useSound(AUDIO_DING);

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key !== " " || state.inspectionRunning) return;
    e.preventDefault();
    state.inspectionTime && !state.running
      ? dispatch({ type: TimerActionKind.TOGGLE_INSPECTION })
      : dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
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
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [state.inspectionRunning, state.inspectionTime, state.running]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.inspectionRunning) {
      const countDown = () => {
        if (state.countdown > 1) {
          dispatch({
            type: TimerActionKind.COUNTDOWN,
            value: --state.countdown,
          });
        } else {
          clearInterval(interval);
          playDing();
          dispatch({ type: TimerActionKind.TOGGLE_INSPECTION });
          dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
        }
      };

      interval = setInterval(() => countDown(), 1000);
      return;
    }

    dispatch({
      type: TimerActionKind.COUNTDOWN,
      value: state.inspectionTime,
    });

    return () => clearInterval(interval);
  }, [state.inspectionRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.running) {
      interval = setInterval(
        () => dispatch({ type: TimerActionKind.TICK_UP }),
        60
      );
    }

    return () => clearInterval(interval);
  }, [state.running]);

  return (
    <>
      <div className="col-span-5">
        <div>
          <Scramble scramble={state.scramble} />
          <Clock
            countdown={state.countdown}
            inspectionRunning={state.inspectionRunning}
            time={state.time}
          />
          <ClockButton
            dispatch={dispatch}
            inspectionRunning={state.inspectionRunning}
            inspectionTime={state.inspectionTime}
            ready={state.ready}
            running={state.running}
          />
          <Panel
            dispatch={dispatch}
            solveTimes={state.solveTimes}
            inspectionRunning={state.inspectionRunning}
          />
        </div>
      </div>
      <Times dispatch={dispatch} solveTimes={state.solveTimes} />
    </>
  );
};

export default Timer;
