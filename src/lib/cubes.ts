export const cube2x2 = {
  moves: [
    { name: "R", turns: ["R", "R'", "R2"], restricted: ["L"] },
    { name: "L", turns: ["L", "L'", "L2"], restricted: ["R"] },
    { name: "U", turns: ["U", "U'", "U2"], restricted: ["D"] },
    { name: "D", turns: ["D", "D'", "D2"], restricted: ["U"] },
    { name: "F", turns: ["F", "F'", "F2"], restricted: ["B"] },
    { name: "B", turns: ["B", "B'", "B2"], restricted: ["F"] },
  ],
};

export const cube3x3 = {
  moves: [
    { name: "R", turns: ["R", "R'", "R2"], restricted: ["R", "L"] },
    { name: "L", turns: ["L", "L'", "L2"], restricted: ["L", "R"] },
    { name: "U", turns: ["U", "U'", "U2"], restricted: ["U", "D"] },
    { name: "D", turns: ["D", "D'", "D2"], restricted: ["D", "U"] },
    { name: "F", turns: ["F", "F'", "F2"], restricted: ["F", "B"] },
    { name: "B", turns: ["B", "B'", "B2"], restricted: ["B", "F"] },
  ],
};

export const cube4x4 = {
  moves: [
    { name: "R", turns: ["R", "R'", "R2"], restricted: ["L", "l"] },
    { name: "L", turns: ["L", "L'", "L2"], restricted: ["R", "r"] },
    { name: "U", turns: ["U", "U'", "U2"], restricted: ["D", "d"] },
    { name: "D", turns: ["D", "D'", "D2"], restricted: ["U", "u"] },
    { name: "F", turns: ["F", "F'", "F2"], restricted: ["B", "b"] },
    { name: "B", turns: ["B", "B'", "B2"], restricted: ["F", "f"] },
    { name: "r", turns: ["r", "r'", "r2"], restricted: ["L", "l"] },
    { name: "l", turns: ["l", "l'", "l2"], restricted: ["R", "r"] },
    { name: "u", turns: ["u", "u'", "u2"], restricted: ["D", "d"] },
    { name: "d", turns: ["d", "d'", "d2"], restricted: ["U", "u"] },
    { name: "f", turns: ["f", "f'", "f2"], restricted: ["B", "b"] },
    { name: "b", turns: ["b", "b'", "b2"], restricted: ["F", "f"] },
  ],
};

export const cube5x5 = {
  moves: [
    { name: "R", turns: ["R", "R'", "R2"], restricted: ["L", "l"] },
    { name: "L", turns: ["L", "L'", "L2"], restricted: ["R", "r"] },
    { name: "U", turns: ["U", "U'", "U2"], restricted: ["D", "d"] },
    { name: "D", turns: ["D", "D'", "D2"], restricted: ["U", "u"] },
    { name: "F", turns: ["F", "F'", "F2"], restricted: ["B", "b"] },
    { name: "B", turns: ["B", "B'", "B2"], restricted: ["F", "f"] },
    { name: "r", turns: ["r", "r'", "r2"], restricted: ["L", "l"] },
    { name: "l", turns: ["l", "l'", "l2"], restricted: ["R", "r"] },
    { name: "u", turns: ["u", "u'", "u2"], restricted: ["D", "d"] },
    { name: "d", turns: ["d", "d'", "d2"], restricted: ["U", "u"] },
    { name: "f", turns: ["f", "f'", "f2"], restricted: ["B", "b"] },
    { name: "b", turns: ["b", "b'", "b2"], restricted: ["F", "f"] },
  ],
};

// 6x6 and 7x7 also turn three layers at once (3r = r plus the next slice in)
export const cube6x6 = {
  moves: [
    { name: "R", turns: ["R", "R'", "R2"], restricted: ["L", "l", "3l"] },
    { name: "L", turns: ["L", "L'", "L2"], restricted: ["R", "r", "3r"] },
    { name: "U", turns: ["U", "U'", "U2"], restricted: ["D", "d", "3d"] },
    { name: "D", turns: ["D", "D'", "D2"], restricted: ["U", "u", "3u"] },
    { name: "F", turns: ["F", "F'", "F2"], restricted: ["B", "b", "3b"] },
    { name: "B", turns: ["B", "B'", "B2"], restricted: ["F", "f", "3f"] },
    { name: "r", turns: ["r", "r'", "r2"], restricted: ["L", "l", "3l"] },
    { name: "l", turns: ["l", "l'", "l2"], restricted: ["R", "r", "3r"] },
    { name: "u", turns: ["u", "u'", "u2"], restricted: ["D", "d", "3d"] },
    { name: "d", turns: ["d", "d'", "d2"], restricted: ["U", "u", "3u"] },
    { name: "f", turns: ["f", "f'", "f2"], restricted: ["B", "b", "3b"] },
    { name: "b", turns: ["b", "b'", "b2"], restricted: ["F", "f", "3f"] },
    { name: "3r", turns: ["3r", "3r'", "3r2"], restricted: ["L", "l", "3l"] },
    { name: "3l", turns: ["3l", "3l'", "3l2"], restricted: ["R", "r", "3r"] },
    { name: "3u", turns: ["3u", "3u'", "3u2"], restricted: ["D", "d", "3d"] },
    { name: "3d", turns: ["3d", "3d'", "3d2"], restricted: ["U", "u", "3u"] },
    { name: "3f", turns: ["3f", "3f'", "3f2"], restricted: ["B", "b", "3b"] },
    { name: "3b", turns: ["3b", "3b'", "3b2"], restricted: ["F", "f", "3f"] },
  ],
};

export const cube7x7 = {
  moves: [
    { name: "R", turns: ["R", "R'", "R2"], restricted: ["L", "l", "3l"] },
    { name: "L", turns: ["L", "L'", "L2"], restricted: ["R", "r", "3r"] },
    { name: "U", turns: ["U", "U'", "U2"], restricted: ["D", "d", "3d"] },
    { name: "D", turns: ["D", "D'", "D2"], restricted: ["U", "u", "3u"] },
    { name: "F", turns: ["F", "F'", "F2"], restricted: ["B", "b", "3b"] },
    { name: "B", turns: ["B", "B'", "B2"], restricted: ["F", "f", "3f"] },
    { name: "r", turns: ["r", "r'", "r2"], restricted: ["L", "l", "3l"] },
    { name: "l", turns: ["l", "l'", "l2"], restricted: ["R", "r", "3r"] },
    { name: "u", turns: ["u", "u'", "u2"], restricted: ["D", "d", "3d"] },
    { name: "d", turns: ["d", "d'", "d2"], restricted: ["U", "u", "3u"] },
    { name: "f", turns: ["f", "f'", "f2"], restricted: ["B", "b", "3b"] },
    { name: "b", turns: ["b", "b'", "b2"], restricted: ["F", "f", "3f"] },
    { name: "3r", turns: ["3r", "3r'", "3r2"], restricted: ["L", "l", "3l"] },
    { name: "3l", turns: ["3l", "3l'", "3l2"], restricted: ["R", "r", "3r"] },
    { name: "3u", turns: ["3u", "3u'", "3u2"], restricted: ["D", "d", "3d"] },
    { name: "3d", turns: ["3d", "3d'", "3d2"], restricted: ["U", "u", "3u"] },
    { name: "3f", turns: ["3f", "3f'", "3f2"], restricted: ["B", "b", "3b"] },
    { name: "3b", turns: ["3b", "3b'", "3b2"], restricted: ["F", "f", "3f"] },
  ],
};

export const cubePyraminx = {
  moves: [
    { name: "U", turns: ["U", "U'"], restricted: [] },
    { name: "L", turns: ["L", "L'"], restricted: [] },
    { name: "R", turns: ["R", "R'"], restricted: [] },
    { name: "B", turns: ["B", "B'"], restricted: [] },
  ],
  tips: ["u", "l", "r", "b"],
};

export const cubeSkewb = {
  moves: [
    { name: "U", turns: ["U", "U'"], restricted: [] },
    { name: "L", turns: ["L", "L'"], restricted: [] },
    { name: "R", turns: ["R", "R'"], restricted: [] },
    { name: "B", turns: ["B", "B'"], restricted: [] },
  ],
};
