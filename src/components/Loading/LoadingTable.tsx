interface LoadingTableProps {
  rows?: number;
}

const LoadingTable = ({ rows = 1 }: LoadingTableProps) => (
  <div aria-hidden className="animate-pulse space-y-3">
    {Array(rows)
      .fill("")
      .map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-2xl border border-neutral-700/60 bg-neutral-800/60 p-5"
        >
          <div className="h-7 w-20 rounded bg-neutral-700" />
          <div className="h-4 flex-1 rounded bg-neutral-700/70" />
          <div className="h-4 w-16 rounded bg-neutral-700/70" />
        </div>
      ))}
  </div>
);

export default LoadingTable;
