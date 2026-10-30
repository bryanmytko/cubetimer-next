export const PuzzleChip = ({ puzzle }: { puzzle: string }) => (
  <span className="inline-block rounded-md bg-neutral-700/70 px-2 py-0.5 text-xs font-bold text-neutral-200">
    {puzzle}
  </span>
);

export const PenaltyChip = ({ penalty }: { penalty?: number | null }) =>
  penalty ? (
    <span className="inline-block rounded-md bg-red-500/15 px-1.5 py-0.5 text-xs font-bold text-red-300">
      +{penalty / 1000}
    </span>
  ) : null;
