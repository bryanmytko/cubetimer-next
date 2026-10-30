import { builder, notFound, requireUser } from "../builder";
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
    resolve: async (query, _parent, _args, ctx, _info) => {
      const userId = requireUser(ctx);
      return prisma.solveSession.findMany({
        ...query,
        where: {
          userId,
          solves: {
            some: {},
          },
        },
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
    },
    resolve: async (query, _parent, args, ctx) => {
      const userId = requireUser(ctx);
      const { size } = args;

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

builder.mutationField("deleteSolveSession", (t) =>
  t.prismaField({
    type: "SolveSession",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, ctx, _info) => {
      const userId = requireUser(ctx);
      const { id } = args;

      // Someone else's session looks the same as a missing one
      const owned = await prisma.solveSession.count({ where: { id, userId } });
      if (!owned) throw notFound("Session");

      return prisma.solveSession.delete({
        where: { id },
      });
    },
  }),
);

export default builder;
