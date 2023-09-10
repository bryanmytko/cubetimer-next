import { useCallback, useEffect, useReducer, useState } from "react";
import useSound from "use-sound";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";

import { Clock, Panel, Times, ClassicModeTimes, ClockButton } from "./";
import { Scramble } from "../";
import { Confirm } from "../Confirm";
import { TimerReducer, TimerActionKind } from "../../reducers";
import { initialState } from "./initialState";
import { SAVE_SOLVE } from "../../graphql/mutations";

const AUDIO_DING = "/assets/audio/ding.mp3";
const CLASSIC_SOLVE_LENGTH = 12;

interface OkOptions {
  penalty: number;
}

const Timer = () => {
  const [state, dispatch] = useReducer(TimerReducer, initialState);
  const [buttonLocked, setButtonLocked] = useState(false);
  const [solveSessionId, setSolveSessionId] = useState(null);
  const [confirmActive, setConfirmActive] = useState(false);
  const [saveSolve, {}] = useMutation(SAVE_SOLVE);
  const { data: session } = useSession();
  const [playDing] = useSound(AUDIO_DING);

  /* This is necessary due to the random nature of the initial scramble.
   * Just trying to set an initial state with a random scramble will
   * cause hydration errors on rerender due to mismatched text
   */
  useEffect(() => {
    dispatch({ type: TimerActionKind.INITIALIZE });
  }, []);

  useEffect(() => {
    state.classicModeEnabled && state.solveTimes.length >= CLASSIC_SOLVE_LENGTH
      ? setButtonLocked(true)
      : setButtonLocked(false);
  }, [state.solveTimes, state.classicModeEnabled]);

  const toggleConfirmModal = useCallback(() => {
    setConfirmActive(!confirmActive);
    setButtonLocked(!buttonLocked);
  }, [buttonLocked, confirmActive]);

  const recordSolve = useCallback(
    async (options: OkOptions = { penalty: 0 }) => {
      const { penalty } = options;
      let solveId;

      if (session) {
        const response = await saveSolve({
          variables: {
            penalty,
            puzzle: state.puzzleType,
            scramble: state.scramble,
            time: state.time,
            userId: session.user.id,
            solveSessionId,
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
      solveSessionId,
      state.puzzleType,
      state.scramble,
      state.time,
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
    if (confirmActive) toggleConfirmModal();
  }, [confirmActive, toggleConfirmModal]);

  const handleEnter = useCallback(() => {
    if (confirmActive) recordSolve();
  }, [confirmActive, recordSolve]);

  const handleSpacebar = useCallback(() => {
    if (buttonLocked) return handleEnter();

    state.inspectionTime && !state.running
      ? dispatch({ type: TimerActionKind.TOGGLE_INSPECTION })
      : dispatch({ type: TimerActionKind.TOGGLE_RUNNING });

    if (!state.running) return;

    toggleConfirmModal();
  }, [
    buttonLocked,
    handleEnter,
    state.inspectionTime,
    state.running,
    toggleConfirmModal,
  ]);

  const handleKeyup = useCallback(
    async (e: KeyboardEvent | React.MouseEvent) => {
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

    if (state.inspectionRunning) {
      setButtonLocked(true);

      const countDown = () => {
        if (state.countdown > 1) {
          dispatch({
            type: TimerActionKind.COUNTDOWN,
            value: --state.countdown,
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
      value: state.inspectionTime,
    });

    return () => clearInterval(interval);
  }, [
    state.countdown,
    state.inspectionRunning,
    state.inspectionTime,
    playDing,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.running) {
      interval = setInterval(
        () => dispatch({ type: TimerActionKind.TICK_UP }),
        60
      );
    }

    return () => clearInterval(interval);
  }, [state.running]);

  return (
    <>
      <div className={state.classicModeEnabled ? "col-span-6" : "col-span-5"}>
        <div>
          <Scramble scramble={state.scramble} />
          <Clock
            countdown={state.countdown}
            inspectionRunning={state.inspectionRunning}
            time={state.time}
          />
          <ClockButton
            handleKeyup={handleKeyup}
            ready={state.ready}
            sessionComplete={
              state.classicModeEnabled && state.solveTimes.length >= 12
            }
          />
          {state.classicModeEnabled && (
            <ClassicModeTimes solveTimes={state.solveTimes} />
          )}
          <Confirm
            active={confirmActive}
            ok={recordSolve}
            toggle={toggleConfirmModal}
          />
          <Panel
            classicModeEnabled={state.classicModeEnabled}
            dispatch={dispatch}
            setSolveSessionId={setSolveSessionId}
            solveTimes={state.solveTimes}
            inspectionRunning={state.inspectionRunning}
          />
        </div>
      </div>
      {!state.classicModeEnabled && (
        <Times
          dispatch={dispatch}
          session={session}
          solveTimes={state.solveTimes}
        />
      )}
    </>
  );
};

export default Timer;
