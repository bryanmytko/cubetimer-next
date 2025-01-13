interface LoadingTableProps {
  rows?: number;
}

const LoadingTable = ({ rows = 1 }: LoadingTableProps) => {
  return (
    <div className="border border-gray-800 shadow p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-16 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            {Array(rows)
              .fill("")
              .map((i) => (
                <div className="grid grid-cols-7 gap-4" key={i}>
                  <div className="h-12 bg-slate-700 rounded col-span-1"></div>
                  <div className="h-12 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-12 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-12 bg-slate-700 rounded col-span-2"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingTable;
