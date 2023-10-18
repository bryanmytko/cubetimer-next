const DataTable = ({ children }: any) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-black uppercase bg-yellow-400">
        <tr>
          <th scope="col" className="pl-6 pr-1 py-3">
            Time
          </th>
          <th scope="col" className="px-6 py-3">
            Scramble
          </th>
          <th scope="col" className="px-6 py-3">
            Puzzle
          </th>
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default DataTable;
