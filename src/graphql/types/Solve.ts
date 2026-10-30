import { builder, notFound, requireUser } from "../builder";
import prisma from "../../lib/prismadb";
import { Prisma } from "@prisma/client";

builder.prismaObject("Solve", {
  fields: (t) => ({
    id: t.exposeID("id"),
    penalty: t.exposeInt("penalty", { nullable: true }),
    puzzle: t.exposeString("puzzle"),
    scramble: t.exposeString("scramble"),
    time: t.exposeInt("time"),
    user: t.relation("user"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});

builder.queryField("solves", (t) =>
  t.prismaConnection({
    type: "Solve",
    cursor: "id",
    args: {
      fastest: t.arg.boolean(),
      slowest: t.arg.boolean(),
    },
    resolve: async (query, _parent, args, ctx, _info) => {
      const userId = requireUser(ctx);
      const { fastest, slowest } = args;

      let order;

      if (fastest) {
        order = { time: Prisma.SortOrder.asc };
      } else if (slowest) {
        order = { time: Prisma.SortOrder.desc };
      } else {
        order = { createdAt: Prisma.SortOrder.desc };
      }

      return prisma.solve.findMany({
        ...query,
        where: { userId },
        orderBy: [order],
      });
    },
  }),
);

builder.mutationField("createSolve", (t) =>
  t.prismaField({
    type: "Solve",
    args: {
      penalty: t.arg.int(),
      puzzle: t.arg.string({ required: true }),
      scramble: t.arg.string({ required: true }),
      time: t.arg.int({ required: true }),
      solveSessionId: t.arg.string(),
    },
    resolve: async (query, _parent, args, ctx) => {
      const userId = requireUser(ctx);
      const { penalty, puzzle, scramble, solveSessionId, time } = args;

      // Only add solves to the user's own sessions
      if (solveSessionId) {
        const owned = await prisma.solveSession.count({
          where: { id: solveSessionId, userId },
        });
        if (!owned) throw notFound("Session");
      }

      return prisma.solve.create({
        ...query,
        data: {
          penalty,
          puzzle,
          scramble,
          time,
          userId,
          solveSessionId,
        },
      });
    },
  }),
);

builder.mutationField("deleteSolve", (t) =>
  t.prismaField({
    type: "Solve",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, ctx, _info) => {
      const userId = requireUser(ctx);
      const id = parseInt(args.id);

      // Someone else's solve looks the same as a missing one
      const owned = !isNaN(id) && (await prisma.solve.count({ where: { id, userId } }));
      if (!owned) throw notFound("Solve");

      return prisma.solve.delete({ where: { id } });
    },
  }),
);
