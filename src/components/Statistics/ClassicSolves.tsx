import { useQuery } from "@apollo/client";
import type { Solve } from "@prisma/client";

import { humanReadableTime } from "../../lib/format";
import { SOLVE_SESSIONS_FOR_USER } from "../../graphql/queries";
import { Error, Pagination } from "./";

interface ClassicSolvesProps {
  userId: number;
}

interface SolveSession {
  id: string;
  solves?: Solve[];
}

const SESSIONS_PER_PAGE = 1;

const ClassicSolves = (props: ClassicSolvesProps) => {
  const { userId } = props;

  const { loading, data, error, fetchMore } = useQuery(
    SOLVE_SESSIONS_FOR_USER,
    {
      skip: !userId,
      variables: { userId, first: SESSIONS_PER_PAGE },
    }
  );

  if (loading) return <p className="text-white">Loading</p>;
  if (error) return <Error />;
  if (!data) return <p className="text-white">No sessions found.</p>;

  const { startCursor, endCursor, hasNextPage, hasPreviousPage } =
    data.solveSessionsForUser.pageInfo;

  return (
    <div>
      {data.solveSessionsForUser.edges.map(({ node }: any, index: number) => {
        if (!node.solves.length) return;

        return (
          <table
            key={index}
            className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
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
              {node.solves.map((solve: any) => {
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
              {/*<tr className="px-6 py-3 border-b bg-red-100">
                <td>
                  <p>Average: TBD</p>
                </td>
              </tr>*/}
            </tbody>
          </table>
        );
      })}
      <div className="flex justify-center">
        {hasPreviousPage ? (
          <button
            className="px-4 py-2 my-10 mr-4 text-white bg-blue-500 rounded"
            onClick={() => {
              fetchMore({
                variables: {
                  before: startCursor,
                  first: null,
                  last: SESSIONS_PER_PAGE,
                },
                updateQuery: (_: any, { fetchMoreResult }: any) => {
                  fetchMoreResult.solveSessionsForUser.edges = [
                    ...fetchMoreResult.solveSessionsForUser.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            &lt;
          </button>
        ) : (
          ""
        )}
        {hasNextPage ? (
          <button
            className="px-4 py-2 my-10 text-white bg-blue-500 rounded"
            onClick={() => {
              fetchMore({
                variables: {
                  after: endCursor,
                  first: SESSIONS_PER_PAGE,
                },
                updateQuery: (_: any, { fetchMoreResult }: any) => {
                  fetchMoreResult.solveSessionsForUser.edges = [
                    ...fetchMoreResult.solveSessionsForUser.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            &gt;
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default ClassicSolves;
