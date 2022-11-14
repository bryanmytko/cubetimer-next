import { useState, useEffect } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale ?? 'en', ['common']),
  },
})

export default Home;
