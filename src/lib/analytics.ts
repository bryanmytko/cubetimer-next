import { event } from "nextjs-google-analytics";

// Every event the site sends and its parameters. Components only call
// `track`, so switching away from Google Analytics means changing this file.
export type AnalyticsEvents = {
  solve_completed: {
    puzzle: string;
    penalty: "none" | "+2";
    inspection: boolean;
    classic_mode: boolean;
    signed_in: boolean;
  };
  classic_session_completed: { puzzle: string; size: number };
  sign_up: Record<string, never>;
  feedback_submitted: Record<string, never>;
  share: { method: "copy"; content_type: "session_results" | "alg"; item_id?: string };
  coffee_click: Record<string, never>;
  update_refresh: Record<string, never>;
};

const RETRY_MS = 500;
const GIVE_UP_MS = 10 * 1000;

// gtag only exists once its inline script runs after hydration, and the
// library drops events sent before then, so early ones wait for it. If it
// never shows up (an ad blocker, say) they're dropped.
let pending: Array<() => void> = [];
let waitedMs = 0;

const gtagReady = () => typeof (window as { gtag?: unknown }).gtag === "function";

const flush = () => {
  if (gtagReady()) {
    pending.forEach((send) => send());
    pending = [];
    return;
  }

  waitedMs += RETRY_MS;
  if (waitedMs >= GIVE_UP_MS) {
    pending = [];
    return;
  }
  setTimeout(flush, RETRY_MS);
};

export const track = <Name extends keyof AnalyticsEvents>(
  name: Name,
  params: AnalyticsEvents[Name],
) => {
  if (typeof window === "undefined") return;

  // Analytics must never break the page
  const send = () => {
    try {
      event(name, params);
    } catch {
      // Nothing to do
    }
  };

  if (gtagReady()) {
    send();
    return;
  }

  pending.push(send);
  if (pending.length === 1) {
    waitedMs = 0;
    setTimeout(flush, RETRY_MS);
  }
};
