import { ReactNode, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import gravatar from "gravatar";
import { useMutation, useQuery } from "@apollo/client";

import { SETTINGS_FOR_USER } from "../../graphql/queries/settingsForUser";
import { UPDATE_SETTINGS } from "../../graphql/mutations/updateSettings";

type SaveState = "idle" | "saving" | "saved" | "error";

const SAVE_LABELS: Record<SaveState, string> = {
  idle: "",
  saving: "Saving…",
  saved: "Saved",
  error: "Couldn't save. Try again.",
};

interface SwitchProps {
  id: string;
  checked: boolean;
  onChange: () => void;
}

const Switch = ({ id, checked, onChange }: SwitchProps) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${checked ? "bg-yellow-300" : "bg-neutral-600"}`}
  >
    <span
      className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-8">
    <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-500 mb-3">
      {title}
    </h2>
    <div className="bg-neutral-800/60 border border-neutral-700/60 rounded-2xl divide-y divide-neutral-700/60">
      {children}
    </div>
  </section>
);

const Settings = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const { data, error, loading } = useQuery(SETTINGS_FOR_USER, {
    skip: !userId,
    variables: { userId },
  });
  const [saveSettings] = useMutation(UPDATE_SETTINGS);
  const [classicMode, setClassicMode] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    setClassicMode(!!data?.settingsForUser?.defaultClassicMode);
  }, [data]);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status, router]);

  // Fade the "Saved" note out after a moment
  useEffect(() => {
    if (saveState !== "saved") return undefined;
    const timeout = setTimeout(() => setSaveState("idle"), 2000);
    return () => clearTimeout(timeout);
  }, [saveState]);

  const toggleClassicMode = async () => {
    const enabled = !classicMode;
    setClassicMode(enabled);
    setSaveState("saving");

    try {
      await saveSettings({ variables: { userId, defaultClassicMode: enabled } });
      setSaveState("saved");
    } catch {
      // Put the switch back so it matches what's stored
      setClassicMode(!enabled);
      setSaveState("error");
    }
  };

  const photoUrl = gravatar.url(session?.user?.email || "", {
    protocol: "https",
    s: "128",
    d: "identicon",
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-neutral-200">
      <Head>
        <title>Cubetimer.io | Settings</title>
      </Head>

      <header className="flex items-center gap-4">
        {session && (
          <Image
            src={photoUrl}
            alt=""
            width={64}
            height={64}
            // Gravatar already serves the right size, so skip Next's image
            // optimizer, which also requires the host in next.config.js
            unoptimized
            className="rounded-full ring-2 ring-yellow-300/40"
          />
        )}
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          {session?.user && (
            <p className="text-sm text-neutral-400 truncate">
              Signed in as{" "}
              <span className="text-neutral-200">{session.user.name}</span>
              {session.user.email && ` · ${session.user.email}`}
            </p>
          )}
        </div>
      </header>

      {error && (
        <p className="mt-8 bg-red-500/10 border border-red-500/30 text-red-200 rounded-lg px-4 py-3 text-sm">
          Something went wrong loading your settings. Refresh to try again.
        </p>
      )}

      <Section title="Timer">
        <div className="flex items-center justify-between gap-6 p-5">
          <div>
            <label htmlFor="classicModeDefault" className="font-bold text-neutral-100 cursor-pointer">
              Start in Classic Mode
            </label>
            <p className="text-sm text-neutral-400 mt-1">
              Every session is 12 solves, scored by the average with the best and worst
              times dropped. You can still switch modes on the timer.
            </p>
          </div>
          {loading || status === "loading" ? (
            <span className="h-7 w-12 shrink-0 rounded-full bg-neutral-700 animate-pulse" />
          ) : (
            <Switch id="classicModeDefault" checked={classicMode} onChange={toggleClassicMode} />
          )}
        </div>
      </Section>

      <p
        aria-live="polite"
        className={`mt-2 h-5 text-right text-xs ${saveState === "error" ? "text-red-300" : "text-neutral-400"}`}
      >
        {SAVE_LABELS[saveState]}
      </p>

      <Section title="Account">
        <div className="flex items-center justify-between gap-6 p-5">
          <div>
            <p className="font-bold text-neutral-100">Sign out</p>
            <p className="text-sm text-neutral-400 mt-1">
              Your solves and sessions stay saved to your account.
            </p>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="shrink-0 rounded-lg border border-neutral-600 px-4 py-2 text-sm font-bold text-neutral-100 hover:border-yellow-300 hover:text-yellow-300 transition-colors"
          >
            Sign out
          </button>
        </div>
      </Section>
    </div>
  );
};

export default Settings;
