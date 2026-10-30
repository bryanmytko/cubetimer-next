import { builder, requireUser } from "../builder";
import prisma from "../../lib/prismadb";

builder.prismaObject("Settings", {
  fields: (t) => ({
    defaultClassicMode: t.exposeBoolean("defaultClassicMode"),
  }),
});

builder.queryField("settingsForUser", (t) =>
  t.prismaField({
    type: "Settings",
    resolve: async (_query, _parent, _args, ctx) => {
      const userId = requireUser(ctx);
      return prisma.settings.upsert({
        where: { userId },
        update: {},
        create: { userId, defaultClassicMode: false },
      });
    },
  }),
);

builder.mutationField("updateSettings", (t) =>
  t.prismaField({
    type: "Settings",
    args: {
      defaultClassicMode: t.arg.boolean(),
    },
    resolve: async (_query, _parent, args, ctx) => {
      const userId = requireUser(ctx);
      const { defaultClassicMode } = args;

      return prisma.settings.update({
        where: {
          userId,
        },
        data: {
          defaultClassicMode,
        },
      });
    },
  }),
);

export default builder;
