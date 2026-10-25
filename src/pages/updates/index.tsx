import Head from "next/head";
import Link from "next/link";

interface Update {
  // YYYY-MM-DD
  date: string;
  items: Array<string>;
}

// Newest first. Wrap a name in backticks to highlight it, e.g. `Learn`
const UPDATES: Array<Update> = [
  {
    date: "2026-10-25",
    items: [
      "Added support for more puzzles: 6x6, 7x7, Pyraminx, Megaminx, Skewb, Square-1 and Clock.",
      "Added tutorials for all supported puzzles in the `Learn` section.",
    ],
  },
  {
    date: "2025-03-16",
    items: [
      "Update solve saves to be optimistic. UI reacts instantly to create a more smooth experience.",
      "Fixed a bug with classic mode setting being true.",
    ],
  },
  {
    date: "2025-03-10",
    items: [
      "Add Previous/Next controls for scramble.",
      "Add settings on `Settings` page to set `Classic Mode` as default.",
    ],
  },
  {
    date: "2025-01-23",
    items: [
      "Add `New Scramble` button to the timer.",
      "Display previous times in the sidebar when logged in (3x3 support only right now).",
    ],
  },
  {
    date: "2025-01-13",
    items: [
      "Add dedicated pages for past solves & sessions.",
      "Add session data including average, best, worst.",
      "Past sessions can expand to display a table of that session's solves. (This is still pretty ugly, updated design maybe coming.)",
    ],
  },
  {
    date: "2025-01-12",
    items: [
      "Fix stats page query for Solves, add date.",
      "Add Sessions rows on stats tab (expandable to see solves soon).",
      "Add a bit of polish to the homepage panel.",
      "Fix a few dropdown nav bugs, remove unused links.",
    ],
  },
  {
    date: "2023-11-26",
    items: [
      "Fix button text bug when toggling back to standard mode after a complete session.",
    ],
  },
  {
    date: "2023-11-24",
    items: ["Update footer for smaller screens", "Add page titles", "Lazy load google analytics"],
  },
  {
    date: "2023-11-23",
    items: [
      "Added a loader in the submit modal when submitting a time to achieve better UX for slower networks.",
      "Added better locking of the timer to prevent spamming the button and putting the timer in a broken state or submitting the same solve multiple times.",
    ],
  },
];

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Highlighted names that link to their page
const LINKS: Record<string, string> = {
  Learn: "/tutorials",
  Settings: "/settings",
};

// Text in backticks becomes a highlighted name
const Item = ({ text }: { text: string }) => (
  <>
    {text.split("`").map((part, i) => {
      if (i % 2 === 0) return part;
      const href = LINKS[part];
      return href ? (
        <Link key={i} href={href} className="text-yellow-300 font-medium underline underline-offset-2 hover:text-yellow-200">
          {part}
        </Link>
      ) : (
        <span key={i} className="text-yellow-300 font-medium">
          {part}
        </span>
      );
    })}
  </>
);

const Updates = () => {
  const years = Array.from(new Set(UPDATES.map((u) => u.date.slice(0, 4))));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-neutral-200">
      <Head>
        <title>Cubetimer.io | Site Updates</title>
      </Head>

      <h1 className="text-3xl font-bold text-white">Site Updates</h1>
      <p className="text-neutral-400 mt-2">What&apos;s new on Cubetimer.io.</p>

      {years.map((year) => (
        <section key={year} className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-500 mb-4">
            {year}
          </h2>
          <ol className="relative border-l border-neutral-700 ml-2 space-y-8">
            {UPDATES.filter((u) => u.date.startsWith(year)).map((update) => (
              <li key={update.date} className="pl-6 relative">
                <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-yellow-300 ring-4 ring-neutral-900" />
                <time dateTime={update.date} className="text-sm font-bold text-neutral-100">
                  {formatDate(update.date)}
                </time>
                <ul className="mt-2 space-y-1.5 text-neutral-300 leading-relaxed">
                  {update.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-neutral-500" aria-hidden>
                        •
                      </span>
                      <span>
                        <Item text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
};

export default Updates;
