import { AlgItem, Tutorial } from "../types";
import { firstLayer, topFace } from "./masks";

// Corner algorithms from 3x3 OLL, with wide turns swapped for R: on a 2x2
// a wide turn moves the whole cube
export const TWO_OLL: Array<AlgItem> = [
  { name: "Sune", alg: "R U R' U R U2 R'" },
  { name: "Antisune", alg: "R U2 R' U' R U' R'" },
  { name: "H", alg: "R2 U2 R U2 R2" },
  { name: "Pi", alg: "R U2 R2 U' R2 U' R2 U2 R" },
  { name: "Headlights", alg: "R2 D' R U2 R' D R U2 R" },
  { name: "Chameleon", alg: "R U R' U' R' F R F'" },
  { name: "Bowtie", alg: "F' R U R' U' R' F R" },
];

export interface PblAlg extends AlgItem {
  top: "none" | "adjacent" | "diagonal";
  bottom: "none" | "adjacent" | "diagonal";
}

// Permute both layers (the last step of Ortega)
export const TWO_PBL: Array<PblAlg> = [
  {
    name: "Adjacent top",
    alg: "R U R' U' R' F R2 U' R' U' R U R' F'",
    note: "T perm. Headlights on the left",
    top: "adjacent",
    bottom: "none",
  },
  {
    name: "Diagonal top",
    alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    note: "Y perm",
    top: "diagonal",
    bottom: "none",
  },
  {
    name: "Double adjacent",
    alg: "R2 U' B2 U2 R2 U' R2",
    note: "Headlights in the front on both layers",
    top: "adjacent",
    bottom: "adjacent",
  },
  {
    name: "Double diagonal",
    alg: "R2 F2 R2",
    top: "diagonal",
    bottom: "diagonal",
  },
  {
    name: "Adjacent top, diagonal bottom",
    alg: "R U' R F2 R' U R'",
    note: "Headlights in the front",
    top: "adjacent",
    bottom: "diagonal",
  },
  {
    name: "Diagonal top, adjacent bottom",
    alg: "L D' L F2 L' D L'",
    note: "Bottom headlights in the front",
    top: "diagonal",
    bottom: "adjacent",
  },
];

export const twoByTwo: Tutorial = {
  slug: "2x2",
  name: "2x2",
  tagline: "Eight corners, no centers. The fastest way into speedcubing.",
  difficulty: 1,
  icon: "cube",
  n: 2,
  facts: [
    { label: "WCA event", value: "2x2x2 Cube" },
    { label: "Positions", value: "3,674,160" },
    { label: "God's number", value: "11 moves" },
    { label: "Popular method", value: "Ortega, then CLL" },
  ],
  overview: [
    "A 2x2 is just the corners of a 3x3. With no centers to guide you, any face can go first: pick a color and build that face, making sure the side colors of each corner match their neighbor.",
    "If you can solve a 3x3, you already know a 2x2 method: solve the first layer corners, then use the 3x3 corner algorithms for the last layer.",
    "Solves are short, so planning matters more than turning speed. Good solvers plan their whole first layer, and sometimes more, during inspection.",
  ],
  notation: {
    intro: [
      "Same notation as the 3x3. Because the cube has only two layers, you can solve it with just R, U and F turns plus whole cube rotations.",
    ],
    moves: [
      { move: "R", description: "Right layer clockwise" },
      { move: "U", description: "Top layer clockwise" },
      { move: "F", description: "Front layer clockwise" },
      { move: "R'", description: "Right layer counter-clockwise" },
      { move: "U2", description: "Top layer twice" },
      { move: "x", description: "Turn the whole cube like R" },
      { move: "y", description: "Turn the whole cube like U" },
    ],
  },
  stages: [
    {
      id: "beginner",
      title: "Layer by layer",
      level: "Beginner",
      summary:
        "The 3x3 beginner method without the edges. Three steps and three algorithms.",
      steps: [
        {
          title: "1. First layer",
          body: [
            "Pick a color (white is common) and solve those four corners on the bottom, so each side of the layer shows a single color.",
            "Find a white corner in the top layer, put it above its spot at the front right, and repeat R U R' U' until it drops in. Repeat for each corner.",
          ],
          goal: { show: firstLayer(2), view: "x2", caption: "First layer, side colors matching" },
          algs: [{ name: "Insert corner", alg: "R U R' U'", note: "Repeat until the corner is solved" }],
        },
        {
          title: "2. Orient the top",
          body: [
            "Turn the cube over so the solved layer is on the bottom. Hold a yellow corner (yellow on top) in the front left, and do the Sune. Repeat until the top is all yellow.",
            "If no corner has yellow on top, hold the cube so the front left corner's yellow sticker faces left. If two corners have yellow on top, hold it so the front left corner's yellow sticker faces you. Do the Sune and look again.",
          ],
          goal: { show: topFace(2), caption: "Top face all yellow" },
          algs: [{ name: "Sune", alg: "R U R' U R U2 R'" }],
        },
        {
          title: "3. Swap the last corners",
          body: [
            "Look for headlights: two matching colors on the same side of the top layer. Hold them on the left and do the T perm. If there are none, do it once from anywhere, then find the headlights.",
          ],
          algs: [
            { name: "T perm", alg: "R U R' U' R' F R2 U' R' U' R U R' F'" },
          ],
        },
      ],
    },
    {
      id: "ortega",
      title: "Ortega",
      level: "Intermediate",
      summary:
        "Solve a face (not a layer), orient the top with one algorithm, then fix both layers at once. 12 algorithms total, and most people get to around 5 seconds.",
      steps: [
        {
          title: "1. Bottom face",
          body: [
            "Make one face a single color, ignoring whether the side colors match. This is much faster than a full layer and is easy to plan in inspection.",
          ],
        },
        {
          title: "2. Orient the top",
          body: [
            "Turn the cube over and use one of the seven OLL algorithms below to make the top a single color.",
          ],
        },
        {
          title: "3. Permute both layers",
          body: [
            "Look at both layers: each is either solved, has headlights (adjacent swap) or has no headlights (diagonal swap). One of the six PBL algorithms below fixes both at once. Turn U and D first to line up the headlights.",
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "CLL and EG",
      level: "Advanced",
      summary:
        "Build the first layer completely, then solve the whole top in one algorithm with CLL (42 algorithms). EG goes further by solving the top no matter how the first layer is permuted (128 algorithms). This is how the fastest solvers average under 2 seconds.",
      steps: [
        {
          title: "Learn CLL by OLL case",
          body: [
            "Each Ortega OLL case splits into six CLL cases depending on how the corners are permuted. Learn one OLL group at a time, starting with Sune and Antisune.",
          ],
        },
      ],
    },
  ],
  algSets: [
    {
      id: "oll",
      title: "Ortega OLL",
      description: "Make the top a single color. Gray stickers are any color but yellow.",
      diagram: "oll",
      algs: TWO_OLL,
    },
    {
      id: "pbl",
      title: "PBL",
      description: "Permute both layers. Line up any headlights with U and D turns first.",
      algs: TWO_PBL,
    },
  ],
  tips: [
    "Inspect your whole first face, and try to predict which OLL case you'll get.",
    "Don't rotate the cube during a solve if you can help it. Most 2x2 algorithms are R, U and F only for this reason.",
    "Do lots of solves: a 2x2 average improves fastest with volume.",
  ],
  resources: [
    { name: "J Perm: 2x2 tutorial", url: "https://jperm.net/2x2", description: "Beginner method video, then faster methods." },
    { name: "J Perm: 2x2 OLL", url: "https://jperm.net/algs/2x2/oll", description: "Ortega OLL with alternatives." },
    { name: "J Perm: 2x2 PBL", url: "https://jperm.net/algs/2x2/pbl", description: "Every PBL case." },
    { name: "J Perm: CLL", url: "https://jperm.net/algs/2x2/cll", description: "The next step after Ortega." },
    { name: "Ruwix 2x2 guide", url: "https://ruwix.com/twisty-puzzles/2x2x2-rubiks-cube-pocket/", description: "Written beginner guide." },
  ],
};
