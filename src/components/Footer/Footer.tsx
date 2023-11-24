import Link from "next/link";

import { CoffeeButton, CopyText } from "./";

const Footer = () => {
  return (
    <footer className="lg:h-20 py-4 bg-black sticky top-[100vh] px-2 sm:px-4 flex flex-col lg:flex-row gap-4 lg:gap-4 justify-center">
      <CopyText />
      <p className="text-gray-700 text-s text-center pt-3">|</p>
      <p className="text-gray-500 text-s text-center pt-3">
        <Link href="/updates">Site Updates</Link>
      </p>
      <p className="text-gray-700 text-s text-center pt-3">|</p>
      <p className="text-gray-500 text-s text-center pt-3">
        <Link href="/feedback">Contact Me</Link>
      </p>
      <CoffeeButton />
    </footer>
  );
};

export default Footer;
