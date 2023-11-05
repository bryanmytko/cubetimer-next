import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { SOLVES_FOR_USER } from "../../graphql/queries";
import { humanReadableTime } from "../../lib/format";
import { DataTable, Error } from "./";
import { LoadingTable } from "../Loading";

interface SolvesProps {
  userId: number;
}

interface SolvesForUserData {
  solves: {
    pageInfo: any;
    edges: any;
  };
}

interface SolvesForUserVars {
  userId: number;
  first: number | null;
  after?: any;
  before?: any;
  last?: any;
}

const SOLVES_PER_PAGE = 12;

const Solves = (props: SolvesProps) => {
  const { userId } = props;
  const [fetchSolves, { data, error, fetchMore, loading }] = useLazyQuery<
    SolvesForUserData,
    SolvesForUserVars
  >(SOLVES_FOR_USER, {
    fetchPolicy: "no-cache",
    variables: { userId, first: SOLVES_PER_PAGE },
  });

  useEffect(() => {
    fetchSolves();
  }, [fetchSolves]);

  if (!data || loading) return <LoadingTable />;
  if (error) return <Error />;

  const { startCursor, endCursor, hasNextPage, hasPreviousPage } =
    data.solves.pageInfo;

  return (
    <>
      <DataTable>
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
      </DataTable>
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
    </>
  );
};

export default Solves;
