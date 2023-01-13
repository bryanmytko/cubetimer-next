import { useEffect, useReducer, useState } from "react";

import { Clock, Panel, Times, ClockButton } from "./";
import { Scramble } from "../";
import { TimerReducer, TimerActionKind } from "../../reducers";
import { initialState } from "./initialState";

const START_AUDIO_URL = "/assets/audio/ding.mp3";

const Timer = () => {
  const [state, dispatch] = useReducer(TimerReducer, initialState);
  const [startAudio, setStartAudio] = useState<HTMLAudioElement | null>(null);

  /* This loads the audio via a user interaction to avoid Safari's
   * permission issues that can conflict with async code. Since there are
   * multiple handlers (click and keypresses) we preload the audio with a few
   * redundancies
   */
  const preloadAudio = () => {
    const audio = new Audio(START_AUDIO_URL);
    audio.load();
    audio.addEventListener("canplaythrough", () => setStartAudio(audio));
  };

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key !== " ") return;
    e.preventDefault();
    state.inspectionTime && !state.running
      ? dispatch({ type: TimerActionKind.TOGGLE_INSPECTION })
      : dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== " ") return;
    e.preventDefault();
    preloadAudio();
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

    /* TODO fix bug with the first inspection countdown showing 2x length */
    if (state.inspectionRunning) {
      const countDown = () => {
        if (state.countdown > 0) {
          dispatch({
            type: TimerActionKind.COUNTDOWN,
            value: state.countdown--,
          });
        } else {
          clearInterval(interval);
          if (startAudio) startAudio.play();
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
  }, [state.inspectionRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.running) {
      interval = setInterval(
        () => dispatch({ type: TimerActionKind.TICK_UP }),
        60
      );
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
          <Clock
            countdown={state.countdown}
            inspectionRunning={state.inspectionRunning}
            time={state.time}
          />
          <ClockButton
            dispatch={dispatch}
            inspectionTime={state.inspectionTime}
            preloadAudio={preloadAudio}
            ready={state.ready}
            running={state.running}
          />
          <Panel
            dispatch={dispatch}
            solveTimes={state.solveTimes}
            preloadAudio={preloadAudio}
          />
        </div>
      </div>
      <Times dispatch={dispatch} solveTimes={state.solveTimes} />
    </>
  );
};

export default Timer;
