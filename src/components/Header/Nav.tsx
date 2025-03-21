import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  User,
} from "@nextui-org/react";
import router, { useRouter } from "next/router";
import gravatar from "gravatar";

import Logo from "./Logo";
import { Key } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const { asPath } = useRouter();

  const navItems = [
    { url: "/", name: "timer" },
    { url: "/tutorials", name: "tutorials" },
    { url: "/reviews", name: "reviews" },
  ];

  const auth = () => {
    if (session) {
      const avatarUrl = gravatar.url(session.user?.email || "", {
        protocol: "https",
        s: "100",
      });
      const displayEmail = session.user?.email || "";
      const displayName = session.user?.name || "";

      const dropdownAction = (key: Key) => {
        if (key === "logout") return signOut();
        return router.push({ pathname: String(key) });
      };

      return (
        <div className="grid justify-start">
          <Dropdown>
            <DropdownTrigger>
              <User as="button" name="" avatarProps={{ src: avatarUrl }}>
                <p>{displayName}</p>
              </User>
            </DropdownTrigger>
            <DropdownMenu
              onAction={dropdownAction}
              color="primary"
              aria-label="User Actions"
              className="font-['Arial']"
            >
              <DropdownItem key="/" textValue="user">
                <p>Signed in as:</p>
                <p className="font-bold">{displayEmail}</p>
              </DropdownItem>
              <DropdownItem key="solves" textValue="solves">
                Past Solves
              </DropdownItem>
              <DropdownItem key="sessions" textValue="sessions">
                Past Classic Sessions
              </DropdownItem>
              <DropdownItem key="settings" textValue="settings">
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="warning" textValue="logout">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }

    return (
      <Button
        color="warning"
        radius="md"
        className="h-8 md:h-8"
        onPress={() => signIn()}
      >
        Login
      </Button>
    );
  };

  return (
    <nav className="px-2">
      <div className="container flex flex-col md:flex-row flex-wrap items-center justify-around md:justify-between mx-auto">
        <Logo />
        <div className="block w-auto" id="navbar-default">
          <ul className="flex flex-row px-4 pb-2 md:pb-3 pt-0 md:pt-4 space-x-6 text-sm font-medium items-center">
            {navItems.map((item, index) => {
              return (
                <li
                  key={`nav-item-${index}`}
                  className={`${
                    item.url === asPath ? "text-yellow-300" : "text-white"
                  }`}
                >
                  <Link className="block py-2 capitalize" href={item.url}>
                    {item.name}
                  </Link>
                </li>
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
