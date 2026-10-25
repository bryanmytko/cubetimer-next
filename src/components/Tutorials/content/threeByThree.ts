import { invertAlg } from "../../../lib/cube/nxn";
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

const INSERT_CORNER = "R U R' U'";
const SWAP_CORNERS = "L U' R' U L' U' R U2";
const SUNE = "R U R' U R U2 R'";
// Ua is the left-hand mirror of Ub
const UB = "R2 U R U R' U' R' U' R' U R'";
const UA = "L2 U' L' U' L U L U L U' L";

const INSERT_RIGHT = "U R U' R' U' F' U F";

export const threeByThree: Tutorial = {
  slug: "3x3",
  name: "3x3",
  tagline: "The famous puzzle from the 80's craze. Learn to solve it without smashing it with a hammer.",
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
    "The 3x3 has 6 fixed centers, 12 edges (2 colors) and 8 corners (3 colors). All pieces on a 3x3 are unique, so for example there will only every be one corner with Red/White/Green. Centers never move relative to each other (you can take your puzzle apart to see why)! Since the centers don't move, whatever color the center is means that side will eventually be that color.",
    "Almost everyone starts with the layer by layer beginner method. Solve the bottom layer, then the middle, then the top. Once that's in your muscle memory you can move to CFOP (Cross, F2L, OLL, PLL) which is the method most speedcubers use. It's the same idea but combines some steps and adds new algorithms making the transition fun since each new move you learn can just be added to your toolbox without having to unlearn everything you already know.",
    "This guide holds the cube with white on the bottom and yellow on top, which is arbitrary but usually the standard. White usually has the center sticker on it so it makes finding that face easier. Our diagrams show green in front but that also doesn't really matter.",
  ],
  notation: {
    intro: [
      "Algorithms are simply a list of turns. Each letter is a face, and you turn it clockwise as if you were looking straight at that face (so the front moves like a clock but the back moves the opposite, which you can imagine if you were looking at it it would just become the front)",
      "Keep the cube in the same position for the whole move set unless it tells you to rotate (x, y or z).",
    ],
    moves: [...CUBE_MOVES, ...SLICE_MOVES],
  },
  stages: [
    {
      id: "beginner",
      title: "Layer by layer",
      level: "Beginner",
      summary:
        "Solve one layer at a time using minimal algorithms which have been curated to be the ones that feel natural/comfortable/pleasing to execute. Some folks get it quick but don't be discouraged if it takes you longer. I promoise it will click eventually.",
      steps: [
        {
          title: "1. White cross",
          body: [
            "Hold the cube with white on top. Bring the four white edges up around the white center making sure the other color of the edge matches the center it's touching.",
            "This is the most intuitive step and can take a while before it makes sense. Spend some time just playing with the cube and get used to what it can and can't do. There's no algorithm for this step. Move one edge at a time, and keep the edges you've already placed out of the way. If an edge is in the right spot but flipped, take it out and put it back the other way.",
          ],
          goal: { show: bottomCross(3), view: "x2", caption: "White cross, matching the side centers" },
        },
        {
          title: "2. White corners",
          body: [
            "Flip the cube so white is on the bottom. Find a white corner in the top layer and turn U until it sits directly above where it belongs (between its two side colors).",
            "Hold that spot at the front right and repeat R U R' U' until the corner drops in solved. It takes 1, 3 or 5 repeats. Do the same for the other three corners.",
          ],
          setup: {
            // Running one insert backwards leaves the corner above its slot
            alg: invertAlg(INSERT_CORNER),
            show: (s) => bottomCross(3)(s) || s.home.join() === "2,-2,2",
            caption: "Corner above its slot with white facing right: one R U R' U' drops it in",
          },
          goal: { show: firstLayer(3), caption: "Whole white layer solved" },
          algs: [{ name: "Insert corner", alg: INSERT_CORNER, note: "Repeat until the corner is solved" }],
          followUp: {
            text: "If you're clever you can use the inverse algorithm to insert the opposite way and save a repeat.",
            algs: [
              { name: "Insert corner (inverse)", alg: "U R U' R'", note: "When the white sticker faces you, this does it in one go instead of five" },
            ],
          },
          tip: "If a white corner is stuck in the bottom layer in the wrong place, do R U R' U' once to pop it into the top layer.",
        },
        {
          title: "3. Middle layer edges",
          body: [
            "Find an edge in the top layer without yellow on it. Turn U so its front color matches the front center, forming an upside-down T.",
            "If the edge's top color matches the right center, insert it to the right. If it matches the left, insert it to the left.",
          ],
          setup: {
            // Running the right insert backwards puts its edge in the case
            alg: invertAlg(INSERT_RIGHT),
            show: (s) => firstLayer(3)(s) || s.home.join() === "2,0,2",
            caption: "Upside-down T. Orange on top matches the right center, so insert right",
          },
          goal: { show: firstTwoLayers(3), caption: "First two layers solved" },
          algs: [
            { name: "Insert right", alg: INSERT_RIGHT },
            { name: "Insert left", alg: "U' L' U L U F U' F'" },
          ],
          tip: "If an edge is in the middle layer but in the wrong spot or flipped, insert any top edge there to kick it out.",
        },
        {
          title: "4. Yellow cross",
          body: [
            "Look at the yellow stickers on top, ignoring corners. You'll see a dot, an L shape, a line or a cross.",
            "For a line, hold it horizontally and do the line algorithm. For an L, hold it in the back left and do the L algorithm. Either way you get the cross in one go.",
            "A dot takes either algorithm from any side, and then you'll have an L or a line.",
          ],
          goal: { show: topCross(3), caption: "Yellow cross on top" },
          cases: [
            { alg: OLL_EDGES[2].alg, only: "edges", caption: "Dot: either algorithm, from any side" },
            { alg: OLL_EDGES[1].alg, only: "edges", caption: "L shape: hold it in the back left" },
            { alg: OLL_EDGES[0].alg, only: "edges", caption: "Line: hold it horizontally" },
          ],
          algs: [
            { name: "Line", alg: OLL_EDGES[0].alg, note: "Hold the line horizontally" },
            { name: "L shape", alg: OLL_EDGES[1].alg, note: "Hold the L in the back left" },
          ],
        },
        {
          title: "5. Place the yellow corners",
          body: [
            "Turn U and look at where the corners are. A corner is in the right spot when it sits between the three centers that match its colors, even if it's twisted.",
            "Turn U until at least two corners are in the right spot. If the two that aren't are on the same side, hold that side on the right and do the algorithm to swap them.",
            "If the two wrong corners are diagonal from each other, do the algorithm once from any side and look again.",
          ],
          cases: [
            {
              // The swap also twists corners, which clutters the picture.
              // Jb, then U', swaps the same two corners without twisting them
              alg: `${PLL.find((a) => a.name === "Jb")!.alg} U'`,
              mode: "pll",
              only: "corners",
              postAuf: "",
              size: 104,
              caption: "The two right corners swap places",
            },
          ],
          algs: [{ name: "Swap corners", alg: SWAP_CORNERS, note: "Swaps the front right and back right corners" }],
        },
        {
          title: "6. Orient the yellow corners",
          body: [
            "If exactly one corner has yellow on top, you have a fish. Hold that corner at the front left and do the Sune.",
            "Anything else: turn U until the front left corner's yellow faces left, and do the Sune. Repeat until you get a fish, then one last Sune finishes the step (sometimes it takes two from a fish).",
            "The Sune keeps the corners in their spots, so it doesn't undo step 5. You'll just need to turn U to line them back up.",
          ],
          cases: [
            {
              alg: SUNE,
              caption: "Fish: yellow corner at the front left",
            },
            {
              // Any case held this way; only the sticker that matters is shown
              alg: OLL_CORNERS.find((a) => a.name === "H")!.alg,
              only: "front-left",
              caption: "Anything else: front left yellow faces left",
            },
          ],
          goal: { show: topFace(3), caption: "Yellow face on top" },
          algs: [{ name: "Sune", alg: SUNE }],
        },
        {
          title: "7. Solve the cube!",
          body: [
            "Turn U so the corners line up with their centers. If one edge is solved, hold it at the back. Do Ua if the other three need to move counterclockwise (looking down at the top), or Ub if they need to move clockwise.",
            "If no edge is solved, do either one from any side and you'll have a solved edge to hold at the back.",
          ],
          cases: [
            { alg: UA, mode: "pll", postAuf: "", caption: "Ua: the edges move counterclockwise" },
            { alg: UB, mode: "pll", postAuf: "", caption: "Ub: the edges move clockwise" },
          ],
          goal: { show: topFace(3), caption: "Solved!" },
          algs: [
            { name: "Ua", alg: UA },
            { name: "Ub", alg: UB },
          ],
          followUp: {
            text: "🏆 Awesome, you solved the cube. Now scramble it up and do it again (and again and again)!",
          },
        },
      ],
    },
    {
      id: "cfop",
      title: "CFOP with 2-look last layer",
      level: "Intermediate",
      summary:
        "The step up from beginner. Solve the first two layers together and the last layer in four steps. The cool thing here is it's just adding new moves to the beginner method so as you learn new algs you can perform them when they come up or just use the old way you already know. You will see your times drop as you add new algorithms and once you know them all you can get to sub-20 times with this.",
      steps: [
        {
          title: "Cross on the bottom",
          body: [
            "Solve the white cross like before, but do it on the bottom so you never have to flip the cube. Plan the whole cross during inspection. It never takes more than 8 moves and usually takes only 7. It's ok if it takes more, optimal crosses are a skill you'll learn in time",
          ],
          goal: { show: bottomCross(3), view: "x2", caption: "Cross, shown from below" },
        },
        {
          title: "F2L: first two layers",
          body: [
            "Instead of solving corners and then edges, pair each white corner with the middle edge that goes next to it in the top layer, then insert the pair in one go. That's four pairs instead of eight separate pieces.",
            "Start with the simple cases like the corner and edge side by side, ready to drop in with R U R' or its mirror. Learn the rest intuitively by watching how the pieces move.",
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
            "Make the whole top yellow in two steps. 1. make a yellow cross (3 cases), then 2. solve the corners (7 cases). The full set is below.",
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
        "Do the last layer in two looks instead of four with full OLL (57 algorithms) and PLL (21). Probably learn PLL first since it's fewer algorithms and you'll use them every solve. Same idea though, you're adding new moves to your solves but can proceed with your old method for cases you don't know yet",
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
    "Don't just go for personal bests, try to practice over averages of a bunch of solves in a row. Classic mode on the timer is built for it.",
    "Learn finger tricks early. Flick U turns with your index fingers and do R moves with your wrist.",
    "When you learn a new algorithm, drill it slowly a bunch of times before trying it fast. I like to do it while watching TV or something, just getting the muscle memory without sitting down for deliberate practice",
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
