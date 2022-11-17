import { Dispatch, SyntheticEvent } from "react";

enum TimerActionKind {
  TOGGLE = "TOGGLE",
  READY = "READY",
  REMOVE_TIME = "REMOVE_TIME",
  TICK = "TICK",
  PUZZLE_TYPE = "PUZZLE_TYPE",
}

type TimerAction =
  | {
      type:
        | TimerActionKind.TOGGLE
        | TimerActionKind.READY
        | TimerActionKind.TICK;
    }
  | { type: TimerActionKind.REMOVE_TIME; index: number }
  | { type: TimerActionKind.PUZZLE_TYPE; puzzle: string };

interface CubeDropdownProps {
  dispatch: Dispatch<TimerAction>;
}

const CubeDropdown = (props: CubeDropdownProps) => {
  const { dispatch } = props;
  const onChange = (e: SyntheticEvent & { target: HTMLSelectElement }) => {
    dispatch({ type: TimerActionKind.PUZZLE_TYPE, puzzle: e.target?.value });
  };

  return (
    <div className="relative w-full lg:max-w-sm">
      <select
        defaultValue={"3x3"}
        onChange={onChange}
        className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
      >
        <option value="2x2">2x2</option>
        <option value="3x3">3x3</option>
        <option value="4x4">4x4</option>
        <option value="5x5">5x5</option>
      </select>
    </div>
  );
};

export default CubeDropdown;
