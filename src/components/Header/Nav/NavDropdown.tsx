import { Key } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavDropdownProps {
  avatarUrl: string,
  email: string,
  name: string
}

const NavDropdown = (props: NavDropdownProps) => {
  const { avatarUrl, email, name } = props;
  const router = useRouter();

  const dropdownAction = (key: Key) => {
    if (key === "logout") return signOut();
    return router.push(String(key));
  };

  return <div>Placeholder</div>
};

export default NavDropdown;

/* <Dropdown placement="bottom-left">
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
      {name}
    </Text>
    <Text size={12} color="$gray500" css={{ d: "flex" }}></Text>
  </User>
</Dropdown.Trigger>
<Dropdown.Menu
  onAction={dropdownAction}
  color="primary"
  aria-label="User Actions"
>
  <Dropdown.Item
    key="user"
    css={{ height: "$18" }}
    textValue="user"
  >
    <Text color="$gray900" css={{ d: "flex" }}>
      Signed in as
    </Text>
    <Text b color="$gray900" css={{ d: "flex" }}>
      {email}
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
</Dropdown>); */