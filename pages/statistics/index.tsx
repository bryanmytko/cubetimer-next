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
    <div className="container statistics-container bg-gray-200 m-auto p-12 mt-12 w-11/12 rounded text-black">
      <h1 className="text-3xl">Past Solves</h1>
      <div className="p-6 mt-4 border">
        <table className="bg-slate-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Scramble
              </th>
            </tr>
          </thead>
          {solveData &&
            solveData.solves.map((solve: Solve, index: number) => {
              return (
                <tr
                  key={index}
                  className={`px-6 py-3 ${
                    index % 2 === 0 ? "bg-slate-400" : "bg-slate-800"
                  }`}
                >
                  <td>{humanReadableTime(parseInt(solve.time))}: </td>
                  <td>{solve.scramble}</td>
                </tr>
              );
            })}
        </table>
      </div>
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
