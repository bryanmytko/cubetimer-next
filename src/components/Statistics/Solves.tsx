import { useQuery } from "@apollo/client";

import { SOLVES_FOR_USER } from "../../graphql/queries";
import { humanReadableTime } from "../../lib/format";
import { Error } from "./";

interface SolvesProps {
  userId: number;
}

const SOLVES_PER_PAGE = 12;

const Solves = (props: SolvesProps) => {
  const { userId } = props;
  const { loading, data, error, fetchMore } = useQuery(SOLVES_FOR_USER, {
    skip: !userId,
    variables: { userId, first: SOLVES_PER_PAGE },
  });

  if (loading) return <p className="text-white">Loading</p>;
  if (error) return <Error />;
  if (!data) return <p className="text-white">No solves found.</p>;

  const { startCursor, endCursor, hasNextPage, hasPreviousPage } =
    data.solves.pageInfo;

  return (
    <div>
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
          {data.solves.edges.map(({ node }: any, index: number) => {
            return (
              <tr
                key={index}
                className={`px-6 py-3 border-b ${
                  index % 2 === 0 ? "bg-slate-200" : "bg-white"
                }`}
              >
                <td className="px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                  {humanReadableTime(parseInt(node.time))}
                </td>
                <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {node.scramble}
                </td>
                <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {node.puzzle}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
        {hasPreviousPage ? (
          <button
            className="px-4 py-2 my-10 mr-4 text-white bg-blue-500 rounded"
            onClick={() => {
              fetchMore({
                variables: {
                  before: startCursor,
                  first: null,
                  last: SOLVES_PER_PAGE,
                },
                updateQuery: (_: any, { fetchMoreResult }: any) => {
                  fetchMoreResult.solves.edges = [
                    ...fetchMoreResult.solves.edges,
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
                  first: SOLVES_PER_PAGE,
                },
                updateQuery: (_: any, { fetchMoreResult }: any) => {
                  fetchMoreResult.solves.edges = [
                    ...fetchMoreResult.solves.edges,
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

export default Solves;
