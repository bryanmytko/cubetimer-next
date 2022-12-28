import Link from "next/link";
import styles from "./Logo.module.css";

const Logo = () => (
  <Link href="/" className="flex items-center">
    <img className="h-10 p-1" src="/assets/logo.png" />
    <div className="text-xl">cubetimer.io</div>
  </Link>
);

export default Logo;
