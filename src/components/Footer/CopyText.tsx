import Link from "next/link";

const CopyText = () => {
  return (
    <p className="text-gray-500 text-s text-center pt-3">
      &copy; 2014-{new Date().getFullYear()}
      <span className="text-pink-700">&nbsp;&hearts;&nbsp;</span>
      <Link href="http://github.com/bryanmytko">Bryan Mytko</Link>
    </p>
  );
};

export default CopyText;
