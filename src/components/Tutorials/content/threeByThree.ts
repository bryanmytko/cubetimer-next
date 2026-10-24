import { Tutorial } from "../types";
import {
  OLL,
  OLL_CORNERS,
  OLL_EDGES,
  PLL,
  PLL_CORNERS,
  PLL_EDGES,
} from "./algs3x3";
import {
  bottomCross,
  firstLayer,
  firstTwoLayers,
  topCross,
  topFace,
} from "./masks";

export const CUBE_MOVES = [
  { move: "R", description: "Right face clockwise (as if you were looking at it)" },
  { move: "R'", description: "Right face counter-clockwise. A ' always means the reverse turn" },
  { move: "R2", description: "Right face twice. Direction doesn't matter" },
  { move: "L", description: "Left face clockwise: the front column goes down" },
  { move: "U", description: "Top face clockwise: the front row goes left" },
  { move: "D", description: "Bottom face clockwise: the front row goes right" },
  { move: "F", description: "Front face clockwise" },
  { move: "B", description: "Back face clockwise: the top row goes left" },
];

export const SLICE_MOVES = [
  { move: "M", description: "Middle slice, turned like L" },
  { move: "E", description: "Equator slice, turned like D" },
  { move: "S", description: "Standing slice, turned like F" },
  { move: "r", description: "Right two layers together (also written Rw)" },
  { move: "x", description: "Turn the whole cube like R" },
  { move: "y", description: "Turn the whole cube like U" },
  { move: "z", description: "Turn the whole cube like F" },
];

export const threeByThree: Tutorial = {
  slug: "3x3",
  name: "3x3",
  tagline: "The classic. Learn to solve it, then learn to solve it fast.",
  difficulty: 2,
  icon: "cube",
  n: 3,
  facts: [
    { label: "WCA event", value: "3x3x3 Cube" },
    { label: "Positions", value: "43 quintillion" },
    { label: "God's number", value: "20 moves" },
    { label: "Beginner method", value: "Layer by layer" },
  ],
  overview: [
    "The 3x3 has 6 fixed centers, 12 edges and 8 corners. Centers never move relative to each other, so the white center always tells you where the white face goes. Solving is really about putting edges and corners where they belong.",
    "Almost everyone starts with the layer by layer method: solve the bottom layer, then the middle, then the top. Once that's comfortable, CFOP (Cross, F2L, OLL, PLL) is the method most speedcubers use. It's the same idea, done in fewer, smarter steps.",
    "This guide holds the cube with white on the bottom and yellow on top, which is the usual way to learn CFOP. Diagrams show green in front.",
  ],
  notation: {
    intro: [
      "Algorithms are written as a list of turns. Each letter is a face, and you turn it clockwise as if you were looking straight at that face.",
      "Keep the cube in the same orientation for the whole algorithm unless it tells you to rotate (x, y or z).",
    ],
    moves: [...CUBE_MOVES, ...SLICE_MOVES],
  },
  stages: [
    {
      id: "beginner",
      title: "Layer by layer",
      level: "Beginner",
      summary:
        "Solve one layer at a time with a handful of short algorithms. Most people get their first solve in an afternoon, and get under 2 minutes within a couple of weeks.",
      steps: [
        {
          title: "1. White cross",
          body: [
            "Hold the cube with white on top. Bring the four white edges up around the white center, then turn each one so its side color matches the center next to it.",
            "There's no algorithm for this: move one edge at a time, and keep the edges you've already placed out of the way. If an edge is in the right spot but flipped, take it out and put it back the other way.",
          ],
          goal: { show: bottomCross(3), view: "x2", caption: "White cross, matching the side centers" },
        },
        {
          title: "2. White corners",
          body: [
            "Flip the cube so white is on the bottom. Find a white corner in the top layer and turn U until it sits directly above where it belongs (between its two side colors).",
            "Hold that spot at the front right and repeat R U R' U' until the corner drops in solved. It takes 1, 3 or 5 repeats. Do the same for the other three corners.",
          ],
          goal: { show: firstLayer(3), view: "x2", caption: "Whole white layer solved" },
          algs: [{ name: "Insert corner", alg: "R U R' U'", note: "Repeat until the corner is solved" }],
          tip: "If a white corner is stuck in the bottom layer in the wrong place, do R U R' U' once to pop it into the top layer.",
        },
        {
          title: "3. Middle layer edges",
          body: [
            "Find an edge in the top layer without yellow on it. Turn U so its front color matches the front center, forming an upside-down T.",
            "If the edge's top color matches the right center, insert it to the right. If it matches the left, insert it to the left.",
          ],
          goal: { show: firstTwoLayers(3), caption: "First two layers solved" },
          algs: [
            { name: "Insert right", alg: "U R U' R' U' F' U F" },
            { name: "Insert left", alg: "U' L' U L U F U' F'" },
          ],
          tip: "If an edge is in the middle layer but in the wrong spot or flipped, insert any top edge there to kick it out.",
        },
        {
          title: "4. Yellow cross",
          body: [
            "Look at the yellow stickers on top, ignoring corners. You'll see a dot, an L shape, a line or a cross.",
            "Hold an L in the back left, or a line horizontally, and do the algorithm. A dot takes the algorithm, then it becomes an L. Repeat until you have a cross.",
          ],
          goal: { show: topCross(3), caption: "Yellow cross on top" },
          algs: [{ name: "Yellow cross", alg: "F R U R' U' F'" }],
        },
        {
          title: "5. Match the yellow edges",
          body: [
            "Turn U until two edges match their side centers. If they're on the back and right, do the algorithm. If they're opposite each other, do it once from any side and try again.",
          ],
          algs: [{ name: "Swap edges", alg: "R U R' U R U2 R' U" }],
        },
        {
          title: "6. Place the yellow corners",
          body: [
            "Find a corner that's in the right spot (it touches its three colors, even if it's twisted). Hold it at the front right and do the algorithm until all four corners are in place.",
            "If no corner is in the right spot, do the algorithm once from anywhere first.",
          ],
          algs: [{ name: "Cycle corners", alg: "U R U' L' U R' U' L" }],
        },
        {
          title: "7. Twist the yellow corners",
          body: [
            "Hold the cube with an unsolved corner at the front right. Repeat R' D' R D until that corner's yellow faces up. The rest of the cube will look scrambled; that's expected.",
            "Then turn only U to bring the next unsolved corner to the front right, and repeat. When every corner is done, the rest of the cube fixes itself. Turn U to finish.",
          ],
          goal: { show: topFace(3), caption: "Solved!" },
          algs: [{ name: "Twist corner", alg: "R' D' R D", note: "Repeat 2 or 4 times per corner" }],
          tip: "Never turn the whole cube during this step, only U. That's the most common way to get lost.",
        },
      ],
    },
    {
      id: "cfop",
      title: "CFOP with 2-look last layer",
      level: "Intermediate",
      summary:
        "The step up from beginner. Solve the first two layers together and the last layer in four short steps. This gets most people to sub-30, and many to sub-20.",
      steps: [
        {
          title: "Cross on the bottom",
          body: [
            "Solve the white cross like before, but do it on the bottom so you never have to flip the cube. Plan the whole cross during inspection: it never takes more than 8 moves.",
          ],
          goal: { show: bottomCross(3), view: "x2", caption: "Cross, shown from below" },
        },
        {
          title: "F2L: first two layers",
          body: [
            "Instead of solving corners and then edges, pair each white corner with the middle edge that goes next to it in the top layer, then insert the pair in one go. That's four pairs instead of eight separate pieces.",
            "Start with the simple cases: the corner and edge side by side, ready to drop in with R U R' or its mirror. Learn the rest intuitively by watching how the pieces move.",
          ],
          goal: { show: firstTwoLayers(3), caption: "All four pairs inserted" },
          algs: [
            { name: "Basic insert", alg: "R U R'" },
            { name: "Basic insert (left)", alg: "L' U' L" },
            { name: "Split and pair", alg: "R U' R' U R U R'" },
          ],
          tip: "Look for the next pair while you insert the current one. Pauses between pairs are where most time goes.",
        },
        {
          title: "2-look OLL",
          body: [
            "Make the whole top yellow in two steps: first the yellow cross (3 cases), then the corners (7 cases). The full set is below.",
          ],
          goal: { show: topFace(3), caption: "Top face all yellow" },
        },
        {
          title: "2-look PLL",
          body: [
            "Move the last layer pieces into place: first the corners (2 algorithms), then the edges (4 algorithms). After this you can solve the cube with just 16 algorithms.",
          ],
        },
      ],
    },
    {
      id: "full-cfop",
      title: "Full CFOP",
      level: "Advanced",
      summary:
        "Do the last layer in two looks instead of four with full OLL (57 algorithms) and PLL (21). Learn PLL first: it's fewer algorithms and you'll use them every solve.",
      steps: [
        {
          title: "Full PLL",
          body: [
            "Learn the remaining PLLs a few at a time, starting with the ones you see most (T, Y, Ja, Jb). Recognize cases by the headlights (two matching corner stickers on one side) and blocks of matching colors.",
          ],
        },
        {
          title: "Full OLL",
          body: [
            "Group the 57 cases by shape (dots, lines, Ls, squares) and learn them a group at a time. Many share the same moves with small changes.",
          ],
        },
        {
          title: "Other methods",
          body: [
            "Roux builds two blocks on the left and right, then finishes with mostly M and U moves. It uses fewer moves and is popular for one-handed solving.",
            "ZZ starts by orienting every edge, so the rest of the solve needs only R, U and L moves. Both are worth trying once you're comfortable with CFOP.",
          ],
        },
      ],
    },
  ],
  algSets: [
    {
      id: "oll-edges",
      title: "2-look OLL: edges",
      description: "Make a yellow cross. A dot uses the line algorithm, then the L.",
      diagram: "oll",
      algs: OLL_EDGES,
    },
    {
      id: "oll-corners",
      title: "2-look OLL: corners",
      description: "With the yellow cross done, these turn every corner yellow side up.",
      diagram: "oll",
      algs: OLL_CORNERS,
    },
    {
      id: "pll-corners",
      title: "2-look PLL: corners",
      description: "Headlights on one side mean an adjacent swap (T perm, headlights on the left). No headlights means a diagonal swap (Y perm).",
      diagram: "pll",
      algs: PLL_CORNERS,
    },
    {
      id: "pll-edges",
      title: "2-look PLL: edges",
      description: "With the corners solved, one of these finishes the cube.",
      diagram: "pll",
      algs: PLL_EDGES,
    },
    {
      id: "pll",
      title: "Full PLL",
      description: "All 21 permutation cases. Arrows show where each piece moves.",
      diagram: "pll",
      algs: PLL,
    },
    {
      id: "oll",
      title: "Full OLL",
      description: "All 57 orientation cases. Gray stickers are any color but yellow.",
      diagram: "oll",
      algs: OLL,
    },
  ],
  tips: [
    "Use the 15 second inspection to plan your whole cross, not just the first edge. Turn on inspection in the timer to practice it.",
    "Turn slower than you think you need to. Smooth turning with no pauses beats fast bursts.",
    "Track your average of 5, not your best single. Classic mode on the timer is built for it.",
    "Learn finger tricks early: flick U turns with your index fingers and do R moves with your wrist.",
    "When you learn a new algorithm, drill it slowly 20 times before trying it fast.",
  ],
  resources: [
    { name: "J Perm: 3x3 beginner to advanced", url: "https://jperm.net/3x3", description: "Video tutorials from first solve to full CFOP." },
    { name: "J Perm: OLL", url: "https://jperm.net/algs/oll", description: "Every OLL with alternatives and finger tricks." },
    { name: "J Perm: PLL", url: "https://jperm.net/algs/pll", description: "Every PLL with recognition tips." },
    { name: "Speed Cube Database", url: "https://www.speedcubedb.com/a/3x3/OLL", description: "Huge algorithm database with votes on the best versions." },
    { name: "Ruwix beginner method", url: "https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/", description: "Step by step written guide with pictures." },
    { name: "CubeSkills", url: "https://www.cubeskills.com/tutorials", description: "In-depth tutorials by Feliks Zemdegs." },
  ],
};
