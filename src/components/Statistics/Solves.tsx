import type { Solve } from "@prisma/client";

import { humanReadableTime } from "../../lib/format";

interface SolvesProps {
  data?: Solve[];
}

const Solves = (props: SolvesProps) => {
  const { data } = props;

  if (!data) return <p>No solves found.</p>;

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
      <tbody>
        {data.map((solve: Solve, index: number) => {
          return (
            <tr
              key={index}
              className={`px-6 py-3 border-b ${
                index % 2 === 0 ? "bg-slate-200" : "bg-white"
              }`}
            >
              <td className="px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                {humanReadableTime(parseInt(solve.time))}
              </td>
              <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                {solve.scramble}
              </td>
              <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                {solve.puzzle}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Solves;
