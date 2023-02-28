import { useEffect, useReducer, useState } from "react";
import useSound from "use-sound";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";

import { Clock, Panel, Times, ClassicModeTimes, ClockButton } from "./";
import { Scramble } from "../";
import { TimerReducer, TimerActionKind } from "../../reducers";
import { initialState } from "./initialState";
import { SAVE_SOLVE } from "../../graphql/mutations";

const AUDIO_DING = "/assets/audio/ding.mp3";

const Timer = () => {
  const [state, dispatch] = useReducer(TimerReducer, initialState);
  const [buttonLocked, setButtonLocked] = useState(false);
  const [saveSolve, { data, loading, error }] = useMutation(SAVE_SOLVE);
  const { data: session } = useSession();
  const [playDing] = useSound(AUDIO_DING);

  /* This is necessary due to the random nature of the initial scramble.
   * Just trying to set an initial state with a random scramble will
   * cause hydration errors on rerender due to mismatched text
   */
  useEffect(() => {
    dispatch({ type: TimerActionKind.INITIALIZE });
  }, []);

  useEffect(() => {
    if (state.classicModeEnabled && state.solveTimes.length >= 12) setButtonLocked(true);
  }, [state.solveTimes, state.classicModeEnabled])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== " " || buttonLocked) return;
      e.preventDefault();
      dispatch({ type: TimerActionKind.READY });
    };

    const handleKeyup = async (e: KeyboardEvent) => {
      if (e.key !== " " || buttonLocked) return;
      e.preventDefault();

      state.inspectionTime && !state.running
        ? dispatch({ type: TimerActionKind.TOGGLE_INSPECTION })
        : dispatch({ type: TimerActionKind.TOGGLE_RUNNING });

      if (session && state.running) {
        await saveSolve({
          variables: {
            puzzle: state.puzzleType,
            scramble: state.scramble,
            time: String(state.time),
            userId: session.user.id,
          },
        });
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [
    saveSolve,
    session,
    buttonLocked,
    state.inspectionTime,
    state.running,
    state.solveTimes.length,
    state.puzzleType,
    state.scramble,
    state.time,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.inspectionRunning) {
      setButtonLocked(true);

      const countDown = () => {
        if (state.countdown > 1) {
          dispatch({
            type: TimerActionKind.COUNTDOWN,
            value: --state.countdown,
          });
        } else {
          setButtonLocked(false);
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
  }, [
    state.countdown,
    state.inspectionRunning,
    state.inspectionTime,
    playDing,
  ]);

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
      <div className={state.classicModeEnabled ? "col-span-6" : "col-span-5"}>
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
            sessionComplete={
              state.classicModeEnabled && state.solveTimes.length >= 12
            }
          />
          {state.classicModeEnabled && (
            <ClassicModeTimes solveTimes={state.solveTimes} />
          )}
          <Panel
            classicModeEnabled={state.classicModeEnabled}
            dispatch={dispatch}
            solveTimes={state.solveTimes}
            inspectionRunning={state.inspectionRunning}
          />
        </div>
      </div>
      {!state.classicModeEnabled && (
        <Times dispatch={dispatch} solveTimes={state.solveTimes} />
      )}
    </>
  );
};

export default Timer;
