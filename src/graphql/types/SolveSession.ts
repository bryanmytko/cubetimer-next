import { builder } from "../builder";
import prisma from "../../lib/prismadb";

builder.prismaObject("SolveSession", {
  fields: (t) => ({
    id: t.exposeID("id"),
    size: t.exposeInt("size"),
    user: t.relation("user"),
    solves: t.relation("solves"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});

builder.queryField("solveSessionsForUser", (t) =>
  t.prismaConnection({
    type: "SolveSession",
    cursor: "id",
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { userId } = args;
      return prisma.solveSession.findMany({
        ...query,
        where: { userId },
        include: { solves: true },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  }),
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
          userId,
        },
      });
    },
  }),
);

export default builder;
