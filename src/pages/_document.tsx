import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8225396803360141"
        crossOrigin="anonymous"
      ></Script>
    </body>
  </Html>
);

export default Document;
