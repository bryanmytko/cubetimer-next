import { MouseEvent, useContext } from "react";

import { TimerContext } from "../Timer/TimerContext";
import { TimerState } from "../../types/timer";

interface ClockButtonProps {
  handleKeyup: (e: KeyboardEvent | React.MouseEvent) => Promise<void>;
}

const ClockButton = (props: ClockButtonProps) => {
  const { handleKeyup } = props;
  const timer = useContext(TimerContext) as TimerState;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.blur();
    handleKeyup(event);
  };

  const sessionComplete = () =>
    timer.classicModeEnabled &&
    timer.solveTimes.length >= timer.classicModeLength;

  const buttonColor = () => {
    if (sessionComplete()) return "bg-green-500";
    if (timer.ready) return "bg-red-500";
    return "bg-yellow-300";
  };

  const buttonText = () =>
    sessionComplete()
      ? "Session complete!"
      : "Press spacebar or click to start!";

  return (
    <button
      id="timer-btn"
      className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl 
        rounded-md w-11/12 ${buttonColor()}`}
      onClick={handleClick}
    >
      {buttonText()}
    </button>
  );
};

export default ClockButton;
