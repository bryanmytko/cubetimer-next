import Head from "next/head";

import { Timer } from "../components";

const Home = () => {
  return (
    <div className="grid md:grid-cols-6 grid-cols-1">
      <Head>
        <title>Cubetimer.io | Online Rubik`s Cube Timer</title>
      </Head>
      <Timer />
    </div>
  );
};

export default Home;
