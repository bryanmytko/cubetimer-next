import Link from "next/link";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";

import { SOLVES_FOR_USER } from "../../graphql/queries";
import { DELETE_SOLVE } from "../../graphql/mutations";
import { formatDayLabel } from "../../lib/format";
import { LoadingTable } from "../Loading";
import { Error } from "./";
import LoadMore from "./LoadMore";
import SolveRow, { SolveNode } from "./SolveRow";
import UndoToast from "./UndoToast";
import useUndoableDelete from "./useUndoableDelete";

interface SolvesProps {
  userId: string | undefined;
}

// Not 20: the timer caches the same query with first: 20, and loading more
// here would grow the list shown under the timer too
const SOLVES_PER_PAGE = 50;

const groupByDay = (solves: Array<SolveNode>) =>
  solves.reduce<Array<{ day: string; solves: Array<SolveNode> }>>((groups, solve) => {
    const day = formatDayLabel(solve.createdAt);
    const last = groups[groups.length - 1];

    if (last?.day === day) last.solves.push(solve);
    else groups.push({ day, solves: [solve] });

    return groups;
  }, []);

const Solves = ({ userId }: SolvesProps) => {
  const { data, error, fetchMore, networkStatus } = useQuery(SOLVES_FOR_USER, {
    skip: !userId,
    variables: { userId, first: SOLVES_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  });
  const [deleteSolve] = useMutation(DELETE_SOLVE);
  const { hidden, pending, failed, remove, undo, dismissError } = useUndoableDelete((id) =>
    deleteSolve({ variables: { id } }),
  );

  if (error) return <Error />;
  if (!data) return <LoadingTable rows={8} />;

  const solves: Array<SolveNode> = data.solves.edges
    .map(({ node }: { node: SolveNode }) => node)
    .filter((solve: SolveNode) => !hidden.has(solve.id));
  const { endCursor, hasNextPage } = data.solves.pageInfo;

  const loadMore = () =>
    fetchMore({
      variables: { after: endCursor },
      updateQuery: (previous, { fetchMoreResult }) => ({
        solves: {
          ...fetchMoreResult.solves,
          edges: [...previous.solves.edges, ...fetchMoreResult.solves.edges],
        },
      }),
    });

  return (
    <>
      {solves.length === 0 ? (
        <div className="rounded-2xl border border-neutral-700/60 bg-neutral-800/60 p-10 text-center">
          <p className="font-bold text-neutral-100">No solves yet</p>
          <p className="text-sm text-neutral-400 mt-1">
            Solves you time while signed in show up here.
          </p>
          <Link href="/" className="inline-block mt-4 font-bold text-yellow-300 hover:text-yellow-200">
            Start timing →
          </Link>
        </div>
      ) : (
        groupByDay(solves).map(({ day, solves: daySolves }) => (
          <section key={day} className="mt-8 first:mt-0">
            <h2 className="flex items-baseline justify-between text-xs font-bold uppercase tracking-wide text-neutral-500 mb-3">
              <span>{day}</span>
              <span className="normal-case font-normal">
                {daySolves.length} {daySolves.length === 1 ? "solve" : "solves"}
              </span>
            </h2>
            <ul className="bg-neutral-800/60 border border-neutral-700/60 rounded-2xl divide-y divide-neutral-700/60">
              {daySolves.map((solve) => (
                <SolveRow key={solve.id} solve={solve} onDelete={remove} />
              ))}
            </ul>
          </section>
        ))
      )}

      {hasNextPage && (
        <LoadMore loading={networkStatus === NetworkStatus.fetchMore} onClick={loadMore} />
      )}

      <UndoToast
        label="Solve"
        pending={!!pending}
        failed={failed}
        onUndo={undo}
        onDismiss={dismissError}
      />
    </>
  );
};

export default Solves;
