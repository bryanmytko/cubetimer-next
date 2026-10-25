import Link from "next/link";

import Difficulty from "./Difficulty";
import PuzzleIcon from "./diagrams/PuzzleIcon";
import { TUTORIALS } from "./content";

const TutorialsHub = () => (
  <div className="px-4 md:px-8 py-8 text-neutral-200">
    <header className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-white">Learn to solve</h1>
      <p className="text-neutral-400 mt-3">
        This section includes guides for every puzzle that the timer supports, including beginner and advanced methods.
      </p>
    </header>

    <Link
      href="/tutorials/3x3#beginner"
      className="mt-8 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-yellow-300/15 to-neutral-800 border border-yellow-300/30 rounded-2xl p-6 hover:border-yellow-300/60 transition-colors"
    >
      <PuzzleIcon kind="cube" n={3} size={96} />
      <div className="text-center sm:text-left">
        <p className="text-xs uppercase tracking-wide text-yellow-300 font-bold">New to cubing?</p>
        <h2 className="text-2xl font-bold text-white mt-1">Solve a 3x3 for the first time</h2>
        Check out this simple beginner method. Only seven steps using a handful of short algorithms (just a fancy word for a set of moves that moves pieces a certain way). Impress your friends without peeling off the stickers!
        <p className="text-neutral-300 mt-1">
        </p>
        <span className="sm:ml-auto shrink-0 text-yellow-300 font-bold">Start →</span>
      </div>
    </Link>

    <h2 className="text-xl font-bold text-neutral-100 mt-12 mb-4">All puzzles</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {TUTORIALS.map((t) => (
        <li key={t.slug}>
          <Link
            href={`/tutorials/${t.slug}`}
            className="group flex h-full gap-4 items-center bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-4 hover:border-yellow-300/50 hover:bg-neutral-800 transition-colors"
          >
            <div className="shrink-0 transition-transform group-hover:scale-105">
              <PuzzleIcon kind={t.icon} n={t.n} size={72} />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-white">{t.name}</h3>
              <p className="text-sm text-neutral-400 mt-0.5">{t.tagline}</p>
              <div className="mt-2">
                <Difficulty level={t.difficulty} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default TutorialsHub;
