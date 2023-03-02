import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const displayName = session ? session.user.name : "User";

  return <div className="container profile-container">
    <h1 className="text-3xl text-white">{`${displayName}'s`} Profile</h1>
  </div>;
};

export default Profile;