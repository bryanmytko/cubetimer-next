import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

import { Solves } from "../../components/Statistics";

const SolvesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user.id;

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status, router]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-neutral-200">
      <Head>
        <title>Cubetimer.io | Past Solves</title>
      </Head>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Past solves</h1>
        <p className="text-sm text-neutral-400 mt-1">Every solve you&apos;ve timed while signed in, newest first.</p>
      </header>
      <Solves userId={userId} />
    </div>
  );
};

export default SolvesPage;
