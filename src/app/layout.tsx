import { ReactNode } from "react";
import type { AppProps, AppType } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";

import { Header, Footer } from "../components";
import "../styles/globals.css";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <main className={`bg-neutral-900 min-h-screen`}>
      <Header />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </main>
  );
}

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
      </Head>
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
