import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { Solves } from "../../components/Statistics";

const SolvesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user.id;

  if (status === "unauthenticated") router.replace("/auth/signin");

  return (
    <div className="container solves-container m-auto px-0 lg:px-0 py-6 md:py-12 w-full text-black">
      <Head>
        <title>Cubetimer.io | Past Solves</title>
      </Head>
      <h1 className="text-2xl text-bold text-white mb-6">Past Solves</h1>
      <Solves userId={userId} />
    </div>
  );
};

export default SolvesPage;
