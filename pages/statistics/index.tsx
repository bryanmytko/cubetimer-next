import { useQuery } from "@apollo/client";

import { humanReadableTime } from "../../lib/format";
import type { Solve } from "@prisma/client";
import {
  SOLVES_FOR_USER,
  SOLVE_SESSIONS_FOR_USER,
} from "../../graphql/queries";
import { useSession } from "next-auth/react";

interface SolveSession {
  id: string;
  solves: Solve[];
}

const Statistics = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { data: solveData } = useQuery(SOLVES_FOR_USER, {
    skip: !session,
    variables: { userId },
  });
  const { data: solveSessionsData } = useQuery(SOLVE_SESSIONS_FOR_USER, {
    skip: !session,
    variables: { userId },
  });

  return (
    <div className="container statistics-container m-auto p-12 w-11/12 text-black">
      <h1 className="text-2xl text-bold text-white mb-6">Past Solves</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-black uppercase bg-green-600">
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
          {solveData &&
            solveData.solves.map((solve: Solve, index: number) => {
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
      <h2 className="mt-6 text-3xl">Classic Mode Sessions</h2>
      {solveSessionsData &&
        solveSessionsData.solveSessionsForUser.map((session: SolveSession) => {
          return (
            <div key={session.id} className="p-6 mt-4 border">
              <h3 className="text-xl">Session ${session.id}</h3>
              {session.solves.map((solve: Solve, index: number) => {
                return (
                  <tr key={index}>
                    <td>{humanReadableTime(parseInt(solve.time))}: </td>
                    <td>{solve.scramble}</td>
                  </tr>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Statistics;
