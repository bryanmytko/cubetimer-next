import { useState } from "react";
import { FaCheck, FaChevronDown, FaRegCopy, FaTrashCan } from "react-icons/fa6";

import { humanReadableTime, formatDayLabel, formatTimeOfDay } from "../../lib/format";
import { average, averageCurved, fastestTime, slowestTime } from "../../lib/calculate";
import { PenaltyChip, PuzzleChip } from "./Chips";
import IconButton from "./IconButton";
import { SolveNode } from "./SolveRow";
import useCopy from "./useCopy";

export interface SessionNode {
  id: string;
  createdAt: string;
  solves: Array<SolveNode>;
}

interface SessionCardProps {
  session: SessionNode;
  onDelete: (id: string) => void;
}

const DOT_GAP = 12;
const CHART_WIDTH = 144;
const CHART_HEIGHT = 36;

// One dot per solve in the order they were done, fastest at the top
interface SolveDotsProps {
  times: Array<number>;
  best: number;
  worst: number;
}

const SolveDots = ({ times, best, worst }: SolveDotsProps) => {
  // Squeeze the dots together for long sessions so the chart keeps its size
  const gap = Math.min(DOT_GAP, CHART_WIDTH / times.length);
  const width = Math.max(times.length * gap, 72);
  const range = worst - best || 1;
  const y = (time: number) => 5 + ((time - best) / range) * (CHART_HEIGHT - 10);
  const bestIndex = times.indexOf(best);
  const worstIndex = times.indexOf(worst);

  return (
    <svg
      width={width}
      height={CHART_HEIGHT}
      role="img"
      aria-label="Each solve in this session, fastest highest"
      className="overflow-visible"
    >
      {times.map((time, index) => (
        <circle
          key={index}
          cx={gap / 2 + index * gap}
          cy={y(time)}
          r={Math.min(4, gap / 2)}
          className={
            index === bestIndex
              ? "fill-yellow-300"
              : index === worstIndex
                ? "fill-transparent stroke-neutral-500 stroke-2"
                : "fill-neutral-400"
          }
        >
          <title>{`Solve ${index + 1}: ${humanReadableTime(time)}`}</title>
        </circle>
      ))}
    </svg>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="w-[4.5rem]">
    <p className="text-xs text-neutral-500">{label}</p>
    <p className="font-mono tabular-nums text-sm font-bold text-neutral-200">{value}</p>
  </div>
);

interface SessionSolveRowProps {
  number: number;
  solve: SolveNode;
  time: number;
  best: boolean;
  worst: boolean;
}

// Clicking a solve copies its scramble
const SessionSolveRow = ({ number, solve, time, best, worst }: SessionSolveRowProps) => {
  const { copied, copy } = useCopy(solve.scramble);

  return (
    <li className="last:rounded-b-2xl hover:bg-neutral-700/30 transition-colors">
      <button
        type="button"
        onClick={() => {
          // Don't copy when someone is selecting part of the scramble themselves
          if (window.getSelection()?.toString()) return;
          copy();
        }}
        title="Copy scramble"
        className="group/row cursor-pointer w-full grid grid-cols-[1.5rem_auto_1fr_auto] md:grid-cols-[1.5rem_9rem_1fr_auto] items-baseline gap-x-4 gap-y-1 px-5 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-300"
      >
        <span className="text-xs text-neutral-500 tabular-nums">{number}</span>
        <span className="flex items-center gap-2">
          <span
            className={`font-mono tabular-nums font-bold ${best ? "text-yellow-300" : "text-neutral-100"}`}
          >
            {humanReadableTime(time)}
          </span>
          <PenaltyChip penalty={solve.penalty} />
          {best && <span className="text-xs text-yellow-300/80">best</span>}
          {worst && <span className="text-xs text-neutral-500">worst</span>}
        </span>
        <span className="row-start-2 col-start-2 col-span-3 md:row-start-auto md:col-start-auto md:col-span-1 font-mono text-xs text-neutral-400 group-hover/row:text-neutral-200 transition-colors break-words select-text">
          {solve.scramble}
        </span>
        <span
          aria-live="polite"
          className={`col-start-4 row-start-1 md:row-start-auto self-center flex items-center gap-1.5 text-xs transition-opacity ${copied ? "text-yellow-300" : "text-neutral-500 md:opacity-0 md:group-hover/row:opacity-100 md:group-focus-visible/row:opacity-100"}`}
        >
          {copied ? (
            <>
              <FaCheck size={12} /> Copied
            </>
          ) : (
            <FaRegCopy size={12} />
          )}
        </span>
      </button>
    </li>
  );
};

const SessionCard = ({ session, onDelete }: SessionCardProps) => {
  const [open, setOpen] = useState(false);
  const solves = [...session.solves].sort((a, b) => Number(a.id) - Number(b.id));
  const times = solves.map((solve) => solve.time + (solve.penalty ?? 0));
  const best = fastestTime(times);
  const worst = slowestTime(times);
  const bestIndex = times.indexOf(best);
  const worstIndex = times.indexOf(worst);
  const panelId = `session-${session.id}`;

  return (
    <li className="group rounded-2xl border border-neutral-700/60 bg-neutral-800/60 hover:border-neutral-600 transition-colors">
      <div className="flex items-center">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="group/toggle cursor-pointer flex-1 min-w-0 flex flex-wrap md:grid md:grid-cols-[9rem_8.5rem_14rem] lg:grid-cols-[9rem_8.5rem_14rem_1fr] items-center gap-x-6 gap-y-4 p-5 text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
        >
          <div>
            <p className="font-bold text-neutral-100">
              {formatDayLabel(session.createdAt)}
              <span className="ml-2 text-sm font-normal text-neutral-500">
                {formatTimeOfDay(session.createdAt)}
              </span>
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-neutral-400">
              {solves[0] && <PuzzleChip puzzle={solves[0].puzzle} />}
              {solves.length} {solves.length === 1 ? "solve" : "solves"}
            </p>
          </div>

          <div>
            <p className="text-xs text-neutral-500">Session average</p>
            <p className="font-mono tabular-nums text-3xl font-bold text-white">
              {humanReadableTime(averageCurved([...times], times.length))}
            </p>
          </div>

          <div className="flex gap-4">
            <Stat label="Best" value={humanReadableTime(best)} />
            <Stat label="Worst" value={humanReadableTime(worst)} />
            <Stat label="Mean" value={humanReadableTime(average(times))} />
          </div>

          <div className="basis-full md:col-span-3 lg:col-span-1 lg:justify-self-end flex items-center justify-between gap-5">
            <SolveDots times={times} best={best} worst={worst} />
            <span
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors group-hover/toggle:border-yellow-300 group-hover/toggle:text-yellow-300 ${open ? "border-yellow-300/60 text-yellow-300" : "border-neutral-600 text-neutral-300"}`}
            >
              {/* Both labels share one cell so the pill keeps the wider one's
                  width and the dots don't shift when it toggles */}
              <span className="grid">
                <span className={`col-start-1 row-start-1 ${open ? "invisible" : ""}`}>
                  Show solves
                </span>
                <span className={`col-start-1 row-start-1 ${open ? "" : "invisible"}`}>
                  Hide solves
                </span>
              </span>
              <FaChevronDown
                size={10}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </span>
          </div>
        </button>
        <div className="pr-3">
          <IconButton label="Delete session" danger onClick={() => onDelete(session.id)}>
            <FaTrashCan size={14} />
          </IconButton>
        </div>
      </div>

      {open && (
        <ol id={panelId} className="border-t border-neutral-700/60 divide-y divide-neutral-700/40">
          {solves.map((solve, index) => (
            <SessionSolveRow
              key={solve.id}
              number={index + 1}
              solve={solve}
              time={times[index]}
              best={index === bestIndex}
              worst={index === worstIndex && index !== bestIndex}
            />
          ))}
        </ol>
      )}
    </li>
  );
};

export default SessionCard;
