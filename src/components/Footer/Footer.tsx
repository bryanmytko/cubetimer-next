import { CoffeeButton, CopyText, Feedback } from "./";

const Footer = () => {
  return (
    <footer className="lg:h-20 py-4 bg-black sticky top-[100vh] px-2 sm:px-4 flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center">
      <CopyText />
      <p className="text-gray-500 text-s text-center pt-3">•</p>
      <Feedback />
      <p className="text-gray-500 text-s text-center pt-3">•</p>
      <CoffeeButton />
    </footer>
  );
};

export default Footer;
