import Link from "next/link";

import { CoffeeButton, CopyText } from "./";

const Footer = () => {
  return (
    <footer className="lg:h-20 pt-0 lg:pt-4 bg-black pb-4 sticky top-[100vh] px-2 sm:px-4 ">
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 lg:justify-center m-auto">
        <div className="flex justify-center gap-1 md:gap-4 text-sm mb-4 flex-col md:flex-row">
          <CopyText />
          <p className="hidden md:inline-block text-gray-700 text-s text-center pt-3">
            |
          </p>
          <p className="text-gray-500 text-s text-center md:pt-3">
            <Link href="/updates">Site Updates</Link>
          </p>
          <p className="hidden md:inline-block text-gray-700 text-s text-center pt-3">
            |
          </p>
          <p className="text-gray-500 text-s text-center md:pt-3 md:mr-8">
            <Link href="/feedback">Contact Me</Link>
          </p>
        </div>
        <CoffeeButton />
      </div>
    </footer>
  );
};

export default Footer;
