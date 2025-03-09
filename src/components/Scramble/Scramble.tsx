import { Dispatch, useContext } from "react";
import { FaUndoAlt } from "react-icons/fa";

import { TimerContext, TimerDispatchContext } from "../Timer/TimerContext";
import { TimerAction, TimerActionKind, TimerState } from "../../types/timer";
import { usePrevious } from "../../hooks/usePrevious";

const Scramble = () => {
  const timer = useContext(TimerContext) as TimerState;
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;
  const [previousScramble, resetPrevious] = usePrevious(timer.scramble);
  const newScramble = (scramble?: string) =>
    dispatch({ type: TimerActionKind.INITIALIZE, scramble });

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mt-6">
        <p className="text-white text-balance text-2xl lg:text-4xl text-center px-4 md:px-0">
          {timer.scramble}
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-2">
        <p
          className={`${previousScramble ? "text-neutral-300 hover:text-yellow-300 cursor-pointer" : "text-neutral-600 hover:text-neutral-600 cursor-default"}`}
          onClick={() => {
            if (!previousScramble) return;
            newScramble(previousScramble);
            resetPrevious();
          }}
        >
          Previous
        </p>
        <p
          className="text-neutral-300 hover:text-yellow-300 cursor-pointer"
          onClick={() => newScramble()}
        >
          Next
        </p>
      </div>
    </div>
  );
};

export default Scramble;
