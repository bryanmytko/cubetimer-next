import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Noto_Sans_Mono, Rubik } from "next/font/google";

const DynamicHeader = dynamic(() => import("../Header/Header"));
const DynamicFooter = dynamic(() => import("../Footer/Footer"));

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
      <DynamicHeader />
      <div className="container mx-auto">{children}</div>
      <DynamicFooter />
    </main>
  );
}
