interface UndoToastProps {
  label: string;
  pending: boolean;
  failed: boolean;
  onUndo: () => void;
  onDismiss: () => void;
}

const UndoToast = ({ label, pending, failed, onUndo, onDismiss }: UndoToastProps) => (
  <div
    aria-live="polite"
    className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pointer-events-none"
  >
    {(pending || failed) && (
      <div className="pointer-events-auto flex items-center gap-4 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm shadow-lg">
        {failed ? (
          <>
            <span className="text-red-200">Couldn&apos;t delete. Try again.</span>
            <button
              type="button"
              onClick={onDismiss}
              className="font-bold text-neutral-300 hover:text-white"
            >
              Dismiss
            </button>
          </>
        ) : (
          <>
            <span className="text-neutral-200">{label} deleted</span>
            <button
              type="button"
              onClick={onUndo}
              className="font-bold text-yellow-300 hover:text-yellow-200"
            >
              Undo
            </button>
          </>
        )}
      </div>
    )}
  </div>
);

export default UndoToast;
