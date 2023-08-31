import { useQuery } from "@apollo/client";
import { useState, MouseEvent } from "react";

import { SOLVE_SESSIONS_FOR_USER } from "../../graphql/queries";
import { useSession } from "next-auth/react";
import { ClassicSolves, Error, Solves } from "../../components/Statistics";

const Statistics = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { data: solveSessionsData, error: solveSessionsDataError } = useQuery(
    SOLVE_SESSIONS_FOR_USER,
    {
      skip: !session,
      variables: { userId },
    }
  );

  const [activeTab, setActiveTab] = useState("1");

  const changeTab = (e: MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLElement;
    if (target.dataset["tab"]) setActiveTab(target.dataset["tab"]);
  };

  if (solveSessionsDataError) return <Error />;

  return (
    <div className="container statistics-container m-auto p-12 w-11/12 text-black">
      <h1 className="text-2xl text-bold text-white mb-6">Statistics</h1>

      <div className="tabs">
        <ul className="tabsNav flex">
          <li
            className={`cursor-pointer rounded-t-md mr-1 px-4 py-2 ${
              activeTab === "1" ? "bg-yellow-400" : "bg-gray-500"
            }`}
            data-tab="1"
            onClick={changeTab}
          >
            Solves
          </li>
          <li
            className={`cursor-pointer rounded-t-md px-4 py-2 ${
              activeTab === "2" ? "bg-yellow-400" : "bg-gray-500"
            }`}
            data-tab="2"
            onClick={changeTab}
          >
            Sessions
          </li>
        </ul>
      </div>
      <div className={activeTab === "1" ? "" : "hidden"}>
        <Solves />
      </div>
      <div className={activeTab === "2" ? "" : "hidden"}>
        {false ? (
          "Loading..."
        ) : (
          <ClassicSolves data={solveSessionsData?.solveSessionsForUser} />
        )}
      </div>
    </div>
  );
};

export default Statistics;
