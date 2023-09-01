import { builder } from "../builder";
import prisma from "../../lib/prismadb";

builder.prismaObject("Solve", {
  fields: (t) => ({
    id: t.exposeID("id"),
    penalty: t.exposeInt("penalty", { nullable: true }),
    puzzle: t.exposeString("puzzle"),
    scramble: t.exposeString("scramble"),
    time: t.exposeString("time"),
    user: t.relation("user"),
  }),
});

builder.queryField("solves", (t) =>
  t.prismaConnection({
    type: "Solve",
    cursor: "id",
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { userId } = args;
      return prisma.solve.findMany({ ...query, where: { userId } });
    },
  })
);

builder.mutationField("createSolve", (t) =>
  t.prismaField({
    type: "Solve",
    args: {
      penalty: t.arg.int(),
      puzzle: t.arg.string({ required: true }),
      scramble: t.arg.string({ required: true }),
      time: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
      solveSessionId: t.arg.string(),
    },
    resolve: async (query: any, _parent: any, args: any, _ctx: any) => {
      const { penalty, puzzle, scramble, solveSessionId, time, userId } = args;

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
  })
);

builder.mutationField("deleteSolve", (t) =>
  t.prismaField({
    type: "Solve",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, _ctx, _info) => {
      const { id } = args;
      return prisma.solve.delete({ where: { id: parseInt(id) } });
    },
  })
);
