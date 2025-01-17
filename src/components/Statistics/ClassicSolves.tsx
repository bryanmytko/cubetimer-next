import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import { humanReadableTime, formatDate } from "../../lib/format";
import { SOLVE_SESSIONS_FOR_USER } from "../../graphql/queries";
import { Error } from "./";
import { ClassicSubDataTable, DataTableClassic } from "./";
import { LoadingTable } from "../Loading";
import {
  averageCurved,
  averageOfSize,
  fastestTime,
  slowestTime,
} from "../../lib/calculate";

interface ClassicSolvesProps {
  userId: number;
}

const SESSIONS_PER_PAGE = 20;

const ClassicSolves = ({ userId }: ClassicSolvesProps) => {
  const [openRow, setOpenRow] = useState<number | null>();
  const { loading, data, error, fetchMore } = useQuery(
    SOLVE_SESSIONS_FOR_USER,
    {
      skip: !userId,
      variables: { userId, first: SESSIONS_PER_PAGE },
      notifyOnNetworkStatusChange: true,
    },
  );

  if (loading) return <LoadingTable rows={8} />;
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
                <React.Fragment key={index}>
                  <tr
                    className={`px-6 py-3 border-b cursor-pointer hover:bg-green-100 ${
                      index % 2 === 0 ? "bg-slate-200" : "bg-white"
                    }`}
                    onClick={() => setOpenRow(index === openRow ? null : index)}
                  >
                    <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                      <button className="px-4 py-2 mr-4 text-white bg-blue-500 rounded">
                        {openRow === index ? "-" : "+"}
                      </button>
                    </td>
                    <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                      {formatDate(node.createdAt)}
                    </td>
                    <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                      {humanReadableTime(
                        averageCurved(
                          node.solves.map(
                            (solve: { time: number }) => solve.time,
                          ),
                          node.solves.length,
                        ),
                      )}
                    </td>
                    <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                      {humanReadableTime(
                        averageOfSize(
                          node.solves.map(
                            (solve: { time: number }) => solve.time,
                          ),
                          node.solves.length,
                        ),
                      )}
                    </td>
                    <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                      {humanReadableTime(
                        fastestTime(
                          node.solves.map(
                            (solve: { time: number }) => solve.time,
                          ),
                        ),
                      )}
                    </td>
                    <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                      {humanReadableTime(
                        slowestTime(
                          node.solves.map(
                            (solve: { time: number }) => solve.time,
                          ),
                        ),
                      )}
                    </td>
                    <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                      {node.solves.length}
                    </td>
                    <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                      {node.solves[0]?.puzzle}
                    </td>
                  </tr>
                  <tr
                    className={`${openRow === index ? "table-row" : "hidden"} transition-all ease-in-out delay-150 duration-300`}
                  >
                    <td colSpan={7}>
                      <ClassicSubDataTable>
                        <tbody>
                          {node.solves.map((node: any, index: number) => {
                            return (
                              <tr
                                key={index}
                                className={`py-3 border-b cursor-pointer hover:bg-white ${
                                  index % 2 === 0
                                    ? "bg-orange-50"
                                    : "bg-orange-100"
                                }`}
                              >
                                <td className="px-2 md:px-6 py-2 font-medium text-gray-800 whitespace-nowrap">
                                  {humanReadableTime(parseInt(node.time))}
                                </td>
                                <td className="px-2 md:px-6 py-2 text-xs md:text-medium font-medium text-gray-900">
                                  {node.scramble}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </ClassicSubDataTable>
                    </td>
                  </tr>
                </React.Fragment>
              );
            },
          )}
        </tbody>
      </DataTableClassic>
      <p className="text-white pt-4 text-xs">
        * Session average drops best and worst time.
      </p>
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
