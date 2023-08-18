import { useQuery } from "@apollo/client";
import { useState, MouseEvent } from "react";

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

  const [activeTab, setActiveTab] = useState("");

  const changeTab = (e: MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLUListElement;
    setActiveTab(target.id);
  };

  return (
    <div className="container statistics-container m-auto p-12 w-11/12 text-black">
      <h1 className="text-2xl text-bold text-white mb-6">Statistics</h1>

      <div className="tabs">
        <ul className="tabs-nav flex">
          <li
            className="bg-gray-400 rounded-tl-md px-4 py-2"
            id="1"
            onClick={changeTab}
          >
            Solves
          </li>
          <li
            className="bg-gray-500 rounded-tr-md px-4 py-2"
            id="2"
            onClick={changeTab}
          >
            Sessions
          </li>
        </ul>
      </div>

      <Solves data={solveData?.solves} />
      <h2 className="mt-6 text-3xl">Classic Mode Sessions</h2>
      <ClassicSolves data={solveSessionsData?.solveSessionsForUser} />
    </div>
  );
};

export default Statistics;
