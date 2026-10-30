import { useCallback, useEffect, useRef, useState } from "react";

export const UNDO_MS = 5000;

// Hides an item right away and only sends the delete once the undo window
// has passed. A second delete, leaving the page, or closing the tab sends
// the pending one immediately so nothing is lost.
const useUndoableDelete = (commit: (id: string) => Promise<unknown>) => {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [pending, setPending] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const pendingRef = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const commitRef = useRef(commit);
  commitRef.current = commit;

  const unhide = (id: string) =>
    setHidden((ids) => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });

  const flush = useCallback(() => {
    clearTimeout(timer.current);
    const id = pendingRef.current;
    if (!id) return;

    pendingRef.current = null;
    setPending(null);
    commitRef.current(id).catch(() => {
      unhide(id);
      setFailed(true);
    });
  }, []);

  const remove = (id: string) => {
    flush();
    setHidden((ids) => new Set(ids).add(id));
    setFailed(false);
    pendingRef.current = id;
    setPending(id);
    timer.current = setTimeout(flush, UNDO_MS);
  };

  const undo = () => {
    clearTimeout(timer.current);
    const id = pendingRef.current;
    if (!id) return;

    pendingRef.current = null;
    setPending(null);
    unhide(id);
  };

  useEffect(() => {
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [flush]);

  return {
    hidden,
    pending,
    failed,
    remove,
    undo,
    dismissError: () => setFailed(false),
  };
};

export default useUndoableDelete;
