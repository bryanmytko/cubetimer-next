import { useContext } from "react";
import { Button } from "@nextui-org/react";
import { Dispatch } from "react";

import { TimerContext, TimerDispatchContext } from "../Timer/TimerContext";
import { Spinner } from "../../components/Loading";
import {
  TimerActionKind,
  RecordSolveOptions,
  TimerAction,
  TimerState,
} from "../../types/timer";

interface ConfirmProps {
  action: (arg0?: RecordSolveOptions) => Promise<void>;
  loading: boolean;
}

const ConfirmModal = ({ action, loading }: ConfirmProps) => {
  const timer = useContext(TimerContext) as TimerState;
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;
  const { confirmActive } = timer;

  if (!confirmActive) return <></>;

  return (
    <div className="fixed left-200 inset-28 top-30 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-gray-50 max-w-sm m-auto border-1 border-zinc-800 flex-col flex rounded-lg">
        <p className="pb-6">Would you like to save this time?</p>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
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
            <Button
              color="danger"
              onClick={() => dispatch({ type: TimerActionKind.CANCEL_SOLVE })}
            >
              Reject
            </Button>
          </div>
        )}
        <span className="absolute top-0 right-0 p-4"></span>
      </div>
    </div>
  );
};

export default ConfirmModal;
