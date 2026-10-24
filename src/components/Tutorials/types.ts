import { Sticker } from "../../lib/cube/nxn";

export type DiagramKind = "oll" | "pll" | "cube";

export interface AlgItem {
  name: string;
  alg: string;
  note?: string;
  // Draw the case from a different algorithm than the one shown, e.g. a
  // cleaner one that solves the same case
  diagramAlg?: string;
}

export interface CubeDiagram {
  // Applied to a solved cube; for goal pictures leave empty and use `show`
  alg?: string;
  view?: string;
  show?: (sticker: Sticker) => boolean;
  caption: string;
}

export interface Step {
  title: string;
  body: Array<string>;
  goal?: CubeDiagram;
  algs?: Array<AlgItem>;
  tip?: string;
}

export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Stage {
  id: string;
  title: string;
  level: Level;
  summary: string;
  steps: Array<Step>;
}

export interface AlgSet {
  id: string;
  title: string;
  description: string;
  diagram?: DiagramKind;
  algs: Array<AlgItem>;
}

export interface NotationMove {
  move: string;
  description: string;
}

export interface Resource {
  name: string;
  url: string;
  description: string;
}

export type IconKind =
  | "cube"
  | "pyraminx"
  | "megaminx"
  | "skewb"
  | "square-1"
  | "clock";

export interface Tutorial {
  slug: string;
  name: string;
  tagline: string;
  // 1 (easiest) to 5
  difficulty: number;
  icon: IconKind;
  // Cube size, for NxN diagrams
  n?: number;
  facts: Array<{ label: string; value: string }>;
  overview: Array<string>;
  notation: {
    intro: Array<string>;
    moves: Array<NotationMove>;
  };
  stages: Array<Stage>;
  algSets?: Array<AlgSet>;
  tips: Array<string>;
  resources: Array<Resource>;
}
