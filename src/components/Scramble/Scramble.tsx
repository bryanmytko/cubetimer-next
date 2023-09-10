import { useContext } from "react";
import { TimerContext } from "../Timer/TimerContext";
import { TimerState } from "../../types/timer";

const Scramble = () => {
  const timer = useContext(TimerContext) as TimerState;

  return (
    <p className="text-white text-2xl text-center mt-6">{timer.scramble}</p>
  );
};

export default Scramble;
