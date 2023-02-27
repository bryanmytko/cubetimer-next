import { builder } from "../builder";
import prisma from "../../lib/prismadb";

builder.prismaObject("Solve", {
  fields: (t) => ({
    id: t.exposeID("id"),
    puzzle: t.exposeString("puzzle"),
    scramble: t.exposeString("scramble"),
    time: t.exposeString("time"),
    user: t.relation("user"),
  }),
});


builder.queryField("solves", (t) =>
  t.prismaField({
    type: ["Solve"],
    resolve: async (_query, _parent, _args, ctx: any, _info) => {
      const userId = ctx.params.variables;
      return prisma.solve.findMany({ where: userId });
    },
  })
);

builder.mutationField(
  "createSolve",
  (t: any) => t.prismaField({
    type: "Solve",
    args: {
      scramble: t.arg.string({ required: true }),
      puzzle: t.arg.string({ required: true }),
      time: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query: any, _parent: any, args: any, _ctx: any) => {
      const { scramble, puzzle, time, userId } = args;

      return prisma.solve.create({
        ...query,
        data: {
          scramble,
          puzzle,
          time,
          userId
        },
      });
    }
  })
);