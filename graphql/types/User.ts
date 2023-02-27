import { builder } from "../builder";
import prisma from "../../lib/prismadb";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    // name: t.exposeString("name"),
    // email: t.exposeString("email"),
    solves: t.relation("solves"),
  }),
});

builder.queryField("user", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: (_query, _parent, _args, _ctx, _info) => prisma.user.findMany(),
  })
);

export default builder;
