import { useEffect, useReducer, useState } from "react";

import { Scramble } from "../";
import Panel from "./Panel";
import Times from "./Times";
import { humanReadableTime } from "../../lib/format";
import { TimerReducer, TimerActionKind } from "../../reducers";
import { TimerState } from "../../types/timer";

const START_AUDIO_URL = "/assets/audio/ding.mp3";

const Timer = () => {
  const initialState: TimerState = {
    countdown: 0,
    inspectionRunning: false,
    running: false,
    ready: false,
    time: 0,
    solveTimes: [],
    scramble: "",
    inspectionTime: 0,
  };

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
    console.log("preload audio");
    audio.addEventListener("canplaythrough", () => setStartAudio(audio));
  };

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key !== " ") return;
    e.preventDefault();
    dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
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

    const inspectionTimer = () => {
      dispatch({
        type: TimerActionKind.COUNTDOWN,
        value: state.countdown--,
      });

      state.countdown >= 0
        ? setTimeout(inspectionTimer, 1000)
        : dispatch({ type: TimerActionKind.TOGGLE_INSPECTION });

      /* This is kind of hacky but it works for the time being */
      if (state.countdown === 0 && startAudio)
        setTimeout(() => startAudio.play(), 650);
    };

    const timer = () => {
      dispatch({
        type: TimerActionKind.COUNTDOWN,
        value: state.inspectionTime,
      });

      interval = setInterval(
        () => dispatch({ type: TimerActionKind.TICK_UP }),
        60
      );
    };

    if (state.running) {
      if (!state.inspectionRunning && state.countdown > 0) {
        dispatch({ type: TimerActionKind.TOGGLE_INSPECTION });
      } else if (state.inspectionRunning && state.countdown > 0) {
        inspectionTimer();
      } else {
        timer();
      }
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
          <div
            className={`w-11/12 py-4 mx-auto mt-6 text-center rounded card ${
              state.inspectionRunning
                ? "bg-transparent animate-ping-slow"
                : "bg-slate-700"
            }`}
          >
            <span
              id="timer-screen"
              className="font-mono font-black text-white timer text-8xl"
            >
              {state.running && state.inspectionRunning
                ? state.countdown
                : humanReadableTime(state.time, "0:00")}
            </span>
          </div>
          <button
            id="timer-btn"
            className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl rounded-md w-11/12 ${
              state.ready ? "bg-red-500" : "bg-yellow-300"
            }`}
            onClick={() => {
              preloadAudio();
              dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
            }}
          >
            Press spacebar or click to start!
          </button>
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
