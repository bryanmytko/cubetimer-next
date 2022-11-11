import { Html, Head, Main, NextScript } from 'next/document';

import { Footer, Header } from '../components';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-white dark:bg-gray-800 min-h-screen">
        <Header />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
