import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { ClassicSolves } from "../../components/Statistics";

const ClassicSolvesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user.id;

  if (status === "unauthenticated") router.replace("/auth/signin");

  return (
    <div className="container sessions-container m-auto px-0 lg:px-0 py-6 md:py-12 w-full text-black">
      <Head>
        <title>Cubetimer.io | Past Classic Sessions</title>
      </Head>
      <h1 className="text-2xl text-bold text-white mb-6">
        Past Classic Sessions
      </h1>
      <ClassicSolves userId={userId} />
    </div>
  );
};

export default ClassicSolvesPage;
