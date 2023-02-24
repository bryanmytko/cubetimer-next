import { Dispatch } from "react";
import { TimerAction } from "../../types/timer";
import { TimerActionKind } from "../../reducers";

interface ClockButtonProps {
  dispatch: Dispatch<TimerAction>;
  inspectionRunning: boolean;
  inspectionTime: number;
  ready: boolean;
  running: boolean;
  sessionComplete: boolean;
}

const ClockButton = (props: ClockButtonProps) => {
  const { dispatch, inspectionTime, inspectionRunning, ready, running, sessionComplete } = props;

  const toggleTimer = () => {
    if (inspectionRunning) return;

    inspectionTime && !running
      ? dispatch({ type: TimerActionKind.TOGGLE_INSPECTION })
      : dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
  };

  const buttonColor = () => {
    if (sessionComplete) return "bg-green-500";
    if (ready) return "bg-red-500";
    return "bg-yellow-300";
  };

  const buttonText = () => sessionComplete ? "Session complete!" : "Press spacebar or click to start!";

  return (
    <button
      id="timer-btn"
      className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl 
        rounded-md w-11/12 ${buttonColor()}`}
      onClick={toggleTimer}
    >
      {buttonText()}
    </button>
  );
};

export default ClockButton;
