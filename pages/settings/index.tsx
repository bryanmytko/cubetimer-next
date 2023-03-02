import { useSession } from "next-auth/react";

const Settings = () => {
  const { data: session } = useSession();
  const displayName = session ? session.user.name : "User";

  return <div className="container settings-container">
    <h1 className="text-3xl text-white">{`${displayName}'s`} Settings</h1>
  </div>;
};

export default Settings;