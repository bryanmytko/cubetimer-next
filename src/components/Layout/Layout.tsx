import { ReactNode } from "react";
import { Noto_Sans_Mono, Rubik } from "next/font/google";

import { Header, Footer } from "../";

type LayoutProps = {
  children: ReactNode;
};

const robotoMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-rubik-sans",
});

export default function Layout({ children }: LayoutProps) {
  return (
    <main
      className={`bg-neutral-900 min-h-screen font-sans ${rubik.variable} ${robotoMono.variable}`}
    >
      <Header />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </main>
  );
}
