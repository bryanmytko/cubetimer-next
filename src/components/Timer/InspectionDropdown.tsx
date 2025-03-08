import { Dispatch, SyntheticEvent } from "react";
import { TimerAction, TimerActionKind } from "../../types/timer";

interface InspectionDropdownProps {
  dispatch: Dispatch<TimerAction>;
  inspectionRunning: boolean;
}

const CubeDropdown = (props: InspectionDropdownProps) => {
  const { dispatch, inspectionRunning } = props;
  const onChange = (e: SyntheticEvent & { target: HTMLSelectElement }) => {
    dispatch({
      type: TimerActionKind.INSPECTION_TIME,
      inspectionTime: parseInt(e.target?.value),
    });
  };

  return (
    <div className="flex gap-2 justify-end items-center">
      <label className="block">Inspection Time:</label>
      <select
        defaultValue={"0"}
        onChange={onChange}
        className="p-1.5 border-solid border-r-4 border-transparent rounded-md focus:outline-gray-300 text-neutral-600"
        data-testid="select"
        disabled={inspectionRunning}
      >
        <option value="0">0 sec.</option>
        <option value="5">5 sec.</option>
        <option value="15">15 sec.</option>
      </select>
    </div>
  );
};

export default CubeDropdown;
