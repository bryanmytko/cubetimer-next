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

const AUDIO_DING = "/assets/audio/ding.mp3";

const TimerContainer = () => {
  /* TODO move these to reducer */
  const [buttonLocked, setButtonLocked] = useState(false);

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
  }, []);

  useEffect(() => {
    timer.classicModeEnabled &&
    timer.solveTimes.length >= timer.classicModeLength
      ? setButtonLocked(true)
      : setButtonLocked(false);
  }, [timer.solveTimes, timer.classicModeEnabled]);

  const toggleConfirmModal = useCallback(() => {
    dispatch({ type: TimerActionKind.TOGGLE_CONFIRM_ACTIVE });
    setButtonLocked(!buttonLocked);
  }, [buttonLocked, timer.confirmActive]);

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
      saveSolve,
      session,
      timer.solveSessionId,
      timer.puzzleType,
      timer.scramble,
      timer.time,
      toggleConfirmModal,
    ]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();
      if (e.key !== " " || buttonLocked) return;

      dispatch({ type: TimerActionKind.READY });
    },
    [buttonLocked]
  );

  const handleEscape = useCallback(() => {
    if (timer.confirmActive) toggleConfirmModal();
  }, [timer.confirmActive, toggleConfirmModal]);

  const handleEnter = useCallback(() => {
    if (timer.confirmActive) recordSolve();
  }, [timer.confirmActive, recordSolve]);

  const handleSpacebar = useCallback(() => {
    if (buttonLocked) return handleEnter();

    timer.inspectionTime && !timer.running
      ? dispatch({ type: TimerActionKind.TOGGLE_INSPECTION })
      : dispatch({ type: TimerActionKind.TOGGLE_RUNNING });

    if (!timer.running) return;

    toggleConfirmModal();
  }, [
    buttonLocked,
    handleEnter,
    timer.inspectionTime,
    timer.running,
    toggleConfirmModal,
  ]);

  const handleKeyup = useCallback(
    async (e: KeyboardEvent | React.MouseEvent) => {
      if (e.type === "click") return handleSpacebar();

      switch ((e as KeyboardEvent).key) {
        case " ":
          e.preventDefault();
          handleSpacebar();
          break;
        case "Escape":
          e.preventDefault();
          handleEscape();
          break;
        case "Enter":
          e.preventDefault();
          handleEnter();
          break;
        default:
          return;
      }
    },
    [handleEnter, handleEscape, handleSpacebar]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.inspectionRunning) {
      setButtonLocked(true);

      const countDown = () => {
        if (timer.countdown > 1) {
          dispatch({
            type: TimerActionKind.COUNTDOWN,
            value: --timer.countdown,
          });
        } else {
          setButtonLocked(false);
          clearInterval(interval);
          playDing();
          dispatch({ type: TimerActionKind.TOGGLE_INSPECTION });
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
        60
      );
    }

    return () => clearInterval(interval);
  }, [timer.running]);

  return (
    <>
      <div className={timer.classicModeEnabled ? "col-span-6" : "col-span-5"}>
        <div>
          <Scramble />
          <Clock />
          <ClockButton handleKeyup={handleKeyup} />
          {timer.classicModeEnabled && <ClassicModeTimes />}
          <ConfirmModal action={recordSolve} cancel={toggleConfirmModal} />
          <Panel />
        </div>
      </div>
      {!timer.classicModeEnabled && <Times session={session} />}
    </>
  );
};

export default TimerContainer;
