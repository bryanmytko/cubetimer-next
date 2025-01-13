const ClassicSubDataTable = ({ children }: any) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-white uppercase bg-cyan-600">
        <tr>
          <th scope="col" className="pl-2 md:pl-6 pr-2 py-3">
            Time
          </th>
          <th scope="col" className="px-1 md:px-6 py-3">
            Scramble
          </th>
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default ClassicSubDataTable;
