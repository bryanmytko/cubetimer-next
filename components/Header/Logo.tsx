import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = () => (
  <Link href="/" className="flex items-center">
    <Image alt="logo" className="h-10 p-1" src="/assets/logo.png" />
    <div className="text-xl">cubetimer.io</div>
  </Link>
);

export default Logo;
