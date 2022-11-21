import Link from "next/link";

import Logo from "./Logo";

const Nav = () => {
  return (
    <nav className="px-2 sm:px-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Logo />
        <button
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
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border md:flex-row md:space-x-6 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <Link className="block py-2" href="/">
                Timer
              </Link>
            </li>
            <li>
              <Link className="block py-2" href="statistics">
                Statistics
              </Link>
            </li>
            <li>
              <Link className="block py-2" href="profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="block py-2" href="tutorials">
                Tutorials
              </Link>
            </li>
            <li className="block py-2">|</li>
            <li>
              <Link className="block py-2" href="login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
