const Updates = () => {
  return (
    <div className="bg-gray-200 m-auto p-12 mt-12 w-11/12 rounded text-black">
      <h1 className="text-3xl font-bold m-auto mb-6">Site Updates</h1>
      <h3 className="text-xl mb-4">11/23/23</h3>
      <p>
        Added a loader in the submit modal when submitting a time to achieve
        better UX for slower networks.
      </p>
      <p>
        Added better locking of the timer to prevent spamming the button and
        putting the timer in a broken state or submitting the same solve
        multiple times.
      </p>
    </div>
  );
};

export default Updates;
