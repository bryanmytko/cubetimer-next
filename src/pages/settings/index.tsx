import { useSession } from "next-auth/react";
import Head from "next/head";

const Settings = () => {
  const { data: session } = useSession();
  const displayName = session ? session.user.name : "User";

  return (
    <div className="container settings-container m-auto px-0 lg:px-0 py-6 md:py-12 w-full text-black">
      <Head>
        <title>Cubetimer.io | Settings</title>
      </Head>
      <h1 className="text-3xl text-white">{`${displayName}'s`} Settings</h1>
      <p className="text-white py-12">There are no settings yet.</p>
    </div>
  );
};

export default Settings;
