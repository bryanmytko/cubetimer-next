import { useState, useEffect } from "react";

import { Scramble, Timer } from "../components";
import Scrambler from "../lib/scrambler";

const scrambler = new Scrambler("3x3");

const Home = () => {
  const [scramble, setScramble] = useState("");

  useEffect(() => {
    setScramble(scrambler.generate());
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4">
          <Scramble scramble={scramble} />
          <Timer />
        </div>
        <div className="border-2">Foo.</div>
      </div>
    </div>
  );
};

export default Home;
