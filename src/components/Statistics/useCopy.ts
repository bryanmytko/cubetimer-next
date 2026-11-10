import { useEffect, useState } from "react";

// Copies text and reports `copied` for a moment so the UI can confirm it.
// `onCopied` runs only when the copy worked.
const useCopy = (text: string, onCopied?: () => void) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.();
    } catch {
      // Clipboard can be blocked; the text is still selectable
    }
  };

  return { copied, copy };
};

export default useCopy;
