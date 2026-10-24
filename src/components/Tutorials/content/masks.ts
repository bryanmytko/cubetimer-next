import { Sticker } from "../../../lib/cube/nxn";

// Which pieces a step has solved, for gray-out goal pictures. These look at
// where each sticker's piece started, so they work on any cube size.

const outer = (n: number, v: number) => Math.abs(v) === n - 1;
const outerCount = (n: number, s: Sticker) =>
  s.home.filter((v) => outer(n, v)).length;

export const isCenter = (n: number) => (s: Sticker) => outerCount(n, s) === 1;
export const isEdge = (n: number) => (s: Sticker) => outerCount(n, s) === 2;
const inBottom = (n: number) => (s: Sticker) => s.home[1] === -(n - 1);
const inTop = (n: number) => (s: Sticker) => s.home[1] === n - 1;

export const bottomCross = (n: number) => (s: Sticker) =>
  isCenter(n)(s) || (inBottom(n)(s) && isEdge(n)(s));

export const firstLayer = (n: number) => (s: Sticker) =>
  isCenter(n)(s) || inBottom(n)(s);

export const firstTwoLayers = (n: number) => (s: Sticker) =>
  !inTop(n)(s) || isCenter(n)(s);

export const topCross = (n: number) => (s: Sticker) =>
  firstTwoLayers(n)(s) || (isEdge(n)(s) && s.normal[1] === 1);

export const topFace = (n: number) => (s: Sticker) =>
  firstTwoLayers(n)(s) || s.normal[1] === 1;

export const centersOnly = (n: number) => (s: Sticker) => isCenter(n)(s);

export const centersAndEdges = (n: number) => (s: Sticker) =>
  isCenter(n)(s) || isEdge(n)(s);
