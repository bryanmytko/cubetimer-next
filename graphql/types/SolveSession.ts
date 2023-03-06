import { builder } from "../builder";
import prisma from "../../lib/prismadb";

builder.prismaObject("SolveSession", {
  fields: (t) => ({
    id: t.exposeID("id"),
    size: t.exposeInt("size"),
    user: t.relation("user"),
    solves: t.relation("solves"),
  }),
});

builder.queryField("solveSessionsForUser", (t) =>
  t.prismaField({
    type: ["SolveSession"],
    args: {
      userId: t.arg.string({ required: true })
    },
    resolve: async (_query, _parent, args, _ctx, _info) => {
      const { userId } = args;
      return prisma.solveSession.findMany({ where: { userId }, include: { solves: true } });
    },
  })
);

builder.mutationField("createSolveSession", (t) =>
  t.prismaField({
    type: "SolveSession",
    args: {
      size: t.arg.int({ required: true }),
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query: any, _parent: any, args: any, _ctx: any) => {
      const { size, userId } = args;

      return prisma.solveSession.create({
        ...query,
        data: {
          size,
          userId
        },
      });
    },
  })
);

export default builder;
