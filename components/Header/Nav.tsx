import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Dropdown, Text, Grid, User } from "@nextui-org/react";
import router from "next/router";
import gravatar from "gravatar";

import Logo from "./Logo";

const Nav = () => {
  const { data: session } = useSession();
  const auth = () => {
    if (session) {
      const avatarUrl = gravatar.url(session.user?.email || "", {
        protocol: "https",
        s: "100",
      });
      const displayEmail = session.user?.email || "";
      const displayName = session.user?.name || "";

      const dropdownAction = (key: string) => {
        if (key === "logout") return signOut();
        return router.push({ pathname: key });
      }

      return (
        <Grid.Container justify="flex-start" gap={0}>
          <Grid>
            <Dropdown placement="bottom-left">
              <Dropdown.Trigger>
                <User
                  bordered
                  as="button"
                  size="md"
                  color="gradient"
                  src={avatarUrl}
                  name=""
                >
                  <Text size={14} color="white" css={{ d: "flex" }}>
                    {displayName}
                  </Text>
                  <Text size={12} color="$gray500" css={{ d: "flex" }}></Text>
                </User>
              </Dropdown.Trigger>
              <Dropdown.Menu onAction={dropdownAction} color="primary" aria-label="User Actions">
                <Dropdown.Item
                  key="user"
                  css={{ height: "$18" }}
                  textValue="user"
                >
                  <Text color="$gray900" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="$gray900" css={{ d: "flex" }}>
                    {displayEmail}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item
                  key="statistics"
                  textValue="statistics"
                  withDivider
                >
                  Statistics
                </Dropdown.Item>
                <Dropdown.Item key="profile" textValue="profile" withDivider>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item key="settings" textValue="settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Item
                  key="logout"
                  color="error"
                  textValue="logout"
                  withDivider
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        </Grid.Container >
      );
    }

    return (
      <Button
        auto
        color="error"
        css={{
          background: "rgb(250 202 21 / var(--tw-bg-opacity))",
          color: "black",
        }}
        href="#"
        onClick={() => signIn()}
      >
        Login
      </Button>
    );
  };

  return (
    <nav className="px-2">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Logo />
        <div className="block w-auto" id="navbar-default">
          <ul className="flex flex-row p-4 space-x-6 text-sm font-medium border-0">
            <li>
              <Link className="block py-2 text-white" href="/">
                Timer
              </Link>
            </li>
            <li>
              <Link className="block py-2 text-white" href="/tutorials">
                Tutorials
              </Link>
            </li>
            <li>
              <Link className="block py-2 text-white" href="/reviews">
                Reviews
              </Link>
            </li>
            <li>{auth()}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
