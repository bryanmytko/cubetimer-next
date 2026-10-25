import IsoCube from "./IsoCube";
import { OUTLINE, STICKER_COLORS } from "./colors";
import { IconKind } from "../types";

interface PuzzleIconProps {
  kind: IconKind;
  n?: number;
  size?: number;
}

type Point = [number, number];
const pts = (points: Array<Point>) => points.map((p) => p.join(",")).join(" ");
const lerp = (a: Point, b: Point, t: number): Point => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

const Pyraminx = () => {
  // One face, split into nine triangles
  const top: Point = [50, 8];
  const left: Point = [6, 84];
  const right: Point = [94, 84];
  const at = (i: number, j: number): Point =>
    lerp(lerp(top, left, i / 3), lerp(top, right, i / 3), i === 0 ? 0 : j / i);
  const triangles: Array<Array<Point>> = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j <= i; j++) {
      triangles.push([at(i, j), at(i + 1, j), at(i + 1, j + 1)]);
      if (j < i) triangles.push([at(i, j), at(i + 1, j + 1), at(i, j + 1)]);
    }
  }

  return (
    <>
      <polygon points={pts([top, left, right])} fill={OUTLINE} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      {triangles.map((t, i) => (
        <polygon key={i} points={pts(t)} fill={STICKER_COLORS.F} stroke={OUTLINE} strokeWidth={2.5} strokeLinejoin="round" />
      ))}
    </>
  );
};

const Segment = ({ from, to }: { from: Point; to: Point }) => (
  <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} />
);

const Megaminx = () => {
  const vertex = (i: number, r: number): Point => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [50 + r * Math.cos(angle), 52 + r * Math.sin(angle)];
  };
  const outer = [0, 1, 2, 3, 4].map((i) => vertex(i, 44));
  const inner = [0, 1, 2, 3, 4].map((i) => vertex(i, 17));
  const edgePoint = (i: number, t: number) => lerp(outer[i], outer[(i + 1) % 5], t);

  return (
    <>
      <polygon points={pts(outer)} fill={STICKER_COLORS.D} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <polygon points={pts(inner)} fill={STICKER_COLORS.D} stroke={OUTLINE} strokeWidth={2.5} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} stroke={OUTLINE} strokeWidth={2.5}>
          <Segment from={inner[i]} to={edgePoint(i, 0.36)} />
          <Segment from={inner[(i + 1) % 5]} to={edgePoint(i, 0.64)} />
        </g>
      ))}
    </>
  );
};

const Skewb = () => {
  const cos = Math.cos(Math.PI / 6) * 40;
  const c: Point = [50, 50];
  const up: Point = [50, 10];
  const left: Point = [50 - cos, 30];
  const right: Point = [50 + cos, 30];
  const downLeft: Point = [50 - cos, 70];
  const downRight: Point = [50 + cos, 70];
  const down: Point = [50, 90];
  const faces: Array<[Array<Point>, string]> = [
    [[up, right, c, left], STICKER_COLORS.U],
    [[left, c, down, downLeft], STICKER_COLORS.F],
    [[c, right, downRight, down], STICKER_COLORS.R],
  ];

  return (
    <>
      {faces.map(([quad, color], i) => {
        const mids = quad.map((p, k) => lerp(p, quad[(k + 1) % 4], 0.5));
        return (
          <g key={i} stroke={OUTLINE} strokeWidth={2.5} strokeLinejoin="round">
            <polygon points={pts(quad)} fill={color} />
            <polygon points={pts(mids)} fill={color} />
          </g>
        );
      })}
      <polygon points={pts([up, right, downRight, down, downLeft, left])} fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    </>
  );
};

const SquareOne = () => {
  // Top view of one layer in cube shape: thin edges centered on each side,
  // wide corners between them
  const boundary = (deg: number): Point => {
    const a = (deg * Math.PI) / 180;
    const [dx, dy] = [Math.cos(a), Math.sin(a)];
    const t = 40 / Math.max(Math.abs(dx), Math.abs(dy));
    return [50 + dx * t, 50 + dy * t];
  };
  const pieces = [0, 90, 180, 270].flatMap((side) => [
    { from: side - 15, to: side + 15, corner: false },
    { from: side + 15, to: side + 75, corner: true },
  ]);

  return (
    <>
      <rect x={8} y={8} width={84} height={84} rx={4} fill={OUTLINE} />
      {pieces.map(({ from, to, corner }, i) => {
        const points: Array<Point> = [[50, 50], boundary(from)];
        if (corner) points.push(boundary(from + 30));
        points.push(boundary(to));
        return (
          <polygon key={i} points={pts(points)} fill={corner ? STICKER_COLORS.U : "#e6c200"} stroke={OUTLINE} strokeWidth={2.5} strokeLinejoin="round" />
        );
      })}
      <line x1={50} y1={10} x2={50} y2={90} stroke={OUTLINE} strokeWidth={1.5} strokeDasharray="3 3" transform="rotate(-15 50 50)" />
    </>
  );
};

const Clock = () => (
  <>
    <circle cx={50} cy={50} r={46} fill="#1e3a8a" stroke={OUTLINE} strokeWidth={3} />
    {[0, 1, 2].flatMap((row) =>
      [0, 1, 2].map((col) => {
        const [x, y] = [26 + col * 24, 26 + row * 24];
        return (
          <g key={`${row}${col}`}>
            <circle cx={x} cy={y} r={9} fill="#f4f4f5" stroke={OUTLINE} strokeWidth={1.5} />
            <line x1={x} y1={y} x2={x} y2={y - 6} stroke={OUTLINE} strokeWidth={2} strokeLinecap="round" />
          </g>
        );
      }),
    )}
    {[
      [38, 38],
      [62, 38],
      [38, 62],
      [62, 62],
    ].map(([x, y]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r={2.6} fill="#facc15" stroke={OUTLINE} strokeWidth={1} />
    ))}
  </>
);

const PuzzleIcon = ({ kind, n = 3, size = 64 }: PuzzleIconProps) => {
  if (kind === "cube") return <IsoCube n={n} size={size} label={`${n}x${n} cube`} />;

  const shapes = {
    pyraminx: <Pyraminx />,
    megaminx: <Megaminx />,
    skewb: <Skewb />,
    "square-1": <SquareOne />,
    clock: <Clock />,
  };

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={kind}>
      {shapes[kind]}
    </svg>
  );
};

export default PuzzleIcon;
