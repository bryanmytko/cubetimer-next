import { useState, MouseEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { ClassicSolves, Solves } from "../../components/Statistics";

const Statistics = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user.id;

  const [activeTab, setActiveTab] = useState("1");

  const changeTab = (e: MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLElement;
    if (target.dataset["tab"]) setActiveTab(target.dataset["tab"]);
  };

  if (status === "unauthenticated") router.replace("/auth/signin");

  return (
    <div className="container statistics-container m-auto px-0 lg:px-0 py-6 md:py-12 w-full text-black">
      <Head>
        <title>Cubetimer.io | Statistics</title>
      </Head>
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
        <Solves userId={userId} />
      </div>
      <div className={activeTab === "2" ? "" : "hidden"}>
        <ClassicSolves userId={userId} />
      </div>
    </div>
  );
};

export default Statistics;
