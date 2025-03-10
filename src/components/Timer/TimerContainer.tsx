import { Dispatch, useCallback, useContext, useEffect, useState } from "react";
import useSound from "use-sound";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";

const DynamicTimes = dynamic(() => import("./Times"));
const DynamicClassicModeTimes = dynamic(() => import("./ClassicModeTimes"));
const DynamicClock = dynamic(() => import("./Clock"));
const DynamicClockButton = dynamic(() => import("./ClockButton"));
const DynamicConfirmModal = dynamic(() => import("./ConfirmModal"));
const DynamicPanel = dynamic(() => import("./Panel"));
const DynamicScramble = dynamic(() => import("../Scramble/Scramble"));

import { CREATE_SOLVE_SESSION, SAVE_SOLVE } from "../../graphql/mutations";
import {
  RecordSolveOptions,
  TimerAction,
  TimerActionKind,
  TimerState,
} from "../../types/timer";
import { TimerContext, TimerDispatchContext } from "./TimerContext";
import { useTimerKeyup } from "../../hooks";
import { SETTINGS_FOR_USER } from "../../graphql/queries/settingsForUser";

const AUDIO_DING = "/assets/audio/ding.mp3";
const TICK = 60;

const TimerContainer = () => {
  const [saveSolve, { loading: saveTimeLoading }] = useMutation(SAVE_SOLVE);
  const [createSolveSession, { loading: createSessionLoading }] =
    useMutation(CREATE_SOLVE_SESSION);
  const { data: session, status } = useSession();
  const [playDing] = useSound(AUDIO_DING);
  const timer = useContext(TimerContext) as TimerState;
  const dispatch = useContext(TimerDispatchContext) as Dispatch<TimerAction>;
  const [submitted, setSubmitted] = useState(false);
  const { data, loading } = useQuery(SETTINGS_FOR_USER, {
    skip: !session?.user?.id,
    variables: { userId: session?.user?.id },
  });

  /* This is necessary due to the random nature of the initial scramble.
   * Just trying to set an initial state with a random scramble will
   * cause hydration errors on rerender due to mismatched text
   */
  useEffect(() => {
    dispatch({
      type: TimerActionKind.INITIALIZE,
    });
  }, [dispatch]);

  useEffect(() => {
    if (data?.settingsForUser?.defaultClassicMode)
      dispatch({ type: TimerActionKind.TOGGLE_CLASSIC_MODE });
  }, [data, dispatch]);

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

  const getSolveSession = useCallback(
    async ({ userId }: { userId: string }) => {
      if (timer.classicModeEnabled && !timer.solveSessionId) {
        const response = await createSolveSession({
          variables: { userId, size: timer.classicModeLength },
        });
        dispatch({
          type: TimerActionKind.SET_SOLVE_SESSION_ID,
          id: response.data?.createSolveSession.id,
        });
        return response.data?.createSolveSession.id;
      }

      return timer.solveSessionId;
    },
    [
      createSolveSession,
      dispatch,
      timer.classicModeEnabled,
      timer.solveSessionId,
      timer.classicModeLength,
    ],
  );

  const recordSolve = useCallback(
    async (options: RecordSolveOptions = { penalty: 0 }) => {
      const { penalty } = options;
      setButtonLocked(true);
      let solveId;

      if (session) {
        const userId = session.user.id;
        const solveSessionId = await getSolveSession({ userId });
        const response = await saveSolve({
          variables: {
            penalty,
            puzzle: timer.puzzleType,
            scramble: timer.scramble,
            time: timer.time,
            userId,
            solveSessionId,
          },
        });

        solveId = response.data?.createSolve.id;
      }

      dispatch({
        type: TimerActionKind.ADD_TIME,
        penalty,
        solveId,
        scramble: timer.scramble,
      });
      toggleConfirmModal();
      setSubmitted(false);
      setButtonLocked(false);
    },
    [
      dispatch,
      getSolveSession,
      saveSolve,
      session,
      setButtonLocked,
      timer.puzzleType,
      timer.scramble,
      timer.time,
      toggleConfirmModal,
    ],
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();
      if (e.key !== " " || timer.locked || submitted) return;

      dispatch({ type: TimerActionKind.READY });
    },
    [dispatch, submitted, timer.locked],
  );

  const handleEscape = useCallback(() => {
    if (timer.confirmActive) {
      dispatch({ type: TimerActionKind.CANCEL_SOLVE });
    }
  }, [dispatch, timer.confirmActive]);

  const handleEnter = useCallback(() => {
    if (submitted) return;
    if (timer.confirmActive) {
      setSubmitted(true);
      recordSolve();
    }
  }, [timer.confirmActive, recordSolve, submitted]);

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

  if (loading || status === "loading") return <></>;

  return (
    <>
      <div className={timer.classicModeEnabled ? "col-span-6" : "col-span-5"}>
        <DynamicScramble />
        <DynamicClock />
        <DynamicClockButton handleKeyup={timerKeyup} />
        {timer.classicModeEnabled && <DynamicClassicModeTimes />}
        <DynamicConfirmModal
          action={recordSolve}
          loading={saveTimeLoading || createSessionLoading}
        />
        <DynamicPanel initialClassicModeEnabled={timer.classicModeEnabled} />
      </div>
      {!timer.classicModeEnabled && <DynamicTimes session={session} />}
    </>
  );
};

export default TimerContainer;
