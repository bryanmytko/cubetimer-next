import { Tutorial } from "../types";

export const skewb: Tutorial = {
  slug: "skewb",
  name: "Skewb",
  tagline: "A cube that turns around its corners. It doesn't have a lot of pieces so solves are pretty short.",
  difficulty: 2,
  icon: "skewb",
  facts: [
    { label: "WCA event", value: "Skewb" },
    { label: "Positions", value: "3,149,280" },
    { label: "God's number", value: "11 moves" },
    { label: "Moving pieces", value: "8 corners, 6 centers" },
  ],
  overview: [
    "The Skewb looks like a cube but every cut goes diagonally through it, so each turn moves half the puzzle around a corner. It has 8 corners and 6 square centers, and nothing else.",
    "Four of the corners can only twist in place relative to each other, and the other four move around. That's why the Skewb has so few positions and why solves take only around 10 moves.",
    "Turns feel strange at first because they twist the puzzle out of a cube shape. It'll feel comfortable once you play with it a bunch.",
  ],
  notation: {
    intro: [
      "Each move turns half the puzzle a third of a turn around one corner. WCA scrambles use four moves, R, U, L and B, each around a different corner, with ' for counter-clockwise.",
      "Tutorials use varying letters for the corners so check the notation diagram in whichever guide you follow before learning the algorithms.",
    ],
    moves: [
      { move: "R", description: "Turn around one corner, clockwise looking at that corner" },
      { move: "R'", description: "The same corner, counter-clockwise" },
      { move: "U", description: "Turn around another corner" },
    ],
  },
  stages: [
    {
      id: "beginner",
      title: "Beginner Method",
      level: "Beginner",
      summary:
        "Solve one face and its four corners, then solve the four top corners, then the last centers.",
      steps: [
        {
          title: "1. First layer",
          body: [
            "Pick a color and solve its center along with the four corners around it, so the sides of the layer match each other. This is intuitive: turn corners into place one at a time, keeping the ones you've done out of the way.",
          ],
        },
        {
          title: "2. Top corners",
          body: [
            "With the first layer on the bottom, twist and move the four top corners into place. Beginner guides use a four-move pattern called the sledgehammer, repeated from different angles.",
          ],
        },
        {
          title: "3. Centers",
          body: [
            "Only the centers are left. They move in a cycle of three or swap in pairs, and each case has a short algorithm built from the same moves.",
          ],
        },
      ],
    },
    {
      id: "intermediate",
      title: "Sarah's Intermediate",
      level: "Intermediate",
      link: "https://sarah.cubing.net/skewb/my-method#intermediate-variation",
      summary:
        "A method by Sarah Strong. Her site walks through the steps and the algorithms.",
      steps: [],
    },
    {
      id: "advanced",
      title: "Sarah's Advanced",
      level: "Advanced",
      link: "https://sarah.cubing.net/skewb/my-method#advanced-variation",
      summary:
        "Sarah Strong's full method. Solve one face then everything else in one move. Her site has everything you'll need.",
      steps: [],
    },
  ],
  tips: [
    "Solve the first layer with as few moves as you can. Everything after it is algorithms.",
    "Learn to see the puzzle in terms of corners, not faces. Centers follow the corners around them.",
    "Turn with your wrists rather than your fingers. Skewb moves are big.",
  ],
  resources: [
    { name: "Sarah's Skewb method", url: "https://sarah.cubing.net/skewb/my-method", description: "Sarah Strong's guide to her beginner, intermediate and advanced variations, with algorithms." },
    { name: "Ruwix Skewb guide", url: "https://ruwix.com/twisty-puzzles/skewb-cube-puzzle-solution/", description: "Beginner solution with notation diagrams and algorithms." },
    { name: "CubeSkills", url: "https://www.cubeskills.com/tutorials", description: "Tutorials for every WCA puzzle." },
  ],
};

export const megaminx: Tutorial = {
  slug: "megaminx",
  name: "Megaminx",
  tagline: "Twelve faces and it looks beefy but honestly if you can solve a 3x3 you can solve it pretty easy.",
  difficulty: 3,
  icon: "megaminx",
  facts: [
    { label: "WCA event", value: "Megaminx" },
    { label: "Positions", value: "1 × 10⁶⁸" },
    { label: "Moving pieces", value: "20 corners, 30 edges" },
    { label: "Method", value: "Layer by layer, like CFOP" },
  ],
  overview: [
    "A Megaminx is a dodecahedron with 12 five-sided faces. Each face has a fixed center, 5 edges and 5 corners. Despite the size, it works a lot like a 3x3: pieces move the same way, and most 3x3 F2L tricks carry over.",
    "The usual method is layer by layer: a star on the bottom face, the first layer, the rest of the first two layers around it (F2L), the faces around the middle (S2L), and finally the last layer.",
    "Solves can be long!",
  ],
  notation: {
    intro: [
      "For solving, notation works like a 3x3: R, U, F and so on turn a face a fifth of a turn clockwise. R2 turns it two fifths.",
      "WCA scrambles use a different notation that turns big chunks of the puzzle at once: R++ and D++ turn two fifths of almost the whole puzzle, and U turns the top face a fifth.",
    ],
    moves: [
      { move: "R", description: "Right face a fifth of a turn clockwise" },
      { move: "R2", description: "Right face two fifths of a turn" },
      { move: "U'", description: "Top face a fifth counter-clockwise" },
      { move: "R++", description: "Scrambles only: everything but the left part, two fifths" },
      { move: "D++", description: "Scrambles only: everything but the top part, two fifths" },
    ],
  },
  stages: [
    {
      id: "beginner",
      title: "Layer by layer",
      level: "Beginner",
      summary:
        "Solve the Megaminx outwards from the bottom face, using 3x3 skills for almost everything. Only the last layer is different and needs new algorithms.",
      steps: [
        {
          title: "1. Star",
          body: [
            "Pick a bottom color, usually white, and place its five edges around the center so their side colors match the neighboring centers, like a 3x3 cross with one extra piece.",
          ],
        },
        {
          title: "2. First layer corners",
          body: [
            "Insert the five bottom corners, just like 3x3 corners. Put a corner above its spot and repeat R U R' U' until it works.",
          ],
        },
        {
          title: "3. Second layer",
          body: [
            "Fill in the five edges between the first layer corners. Pairing each edge with the corner above it, the same as 3x3 F2L, saves a lot of moves.",
          ],
        },
        {
          title: "4. The middle (S2L)",
          body: [
            "Work around the puzzle filling in each of the five faces that border the bottom half. Do them one face at a time, finishing each face's pieces before moving on.",
          ],
          tip: "Turn the puzzle so the face you're working on is always in front, since there is so many pieces you can get lost if you move it weird.",
        },
        {
          title: "5. Last layer",
          body: [
            "Only the top face is left. It's done in four steps, just like a beginner 3x3. Orient the edges (make a star), orient the corners, then permute the edges and corners. Each step has a few algorithms.",
          ],
        },
      ],
    },
    {
      id: "intermediate",
      title: "2-look last layer",
      level: "Intermediate",
      summary:
        "Do the last layer in two steps instead of four, like 2-look OLL and PLL on the 3x3. This is the biggest single speedup after you can solve it.",
      steps: [
        {
          title: "Steps",
          body: [
            "Learn the edge and corner orientation cases together first, then the permutation cases. Many Megaminx algorithms are close relatives of 3x3 ones.",
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "Look ahead",
      level: "Advanced",
      summary:
        "At high levels, Megaminx is all about never stopping. Fast solvers turn slower than you'd expect but are always looking ahead to the next thing they're gonna do.",
      steps: [
        {
          title: "Practice",
          body: [
            "Do slow solves where you never stop turning, it's much better than trying to just turn everything as fast as you can.",
          ],
        },
      ],
    },
  ],
  tips: [
    "Pick a fixed color order for S2L and always solve in that order.",
    "Use 3x3 F2L techniques: pair corners and edges before inserting them.",
    "A good Megaminx has lots of corner cutting. A new cube can be a pain, much easier on a worked in one.",
  ],
  resources: [
    { name: "Ruwix Megaminx guide", url: "https://ruwix.com/twisty-puzzles/megaminx-gigaminx-teraminx-petaminx/", description: "Beginner method with last layer algorithms." },
    { name: "Speed Cube Database: Megaminx OLL", url: "https://www.speedcubedb.com/a/Megaminx/OLL", description: "Orientation algorithms for the last layer." },
    { name: "Speed Cube Database: Megaminx PLL", url: "https://www.speedcubedb.com/a/Megaminx/PLL", description: "Permutation algorithms for the last layer." },
  ],
};

export const squareOne: Tutorial = {
  slug: "square-1",
  name: "Square-1",
  tagline: "A cube that changes shape. You have to first make it a cube then solve it.",
  difficulty: 4,
  icon: "square-1",
  facts: [
    { label: "WCA event", value: "Square-1" },
    { label: "Moving pieces", value: "8 corners, 8 edges, 2 middle halves" },
    { label: "Turn size", value: "30° per step" },
    { label: "Popular method", value: "Vandenbergh" },
  ],
  overview: [
    "The Square-1 has a top and bottom layer made of corners (wide kite shapes, 60°) and edges (thin triangles, 30°), plus a middle layer split into two halves. Turning the right half (a slice) swaps pieces between the top and bottom, which changes the puzzle's shape.",
    "Solving happens in two parts: first get it back into a cube shape (called cubeshape), then solve it like a cube while keeping that shape.",
    "Learning cubeshape is the hardest part for most people. After that it's a handful of algorithms, and most use the same few moves.",
  ],
  notation: {
    intro: [
      "Moves are written as (x, y) for the top and bottom layers, then / for a slice. x and y are twelfths of a turn (30° each), clockwise, so (3, 0) turns the top a quarter turn.",
      "The slice always turns the right half of the puzzle 180°. Hold the puzzle with the slice line running front to back.",
    ],
    moves: [
      { move: "(1,0)", description: "Top layer 30° clockwise" },
      { move: "(0,-1)", description: "Bottom layer 30° counter-clockwise" },
      { move: "(3,3)", description: "Both layers a quarter turn" },
      { move: "/", description: "Slice: turn the right half 180°" },
    ],
  },
  stages: [
    {
      id: "beginner",
      title: "Shape, then solve",
      level: "Beginner",
      summary:
        "Get the cube shape back, then solve the top and bottom layers in a few steps: corners, then edges. A final fix handles the middle layer and parity.",
      steps: [
        {
          title: "1. Cubeshape",
          body: [
            "Get both layers back into squares. Beginner methods first gather the pieces into a few easy to spot shapes, then use a short sequence for each shape to get back to a cube.",
            "There are only a handful of shapes to learn, and after a while you'll recognize them instantly.",
          ],
          tip: "Count pieces as you go. A layer needs exactly 4 corners and 4 edges to be a square.",
        },
        {
          title: "2. Orient the layers",
          body: [
            "Put all the top colored corners and edges in the top layer and the bottom colored ones in the bottom layer, keeping the cube shape.",
          ],
        },
        {
          title: "3. Permute the corners",
          body: [
            "Swap corners within and between layers until all eight are in the right place.",
          ],
        },
        {
          title: "4. Permute the edges",
          body: [
            "Do the same for the edges. Most cases are solved with one or two short algorithms.",
          ],
        },
        {
          title: "5. Middle layer and parity",
          body: [
            "If the middle layer is flipped, or two edges are swapped with nothing else wrong (parity), use the fix-up algorithms. Parity happens on about half of solves with simple methods.",
          ],
        },
      ],
    },
    {
      id: "intermediate",
      title: "Vandenbergh",
      level: "Intermediate",
      summary:
        "The standard speed method: cubeshape, then orient corners and edges, then permute corners, then edges and parity together. Around 60 algorithms for the full set.",
      steps: [
        {
          title: "Steps",
          body: [
            "Plan cubeshape in inspection: there are only a few moves in it. Learn orientation and permutation as small sets, starting with the cases you see most.",
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "Parity tracking",
      level: "Advanced",
      summary:
        "Fast solvers work out whether a solve will have parity during cubeshape, and choose a version of cubeshape that avoids it. This skips the slowest step entirely.",
      steps: [
        {
          title: "Why it works",
          body: [
            "Each cubeshape case can be solved in different ways, and some change parity while others don't. Tracking a couple of pieces during inspection tells you which one to use.",
          ],
        },
      ],
    },
  ],
  tips: [
    "Slices are fast moves. Practice doing / with your right hand while your left keeps hold of the puzzle.",
    "Learn cubeshape properly before anything else. Guessing your way through it wastes the most time.",
    "Keep the slice line running front to back, and always slice the right side.",
  ],
  resources: [
    { name: "Ruwix Square-1 guide", url: "https://ruwix.com/twisty-puzzles/square-1-back-to-square-one/", description: "Beginner solution including cubeshape and parity." },
    { name: "CubeSkills", url: "https://www.cubeskills.com/tutorials", description: "Tutorials for every WCA puzzle." },
  ],
};

export const clock: Tutorial = {
  slug: "clock",
  name: "Clock",
  tagline: "Pieces don't move like a cube, it just has dials and pins.",
  difficulty: 3,
  icon: "clock",
  facts: [
    { label: "WCA event", value: "Clock" },
    { label: "Positions", value: "1.3 × 10¹⁵" },
    { label: "Moving parts", value: "4 wheels, 4 pins" },
    { label: "Popular method", value: "7-simul" },
  ],
  overview: [
    "Rubik's Clock has nine clocks on each side, four wheels at the corners and four pins between them. Turning a wheel turns some of the clocks, and the pins decide which ones.",
    "The four corner clocks on the front are linked to the four on the back, so there are 14 clocks to solve, not 18. Solving means getting every clock to point at 12.",
    "There's no moving of pieces and no colors, so Clock feels completely different from cubes. It's all about choosing the right pins and counting the right number of hours.",
  ],
  notation: {
    intro: [
      "A move names the pins that are up and how far to turn: UR3+ means push up only the top right pin and turn three hours clockwise. U means both top pins, R both right pins, and ALL every pin.",
      "y2 means flip the clock over to the other side. Scrambles do the front, then y2, then the back.",
    ],
    moves: [
      { move: "UR3+", description: "Top right pin up, turn 3 hours clockwise" },
      { move: "DL2-", description: "Bottom left pin up, turn 2 hours counter-clockwise" },
      { move: "U1+", description: "Both top pins up, 1 hour clockwise" },
      { move: "ALL6+", description: "Every pin up, 6 hours: turns every front clock" },
      { move: "y2", description: "Flip the clock over" },
    ],
  },
  stages: [
    {
      id: "beginner",
      title: "One side at a time",
      level: "Beginner",
      summary:
        "Solve the middle and edges of the back, flip the clock, then solve the front. The corners take care of both sides at once.",
      steps: [
        {
          title: "1. Back side cross",
          body: [
            "On one side, get the center clock and the four edge clocks (top, bottom, left, right) to point the same way, then to 12. Choose pins so the turn moves only the clocks you need, and use the corners to adjust.",
          ],
          tip: "Experiment first: push up one pin and turn a wheel to see exactly which clocks move.",
        },
        {
          title: "2. Front side cross",
          body: [
            "Flip the clock. Solve the front center and edges the same way, using pin settings that don't disturb the back side you just finished.",
          ],
        },
        {
          title: "3. Corners",
          body: [
            "Solve the four front corners one at a time with one pin up and the wheel next to it. Because front and back corners are linked, this solves the back corners too.",
          ],
        },
      ],
    },
    {
      id: "intermediate",
      title: "7-simul",
      level: "Intermediate",
      summary:
        "The standard speed method: seven moves per side, each calculated during inspection by looking at a few clocks. Moves are done by turning two wheels at once.",
      steps: [
        {
          title: "How it works",
          body: [
            "Each move solves one clock using pin settings that keep the others as they are, and you work out every turn amount by simple addition and subtraction of the clocks you can see.",
            "It takes practice to calculate quickly, but the solve itself becomes very fast: the best solvers finish in a few seconds.",
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "Memorization",
      level: "Advanced",
      summary:
        "At the top level, solvers calculate the whole solve during inspection and execute it without looking.",
      steps: [
        {
          title: "Inspection",
          body: [
            "Use all 15 seconds to calculate the front side and as much of the back as you can.",
          ],
        },
      ],
    },
  ],
  tips: [
    "Hold the clock the same way every time, with your thumbs on the wheels and fingers on the pins.",
    "Don't force the pins. Clocks are easy to damage if you turn a wheel with pins half pushed in.",
    "Practice the arithmetic separately. Clock speed comes from calculating, not from turning.",
  ],
  resources: [
    { name: "Ruwix Clock guide", url: "https://ruwix.com/twisty-puzzles/rubiks-clock-mechanical-puzzle-solution-machanism/", description: "Beginner solution with pin diagrams." },
    { name: "WCA Regulations", url: "https://www.worldcubeassociation.org/regulations/", description: "Official notation for every puzzle, including Clock." },
  ],
};
