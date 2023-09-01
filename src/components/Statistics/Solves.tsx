import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

import { SOLVES_FOR_USER } from "../../graphql/queries";
import { humanReadableTime } from "../../lib/format";
import { Error, Pagination } from "../../components/Statistics";

const SOLVES_PER_PAGE = 20;

const Solves = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { loading, data, error, fetchMore } = useQuery(SOLVES_FOR_USER, {
    skip: !session,
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
      <Pagination
        endCursor={endCursor}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        per_page={SOLVES_PER_PAGE}
        startCursor={startCursor}
      />
    </div>
  );
};

export default Solves;
