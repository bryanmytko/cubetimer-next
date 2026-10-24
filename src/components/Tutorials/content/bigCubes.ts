import { AlgItem, NotationMove, Resource, Stage, Tutorial } from "../types";
import { CUBE_MOVES } from "./threeByThree";
import { centersAndEdges, centersOnly } from "./masks";

// Pure versions swap just the two broken edge pieces and nothing else, so
// they're also used to draw the parity diagrams
const OLL_PARITY_PURE = (slice: string) =>
  `${slice}R2 B2 U2 ${slice}L U2 ${slice}R' U2 ${slice}R U2 F2 ${slice}R F2 ${slice}L' B2 ${slice}R2`;

export const OLL_PARITY: AlgItem = {
  name: "OLL parity",
  alg: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'",
  note: "One edge looks flipped. Hold it at the front of the top layer. This messes up the rest of the top layer, so do it before OLL",
  diagramAlg: OLL_PARITY_PURE("2"),
};

export const OLL_PARITY_SLICE: AlgItem = {
  name: "OLL parity (pure)",
  alg: OLL_PARITY_PURE("2"),
  note: "Flips the front edge and touches nothing else. 2R means only the second layer from the right",
};

export const PLL_PARITY: AlgItem = {
  name: "PLL parity",
  alg: "2R2 U2 2R2 Uw2 2R2 Uw2",
  note: "Swaps the front and back top edges. Finish with U2 to line the top back up",
};

// The front left and front right edges have their pieces mixed up
export const EDGE_FLIP: AlgItem = {
  name: "Pair two edges",
  alg: "Dw R F' U R' F Dw'",
  note: "Pairs the front left and front right edges without breaking the centers",
};

const BIG_MOVES: Array<NotationMove> = [
  ...CUBE_MOVES.slice(0, 3),
  { move: "Rw", description: "Right two layers together. Also written r" },
  { move: "2R", description: "Only the second layer from the right" },
  { move: "Uw", description: "Top two layers together. Also written u" },
  { move: "x", description: "Turn the whole cube like R" },
];

const BIGGER_MOVES: Array<NotationMove> = [
  ...BIG_MOVES,
  { move: "3Rw", description: "Right three layers together. Also written 3r" },
  { move: "3R", description: "Only the third layer from the right" },
];

const reduction = (n: number, extra: Array<string>): Stage => ({
  id: "reduction",
  title: "Reduction",
  level: "Beginner",
  summary: `Turn the ${n}x${n} into a big 3x3: solve the centers, pair up the edges, then solve it like a 3x3. The 3x3 part uses only outer turns.`,
  steps: [
    {
      title: "1. Centers",
      body: [
        `Each center is a ${n - 2}x${n - 2} block. Solve two opposite centers first (white, then yellow), then the four side centers one at a time.`,
        "Build a bar of center pieces, then move it next to the finished part with a wide turn, put the bar in, and undo the wide turn. Use Rw and Uw moves so you don't break centers you've already done.",
        ...(n % 2 === 0
          ? [
              "With no fixed centers, you have to place the side centers in the right order yourself: green is opposite blue, red is opposite orange, and with yellow on top and green in front, orange goes on the right.",
            ]
          : []),
      ],
      goal: { show: centersOnly(n), caption: "All six centers solved" },
      tip: "Get the last two centers right before moving on: it's easy to finish with two centers swapped.",
    },
    {
      title: "2. Edges",
      body: [
        `Each edge is ${n - 2} pieces that need to line up. Find pieces that belong together and bring them to the front left and front right edges, lined up so one slice turn would join them. The algorithm pairs both edges without breaking the centers.`,
        ...extra,
      ],
      goal: { show: centersAndEdges(n), caption: "Centers solved, every edge paired" },
      algs: [EDGE_FLIP],
    },
    {
      title: "3. Solve it like a 3x3",
      body: [
        "Now use only outer turns (R, U, F…) and solve with your usual 3x3 method. Treat each center block as one center and each paired edge as one edge.",
        ...(n % 2 === 0
          ? [
              "Even cubes can end in two positions a 3x3 never can, called parity. If you see one, use the parity algorithms below.",
            ]
          : [
              "Odd cubes have fixed centers like a 3x3, so the only parity happens while pairing the last edge.",
            ]),
      ],
    },
  ],
});

const tips = (n: number): Array<string> => [
  "Most of your time goes into centers and edges. Practice those on their own until you can do them without stopping to look.",
  `Look for the next piece while you're placing the current one. On a ${n}x${n} there's always something to look for.`,
  "Use the same 3x3 method you already know for the last step. Small improvements there help every solve.",
  ...(n % 2 === 0
    ? ["Learn to spot parity during OLL and PLL so you don't waste time on a case that can't be solved."]
    : []),
];

const bigResources = (n: number): Array<Resource> => [
  ...(n <= 5
    ? [
        {
          name: `J Perm: ${n}x${n} tutorial`,
          url: `https://jperm.net/${n}x${n}`,
          description: "Video walkthrough of reduction, including parity.",
        },
      ]
    : []),
  ...(n === 4
    ? [
        { name: "J Perm: 4x4 OLL parity", url: "https://jperm.net/algs/4x4/oll", description: "OLL parity cases and alternatives." },
        { name: "J Perm: 4x4 PLL parity", url: "https://jperm.net/algs/4x4/pll", description: "PLL parity cases and alternatives." },
        { name: "Ruwix 4x4 guide", url: "https://ruwix.com/twisty-puzzles/4x4x4-rubiks-cube-rubiks-revenge/", description: "Written beginner guide." },
      ]
    : []),
  ...(n === 5
    ? [{ name: "Ruwix 5x5 guide", url: "https://ruwix.com/twisty-puzzles/5x5x5-rubiks-cube-professors-cube/", description: "Written beginner guide." }]
    : []),
  {
    name: "Ruwix: big cubes",
    url: "https://ruwix.com/twisty-puzzles/big-cubes-nxnxn-solution/",
    description: "How reduction works on any size of cube.",
  },
];

export const fourByFour: Tutorial = {
  slug: "4x4",
  name: "4x4",
  tagline: "Your first big cube: reduction, and the famous parity.",
  difficulty: 3,
  icon: "cube",
  n: 4,
  facts: [
    { label: "WCA event", value: "4x4x4 Cube" },
    { label: "Positions", value: "7.4 × 10⁴⁵" },
    { label: "Method", value: "Reduction (Yau for speed)" },
    { label: "Parity", value: "OLL and PLL" },
  ],
  overview: [
    "The 4x4 has no fixed centers. Each face has a 2x2 block of center pieces, and each edge is split into two pieces that can be separated.",
    "The standard way to solve it is reduction: solve the centers, pair the edges, then finish like a 3x3. Once that's comfortable, the Yau method (solve two opposite centers and three cross edges first) is the most popular way to get faster.",
    "Because it's an even cube, the last step can end up in positions a 3x3 can't: one edge flipped by itself (OLL parity) or two edges swapped (PLL parity). Each has one algorithm.",
  ],
  notation: {
    intro: [
      "Outer turns work like a 3x3. Big cubes add moves for inner layers: w means wide (several layers from the outside), and a number in front says how many layers or which one.",
    ],
    moves: BIG_MOVES,
  },
  stages: [
    reduction(4, [
      "The last two edges work the same way: hold them at the front left and front right and use the same algorithm.",
    ]),
    {
      id: "parity",
      title: "Parity",
      level: "Beginner",
      summary:
        "Two positions you'll only see on even cubes. Both come from the edge pairing step, and each has one algorithm.",
      steps: [
        {
          title: "OLL parity",
          body: [
            "During OLL you see one edge that looks flipped, or an odd number of flipped edges. Hold the flipped edge at the front of the top layer and do the OLL parity algorithm, then carry on with OLL.",
          ],
          algs: [OLL_PARITY],
        },
        {
          title: "PLL parity",
          body: [
            "During PLL you see two edges swapped by themselves, or a case that isn't in the 21 PLLs. Do the PLL parity algorithm to swap the front and back edges, then finish PLL.",
          ],
          algs: [PLL_PARITY],
        },
      ],
    },
    {
      id: "yau",
      title: "Yau",
      level: "Intermediate",
      summary:
        "The method most fast 4x4 solvers use. It solves the first centers and cross edges early, so the rest of the edge pairing happens without rotating the cube.",
      steps: [
        {
          title: "Steps",
          body: [
            "Solve two opposite centers (usually white and yellow). Pair three of the white cross edges and place them. Solve the last four centers. Pair and place the last cross edge, then pair the remaining eight edges with Uw and Dw slices while holding the cross on the left. Finish as a 3x3.",
          ],
        },
      ],
    },
  ],
  algSets: [
    {
      id: "parity",
      title: "Parity algorithms",
      description: "The cases these solve: one flipped edge, and two swapped edges.",
      diagram: "oll",
      algs: [OLL_PARITY, OLL_PARITY_SLICE],
    },
    {
      id: "pll-parity",
      title: "PLL parity",
      description: "Arrows show which edge pieces swap.",
      diagram: "pll",
      algs: [PLL_PARITY],
    },
    {
      id: "pairing",
      title: "Edge pairing",
      description: "The one algorithm you need to pair edges.",
      algs: [EDGE_FLIP],
    },
  ],
  tips: tips(4),
  resources: bigResources(4),
};

export const fiveByFive: Tutorial = {
  slug: "5x5",
  name: "5x5",
  tagline: "Fixed centers and no PLL parity, but a lot more pieces.",
  difficulty: 3,
  icon: "cube",
  n: 5,
  facts: [
    { label: "WCA event", value: "5x5x5 Cube" },
    { label: "Positions", value: "2.8 × 10⁷⁴" },
    { label: "Method", value: "Reduction" },
    { label: "Parity", value: "Last edge only" },
  ],
  overview: [
    "The 5x5 has a fixed center piece in the middle of each face, like a 3x3, so you always know which color goes where. Each face has 9 center pieces and each edge has 3 pieces: a middle one and two outer ones.",
    "Solve it by reduction, just like the 4x4. Centers take longer, and edges are paired by matching the two outer pieces to each middle piece.",
    "The only parity on a 5x5 shows up when pairing the last two edges: the two outer pieces of one edge end up swapped.",
  ],
  notation: {
    intro: [
      "Same as the 4x4: w means wide turns, and a number in front picks how many layers or which inner layer.",
    ],
    moves: BIGGER_MOVES,
  },
  stages: [
    reduction(5, [
      "When pairing, line up both outer pieces with the middle piece. The first eight edges are easy to pair while there's free space; the last four take more care, using the same algorithm.",
      "If the very last edge has its outer pieces swapped (they're both there, just the wrong way round), use the edge parity algorithm below.",
    ]),
  ],
  algSets: [
    {
      id: "pairing",
      title: "Edge pairing",
      description: "Pairs an edge without breaking the centers.",
      algs: [EDGE_FLIP],
    },
    {
      id: "parity",
      title: "Last edge parity",
      description: "Swaps the two outer pieces of the front top edge. The middle piece stays put.",
      diagram: "oll",
      algs: [{ ...OLL_PARITY_SLICE, name: "Edge parity", note: "Hold the broken edge at the front of the top layer" }],
    },
  ],
  tips: tips(5),
  resources: bigResources(5),
};

export const sixBySix: Tutorial = {
  slug: "6x6",
  name: "6x6",
  tagline: "Two kinds of edge pieces and both kinds of parity.",
  difficulty: 4,
  icon: "cube",
  n: 6,
  facts: [
    { label: "WCA event", value: "6x6x6 Cube" },
    { label: "Positions", value: "1.6 × 10¹¹⁶" },
    { label: "Method", value: "Reduction" },
    { label: "Parity", value: "OLL and PLL" },
  ],
  overview: [
    "A 6x6 combines the challenges of the 4x4 and 5x5. Like the 4x4 it has no fixed centers, so you place them in the right color order yourself. Each edge has four pieces: two outer ones next to the corners, and two inner ones.",
    "Solve by reduction. Centers are 4x4 blocks, built from bars of pieces. Edges are paired in two halves, then joined up.",
    "Both kinds of 4x4 parity can happen, separately for the outer and inner edge pieces. The algorithms are the 4x4 ones with a different inner slice.",
  ],
  notation: {
    intro: [
      "A number in front says which layer: 2R is the second layer from the right, 3R the third. With w it means that many layers together.",
    ],
    moves: BIGGER_MOVES,
  },
  stages: [
    reduction(6, [
      "Pair the inner pieces of each edge first, then the outer pieces, so you're really pairing edges twice.",
    ]),
    {
      id: "parity",
      title: "Parity",
      level: "Beginner",
      summary:
        "The 4x4 parities, but they can affect the outer or the inner pieces of an edge. Pick the algorithm by which pieces are wrong.",
      steps: [
        {
          title: "OLL parity",
          body: [
            "Hold the broken edge at the front of the top layer. Use 2R for the outer pieces (next to the corners) or 3R for the inner ones.",
          ],
          algs: [
            { name: "OLL parity, outer pieces", alg: OLL_PARITY_PURE("2") },
            { name: "OLL parity, inner pieces", alg: OLL_PARITY_PURE("3") },
          ],
        },
        {
          title: "PLL parity",
          body: [
            "Swaps the front and back edge pieces of one kind: again 2R for the outer pieces, 3R for the inner ones. Finish with U2 to line the top back up.",
          ],
          algs: [
            { name: "PLL parity, outer pieces", alg: "2R2 U2 2R2 3Uw2 2R2 3Uw2" },
            { name: "PLL parity, inner pieces", alg: "3R2 U2 3R2 3Uw2 3R2 3Uw2" },
          ],
        },
      ],
    },
  ],
  tips: tips(6),
  resources: bigResources(6),
};

export const sevenBySeven: Tutorial = {
  slug: "7x7",
  name: "7x7",
  tagline: "The biggest WCA cube. Patience is the main algorithm.",
  difficulty: 5,
  icon: "cube",
  n: 7,
  facts: [
    { label: "WCA event", value: "7x7x7 Cube" },
    { label: "Positions", value: "2 × 10¹⁶⁰" },
    { label: "Method", value: "Reduction" },
    { label: "Parity", value: "Edge pairing only" },
  ],
  overview: [
    "The 7x7 has fixed centers like the 5x5, so there's never PLL parity. Each center is a 5x5 block and each edge has five pieces: a middle one and two pairs either side.",
    "Solve by reduction, the same as every big cube. Centers are the biggest job: build them from bars of three or five pieces at a time.",
    "Like the 5x5, parity only shows up when pairing the last edges, and the fix depends on which pair of pieces is swapped.",
  ],
  notation: {
    intro: [
      "A number in front says which layer: 2R is the second layer from the right, 3R the third. With w it means that many layers together.",
    ],
    moves: BIGGER_MOVES,
  },
  stages: [
    reduction(7, [
      "Pair each edge outwards from its middle piece: first the pieces next to the middle, then the outer pieces.",
      "If the last edge has one pair of pieces swapped, use the parity algorithm for that pair: 3R for the pieces next to the middle, 2R for the outer ones.",
    ]),
  ],
  algSets: [
    {
      id: "parity",
      title: "Last edge parity",
      description: "Swaps one pair of pieces in the front top edge. The rest of the cube stays put.",
      diagram: "oll",
      algs: [
        { name: "Outer pieces", alg: OLL_PARITY_PURE("2") },
        { name: "Pieces next to the middle", alg: OLL_PARITY_PURE("3") },
      ],
    },
  ],
  tips: tips(7),
  resources: bigResources(7),
};
