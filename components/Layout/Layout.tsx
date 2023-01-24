import { ReactNode } from "react";
import { Header, Footer } from "../";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={`bg-neutral-800 min-h-screen`}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
