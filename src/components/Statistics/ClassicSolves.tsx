import Link from "next/link";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";

import { SOLVE_SESSIONS_FOR_USER } from "../../graphql/queries";
import { DELETE_SOLVE_SESSION } from "../../graphql/mutations";
import { LoadingTable } from "../Loading";
import { Error } from "./";
import LoadMore from "./LoadMore";
import SessionCard, { SessionNode } from "./SessionCard";
import UndoToast from "./UndoToast";
import useUndoableDelete from "./useUndoableDelete";

interface ClassicSolvesProps {
  userId: string | undefined;
}

const SESSIONS_PER_PAGE = 10;

const ClassicSolves = ({ userId }: ClassicSolvesProps) => {
  const { data, error, fetchMore, networkStatus } = useQuery(SOLVE_SESSIONS_FOR_USER, {
    skip: !userId,
    variables: { userId, first: SESSIONS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  });
  const [deleteSolveSession] = useMutation(DELETE_SOLVE_SESSION);
  const { hidden, pending, failed, remove, undo, dismissError } = useUndoableDelete((id) =>
    deleteSolveSession({ variables: { id } }),
  );

  if (error) return <Error />;
  if (!data) return <LoadingTable rows={6} />;

  const sessions: Array<SessionNode> = data.solveSessionsForUser.edges
    .map(({ node }: { node: SessionNode }) => node)
    .filter((session: SessionNode) => session.solves.length && !hidden.has(session.id));
  const { endCursor, hasNextPage } = data.solveSessionsForUser.pageInfo;

  const loadMore = () =>
    fetchMore({
      variables: { after: endCursor },
      updateQuery: (previous, { fetchMoreResult }) => ({
        solveSessionsForUser: {
          ...fetchMoreResult.solveSessionsForUser,
          edges: [
            ...previous.solveSessionsForUser.edges,
            ...fetchMoreResult.solveSessionsForUser.edges,
          ],
        },
      }),
    });

  return (
    <>
      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-neutral-700/60 bg-neutral-800/60 p-10 text-center">
          <p className="font-bold text-neutral-100">No sessions yet</p>
          <p className="text-sm text-neutral-400 mt-1">
            Turn on Classic Mode on the timer to record a 12-solve session.
          </p>
          <Link href="/" className="inline-block mt-4 font-bold text-yellow-300 hover:text-yellow-200">
            Go to the timer →
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} onDelete={remove} />
          ))}
        </ul>
      )}

      {hasNextPage && (
        <LoadMore loading={networkStatus === NetworkStatus.fetchMore} onClick={loadMore} />
      )}

      <UndoToast
        label="Session"
        pending={!!pending}
        failed={failed}
        onUndo={undo}
        onDismiss={dismissError}
      />
    </>
  );
};

export default ClassicSolves;
