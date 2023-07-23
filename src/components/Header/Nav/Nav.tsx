"use client"

import { useSession, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import gravatar from "gravatar";

import Logo from "../Logo";
import { LoginButton, NavDropdown, NavItem } from "./";

const Nav = () => {
  //const { data: session } = useSession();
  const session = null;
  const pathname = usePathname();

  const navItems = [
    { url: "/", name: "timer" },
    { url: "/tutorials", name: "tutorials" },
    { url: "/reviews", name: "reviews" },
  ];

  const auth = () => {
    if (session && session.user) {
      const { user } = session;
      const avatarUrl = gravatar.url(user.email, {
        protocol: "https",
        s: "100",
      });

      return (
        <div>
          <NavDropdown
            avatarUrl={avatarUrl}
            email={user.email}
            name={user.name}
          />
        </div>
      );
    }

    return <LoginButton action={signIn} />;
  };

  return (
    <nav className="px-2">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Logo />
        <div className="block w-auto" id="navbar-default">
          <ul className="flex flex-row px-4 py-3 pt-4 space-x-6 text-sm font-medium border-0">
            {navItems.map((item, index) => {
              return (
                <NavItem
                  key={index}
                  name={item.name}
                  url={item.url}
                  pathname={pathname}
                />
              );
            })}
            <li>{auth()}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
