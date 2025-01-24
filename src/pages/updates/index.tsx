import Head from "next/head";

const Updates = () => {
  return (
    <div className="bg-gray-200 m-auto p-12 mt-12 w-11/12 rounded text-black text-sm">
      <Head>
        <title>Cubetimer.io | Site Updates</title>
      </Head>

      <h1 className="text-3xl font-bold m-auto mb-6">Site Updates</h1>
      <h3 className="text-xl mb-4">1/23/25</h3>
      <p className="mb-2">- Add `New Scramble` button to the timer.</p>
      <p className="mb-2">
        - Display previous times in the sidebar when logged in (3x3 support only
        right now).
      </p>
      <div className="border-t-1 border-gray-300 w-100 h-4 mt-4"></div>

      <h3 className="text-xl mb-4">1/13/25</h3>
      <p className="mb-2">
        - Add dedicated pages for past solves &amp; sessions.
      </p>
      <p className="mb-2">- Add session data including average, best, worst.</p>
      <p className="mb-2">
        - Past sessions can expand to display a table of that session`s solves.
        (This is still pretty ugly, updated design maybe coming.)
      </p>
      <div className="border-t-1 border-gray-300 w-100 h-4 mt-4"></div>

      <h3 className="text-xl mb-4">1/12/25</h3>
      <p className="mb-2">- Fix stats page query for Solves, add date.</p>
      <p className="mb-2">
        - Add Sessions rows on stats tab (expandable to see solves soon).
      </p>
      <p className="mb-2">- Add a bit of polish to the homepage panel.</p>
      <p className="mb-2">
        - Fix a few dropdown nav bugs, remove unused links.
      </p>
      <div className="border-t-1 border-gray-300 w-100 h-4 mt-4"></div>

      <h3 className="text-xl mb-4">11/26/23</h3>
      <p className="mb-2">
        - Fix button text bug when toggling back to standard mode after a
        complete session.
      </p>
      <div className="border-t-1 border-gray-300 w-100 h-4 mt-4"></div>

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
