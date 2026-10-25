export interface Alg {
  name: string;
  alg: string;
  note?: string;
}

// Orient the last layer edges (first step of 2-look OLL)
export const OLL_EDGES: Array<Alg> = [
  { name: "Line", alg: "F R U R' U' F'", note: "Hold the line horizontally" },
  {
    name: "L shape",
    alg: "F U R U' R' F'",
    note: "Hold the L in the back left",
  },
  {
    name: "Dot",
    alg: "F R U R' U' F' f R U R' U' f'",
    note: "The line algorithm, then its wide (f) version",
  },
];

// Orient the last layer corners (second step of 2-look OLL)
export const OLL_CORNERS: Array<Alg> = [
  { name: "Sune", alg: "R U R' U R U2 R'" },
  { name: "Antisune", alg: "R U2 R' U' R U' R'" },
  { name: "H", alg: "R U R' U R U' R' U R U2 R'" },
  { name: "Pi", alg: "R U2 R2 U' R2 U' R2 U2 R" },
  { name: "Headlights", alg: "R2 D' R U2 R' D R U2 R" },
  { name: "Chameleon", alg: "r U R' U' r' F R F'" },
  { name: "Bowtie", alg: "F' r U R' U' r' F R" },
];

export const OLL: Array<Alg> = [
  { name: "OLL 1", alg: "R U2 R2 F R F' U2 R' F R F'" },
  { name: "OLL 2", alg: "F R U R' U' F' f R U R' U' f'" },
  { name: "OLL 3", alg: "f R U R' U' f' U' F R U R' U' F'" },
  { name: "OLL 4", alg: "f R U R' U' f' U F R U R' U' F'" },
  { name: "OLL 5", alg: "r' U2 R U R' U r" },
  { name: "OLL 6", alg: "r U2 R' U' R U' r'" },
  { name: "OLL 7", alg: "r U R' U R U2 r'" },
  { name: "OLL 8", alg: "l' U' L U' L' U2 l" },
  { name: "OLL 9", alg: "R U R' U' R' F R2 U R' U' F'" },
  { name: "OLL 10", alg: "R U R' U R' F R F' R U2 R'" },
  { name: "OLL 11", alg: "r U R' U R' F R F' R U2 r'" },
  { name: "OLL 12", alg: "M' R' U' R U' R' U2 R U' R r'" },
  { name: "OLL 13", alg: "F U R U' R2 F' R U R U' R'" },
  { name: "OLL 14", alg: "R' F R U R' F' R F U' F'" },
  { name: "OLL 15", alg: "r' U' r R' U' R U r' U r" },
  { name: "OLL 16", alg: "r U r' R U R' U' r U' r'" },
  { name: "OLL 17", alg: "F R' F' R2 r' U R U' R' U' M'" },
  { name: "OLL 18", alg: "r U R' U R U2 r2 U' R U' R' U2 r" },
  { name: "OLL 19", alg: "r' R U R U R' U' M' R' F R F'" },
  { name: "OLL 20", alg: "r U R' U' M2 U R U' R' U' M'" },
  { name: "OLL 21", alg: "R U2 R' U' R U R' U' R U' R'" },
  { name: "OLL 22", alg: "R U2 R2 U' R2 U' R2 U2 R" },
  { name: "OLL 23", alg: "R2 D' R U2 R' D R U2 R" },
  { name: "OLL 24", alg: "r U R' U' r' F R F'" },
  { name: "OLL 25", alg: "F' r U R' U' r' F R" },
  { name: "OLL 26", alg: "R U2 R' U' R U' R'" },
  { name: "OLL 27", alg: "R U R' U R U2 R'" },
  { name: "OLL 28", alg: "r U R' U' r' R U R U' R'" },
  { name: "OLL 29", alg: "R U R' U' R U' R' F' U' F R U R'" },
  { name: "OLL 30", alg: "F R' F R2 U' R' U' R U R' F2" },
  { name: "OLL 31", alg: "R' U' F U R U' R' F' R" },
  { name: "OLL 32", alg: "L U F' U' L' U L F L'" },
  { name: "OLL 33", alg: "R U R' U' R' F R F'" },
  { name: "OLL 34", alg: "R U R2 U' R' F R U R U' F'" },
  { name: "OLL 35", alg: "R U2 R2 F R F' R U2 R'" },
  { name: "OLL 36", alg: "L' U' L U' L' U L U L F' L' F" },
  { name: "OLL 37", alg: "F R' F' R U R U' R'" },
  { name: "OLL 38", alg: "R U R' U R U' R' U' R' F R F'" },
  { name: "OLL 39", alg: "L F' L' U' L U F U' L'" },
  { name: "OLL 40", alg: "R' F R U R' U' F' U R" },
  { name: "OLL 41", alg: "R U R' U R U2 R' F R U R' U' F'" },
  { name: "OLL 42", alg: "R' U' R U' R' U2 R F R U R' U' F'" },
  { name: "OLL 43", alg: "F' U' L' U L F" },
  { name: "OLL 44", alg: "F U R U' R' F'" },
  { name: "OLL 45", alg: "F R U R' U' F'" },
  { name: "OLL 46", alg: "R' U' R' F R F' U R" },
  { name: "OLL 47", alg: "R' U' R' F R F' R' F R F' U R" },
  { name: "OLL 48", alg: "F R U R' U' R U R' U' F'" },
  { name: "OLL 49", alg: "r U' r2 U r2 U r2 U' r" },
  { name: "OLL 50", alg: "r' U r2 U' r2 U' r2 U r'" },
  { name: "OLL 51", alg: "F U R U' R' U R U' R' F'" },
  { name: "OLL 52", alg: "R U R' U R U' B U' B' R'" },
  { name: "OLL 53", alg: "l' U2 L U L' U' L U L' U l" },
  { name: "OLL 54", alg: "r U2 R' U' R U R' U' R U' r'" },
  { name: "OLL 55", alg: "R' F R U R U' R2 F' R2 U' R' U R U R'" },
  { name: "OLL 56", alg: "r' U' r U' R' U R U' R' U R r' U r" },
  { name: "OLL 57", alg: "R U R' U' M' U R U' r'" },
];

export type PllCycles = "corners3" | "edges3" | "corners2x2" | "edges2x2" | "swap" | "both3";

export interface PllAlg extends Alg {
  // How the pieces move, used to check the algorithm
  cycles: PllCycles;
}

export const PLL: Array<PllAlg> = [
  { name: "Aa", alg: "x R' U R' D2 R U' R' D2 R2 x'", cycles: "corners3" },
  { name: "Ab", alg: "x R2 D2 R U R' D2 R U' R x'", cycles: "corners3" },
  {
    name: "E",
    alg: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
    cycles: "corners2x2",
  },
  {
    name: "F",
    alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    cycles: "swap",
  },
  {
    name: "Ga",
    alg: "R2 U R' U R' U' R U' R2 U' D R' U R D'",
    cycles: "both3",
  },
  {
    name: "Gb",
    alg: "R' U' R U D' R2 U R' U R U' R U' R2 D",
    cycles: "both3",
  },
  {
    name: "Gc",
    alg: "R2 U' R U' R U R' U R2 U D' R U' R' D",
    cycles: "both3",
  },
  {
    name: "Gd",
    alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'",
    cycles: "both3",
  },
  { name: "H", alg: "M2 U M2 U2 M2 U M2", cycles: "edges2x2" },
  { name: "Ja", alg: "x R2 F R F' R U2 r' U r U2 x'", cycles: "swap" },
  { name: "Jb", alg: "R U R' F' R U R' U' R' F R2 U' R'", cycles: "swap" },
  {
    name: "Na",
    alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    cycles: "swap",
  },
  {
    name: "Nb",
    alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R",
    cycles: "swap",
  },
  {
    name: "Ra",
    alg: "R U' R' U' R U R D R' U' R D' R' U2 R'",
    cycles: "swap",
  },
  { name: "Rb", alg: "R2 F R U R U' R' F' R U2 R' U2 R", cycles: "swap" },
  { name: "T", alg: "R U R' U' R' F R2 U' R' U' R U R' F'", cycles: "swap" },
  { name: "Ua", alg: "M2 U M U2 M' U M2", cycles: "edges3" },
  { name: "Ub", alg: "M2 U' M U2 M' U' M2", cycles: "edges3" },
  {
    name: "V",
    alg: "R' U R' U' y R' F' R2 U' R' U R' F R F",
    cycles: "swap",
  },
  {
    name: "Y",
    alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    cycles: "swap",
  },
  { name: "Z", alg: "M' U M2 U M2 U M' U2 M2", cycles: "edges2x2" },
];

const pll = (name: string) => PLL.find((p) => p.name === name) as PllAlg;

// 2-look PLL: corners first, then edges
export const PLL_CORNERS: Array<PllAlg> = [pll("T"), pll("Y")];
export const PLL_EDGES: Array<PllAlg> = [
  pll("Ua"),
  pll("Ub"),
  pll("H"),
  pll("Z"),
];
