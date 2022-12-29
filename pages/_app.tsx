import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="An online timer for
  speedsolving Rubik's cubes and other mechanical puzzles.
  Sign up and save your past sessions and scrambles!
  Supports: 2x2, 3x3, 4x4, 5x5, 6x6, 7x7, Pyraminx, Megaminx."
        />
        <meta name="theme-color" content="#212121" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
