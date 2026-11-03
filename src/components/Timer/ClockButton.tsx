import { Dispatch, MouseEvent, useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { TimerContext, TimerDispatchContext } from "../Timer/TimerContext";
import { TimerAction, TimerActionKind, TimerState } from "../../types/timer";

interface ClockButtonProps {
  handleKeyup: (e: KeyboardEvent | MouseEvent) => void;
}

const BUTTON = {
  mobileStart: { text: "Tap to start!", color: "bg-yellow-300" },
  desktopStart: {
    text: "Press spacebar or click to start!",
    color: "bg-yellow-300",
  },
  ready: { text: "Ready!", color: "bg-red-500" },
  sessionComplete: { text: "Session Complete!", color: "bg-green-500" },
};

const ClockButton = (props: ClockButtonProps) => {
  const { handleKeyup } = props;
  const timer = useContext(TimerContext) as TimerState;
  const [button, setButton] = useState(BUTTON.mobileStart);
  const [sessionComplete, setSessionComplete] = useState(false);
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.blur();
    handleKeyup(event);
  };

  useEffect(() => {
    if (timer.ready) return setButton(BUTTON.ready);
    if (isMobile && !sessionComplete) return setButton(BUTTON.mobileStart);
    if (sessionComplete) {
      dispatch({ type: TimerActionKind.SET_SOLVE_SESSION_ID, id: null });
      return setButton(BUTTON.sessionComplete);
    }

    setButton(BUTTON.desktopStart);
  }, [dispatch, sessionComplete, timer.ready]);

  useEffect(() => {
    setSessionComplete(false);
  }, [timer.reset]);

  useEffect(() => {
    if (!timer.classicModeEnabled) {
      setButton(BUTTON.desktopStart);
      setSessionComplete(false);
    }
  }, [timer.classicModeEnabled]);

  useEffect(() => {
    if (
      timer.classicModeEnabled &&
      timer.solveTimes.length >= timer.classicModeLength
    ) {
      setSessionComplete(true);
    }
  }, [timer]);

  // Until Classic Mode settles from their settings the timer can't start.
  // The label stays, hidden, so the button keeps its size.
  const settling = timer.classicModeEnabled === undefined;

  return (
    <button
      id="timer-btn"
      className={`timer-btn-start relative block mx-auto mt-6 px-10 py-5 text-3xl 
        rounded-md w-11/12 ${button.color} ${settling ? "cursor-wait" : ""}`}
      onClick={handleClick}
      disabled={settling}
      aria-busy={settling}
      aria-label={settling ? "Loading your settings" : undefined}
    >
      <span className={settling ? "invisible" : undefined}>{button.text}</span>
      {settling && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-900/25 border-t-neutral-900" />
        </span>
      )}
    </button>
  );
};

export default ClockButton;
