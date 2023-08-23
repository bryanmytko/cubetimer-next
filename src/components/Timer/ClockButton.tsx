import { MouseEvent } from "react";

interface ClockButtonProps {
  handleKeyup: (e: KeyboardEvent | React.MouseEvent) => Promise<void>;
  ready: boolean;
  sessionComplete: boolean;
}

const ClockButton = (props: ClockButtonProps) => {
  const { handleKeyup, ready, sessionComplete } = props;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.blur();
    handleKeyup(event);
  };

  const buttonColor = () => {
    if (sessionComplete) return "bg-green-500";
    if (ready) return "bg-red-500";
    return "bg-yellow-300";
  };

  const buttonText = () =>
    sessionComplete ? "Session complete!" : "Press spacebar or click to start!";

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
