import Image from "next/image";

const Gan = () => {
  return (
    <div className="border-4 border-emerald-500 rounded-md bg-white flex p-4 pb-6 lg:pb-4 gap-6 mt-8 w-11/12 mx-auto flex-col md:flex-row">
      <Image
        src="/assets/ads/gan.webp"
        className="mx-auto"
        width={200}
        height={150}
        alt="GAN"
      />
      <div>
        <h2 className="text-xl font-medium text-gray-800 pb-2">
          GAN Speedcubes
        </h2>
        <p className="text-xs pb-6 text-gray-700">
          Cost effective, smooth and easy to tune, GAN cubes are the ultimate
          tool for speedcubing or just getting into the hobby for the first
          time. They`re strong, fast and magnetic -- everything a moden cube
          needs to be to achieve the fastest times!
        </p>
        <a
          color="success"
          target="_blank"
          className="px-4 py-2 rounded-md text-white bg-cyan-500 hover:bg-green-700"
          href="https://www.amazon.com/gp/search?ie=UTF8&tag=cubetimer00-20&linkCode=ur2&linkId=82cf0b948cc19dbab42cae1380b366ca&camp=1789&creative=9325&index=toys-and-games&keywords=gan rubiks cubes"
        >
          Shop Now!
        </a>
      </div>
    </div>
  );
};

export default Gan;
