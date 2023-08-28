import { CoffeeButton, CopyText } from "./";

const Footer = () => {
  return (
    <footer className="lg:h-20 py-4 bg-black sticky top-[100vh] px-2 sm:px-4 flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center">
      <CopyText />
      <CoffeeButton />
    </footer>
  );
};

export default Footer;
