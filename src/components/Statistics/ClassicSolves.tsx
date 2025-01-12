import { useQuery } from "@apollo/client";

import { humanReadableTime } from "../../lib/format";
import { SOLVE_SESSIONS_FOR_USER } from "../../graphql/queries";
import { Error } from "./";
import { DataTableClassic } from "./";

interface ClassicSolvesProps {
  userId: number;
}

const SESSIONS_PER_PAGE = 20;

const ClassicSolves = ({ userId }: ClassicSolvesProps) => {
  const { loading, data, error, fetchMore } = useQuery(
    SOLVE_SESSIONS_FOR_USER,
    {
      skip: !userId,
      variables: { userId, first: SESSIONS_PER_PAGE },
    },
  );

  if (loading) return <p className="text-white">Loading</p>;
  if (error) return <Error />;
  if (!data || data.solveSessionsForUser.edges.length === 0)
    return <p className="text-white py-4">No sessions found.</p>;

  const { startCursor, endCursor, hasNextPage, hasPreviousPage } =
    data.solveSessionsForUser.pageInfo;

  return (
    <div>
      <DataTableClassic>
        <tbody>
          {data.solveSessionsForUser.edges.map(
            ({ node }: any, index: number) => {
              if (!node.solves.length) return;

              return (
                <tr
                  key={node.id}
                  className={`px-6 py-3 border-b ${
                    index % 2 === 0 ? "bg-slate-200" : "bg-white"
                  }`}
                >
                  <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                    <button className="px-4 py-2 mr-4 text-white bg-blue-500 rounded">
                      +
                    </button>
                  </td>
                  <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                    {node.createdAt}
                  </td>
                  <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                    {humanReadableTime(
                      node.solves.reduce(
                        (prev: number, curr: { time: string }) =>
                          curr.time + prev,
                        0,
                      ) / node.solves.length,
                    )}
                  </td>
                  <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                    {node.solves[0]?.puzzle}
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </DataTableClassic>
      );
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
