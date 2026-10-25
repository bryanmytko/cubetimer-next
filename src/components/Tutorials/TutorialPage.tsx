import Link from "next/link";
import { ReactNode } from "react";

import AlgCard from "./AlgCard";
import Difficulty from "./Difficulty";
import IsoCube from "./diagrams/IsoCube";
import LastLayer from "./diagrams/LastLayer";
import PuzzleIcon from "./diagrams/PuzzleIcon";
import { CubeDiagram, Level, Tutorial } from "./types";

const LEVEL_STYLES: Record<Level, string> = {
  Beginner: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30",
  Intermediate: "bg-sky-400/10 text-sky-300 ring-sky-400/30",
  Advanced: "bg-fuchsia-400/10 text-fuchsia-300 ring-fuchsia-400/30",
};

interface SectionProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
}

const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className="scroll-mt-6">
    <h2 className="text-2xl font-bold text-neutral-100 mb-4">{title}</h2>
    {children}
  </section>
);

const Paragraphs = ({ text }: { text: Array<string> }) => (
  <div className="space-y-3 text-neutral-300 leading-relaxed">
    {text.map((p) => (
      <p key={p}>{p}</p>
    ))}
  </div>
);

const PLL_CASE_SIZE = 132;
const caseSize = ({ mode, size }: { mode?: string; size?: number }) =>
  size || (mode === "pll" ? PLL_CASE_SIZE : 84);

const Figure = ({ n, diagram }: { n?: number; diagram: CubeDiagram }) => (
  <figure className="text-center">
    <IsoCube
      n={n}
      view={diagram.view}
      show={diagram.show}
      alg={diagram.alg}
      size={120}
      label={diagram.caption}
    />
    <figcaption className="text-xs text-neutral-400 mt-1 max-w-[140px]">{diagram.caption}</figcaption>
  </figure>
);

const TutorialPage = ({ tutorial }: { tutorial: Tutorial }) => {
  const { n } = tutorial;
  const isCube = tutorial.icon === "cube";

  const contents = [
    { id: "overview", title: "Overview" },
    { id: "notation", title: "Notation" },
    ...tutorial.stages.map((s) => ({ id: s.id, title: s.title })),
    ...(tutorial.algSets?.length ? [{ id: "algorithms", title: "Algorithms" }] : []),
    { id: "tips", title: "Tips" },
    { id: "resources", title: "Resources" },
  ];

  return (
    <div className="px-4 md:px-8 py-8 text-neutral-200">
      <Link href="/tutorials" className="text-sm text-neutral-400 hover:text-yellow-300">
        ← All puzzles
      </Link>

      <header className="mt-4 flex flex-col sm:flex-row gap-6 sm:items-center bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/60 rounded-2xl p-6">
        <div className="shrink-0 self-center">
          <PuzzleIcon kind={tutorial.icon} n={n} size={112} />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white">{tutorial.name}</h1>
          <p className="text-neutral-300 mt-2">{tutorial.tagline}</p>
          <div className="mt-3">
            <Difficulty level={tutorial.difficulty} />
          </div>
          <dl className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tutorial.facts.map((fact) => (
              <div key={fact.label} className="bg-neutral-900/70 rounded-lg px-3 py-2">
                <dt className="text-[11px] uppercase tracking-wide text-neutral-500">{fact.label}</dt>
                <dd className="text-sm font-bold text-neutral-100">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mt-8 lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
        <nav className="hidden lg:block" aria-label="Contents">
          <ul className="sticky top-6 space-y-1 text-sm border-l border-neutral-700">
            {contents.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="block pl-4 py-1 -ml-px border-l border-transparent text-neutral-400 hover:text-yellow-300 hover:border-yellow-300">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14 min-w-0">
          <Section id="overview" title="Overview">
            <Paragraphs text={tutorial.overview} />
          </Section>

          <Section id="notation" title="Notation">
            <Paragraphs text={tutorial.notation.intro} />
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {tutorial.notation.moves.map(({ move, description }) => (
                <div key={move} className="bg-neutral-800/60 border border-neutral-700/60 rounded-lg p-3 flex flex-col items-center text-center">
                  {isCube && <IsoCube n={n} move={move} size={88} label={`${move} move`} />}
                  <span className="font-mono text-xl font-bold text-yellow-300 mt-1">{move}</span>
                  <span className="text-xs text-neutral-400 mt-1">{description}</span>
                </div>
              ))}
            </div>
          </Section>

          {tutorial.stages.map((stage) => (
            <Section
              key={stage.id}
              id={stage.id}
              title={
                stage.link ? (
                  <a href={stage.link} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                    {stage.title} ↗
                  </a>
                ) : (
                  stage.title
                )
              }
            >
              <div className="flex items-center gap-3 -mt-2 mb-4">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ring-1 ${LEVEL_STYLES[stage.level]}`}>
                  {stage.level}
                </span>
              </div>
              <p className="text-neutral-300 leading-relaxed">{stage.summary}</p>

              {stage.steps.length > 0 && (
                <ol className="mt-6 relative border-l border-neutral-700 ml-2 space-y-8">
                  {stage.steps.map((step) => (
                    <li key={step.title} className="pl-6 relative">
                      <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-yellow-300 ring-4 ring-neutral-900" />
                      <h3 className="text-lg font-bold text-neutral-100">{step.title}</h3>
                      <div className="mt-2 flex flex-col md:flex-row gap-5">
                        <div className="flex-1 min-w-0">
                          <Paragraphs text={step.body} />
                          {step.tip && (
                            <p className="mt-3 text-sm bg-yellow-300/5 border border-yellow-300/20 text-yellow-100/90 rounded-lg px-3 py-2">
                              <span className="font-bold text-yellow-300">Tip: </span>
                              {step.tip}
                            </p>
                          )}
                        </div>
                        {(step.setup || step.goal) && (
                          <div className="shrink-0 self-center md:self-start flex gap-4">
                            {step.setup && <Figure n={n} diagram={step.setup} />}
                            {step.goal && <Figure n={n} diagram={step.goal} />}
                          </div>
                        )}
                      </div>
                      {step.cases && (
                        <div className="mt-4 flex flex-wrap gap-6">
                          {step.cases.map((c) => (
                            <figure key={c.caption} className="text-center">
                              <LastLayer
                                alg={c.alg}
                                mode={c.mode || "oll"}
                                n={n}
                                only={c.only}
                                postAuf={c.postAuf}
                                // Bigger when there are arrows to read. Drawn
                                // smaller, arrows get thicker to stay the same
                                size={caseSize(c)}
                                arrowWidth={(1.2 * PLL_CASE_SIZE) / caseSize(c)}
                                label={c.caption}
                              />
                              <figcaption className="text-xs text-neutral-400 mt-1 max-w-[140px]">
                                {c.caption}
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      )}
                      {step.algs && (
                        <div className="mt-4 grid sm:grid-cols-2 gap-3">
                          {step.algs.map((alg) => (
                            <AlgCard key={alg.name} item={alg} n={n} />
                          ))}
                        </div>
                      )}
                      {step.followUp && (
                        <>
                          <p className="mt-4 text-neutral-300 leading-relaxed">{step.followUp.text}</p>
                          {step.followUp.algs && (
                            <div className="mt-3 grid sm:grid-cols-2 gap-3">
                              {step.followUp.algs.map((alg) => (
                                <AlgCard key={alg.name} item={alg} n={n} />
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </Section>
          ))}

          {tutorial.algSets?.length ? (
            <Section id="algorithms" title="Algorithms">
              <div className="space-y-10">
                {tutorial.algSets.map((set) => (
                  <div key={set.id} id={`algs-${set.id}`}>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-lg font-bold text-neutral-100">{set.title}</h3>
                      <span className="text-sm text-neutral-500">{set.algs.length}</span>
                    </div>
                    <p className="text-sm text-neutral-400 mt-1">{set.description}</p>
                    <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {set.algs.map((alg) => (
                        <AlgCard key={alg.name} item={alg} diagram={set.diagram} n={n} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          <Section id="tips" title="Tips">
            <ul className="grid sm:grid-cols-2 gap-3">
              {tutorial.tips.map((tip) => (
                <li key={tip} className="flex gap-3 bg-neutral-800/60 border border-neutral-700/60 rounded-lg p-3 text-sm text-neutral-300">
                  <span className="text-yellow-300">★</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="resources" title="Resources">
            <ul className="grid sm:grid-cols-2 gap-3">
              {tutorial.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full bg-neutral-800/60 border border-neutral-700/60 rounded-lg p-3 hover:border-yellow-300/60 transition-colors"
                  >
                    <span className="font-bold text-neutral-100">{r.name} ↗</span>
                    <span className="block text-sm text-neutral-400 mt-1">{r.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <div className="bg-yellow-300/10 border border-yellow-300/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-200">
              Ready to time yourself? The timer has {tutorial.name} scrambles built in.
            </p>
            <Link href="/" className="shrink-0 bg-yellow-300 text-neutral-900 font-bold rounded-lg px-4 py-2 hover:bg-yellow-200">
              Open the timer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
