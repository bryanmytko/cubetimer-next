import { Dispatch, useCallback, useContext, useEffect, useState } from "react";
import useSound from "use-sound";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";

import {
  ClassicModeTimes,
  Clock,
  ClockButton,
  ConfirmModal,
  Panel,
  Times,
} from "./";
import { Scramble } from "../";
import { SAVE_SOLVE } from "../../graphql/mutations";
import {
  RecordSolveOptions,
  TimerAction,
  TimerActionKind,
  TimerState,
} from "../../types/timer";
import { TimerContext, TimerDispatchContext } from "./TimerContext";
import { useTimerKeyup } from "../../hooks";

const AUDIO_DING = "/assets/audio/ding.mp3";
const TICK = 60;

const TimerContainer = () => {
  const [saveSolve, {}] = useMutation(SAVE_SOLVE);
  const { data: session } = useSession();
  const [playDing] = useSound(AUDIO_DING);

  const timer = useContext(TimerContext) as TimerState;
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;

  /* This is necessary due to the random nature of the initial scramble.
   * Just trying to set an initial state with a random scramble will
   * cause hydration errors on rerender due to mismatched text
   */
  useEffect(() => {
    dispatch({ type: TimerActionKind.INITIALIZE });
  }, [dispatch]);

  const setButtonLocked = useCallback(
    (value: boolean) => dispatch({ type: TimerActionKind.LOCK, value }),
    [dispatch],
  );

  useEffect(() => {
    timer.classicModeEnabled &&
    timer.solveTimes.length >= timer.classicModeLength
      ? setButtonLocked(true)
      : setButtonLocked(false);
  }, [
    setButtonLocked,
    timer.solveTimes,
    timer.classicModeEnabled,
    timer.classicModeLength,
  ]);

  const toggleConfirmModal = useCallback(() => {
    dispatch({ type: TimerActionKind.TOGGLE_CONFIRM_ACTIVE });
    setButtonLocked(!timer.locked);
  }, [dispatch, setButtonLocked, timer.locked]);

  const recordSolve = useCallback(
    async (options: RecordSolveOptions = { penalty: 0 }) => {
      const { penalty } = options;
      let solveId;

      if (session) {
        const response = await saveSolve({
          variables: {
            penalty,
            puzzle: timer.puzzleType,
            scramble: timer.scramble,
            time: timer.time,
            userId: session.user.id,
            solveSessionId: timer.solveSessionId,
          },
        });

        solveId = response.data?.createSolve.id;
      }

      toggleConfirmModal();
      dispatch({ type: TimerActionKind.ADD_TIME, penalty, solveId });
    },
    [
      dispatch,
      saveSolve,
      session,
      timer.solveSessionId,
      timer.puzzleType,
      timer.scramble,
      timer.time,
      toggleConfirmModal,
    ],
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();
      if (e.key !== " " || timer.locked) return;

      dispatch({ type: TimerActionKind.READY });
    },
    [dispatch, timer.locked],
  );

  const handleEscape = useCallback(() => {
    if (timer.confirmActive) {
      dispatch({ type: TimerActionKind.CANCEL_SOLVE });
    }
  }, [dispatch, timer.confirmActive]);

  const handleEnter = useCallback(() => {
    if (timer.confirmActive) recordSolve();
  }, [timer.confirmActive, recordSolve]);

  const handleSpacebar = useCallback(() => {
    if (timer.locked) return handleEnter();

    timer.inspectionTime && !timer.running
      ? dispatch({ type: TimerActionKind.TOGGLE_INSPECTION })
      : dispatch({ type: TimerActionKind.TOGGLE_RUNNING });

    if (!timer.running) return;

    toggleConfirmModal();
  }, [
    dispatch,
    timer.locked,
    handleEnter,
    timer.inspectionTime,
    timer.running,
    toggleConfirmModal,
  ]);

  const timerKeyup = useTimerKeyup(timer.keyLocked, dispatch, {
    " ": handleSpacebar,
    Escape: handleEscape,
    Enter: handleEnter,
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", timerKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", timerKeyup);
    };
  }, [handleKeydown, timerKeyup]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.inspectionRunning) {
      const countDown = () => {
        if (timer.countdown > 1) {
          dispatch({
            type: TimerActionKind.COUNTDOWN,
            value: --timer.countdown,
          });
        } else {
          clearInterval(interval);
          playDing();
          dispatch({ type: TimerActionKind.TOGGLE_RUNNING });
        }
      };

      interval = setInterval(() => countDown(), 1000);
      return;
    }

    dispatch({
      type: TimerActionKind.COUNTDOWN,
      value: timer.inspectionTime,
    });

    return () => clearInterval(interval);
  }, [
    dispatch,
    setButtonLocked,
    timer.countdown,
    timer.inspectionRunning,
    timer.inspectionTime,
    playDing,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.running) {
      interval = setInterval(
        () => dispatch({ type: TimerActionKind.TICK_UP }),
        TICK,
      );
    }

    return () => clearInterval(interval);
  }, [dispatch, timer.running]);

  return (
    <>
      <div className={timer.classicModeEnabled ? "col-span-6" : "col-span-5"}>
        <Scramble />
        <Clock />
        <ClockButton handleKeyup={timerKeyup} />
        {timer.classicModeEnabled && <ClassicModeTimes />}
        <ConfirmModal action={recordSolve} />
        <Panel />
      </div>
      {!timer.classicModeEnabled && <Times session={session} />}
    </>
  );
};

export default TimerContainer;
