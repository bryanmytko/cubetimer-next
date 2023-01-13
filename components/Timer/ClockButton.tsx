import { Dispatch } from "react";
import { TimerAction } from "../../types/timer";
import { TimerActionKind } from "../../reducers";

interface ClockButtonProps {
  dispatch: Dispatch<TimerAction>;
  inspectionTime: number;
  preloadAudio: () => void;
  ready: boolean;
}

const ClockButton = (props: ClockButtonProps) => {
  const { dispatch, inspectionTime, preloadAudio, ready } = props;

  return (
    <button
      id="timer-btn"
      className={`timer-btn-start block mx-auto mt-6 px-10 py-5 text-3xl 
        rounded-md w-11/12 ${ready ? "bg-red-500" : "bg-yellow-300"}`}
      onClick={() => {
        preloadAudio();
        inspectionTime
          ? dispatch({ type: TimerActionKind.TOGGLE_INSPECTION })
          : dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
      }}
    >
      Press spacebar or click to start!
    </button>
  );
};

export default ClockButton;
