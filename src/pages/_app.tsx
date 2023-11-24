import type { AppProps, AppType } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import Script from "next/script";

import "../styles/globals.css";
import { Layout } from "../components";
import apolloClient from "../lib/apollo";

const App: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
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
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8225396803360141"
        crossOrigin="anonymous"
      ></Script>
      <ApolloProvider client={apolloClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
