// Follows the beginner instructions exactly as written, from every case
// they can start from, and checks they always finish
import { Cube, applyAlg } from "../../../src/lib/cube/nxn";
import { caseFor } from "../../../src/lib/cube/lastLayer";
import { TWO_OLL, twoByTwo } from "../../../src/components/Tutorials/content/twoByTwo";
import { PLL, OLL_CORNERS } from "../../../src/components/Tutorials/content/algs3x3";
import { threeByThree } from "../../../src/components/Tutorials/content/threeByThree";

const AUFS = ["", "U", "U2", "U'"];

const stepAlg = (tutorial: typeof threeByThree, name: string) =>
  tutorial.stages[0].steps.flatMap((s) => s.algs || []).find((a) => a.name === name)!
    .alg;

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

describe("3x3 steps 5 and 6", () => {
  // Last layer states with the cross and yellow face done but pieces
  // unpermuted: every PLL case from every angle
  const starts = PLL.flatMap((p) =>
    AUFS.map((auf) => [p.name, auf, applyAlg(caseFor(3, p.alg), auf)] as const),
  );

  const EDGE_SIDES: Array<[string, number[]]> = [
    ["0,2,2", [0, 0, 1]],
    ["2,2,0", [1, 0, 0]],
    ["0,2,-2", [0, 0, -1]],
    ["-2,2,0", [-1, 0, 0]],
  ];
  const CENTER: Record<string, string> = { "0,0,1": "F", "1,0,0": "R", "0,0,-1": "B", "-1,0,0": "L" };

  // Which of front, right, back, left edges match their center
  const edgeMatches = (c: Cube) =>
    EDGE_SIDES.map(([pos, normal]) => {
      const side = at(c, pos).find((s) => s.normal.join() === normal.join())!;
      return side.color === CENTER[normal.join()];
    });

  // Holding the cube turned by y^k and doing an algorithm is the same as
  // doing it wrapped in that rotation, which keeps the centers in place
  const HOLDS = ["", "y", "y2", "y'"];
  const fromHold = (cube: Cube, k: number, alg: string) =>
    applyAlg(cube, `${HOLDS[k]} ${alg} ${HOLDS[(4 - k) % 4]}`);
  // Seen from hold k, side i (front, right, back, left) is side i + k
  const seenFrom = <T,>(sides: T[], k: number) =>
    sides.map((_, i) => sides[(i + k) % 4]);

  it.each(starts.map(([name, auf, cube]) => [name, auf, cube]))(
    "step 5 matches every edge (%s from %s)",
    (_, __, start) => {
      const swap = stepAlg(threeByThree, "Swap edges");
      let cube = start as Cube;

      for (let i = 0; i < 4; i++) {
        const turned = AUFS.map((auf) => applyAlg(cube, auf));
        if (turned.some((c) => edgeMatches(c).every(Boolean))) return;

        // Two edges matching on the back and right: do the algorithm
        let next: Cube | undefined;
        turned.forEach((c) =>
          HOLDS.forEach((_, k) => {
            const [f, r, b, l] = seenFrom(edgeMatches(c), k);
            if (!next && r && b && !f && !l) next = fromHold(c, k, swap);
          }),
        );

        // Matching edges opposite each other: do it once from any side
        if (!next) {
          const opposite = turned.find((c) => {
            const [f, r, b, l] = edgeMatches(c);
            return (f && b && !r && !l) || (r && l && !f && !b);
          });
          if (!opposite) throw new Error("Couldn't line up two edges");
          next = applyAlg(opposite, swap);
        }
        cube = next;
      }

      expect(AUFS.some((auf) => edgeMatches(applyAlg(cube, auf)).every(Boolean))).toBeTruthy();
    },
  );

  // Front right, back right, back left, front left
  const CORNERS = ["2,2,2", "2,2,-2", "-2,2,-2", "-2,2,2"];
  const placed = (c: Cube) =>
    CORNERS.map((pos) => at(c, pos)[0].home.join() === pos);
  const placedKey = (c: Cube) =>
    CORNERS.map((pos) => at(c, pos)[0].home.join()).join(" ");

  // Step 6 starts with the edges matched and the corners in any order:
  // combine corner-only PLLs from every angle to reach all of them
  const cornerStarts = (() => {
    const pure = PLL.filter((p) => ["Aa", "Ab", "E"].includes(p.name));
    const found = new Map<string, Cube>();
    pure.forEach((a) =>
      [...pure, undefined].forEach((b) =>
        AUFS.forEach((pre) =>
          AUFS.forEach((mid) => {
            let c = applyAlg(caseFor(3, a.alg, pre), mid);
            if (b) c = applyAlg(c, `${b.alg}`);
            const aligned = AUFS.map((auf) => applyAlg(c, auf)).find((x) =>
              edgeMatches(x).every(Boolean),
            );
            if (aligned) found.set(placedKey(aligned), aligned);
          }),
        ),
      ),
    );
    return Array.from(found.entries());
  })();

  it("reaches every corner order for step 6", () => {
    // 4 corners in an even order: 1 solved, 8 three-cycles, 3 double swaps
    expect(cornerStarts).toHaveLength(12);
  });

  it.each(cornerStarts)("step 6 places every corner (%s)", (_, start) => {
    const cycle = stepAlg(threeByThree, "Cycle corners");
    let cube = start;

    for (let i = 0; i < 4 && !placed(cube).every(Boolean); i++) {
      // Hold a correctly placed corner at the front right, if there is one.
      // Seen from hold k, the front right corner is corner k
      const k = HOLDS.findIndex((_, h) => seenFrom(placed(cube), h)[0]);
      cube = fromHold(cube, Math.max(k, 0), cycle);
    }

    expect(placed(cube).every(Boolean)).toBeTruthy();
  });
});

describe("2-look OLL corners", () => {
  it("are the 3x3 versions of the 2x2 OLL cases", () => {
    expect(OLL_CORNERS.map((a) => a.name)).toEqual(TWO_OLL.map((a) => a.name));
  });
});
