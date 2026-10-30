import { createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { schema } from "../../graphql/schema";
import authOptions from "../../lib/auth";

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
  // Who's signed in comes from the session cookie, never from the request
  context: async ({ req, res }) => {
    const session = await getServerSession(req, res, authOptions);
    return { userId: session?.user?.id ?? null };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
