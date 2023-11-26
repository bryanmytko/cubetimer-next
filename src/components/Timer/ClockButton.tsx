import { MouseEvent, useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { TimerContext } from "../Timer/TimerContext";
import { TimerState } from "../../types/timer";

interface ClockButtonProps {
  handleKeyup: (e: KeyboardEvent | React.MouseEvent) => void;
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

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.blur();
    handleKeyup(event);
  };

  useEffect(() => {
    if (timer.ready) return setButton(BUTTON.ready);
    if (isMobile && !sessionComplete) return setButton(BUTTON.mobileStart);
    if (sessionComplete) return setButton(BUTTON.sessionComplete);

    setButton(BUTTON.desktopStart);
  }, [sessionComplete, timer.ready]);

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
    )
      setSessionComplete(true);
  }, [timer]);

  return (
    <button
      id="timer-btn"
      className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl 
        rounded-md w-11/12 ${button.color}`}
      onClick={handleClick}
    >
      {button.text}
    </button>
  );
};

export default ClockButton;
