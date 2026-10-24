import { AlgItem, Tutorial } from "../types";

// Each cycles or flips the three edges touching the top vertex and nothing
// else, checked with the Pyraminx simulator
export const PYRAMINX_L3E: Array<AlgItem> = [
  { name: "Cycle right", alg: "R U R' U R U R'", note: "Moves the three top edges around one way" },
  { name: "Cycle left", alg: "L' U' L U' L' U' L", note: "The mirror: moves them around the other way" },
  { name: "Flip two", alg: "R' U' L' U L R", note: "Flips two top edges in place" },
];

export const pyraminx: Tutorial = {
  slug: "pyraminx",
  name: "Pyraminx",
  tagline: "A pyramid that looks hard and isn't. Most people solve it in a day.",
  difficulty: 1,
  icon: "pyraminx",
  facts: [
    { label: "WCA event", value: "Pyraminx" },
    { label: "Positions", value: "75,582,720" },
    { label: "Moving pieces", value: "4 tips, 4 centers, 6 edges" },
    { label: "Popular methods", value: "Layer by layer, L4E" },
  ],
  overview: [
    "The Pyraminx has three kinds of pieces. The tips at each corner turn on their own and are trivial. Under each tip is a center piece with three colors, which only turns in place. The six edges, each with two colors, are where the real solving happens.",
    "Because the centers only turn in place, they tell you which color each face needs to be, just like the centers on a 3x3.",
    "The fastest solvers average under 3 seconds with methods like L4E and 1-flip, but a beginner method gets most people well under a minute.",
  ],
  notation: {
    intro: [
      "Hold the Pyraminx with one face toward you and one vertex pointing up. The four vertices are U (top), L (left), R (right) and B (back).",
      "Capital letters turn two layers (the tip and the center under it), lowercase letters turn just the tip. Every turn is a third of a full turn, clockwise as if you were looking at that vertex from outside.",
    ],
    moves: [
      { move: "U", description: "Top two layers, clockwise looking down from above" },
      { move: "R", description: "Right vertex's two layers" },
      { move: "L", description: "Left vertex's two layers" },
      { move: "B", description: "Back vertex's two layers" },
      { move: "u", description: "Just the top tip" },
      { move: "R'", description: "Right vertex counter-clockwise" },
    ],
  },
  stages: [
    {
      id: "beginner",
      title: "Layer by layer",
      level: "Beginner",
      summary:
        "Fix the tips and centers, build one face with its three edges, then finish the last three edges with an algorithm.",
      steps: [
        {
          title: "1. Tips",
          body: [
            "Turn each tip (u, l, r, b) until its colors match the center piece right under it. Each tip has only three positions, so this takes a few seconds.",
          ],
        },
        {
          title: "2. Centers",
          body: [
            "Pick a color for the bottom face. Turn the vertices (U, L, R, B) until the three center pieces around that face all show that color on the bottom. The tips come along with them.",
          ],
        },
        {
          title: "3. Bottom edges",
          body: [
            "Find the three edges that have the bottom color and put each one between its two matching centers. Bring an edge into the top layer next to where it goes, then use short moves like R U R' or L' U' L to drop it in.",
            "Check every side of the bottom layer: each one should be a single color across the center and the edge.",
          ],
          tip: "Solve the edges in the order that needs the fewest moves. With practice you'll plan this whole step before you start.",
        },
        {
          title: "4. Last three edges",
          body: [
            "Only the three edges touching the top vertex are left. Keep the solved face on the bottom. If the edges need to move around, use one of the cycles; if two are in place but flipped, use the flip.",
            "Try the right cycle first. If it moves the edges the wrong way, do it once more, or learn the left cycle.",
          ],
          algs: PYRAMINX_L3E,
        },
      ],
    },
    {
      id: "intermediate",
      title: "Top first and L4E",
      level: "Intermediate",
      summary:
        "Solve the centers and two edges together around one vertex, then finish the last four edges with an algorithm. This is how most fast solvers start.",
      steps: [
        {
          title: "Steps",
          body: [
            "Build a block of three centers and two edges around one vertex during inspection. The last four edges are then solved with one short algorithm from a set you learn.",
            "Leave the tips until the end: since they turn on their own, solving them last never costs any extra planning.",
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "1-flip and Keyhole",
      level: "Advanced",
      summary:
        "Advanced methods plan almost the whole solve in inspection. 1-flip solves a face with one edge flipped, then fixes it while solving the rest. Keyhole inserts edges through a gap left on purpose.",
      steps: [
        {
          title: "Inspection is everything",
          body: [
            "A good Pyraminx solve takes 10 to 15 moves. Use the whole inspection to plan your first block, and know your last layer algorithms well enough to recognize them instantly.",
          ],
        },
      ],
    },
  ],
  algSets: [
    {
      id: "l3e",
      title: "Last three edges",
      description: "For the beginner method, once the bottom face is done.",
      algs: PYRAMINX_L3E,
    },
  ],
  tips: [
    "Leave the tips until last. They don't affect anything else.",
    "Most solves are under 15 moves, so planning in inspection matters more than turning speed.",
    "Practice turning with your wrists: Pyraminx moves are big and fast, and regripping costs time.",
  ],
  resources: [
    { name: "Ruwix Pyraminx guide", url: "https://ruwix.com/twisty-puzzles/pyraminx-triangle-rubiks-cube/", description: "Written beginner solution with pictures." },
    { name: "Speed Cube Database: L4E", url: "https://www.speedcubedb.com/a/Pyraminx/L4E", description: "Every last four edges case." },
  ],
};
