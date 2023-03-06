import { useQuery } from "@apollo/client";

import { humanReadableTime } from "../../lib/format";
import type { Solve } from "@prisma/client";
import { SOLVES_FOR_USER, SOLVE_SESSIONS_FOR_USER } from "../../graphql/queries";
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
  })

  const displaySolve = (solve: Solve) => {
    return (<p key={solve.id}>
      {humanReadableTime(parseInt(solve.time))
      }: {" "}
      <code className="inline">{solve.scramble}</code>
    </p >);
  }

  return (
    <div className="container text-white statistics-container">
      <h1 className="mt-6 text-3xl">Statistics</h1>
      <div className="p-6 mt-4 border">
        {solveData &&
          solveData.solves.map(displaySolve)}
      </div>
      <h2 className="mt-6 text-3xl">Classic Mode Sessions</h2>
      {solveSessionsData &&
        solveSessionsData.solveSessionsForUser.map((session: SolveSession) => {
          return <div key={session.id} className="p-6 mt-4 border">
            <h3 className="text-xl">Session ${session.id}</h3>
            {session.solves.map(displaySolve)}
          </div>;
        })
      }
    </div>);
};

export default Statistics;
