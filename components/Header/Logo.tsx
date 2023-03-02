import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  dark?: boolean;
}

const Logo = (props: LogoProps) => {
  const { dark } = props;

  return (
    <Link href="/" className="flex items-center">
      <Image
        height="47"
        width="45"
        alt="logo"
        className="h-10 p-1"
        src="/assets/logo.png"
      />
      <div className={`text-xl ${dark ? "text-black" : "text-white"}`}>
        cubetimer.io
      </div>
    </Link>
  );
};

export default Logo;
