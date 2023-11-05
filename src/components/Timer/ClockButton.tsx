import { MouseEvent, useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { TimerContext } from "../Timer/TimerContext";
import { TimerState } from "../../types/timer";

interface ClockButtonProps {
  handleKeyup: (e: KeyboardEvent | React.MouseEvent) => void;
}

const ClockButton = (props: ClockButtonProps) => {
  const { handleKeyup } = props;
  const timer = useContext(TimerContext) as TimerState;
  const [buttonText, setButtonText] = useState("");
  const [sessionComplete, setSessionComplete] = useState(false);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.blur();
    handleKeyup(event);
  };

  const buttonColor = () => {
    if (sessionComplete) return "bg-green-500";
    if (timer.ready) return "bg-red-500";
    return "bg-yellow-300";
  };

  useEffect(() => {
    if (isMobile && !sessionComplete) return setButtonText("Tap to start! ");
    if (sessionComplete) return setButtonText("Session Complete!");

    setButtonText("Press spacebar or click to start!");
  }, [sessionComplete]);

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
        rounded-md w-11/12 ${buttonColor()}`}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default ClockButton;
