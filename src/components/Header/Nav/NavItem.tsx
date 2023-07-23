import Link from "next/link";

interface NavItemProps {
  name: string,
  pathname: string,
  url: string
}

const NavItem = (props: NavItemProps) => {
  const { name, pathname, url } = props;

  return (<li
    className={`${url === pathname ? "text-yellow-300" : "text-white"
      }`}
  >
    <Link className="block py-2 capitalize" href={url}>
      {name}
    </Link>
  </li>);
};

export default NavItem;