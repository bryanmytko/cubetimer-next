import { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";

import { Timer } from "../components";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-5 gap-4">
        <Timer />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default Home;
