import { useQuery } from "@apollo/client";

import {
  SOLVES_FOR_USER,
  SOLVE_SESSIONS_FOR_USER,
} from "../../graphql/queries";
import { useSession } from "next-auth/react";
import { ClassicSolves, Solves } from "../../components/Statistics";

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
  });

  return (
    <div className="container statistics-container m-auto p-12 w-11/12 text-black">
      <h1 className="text-2xl text-bold text-white mb-6">Statistics</h1>
      <Solves data={solveData?.solves} />
      <h2 className="mt-6 text-3xl">Classic Mode Sessions</h2>
      <ClassicSolves data={solveSessionsData?.solveSessionsForUser} />
    </div>
  );
};

export default Statistics;
