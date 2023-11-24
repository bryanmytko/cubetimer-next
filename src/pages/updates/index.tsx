import Head from "next/head";

const Updates = () => {
  return (
    <div className="bg-gray-200 m-auto p-12 mt-12 w-11/12 rounded text-black text-sm">
      <Head>
        <title>Cubetimer.io | Site Updates</title>
      </Head>
      <h1 className="text-3xl font-bold m-auto mb-6">Site Updates</h1>
      <h3 className="text-xl mb-4">11/24/23</h3>
      <p className="mb-2">- Update footer for smaller screens</p>
      <p className="mb-2">- Add page titles</p>
      <p className="mb-2">- Lazy load google analytics</p>
      <div className="border-t-1 border-gray-300 w-100 h-4 mt-4"></div>
      <h3 className="text-xl mb-4">11/23/23</h3>
      <p className="mb-2">
        - Added a loader in the submit modal when submitting a time to achieve
        better UX for slower networks.
      </p>
      <p>
        - Added better locking of the timer to prevent spamming the button and
        putting the timer in a broken state or submitting the same solve
        multiple times.
      </p>
    </div>
  );
};

export default Updates;
