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
    resolve: (_query, _parent, _args, _ctx, _info) => prisma.solve.findMany(),
  })
);
