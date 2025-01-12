import { useEffect, useState, MouseEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { ClassicSolves, Solves } from "../../components/Statistics";

enum Tabs {
  SOLVES = "solves",
  CLASSIC_SESSIONS = "classic_sessions",
}

const Statistics = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user.id;

  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.SOLVES);

  const changeTab = (e: MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLElement;
    if (target.dataset["tab"]) setActiveTab(target.dataset["tab"] as Tabs);
  };

  if (status === "unauthenticated") router.replace("/auth/signin");

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    switch (hash) {
      case Tabs.SOLVES:
        return setActiveTab(Tabs.SOLVES);
      case Tabs.CLASSIC_SESSIONS:
        return setActiveTab(Tabs.CLASSIC_SESSIONS);
      default:
        return setActiveTab(Tabs.SOLVES);
    }
  }, []);

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

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
              activeTab === Tabs.SOLVES ? "bg-yellow-400" : "bg-gray-500"
            }`}
            data-tab={Tabs.SOLVES}
            onClick={changeTab}
          >
            Solves
          </li>
          <li
            className={`cursor-pointer rounded-t-md px-4 py-2 ${
              activeTab === Tabs.CLASSIC_SESSIONS
                ? "bg-yellow-400"
                : "bg-gray-500"
            }`}
            data-tab={Tabs.CLASSIC_SESSIONS}
            onClick={changeTab}
          >
            Classic Sessions
          </li>
        </ul>
      </div>
      <div className={activeTab === Tabs.SOLVES ? "" : "hidden"}>
        <Solves userId={userId} />
      </div>
      <div className={activeTab === Tabs.CLASSIC_SESSIONS ? "" : "hidden"}>
        <ClassicSolves userId={userId} />
      </div>
    </div>
  );
};

export default Statistics;
