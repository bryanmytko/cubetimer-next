import { builder } from "../builder";
import prisma from "../../lib/prismadb";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email", { nullable: true }),
    solves: t.relation("solves"),
  }),
});

builder.queryField("user", (t) => {
  return t.prismaField({
    type: "User",
    resolve: async (_query, _parent, _args, ctx: any, _info) => {
      const id = ctx.params.variables;
      return prisma.user.findFirstOrThrow({ where: id });
    },
  });
});

//, where: { id: ctx.id } }), // gives admin context when we lock down the queries

export default builder;
