import { useSession } from "next-auth/react";
import Image from "next/image";
import gravatar from "gravatar";

const Profile = () => {
  const { data: session } = useSession();
  const displayName = session ? session.user.name : "User";
  const photoUrl = gravatar.url(session ? session.user?.email : "", {
    protocol: "https",
    s: "100",
  });

  return <div className="container profile-container">
    <h1 className="text-3xl text-white">{`${displayName}'s`} Profile</h1>
    <Image height={100} width={100} alt="profile pic" src={photoUrl} />
    <div className="text-white rounded-md card border-1">
      <p>Fastest time: 12.32</p>
      <p>Best Average: 16.83</p>
    </div>
  </div>;
};

export default Profile;