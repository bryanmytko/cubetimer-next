import { useId, useMemo } from "react";

import { Face, Vec, faceGrid } from "../../../lib/cube/nxn";
import {
  bestPostAuf,
  caseFor,
  pieceMovements,
} from "../../../lib/cube/lastLayer";
import { MUTED, OUTLINE, STICKER_COLORS } from "./colors";

interface LastLayerProps {
  alg: string;
  // "oll" shows only which stickers are yellow, "pll" shows every color and
  // arrows for where pieces move
  mode: "oll" | "pll";
  n?: number;
  size?: number;
  label?: string;
}

const CELL = 10;
const STRIP = 3;
const GAP = 1;

// Top-down view of the last layer: the top face, plus the top row of each
// side face drawn as a thin strip around it
const LastLayer = ({ alg, mode, n = 3, size = 120, label }: LastLayerProps) => {
  const { top, sides, arrows } = useMemo(() => {
    const auf = mode === "pll" ? bestPostAuf(n, alg) : "";
    const full = `${alg} ${auf}`;
    const cube = caseFor(n, full);

    return {
      top: faceGrid(cube, "U"),
      sides: {
        F: faceGrid(cube, "F")[0],
        // Read each strip in the direction it's drawn around the top face
        R: [...faceGrid(cube, "R")[0]].reverse(),
        B: [...faceGrid(cube, "B")[0]].reverse(),
        L: faceGrid(cube, "L")[0],
      },
      arrows: mode === "pll" ? pieceMovements(n, full) : [],
    };
  }, [alg, mode, n]);

  // Marker ids must be unique on a page full of diagrams
  const markerId = `arrow${useId().replace(/:/g, "")}`;
  const fill = (color: Face) =>
    mode === "oll" && color !== "U" ? MUTED : STICKER_COLORS[color];

  const origin = STRIP + GAP * 2;
  const faceSize = n * CELL;
  const total = faceSize + origin * 2;
  const cellX = (col: number) => origin + col * CELL;

  // Center of a top face cell for a cubie position
  const center = ([x, , z]: Vec) => [
    origin + ((x + n - 1) / 2 + 0.5) * CELL,
    origin + ((z + n - 1) / 2 + 0.5) * CELL,
  ];

  // Moving pieces that swap with each other get a double headed arrow
  const pairKey = (a: Vec, b: Vec) => [a.join(), b.join()].sort().join("|");
  const keys = arrows.map((m) => pairKey(m.from, m.to));
  const drawn = new Set<string>();

  return (
    <svg
      viewBox={`0 0 ${total} ${total}`}
      width={size}
      height={size}
      role="img"
      aria-label={label}
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#18181b" />
        </marker>
      </defs>
      <rect
        x={origin - GAP}
        y={origin - GAP}
        width={faceSize + GAP * 2}
        height={faceSize + GAP * 2}
        rx={1.5}
        fill={OUTLINE}
      />
      {top.map((row, r) =>
        row.map((color, c) => (
          <rect
            key={`t${r}-${c}`}
            x={cellX(c) + GAP / 2}
            y={origin + r * CELL + GAP / 2}
            width={CELL - GAP}
            height={CELL - GAP}
            rx={1}
            fill={fill(color)}
          />
        )),
      )}
      {sides.B.map((color, i) => (
        <rect key={`b${i}`} x={cellX(i) + GAP / 2} y={GAP} width={CELL - GAP} height={STRIP} rx={0.8} fill={fill(color)} />
      ))}
      {sides.F.map((color, i) => (
        <rect key={`f${i}`} x={cellX(i) + GAP / 2} y={total - STRIP - GAP} width={CELL - GAP} height={STRIP} rx={0.8} fill={fill(color)} />
      ))}
      {sides.L.map((color, i) => (
        <rect key={`l${i}`} x={GAP} y={cellX(i) + GAP / 2} width={STRIP} height={CELL - GAP} rx={0.8} fill={fill(color)} />
      ))}
      {sides.R.map((color, i) => (
        <rect key={`r${i}`} x={total - STRIP - GAP} y={cellX(i) + GAP / 2} width={STRIP} height={CELL - GAP} rx={0.8} fill={fill(color)} />
      ))}
      {arrows.map(({ from, to }, i) => {
        const k = pairKey(from, to);
        const isSwap = keys.filter((x) => x === k).length === 2;
        if (isSwap && drawn.has(k)) return null;
        drawn.add(k);

        const [x1, y1] = center(from);
        const [x2, y2] = center(to);
        // Stop short of the cell centers so the heads stay visible
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const trim = Math.min(CELL * 0.3, len / 4);
        const [ux, uy] = [dx / len, dy / len];

        return (
          <line
            key={`a${i}`}
            x1={x1 + ux * trim}
            y1={y1 + uy * trim}
            x2={x2 - ux * trim}
            y2={y2 - uy * trim}
            stroke="#18181b"
            strokeWidth={1.2}
            strokeLinecap="round"
            markerEnd={`url(#${markerId})`}
            markerStart={isSwap ? `url(#${markerId})` : undefined}
          />
        );
      })}
    </svg>
  );
};

export default LastLayer;
