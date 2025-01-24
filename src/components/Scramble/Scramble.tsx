import { Dispatch, useContext } from "react";
import { FaUndoAlt } from "react-icons/fa";

import { TimerContext, TimerDispatchContext } from "../Timer/TimerContext";
import { TimerAction, TimerActionKind, TimerState } from "../../types/timer";

const Scramble = () => {
  const timer = useContext(TimerContext) as TimerState;
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;

  const newScramble = () => dispatch({ type: TimerActionKind.INITIALIZE });

  return (
    <div className="flex align-middle justify-center gap-2 mt-6">
      <p className="text-white text-balance text-lg md:text-xl lg:text-2xl text-center px-4 md:px-0">
        {timer.scramble}
      </p>
      <button onClick={newScramble}>
        <FaUndoAlt
          size={17}
          className="text-gray-500 hover:text-yellow-300 mb-1"
        />
      </button>
    </div>
  );
};

export default Scramble;
