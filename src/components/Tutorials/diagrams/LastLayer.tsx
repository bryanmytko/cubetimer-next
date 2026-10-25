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
  // Gray out the other kind of piece, and leave out its arrows, for steps
  // that only look at edges or corners. "front-left" shows just that corner
  only?: "edges" | "corners" | "front-left";
  // Turn of the top after the algorithm, for PLL arrows. Defaults to the one
  // that moves the fewest pieces
  postAuf?: string;
  // Arrow thickness in diagram units, to keep arrows readable when the
  // diagram is drawn small
  arrowWidth?: number;
  size?: number;
  label?: string;
}

const CELL = 10;
const HALO = "#f4f4f5";
const STRIP = 3;
const GAP = 1;

// Edges sit in the middle of a side, so one of x and z is 0
const isEdgePos = ([x, , z]: Vec) => x === 0 || z === 0;

// Top-down view of the last layer: the top face, plus the top row of each
// side face drawn as a thin strip around it
const LastLayer = ({
  alg,
  mode,
  n = 3,
  only,
  postAuf,
  arrowWidth = 1.2,
  size = 120,
  label,
}: LastLayerProps) => {
  const { top, sides, arrows } = useMemo(() => {
    const auf = mode === "pll" ? postAuf ?? bestPostAuf(n, alg) : "";
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
      arrows: mode === "pll"
        ? pieceMovements(n, full).filter(
          ({ from }) => !only || (only === "edges") === isEdgePos(from),
        )
        : [],
    };
  }, [alg, mode, n, only, postAuf]);

  // Marker ids must be unique on a page full of diagrams
  const markerId = `arrow${useId().replace(/:/g, "")}`;
  const isEnd = (i: number) => i === 0 || i === n - 1;
  // `corner` says whether the sticker belongs to a corner piece; top centers
  // are neither, and always stay
  const fill = (color: Face, corner: boolean, center = false, frontLeft = false) => {
    const hidden =
      (only === "front-left" && !frontLeft) ||
      (!center && ((only === "edges" && corner) || (only === "corners" && !corner)));
    return (mode === "oll" && color !== "U") || hidden ? MUTED : STICKER_COLORS[color];
  };

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
          markerWidth="3.2"
          markerHeight="3.2"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#18181b" stroke={HALO} strokeWidth={1.5} strokeLinejoin="round" />
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
            fill={fill(color, isEnd(r) && isEnd(c), !isEnd(r) && !isEnd(c), r === n - 1 && c === 0)}
          />
        )),
      )}
      {sides.B.map((color, i) => (
        <rect key={`b${i}`} x={cellX(i) + GAP / 2} y={GAP} width={CELL - GAP} height={STRIP} rx={0.8} fill={fill(color, isEnd(i))} />
      ))}
      {sides.F.map((color, i) => (
        <rect key={`f${i}`} x={cellX(i) + GAP / 2} y={total - STRIP - GAP} width={CELL - GAP} height={STRIP} rx={0.8} fill={fill(color, isEnd(i), false, i === 0)} />
      ))}
      {sides.L.map((color, i) => (
        <rect key={`l${i}`} x={GAP} y={cellX(i) + GAP / 2} width={STRIP} height={CELL - GAP} rx={0.8} fill={fill(color, isEnd(i), false, i === n - 1)} />
      ))}
      {sides.R.map((color, i) => (
        <rect key={`r${i}`} x={total - STRIP - GAP} y={cellX(i) + GAP / 2} width={STRIP} height={CELL - GAP} rx={0.8} fill={fill(color, isEnd(i))} />
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
        const trim = Math.min(CELL * 0.3, len / 8);
        const [ux, uy] = [dx / len, dy / len];

        const ends = {
          x1: x1 + ux * trim,
          y1: y1 + uy * trim,
          x2: x2 - ux * trim,
          y2: y2 - uy * trim,
        };

        // A light outline underneath keeps the arrow visible on dark stickers
        return (
          <g key={`a${i}`}>
            <line {...ends} stroke={HALO} strokeWidth={arrowWidth * 2.2} strokeLinecap="round" />
            <line
              {...ends}
              stroke="#18181b"
              strokeWidth={arrowWidth}
              strokeLinecap="round"
              markerEnd={`url(#${markerId})`}
              markerStart={isSwap ? `url(#${markerId})` : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default LastLayer;
