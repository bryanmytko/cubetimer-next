import { useSession } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";
import gravatar from "gravatar";

const Profile = () => {
  const { data: session } = useSession();
  const displayName = session ? session.user.name : "User";
  const photoUrl = gravatar.url(session ? session.user?.email : "", {
    protocol: "https",
    s: "100",
  });

  return (
    <div className="container profile-container">
      <Head>
        <title>Cubetimer.io | Profile</title>
      </Head>
      <div className="w-64 h-64 bg-cover bg-y-200 bg-[url(https://www.gamesver.com/wp-content/uploads/2022/03/Rubiks-cube-on-the-colored-background.jpg)]"></div>
      <h1 className="text-3xl text-white">{`${displayName}'s`} Profile</h1>
      <Image height={100} width={100} alt="profile pic" src={photoUrl} />
      <div className="text-white rounded-md card border-1">
        <p>Fastest time: 12.32</p>
        <p>Best Average: 16.83</p>
      </div>
    </div>
  );
};

export default Profile;
