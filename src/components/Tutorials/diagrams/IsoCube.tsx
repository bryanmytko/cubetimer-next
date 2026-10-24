import { useId, useMemo } from "react";

import {
  Sticker,
  Vec,
  applyAlg,
  parseMove,
  solved,
} from "../../../lib/cube/nxn";
import { MUTED, OUTLINE, STICKER_COLORS } from "./colors";

interface IsoCubeProps {
  n?: number;
  // Applied to a solved cube before drawing
  alg?: string;
  // Turned the cube for viewing after the algorithm, e.g. "x2" to show the
  // bottom on top
  view?: string;
  // Stickers that fail this are drawn gray, to show what a step solves
  show?: (sticker: Sticker) => boolean;
  // A single move to illustrate: its layers are highlighted and an arrow
  // shows the direction
  move?: string;
  size?: number;
  label?: string;
}

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

// Isometric projection looking at the up, front and right faces
const project = ([x, y, z]: Vec): [number, number] => [
  (x - z) * COS30,
  (x + z) * SIN30 - y,
];

const cross = (a: Vec, b: Vec): Vec => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

// The four corners of a sticker, shrunk a little so stickers have gaps
const corners = ({ pos, normal }: Sticker, n: number): Array<Vec> => {
  const axis = normal.findIndex((v) => v !== 0);
  const [a, b] = [0, 1, 2].filter((i) => i !== axis);
  const center = [...pos] as Vec;
  center[axis] = normal[axis] * n;
  const s = 0.88;

  return [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].map(([da, db]) => {
    const p = [...center] as Vec;
    p[a] += da * s;
    p[b] += db * s;
    return p;
  });
};

const VISIBLE = (s: Sticker) =>
  s.normal[0] === 1 || s.normal[1] === 1 || s.normal[2] === 1;

const IsoCube = ({
  n = 3,
  alg = "",
  view = "",
  show,
  move,
  size = 120,
  label,
}: IsoCubeProps) => {
  const markerId = `iso${useId().replace(/:/g, "")}`;

  const { stickers, turn } = useMemo(() => {
    const cube = applyAlg(applyAlg(solved(n), `${alg} ${move || ""}`), view);
    return {
      stickers: cube.stickers.filter(VISIBLE),
      turn: move ? parseMove(n, move) : undefined,
    };
  }, [n, alg, view, move]);

  const isTurned = (s: Sticker) => !turn || turn.layers(s.pos[turn.axis]);

  // An arrow along the turning layer on the first visible face it crosses
  const arrow = useMemo(() => {
    if (!turn) return null;

    const axisVec: Vec = [0, 0, 0];
    axisVec[turn.axis] = 1;
    const face = [2, 1, 0].find((f) => f !== turn.axis) as number;

    const layerCoords = Array.from({ length: n }, (_, i) => -(n - 1) + 2 * i).filter(
      (c) => turn.layers(c),
    );
    const mid = layerCoords.reduce((a, b) => a + b, 0) / layerCoords.length;

    const center: Vec = [0, 0, 0];
    center[face] = n + 0.05;
    center[turn.axis] = layerCoords.length === n ? 0 : mid;

    // Rotating about the axis moves points along axis x position
    const direction = cross(axisVec, center).map(
      (v) => v * Math.sign(turn.quarters),
    ) as Vec;
    direction[face] = 0;
    const length = Math.hypot(...direction) || 1;
    const reach = n * 0.7;
    const start = center.map((v, i) => v - (direction[i] / length) * reach) as Vec;
    const end = center.map((v, i) => v + (direction[i] / length) * reach) as Vec;

    return { start: project(start), end: project(end) };
  }, [turn, n]);

  const extent = n * 2.2;

  return (
    <svg
      viewBox={`${-extent} ${-extent} ${extent * 2} ${extent * 2}`}
      width={size}
      height={size}
      role="img"
      aria-label={label}
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="2.6"
          markerHeight="2.6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#fafafa" stroke={OUTLINE} strokeWidth={1} />
        </marker>
      </defs>
      <polygon
        points={[
          [n, n, -n],
          [n, -n, -n],
          [n, -n, n],
          [-n, -n, n],
          [-n, n, n],
          [-n, n, -n],
        ]
          .map((p) => project(p as Vec).join(","))
          .join(" ")}
        fill={OUTLINE}
        stroke={OUTLINE}
        strokeWidth={0.3}
        strokeLinejoin="round"
      />
      {stickers.map((s, i) => {
        const visible = !show || show(s);
        return (
          <polygon
            key={i}
            points={corners(s, n)
              .map((p) => project(p).join(","))
              .join(" ")}
            fill={visible ? STICKER_COLORS[s.color] : MUTED}
            opacity={isTurned(s) ? 1 : 0.5}
            strokeLinejoin="round"
          />
        );
      })}
      {arrow && (
        <>
          {/* Dark outline under the arrow so it reads on any color */}
          <line
            x1={arrow.start[0]}
            y1={arrow.start[1]}
            x2={arrow.end[0]}
            y2={arrow.end[1]}
            stroke={OUTLINE}
            strokeWidth={n * 0.34}
            strokeLinecap="round"
          />
          <line
            x1={arrow.start[0]}
            y1={arrow.start[1]}
            x2={arrow.end[0]}
            y2={arrow.end[1]}
            stroke="#fafafa"
            strokeWidth={n * 0.2}
            strokeLinecap="round"
            markerEnd={`url(#${markerId})`}
          />
        </>
      )}
    </svg>
  );
};

export default IsoCube;
