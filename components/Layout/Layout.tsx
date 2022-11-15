import { ReactNode } from "react";
import { Header, Footer } from "../";
import { Inter } from "@next/font/google";

const inter = Inter({
  weight: ["400"],
  variable: "--font-inter",
});

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main
      className={`bg-white dark:bg-gray-800 min-h-screen ${inter.variable}`}
    >
      <Header />
      {children}
      <Footer />
    </main>
  );
}
