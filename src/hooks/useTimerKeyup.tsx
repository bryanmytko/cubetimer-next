import { useCallback, Dispatch, MouseEvent } from "react";

import { TimerActionKind, TimerAction } from "../types/timer";

const TIMEOUT = 60;

const useTimerKeyup = (
  keyLocked: boolean,
  dispatch: Dispatch<TimerAction>,
  keyMaps: any,
) => {
  return useCallback(
    (e: KeyboardEvent | MouseEvent) => {
      if (keyLocked) return; // Avoid race condition with mouse + keyboard
      dispatch({ type: TimerActionKind.SET_KEY_LOCKED, value: true });
      setTimeout(
        () => dispatch({ type: TimerActionKind.SET_KEY_LOCKED, value: false }),
        TIMEOUT,
      );

      if (e.type === "click") return keyMaps[" "]();

      switch ((e as KeyboardEvent).key) {
        case " ":
          e.preventDefault();
          keyMaps[" "]();
          break;
        case "Escape":
          e.preventDefault();
          keyMaps["Escape"]();
          break;
        case "Enter":
          e.preventDefault();
          keyMaps["Enter"]();
          break;
        default:
          break;
      }
    },
    [keyLocked, dispatch, keyMaps],
  );
};

export default useTimerKeyup;
