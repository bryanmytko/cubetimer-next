import { useState } from "react";

import LastLayer from "./diagrams/LastLayer";
import { AlgItem, DiagramKind } from "./types";

interface AlgCardProps {
  item: AlgItem;
  diagram?: DiagramKind;
  n?: number;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked; the algorithm is still selectable
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="text-xs text-neutral-400 hover:text-yellow-300 transition-colors"
      aria-label={`Copy ${text}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const AlgCard = ({ item, diagram, n = 3 }: AlgCardProps) => {
  const caseAlg = item.diagramAlg || item.alg;

  return (
    <div className="flex gap-4 items-center bg-neutral-800/60 border border-neutral-700/60 rounded-lg p-3 hover:border-neutral-600 transition-colors">
      {(diagram === "oll" || diagram === "pll") && (
        <div className="shrink-0">
          <LastLayer alg={caseAlg} mode={diagram} n={n} size={84} label={`${item.name} case`} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-bold text-neutral-100">{item.name}</h4>
          <CopyButton text={item.alg} />
        </div>
        <p className="font-mono text-yellow-300 text-sm break-words mt-1">{item.alg}</p>
        {item.note && <p className="text-xs text-neutral-400 mt-1.5">{item.note}</p>}
      </div>
    </div>
  );
};

export default AlgCard;
