import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaTrashCan } from "react-icons/fa6";

import { SOLVES_FOR_USER } from "../../graphql/queries";
import { humanReadableTime, formatDate } from "../../lib/format";
import { DataTable, Error } from "./";
import { LoadingTable } from "../Loading";
import { DELETE_SOLVE } from "../../graphql/mutations";
import { SolveChart } from "../Charts";

interface SolvesProps {
  userId: string;
}

const SOLVES_PER_PAGE = 20;

const Solves = ({ userId }: SolvesProps) => {
  const { loading, data, error, fetchMore } = useQuery(SOLVES_FOR_USER, {
    skip: !userId,
    variables: { userId, first: SOLVES_PER_PAGE },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data): void => setSolves(data.solves.edges),
  });

  const [deleteSolve, { loading: deleting }] = useMutation(DELETE_SOLVE);
  const [solves, setSolves] = useState([]);

  if (!data || !solves || loading) return <LoadingTable />;
  if (error) return <Error />;

  const removeSolve = (id: string) => {
    confirm("Are you sure you want to delete this solve?");
    setSolves(
      solves.filter((solve: { node: { id: string } }) => solve.node.id !== id),
    );

    deleteSolve({
      variables: {
        id,
      },
    });
  };

  const { startCursor, endCursor, hasNextPage, hasPreviousPage } =
    data.solves.pageInfo;

  return (
    <>
      <SolveChart userId={userId} />
      <DataTable>
        <tbody>
          {solves.map(({ node }: any, index: number) => {
            return (
              <tr
                key={node.id}
                className={`py-3 border-b ${
                  index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
                }`}
              >
                <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                  {humanReadableTime(parseInt(node.time))}
                </td>
                <td className="px-2 md:px-6 py-2 text-xs md:text-medium font-medium text-gray-900">
                  {node.scramble}
                </td>
                <td className="px-2 md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {node.puzzle}
                </td>
                <td className="px-2 md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {formatDate(node.createdAt)}
                </td>
                <td className="px-2 md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                  <FaTrashCan
                    className="align-self hover:text-red-700 outline-red-50 cursor-pointer ml-4 text-red-600"
                    size={16}
                    onClick={() => {
                      if (deleting) return;
                      removeSolve(node.id);
                    }}
                  />
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
