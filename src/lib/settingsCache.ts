// The last settings this browser saw, so the timer can start in the right
// mode straight away while the server's copy loads. Only ever a guess: the
// timer checks it against the server and corrects it, e.g. after signing
// out or switching accounts.
export interface CachedSettings {
  defaultClassicMode: boolean;
}

const KEY = "cubetimer:settings";

export const readCachedSettings = (): CachedSettings | null => {
  try {
    const value = JSON.parse(window.localStorage.getItem(KEY) || "null");
    return typeof value?.defaultClassicMode === "boolean"
      ? { defaultClassicMode: value.defaultClassicMode }
      : null;
  } catch {
    // Storage can be blocked or hold something unreadable; fetch instead
    return null;
  }
};

export const writeCachedSettings = (settings: CachedSettings) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    // Only a speed-up; the next visit fetches instead
  }
};
