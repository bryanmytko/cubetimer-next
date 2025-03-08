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
      <label className="block">Cube Size:</label>
      <select
        defaultValue={"3x3"}
        onChange={onChange}
        className="p-1.5 border-solid border-r-4 border-transparent rounded-md focus:outline-gray-300 text-neutral-600"
        data-testid="select"
        disabled={inspectionRunning}
      >
        <option value={PuzzleNameObj["2x2"]}>2x2</option>
        <option value={PuzzleNameObj["3x3"]}>3x3</option>
        <option value={PuzzleNameObj["4x4"]}>4x4</option>
        <option value={PuzzleNameObj["5x5"]}>5x5</option>
      </select>
    </div>
  );
};

export default CubeDropdown;
