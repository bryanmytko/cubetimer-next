import { useContext } from "react";
import { TimerContext } from "../Timer/TimerContext";
import { TimerState } from "../../types/timer";

const Scramble = () => {
  const timer = useContext(TimerContext) as TimerState;

  return (
    <p className="text-white text-balance [text-wrap:balance] text-lg md:text-xl lg:text-2xl text-center mt-6 px-4 md:px-0">
      {timer.scramble}
    </p>
  );
};

export default Scramble;
