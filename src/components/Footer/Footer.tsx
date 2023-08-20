import { CoffeeButton, CopyText } from "./";

const Footer = () => {
  return (
    <footer className="h-20 pt-4 bg-black sticky top-[100vh] px-2 sm:px-4 flex gap-8 justify-center">
      <CopyText />
      <CoffeeButton />
    </footer>
  );
};

export default Footer;
