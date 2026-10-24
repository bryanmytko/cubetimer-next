import { Dispatch, SyntheticEvent } from "react";
import {
  PuzzleNameObj,
  PuzzleValueType,
  TimerActionKind,
} from "../../types/timer";

type TimerAction = {
  type: TimerActionKind.PUZZLE_TYPE;
  puzzle: PuzzleValueType;
};

interface CubeDropdownProps {
  dispatch: Dispatch<TimerAction>;
  inspectionRunning: boolean;
}

const CubeDropdown = (props: CubeDropdownProps) => {
  const { dispatch, inspectionRunning } = props;
  const onChange = (e: SyntheticEvent & { target: HTMLSelectElement }) => {
    dispatch({
      type: TimerActionKind.PUZZLE_TYPE,
      puzzle: e.target?.value,
    });
  };

  return (
    <div className="flex gap-2 justify-end items-center">
      <label className="block">Puzzle:</label>
      <select
        defaultValue={"3x3"}
        onChange={onChange}
        className="p-1.5 border-solid border-r-4 border-transparent rounded-md focus:outline-gray-300 text-neutral-600"
        data-testid="select"
        disabled={inspectionRunning}
      >
        {Object.values(PuzzleNameObj).map((puzzle) => (
          <option key={puzzle} value={puzzle}>
            {puzzle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CubeDropdown;
