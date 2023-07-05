import Image from "next/image";

interface BylineProps {
  name: string;
}

const Byline = (props: BylineProps) => {
  const { name } = props;

  return (
    <div>
      <Image
        src="https://en.gravatar.com/userimage/4046405/3db0ec823880c20cf6c1ab24a9ad4843"
        alt="author"
        height={30}
        width={30}
        className="inline-block"
      />
      <span>
        <a href="#" className="px-2 text-blue-700">
          {name}
        </a>
        <h2 className="inline-block m-auto">July 3rd, 2023</h2>
      </span>
    </div>
  );
};

export default Byline;
