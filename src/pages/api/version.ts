import { readFileSync } from "fs";
import { join } from "path";
import type { NextApiRequest, NextApiResponse } from "next";

// The id of the build this server is running. Pages carry the id of the
// build they came from, so a mismatch means a new deploy is live.
// `next dev` always reports "development", and its BUILD_ID file can be
// left over from an older build, so don't read it there.
const readBuildId = () => {
  if (process.env.NODE_ENV !== "production") return "development";

  try {
    return readFileSync(join(process.cwd(), ".next", "BUILD_ID"), "utf8").trim();
  } catch {
    return null;
  }
};

const buildId = readBuildId();

const version = (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ buildId });
};

export default version;
