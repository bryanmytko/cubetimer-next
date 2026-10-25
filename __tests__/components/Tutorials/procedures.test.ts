// Follows the beginner instructions exactly as written, from every case
// they can start from, and checks they always finish
import {
  Cube,
  applyAlg,
  isSolved,
  solved,
} from "../../../src/lib/cube/nxn";
import { caseFor } from "../../../src/lib/cube/lastLayer";
import { TWO_OLL, twoByTwo } from "../../../src/components/Tutorials/content/twoByTwo";
import { OLL_CORNERS, OLL_EDGES } from "../../../src/components/Tutorials/content/algs3x3";
import { threeByThree } from "../../../src/components/Tutorials/content/threeByThree";

const AUFS = ["", "U", "U2", "U'"];

const stepAlg = (tutorial: typeof threeByThree, name: string) =>
  tutorial.stages[0].steps.flatMap((s) => s.algs || []).find((a) => a.name === name)!.alg;

const at = (cube: Cube, pos: string) =>
  cube.stickers.filter((s) => s.pos.join() === pos);

describe("2x2 step 2: orient the top with Sune", () => {
  const sune = stepAlg(twoByTwo, "Sune");
  const yellowUp = (c: Cube) =>
    c.stickers.filter((s) => s.pos[1] === 1 && s.normal[1] === 1 && s.color === "U");
  const frontLeftYellow = (c: Cube) => at(c, "-1,1,1").find((s) => s.color === "U")!;

  // Turn U until the hold the instructions ask for, then do the Sune
  const followOnce = (c: Cube): Cube => {
    const count = yellowUp(c).length;
    const wanted =
      count === 1
        ? (x: Cube) => frontLeftYellow(x).normal[1] === 1
        : count === 0
          ? (x: Cube) => frontLeftYellow(x).normal[0] === -1
          : (x: Cube) => frontLeftYellow(x).normal[2] === 1;
    const held = AUFS.map((auf) => applyAlg(c, auf)).find(wanted);
    if (!held) throw new Error("No way to hold the cube as described");
    return applyAlg(held, sune);
  };

  it.each(TWO_OLL.flatMap((a) => AUFS.map((auf) => [a.name, auf])))(
    "solves %s (from %s)",
    (name, auf) => {
      let cube = applyAlg(caseFor(2, TWO_OLL.find((a) => a.name === name)!.alg), auf);
      let sunes = 0;
      while (yellowUp(cube).length < 4 && sunes < 6) {
        cube = followOnce(cube);
        sunes++;
      }
      expect(yellowUp(cube)).toHaveLength(4);
    },
  );
});

describe("3x3 step 4: yellow cross", () => {
  const line = stepAlg(threeByThree, "Line");
  const lShape = stepAlg(threeByThree, "L shape");
  // Top edge stickers: back, left, right, front
  const yellow = (c: Cube) =>
    ["0,2,-2", "-2,2,0", "2,2,0", "0,2,2"].map(
      (pos) => at(c, pos).find((s) => s.normal[1] === 1)!.color === "U",
    );
  const isCross = (c: Cube) => yellow(c).every(Boolean);

  // Edge flips are all that matter here: every pattern from every angle
  const starts = OLL_EDGES.flatMap((a) =>
    AUFS.map((auf) => [a.name, auf, applyAlg(caseFor(3, a.alg), auf)] as const),
  );

  const follow = (start: Cube, dotAlg: string) => {
    let cube = start;
    for (let i = 0; i < 3 && !isCross(cube); i++) {
      const turned = AUFS.map((auf) => applyAlg(cube, auf));
      const heldL = turned.find((c) => yellow(c).join() === "true,true,false,false");
      const heldLine = turned.find((c) => yellow(c).join() === "false,true,true,false");
      if (heldL) cube = applyAlg(heldL, lShape);
      else if (heldLine) cube = applyAlg(heldLine, line);
      else cube = applyAlg(cube, dotAlg);
    }
    return cube;
  };

  it.each(starts)("solves %s (from %s) when a dot gets the line algorithm", (_, __, start) => {
    expect(isCross(follow(start, line))).toBeTruthy();
  });

  it.each(starts)("solves %s (from %s) when a dot gets the L algorithm", (_, __, start) => {
    expect(isCross(follow(start, lShape))).toBeTruthy();
  });

  it.each(["Line", "L shape"])("%s solves its case in one go", (name) => {
    const alg = stepAlg(threeByThree, name);
    const start = starts.find(([n, auf]) => n === name && auf === "")![2];
    expect(isCross(applyAlg(start, alg))).toBeTruthy();
  });
});

describe("3x3 steps 5 to 7", () => {
  // Front right, back right, back left, front left
  const CORNERS = ["2,2,2", "2,2,-2", "-2,2,-2", "-2,2,2"];
  const placedCount = (c: Cube) =>
    CORNERS.filter((pos) => at(c, pos)[0].home.join() === pos).length;
  const yellowUp = (c: Cube) =>
    CORNERS.filter((pos) => at(c, pos).find((s) => s.color === "U")!.normal[1] === 1).length;
  const frontLeftYellow = (c: Cube) => at(c, "-2,2,2").find((s) => s.color === "U")!;

  // Front, right, back, left edges, and whether each matches its center
  const EDGE_SIDES: Array<[string, string, string]> = [
    ["0,2,2", "0,0,1", "F"],
    ["2,2,0", "1,0,0", "R"],
    ["0,2,-2", "0,0,-1", "B"],
    ["-2,2,0", "-1,0,0", "L"],
  ];
  const edgeMatches = (c: Cube) =>
    EDGE_SIDES.map(
      ([pos, normal, center]) =>
        at(c, pos).find((s) => s.normal.join() === normal)!.color === center,
    );

  // Holding the cube turned by y^k and doing an algorithm is the same as
  // doing it wrapped in that rotation, which keeps the centers in place.
  // Seen from hold k, side i (front, right, back, left) is side i + k
  const HOLDS = ["", "y", "y2", "y'"];
  const fromHold = (cube: Cube, k: number, alg: string) =>
    applyAlg(cube, `${HOLDS[k]} ${alg} ${HOLDS[(4 - k) % 4]}`);

  const swap = stepAlg(threeByThree, "Swap corners");
  const sune = stepAlg(threeByThree, "Sune");
  const ua = stepAlg(threeByThree, "Ua");
  const ub = stepAlg(threeByThree, "Ub");

  // Every last layer with the cross done, found by searching outward from
  // solved with moves that keep the first two layers and the cross
  const starts = (() => {
    const key = (c: Cube) =>
      c.stickers
        .filter((s) => s.pos[1] === 2)
        .map((s) => `${s.pos}${s.normal}${s.color}`)
        .sort()
        .join();
    const found = new Map<string, Cube>([[key(solved(3)), solved(3)]]);
    let frontier = [solved(3)];
    while (frontier.length) {
      const next: Array<Cube> = [];
      frontier.forEach((cube) =>
        ["U", sune, swap, ua].forEach((alg) => {
          const c = applyAlg(cube, alg);
          if (!found.has(key(c))) {
            found.set(key(c), c);
            next.push(c);
          }
        }),
      );
      frontier = next;
    }
    return Array.from(found.values());
  })();

  const placedAt = (c: Cube) => CORNERS.map((pos) => at(c, pos)[0].home.join() === pos);

  const step5 = (start: Cube) => {
    let cube = start;
    for (let i = 0; i < 3; i++) {
      const turned = AUFS.map((auf) => applyAlg(cube, auf));
      const done = turned.find((c) => placedCount(c) === 4);
      if (done) return done;

      // Turn U until at least two corners are in the right spot
      const two = turned.find((c) => placedCount(c) === 2);
      if (!two) throw new Error("No turn of U puts two corners in place");

      // Hold the two wrong corners on the right (front right and back
      // right). Seen from hold k, corner j is corner j + k
      const wrong = placedAt(two).map((ok) => !ok);
      const k = HOLDS.findIndex((_, h) => wrong[h] && wrong[(h + 1) % 4]);
      cube = k === -1 ? applyAlg(two, swap) : fromHold(two, k, swap);
    }
    throw new Error("Corners not placed");
  };

  const step6 = (start: Cube) => {
    let cube = start;
    for (let i = 0; i < 4 && yellowUp(cube) < 4; i++) {
      // A fish: its yellow corner at the front left. Anything else: the front
      // left corner's yellow facing left
      const wanted =
        yellowUp(cube) === 1
          ? (c: Cube) => frontLeftYellow(c).normal[1] === 1
          : (c: Cube) => frontLeftYellow(c).normal[0] === -1;
      const held = AUFS.map((auf) => applyAlg(cube, auf)).find(wanted);
      if (!held) throw new Error("No way to hold the cube as described");
      cube = applyAlg(held, sune);
    }
    return cube;
  };

  const step7 = (start: Cube): Cube => {
    const aligned = AUFS.map((auf) => applyAlg(start, auf)).find((c) => placedCount(c) === 4);
    if (!aligned) throw new Error("The corners moved out of their spots");

    let cube: Cube = aligned;
    for (let i = 0; i < 2 && !edgeMatches(cube).every(Boolean); i++) {
      const solvedEdge: number = edgeMatches(cube).findIndex(Boolean);
      if (solvedEdge === -1) {
        cube = applyAlg(cube, ua);
      } else {
        // Hold the solved edge at the back (side 2), then Ua or Ub
        const k = (solvedEdge + 2) % 4;
        const held: Cube = cube;
        const done = [ua, ub]
          .map((alg) => fromHold(held, k, alg))
          .find((c) => edgeMatches(c).every(Boolean));
        if (!done) throw new Error("Neither U perm solved it");
        cube = done;
      }
    }
    return cube;
  };

  it("starts from every last layer with the cross done", () => {
    // 27 corner twists x 24 corner orders x 12 edge orders that match them
    expect(starts).toHaveLength(27 * 24 * 12);
  });

  it("solves every last layer by following steps 5, 6 and 7", () => {
    const unsolved = starts.filter((start) => !isSolved(step7(step6(step5(start)))));
    expect(unsolved).toHaveLength(0);
  });

  it("draws step 6's two pictures the way the text says to hold them", () => {
    const step = threeByThree.stages[0].steps.find((s) => s.title.includes("Orient"))!;
    const [fish, other] = step.cases!.map(({ alg }) => caseFor(3, alg));

    expect(yellowUp(fish)).toBe(1);
    expect(frontLeftYellow(fish).normal[1]).toBe(1);
    expect(frontLeftYellow(other).normal[0]).toBe(-1);
  });
});

describe("2-look OLL corners", () => {
  it("are the 3x3 versions of the 2x2 OLL cases", () => {
    expect(OLL_CORNERS.map((a) => a.name)).toEqual(TWO_OLL.map((a) => a.name));
  });
});
