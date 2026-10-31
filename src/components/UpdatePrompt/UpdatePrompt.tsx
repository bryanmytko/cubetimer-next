import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

export const CHECK_EVERY_MS = 10 * 60 * 1000;
// Don't check again on every tab switch
const MIN_GAP_MS = 60 * 1000;

const HoldContext = createContext<((change: number) => void) | null>(null);

// Keeps the prompt hidden while `active` is true, e.g. mid solve, so a
// refresh never interrupts what someone is doing
export const useHoldUpdatePrompt = (active: boolean) => {
  const changeHolds = useContext(HoldContext);

  useEffect(() => {
    if (!active || !changeHolds) return undefined;
    changeHolds(1);
    return () => changeHolds(-1);
  }, [active, changeHolds]);
};

// Whether the server is running a newer build than this page came from
const useNewVersion = () => {
  const [newBuildId, setNewBuildId] = useState<string | null>(null);

  useEffect(() => {
    const currentBuildId = window.__NEXT_DATA__?.buildId;
    if (!currentBuildId) return undefined;

    let lastCheck = Date.now();
    let stopped = false;

    const check = async () => {
      if (stopped || document.visibilityState !== "visible") return;
      if (Date.now() - lastCheck < MIN_GAP_MS) return;
      lastCheck = Date.now();

      try {
        const response = await fetch("/api/version", { cache: "no-store" });
        const { buildId } = await response.json();
        if (buildId && buildId !== currentBuildId && !stopped) {
          stopped = true;
          setNewBuildId(buildId);
        }
      } catch {
        // Offline or mid-deploy; try again next time
      }
    };

    const interval = setInterval(check, CHECK_EVERY_MS);
    document.addEventListener("visibilitychange", check);

    return () => {
      stopped = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", check);
    };
  }, []);

  return newBuildId;
};

const UpdatePromptProvider = ({ children }: { children: ReactNode }) => {
  const newBuildId = useNewVersion();
  const [holds, setHolds] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const changeHolds = useCallback((change: number) => setHolds((count) => count + change), []);

  return (
    <HoldContext.Provider value={changeHolds}>
      {children}
      <div
        aria-live="polite"
        className="fixed inset-x-0 bottom-6 z-50 flex justify-center md:justify-end px-4 md:px-6 pointer-events-none"
      >
        {newBuildId && !dismissed && holds === 0 && (
          <div className="pointer-events-auto flex items-center gap-4 rounded-xl border border-neutral-700 bg-neutral-800 py-3 pl-4 pr-2 text-sm shadow-lg">
            <p className="text-neutral-200">A new version of Cubetimer is available.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="shrink-0 rounded-lg bg-yellow-300 px-3 py-1.5 font-bold text-neutral-900 hover:bg-yellow-200"
            >
              Refresh
            </button>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setDismissed(true)}
              className="shrink-0 rounded-md p-1.5 text-neutral-500 hover:text-neutral-200"
            >
              <FaXmark size={14} />
            </button>
          </div>
        )}
      </div>
    </HoldContext.Provider>
  );
};

export default UpdatePromptProvider;
