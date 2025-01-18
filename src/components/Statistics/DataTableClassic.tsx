const DataTableClassic = ({ children }: any) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-black uppercase bg-yellow-400">
        <tr>
          <th scope="col" className="w-2"></th>
          <th scope="col" className="px-1 md:px-6 py-3 pr-2">
            Date
          </th>
          <th scope="col" className="pl-2 md:pl-6 pr-2 py-3">
            Session Average*
          </th>
          <th scope="col" className="pl-2 md:pl-6 pr-2 py-3">
            Average
          </th>
          <th scope="col" className="pl-2 md:pl-6 pr-2 py-3">
            Best
          </th>
          <th scope="col" className="pl-2 md:pl-6 pr-2 py-3">
            Worst
          </th>
          <th scope="col" className="pl-2 md:pl-6 pr-2 py-3">
            Total Cubes
          </th>
          <th scope="col" className="px-1 md:px-6 py-3 pr-2">
            Puzzle
          </th>
          <th scope="col" className="px-1 md:px-6 py-3 pr-2">
            Action
          </th>
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default DataTableClassic;
