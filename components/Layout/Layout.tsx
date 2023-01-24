import { ReactNode } from "react";
import { Header, Footer } from "../";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={`bg-neutral-900 min-h-screen`}>
      <Header />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </main>
  );
}
