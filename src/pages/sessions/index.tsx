import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

import { ClassicSolves } from "../../components/Statistics";

const ClassicSolvesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user.id;

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status, router]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-neutral-200">
      <Head>
        <title>Cubetimer.io | Past Classic Sessions</title>
      </Head>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Classic sessions</h1>
        <p className="text-sm text-neutral-400 mt-1">12-solve sessions. The session average drops your best and worst times.</p>
      </header>
      <ClassicSolves userId={userId} />
    </div>
  );
};

export default ClassicSolvesPage;
