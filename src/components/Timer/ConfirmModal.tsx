import { useContext } from "react";
import { Button } from "@nextui-org/react";

import { TimerContext } from "../Timer/TimerContext";
import { TimerState, RecordSolveOptions } from "../../types/timer";

interface ConfirmProps {
  action: (arg0?: RecordSolveOptions) => Promise<void>;
  cancel: () => void;
}

const ConfirmModal = (props: ConfirmProps) => {
  const { action, cancel } = props;
  const timer = useContext(TimerContext) as TimerState;
  const { confirmActive } = timer;

  if (!confirmActive) return <></>;

  return (
    <div className="fixed left-200 inset-28 top-30 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-gray-50 max-w-sm m-auto border-2 border-zinc-900 flex-col flex rounded-lg">
        <p className="pb-6">Would you like to save this time?</p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <Button color="success" onClick={() => action()}>
            Confirm
          </Button>
          <Button
            color="warning"
            onClick={() => {
              action({ penalty: 2000 });
            }}
          >
            +2
          </Button>
          <Button color="danger" onClick={cancel}>
            Reject
          </Button>
        </div>
        <span className="absolute top-0 right-0 p-4"></span>
      </div>
    </div>
  );
};

export default ConfirmModal;