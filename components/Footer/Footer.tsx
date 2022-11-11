import Link from 'next/link';
// <nav className="px-2 sm:px-4">
//<//div className="container flex flex-wrap justify-between items-center mx-auto">
const Footer = () => {
  return (
    <footer className="h-10 dark:bg-gray-900 sticky top-[100vh] px-2 sm:px-4">
      <p className="text-gray-500 text-xs text-center pt-3">&copy; 2014-{new Date().getFullYear()} &hearts;
        <Link href="http://github.com/bryanmytko">Bryan Mytko</Link>
      </p>
    </footer>
  );
};

export default Footer;
