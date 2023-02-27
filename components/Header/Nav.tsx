import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Dropdown, Text, Grid, User } from "@nextui-org/react";
import gravatar from "gravatar";

import Logo from "./Logo";

const Nav = () => {
  const { data: session } = useSession();
  const auth = () => {
    if (session) {
      // @TODO google avatars sometimes 403
      // const avatarUrl = session.user?.image || gravatar.url(session.user?.email || "", { protocol: 'https', s: '100' });
      const avatarUrl = gravatar.url(session.user?.email || "", {
        protocol: "https",
        s: "100",
      });
      const displayEmail = session.user?.email || "";
      const displayName = session.user?.name || "";

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
              <Dropdown.Menu color="primary" aria-label="User Actions">
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
                  <Link href="#" onClick={() => signOut()}>
                    Log Out
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        </Grid.Container>
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
    <nav className="px-2 sm:px-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Logo />
        {/* <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm bg-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open Navigation</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 
              011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 
              110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button> */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border md:flex-row md:space-x-6 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <Link className="block py-2 text-white" href="/">
                Timer
              </Link>
            </li>
            {/* <li>
              <Link className="block py-2 text-white" href="statistics">
                Statistics
              </Link>
            </li> */}
            {/* <li>
              <Link className="block py-2 text-white" href="profile">
                Profile
              </Link>
            </li> */}
            <li>
              <Link className="block py-2 text-white" href="tutorials">
                Tutorials
              </Link>
            </li>
            <li>
              <Link className="block py-2 text-white" href="reviews">
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
