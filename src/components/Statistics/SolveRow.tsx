import { useState } from "react";
import { FaCheck, FaRegCopy, FaTrashCan } from "react-icons/fa6";

import { humanReadableTime, formatTimeOfDay } from "../../lib/format";
import { PenaltyChip, PuzzleChip } from "./Chips";
import IconButton from "./IconButton";
import useCopy from "./useCopy";

export interface SolveNode {
  id: string;
  puzzle: string;
  scramble: string;
  time: number;
  penalty?: number | null;
  createdAt: string;
}

interface SolveRowProps {
  solve: SolveNode;
  onDelete: (id: string) => void;
}

const SolveRow = ({ solve, onDelete }: SolveRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const { copied, copy: copyScramble } = useCopy(solve.scramble);

  return (
    // The whole row opens the scramble; the scramble button handles keyboards
    <li
      onClick={() => {
        // Don't toggle when someone is selecting the scramble to copy it
        if (window.getSelection()?.toString()) return;
        setExpanded(!expanded);
      }}
      className="group cursor-pointer flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-1 px-4 md:px-5 py-3 first:rounded-t-2xl last:rounded-b-2xl hover:bg-neutral-700/30 transition-colors"
    >
      <div className="flex items-center gap-2 md:w-32 shrink-0">
        <span className="font-mono tabular-nums text-xl font-bold text-white">
          {humanReadableTime(solve.time + (solve.penalty ?? 0))}
        </span>
        <PenaltyChip penalty={solve.penalty} />
      </div>

      <button
        type="button"
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse scramble" : "Show full scramble"}
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        className={`order-last md:order-none basis-full md:basis-auto md:flex-1 min-w-0 text-left font-mono text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors ${expanded ? "break-words" : "truncate"}`}
      >
        {solve.scramble}
      </button>

      <div className="ml-auto flex items-center gap-1 shrink-0">
        <PuzzleChip puzzle={solve.puzzle} />
        <span className="w-20 text-right text-sm text-neutral-500 tabular-nums">
          {formatTimeOfDay(solve.createdAt)}
        </span>
        <IconButton label={copied ? "Copied" : "Copy scramble"} onClick={copyScramble}>
          {copied ? <FaCheck size={14} className="text-yellow-300" /> : <FaRegCopy size={14} />}
        </IconButton>
        <IconButton label="Delete solve" danger onClick={() => onDelete(solve.id)}>
          <FaTrashCan size={14} />
        </IconButton>
      </div>
    </li>
  );
};

export default SolveRow;
