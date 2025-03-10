import { builder } from "../builder";
import prisma from "../../lib/prismadb";

builder.prismaObject("Settings", {
  fields: (t) => ({
    defaultClassicMode: t.exposeBoolean("defaultClassicMode"),
  }),
});

builder.queryField("settingsForUser", (t) =>
  t.prismaField({
    type: "Settings",
    args: { userId: t.arg.string({ required: true }) },
    resolve: async (_query, _parent, args) => {
      const { userId } = args;
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
      userId: t.arg.string({ required: true }),
      defaultClassicMode: t.arg.boolean(),
    },
    resolve: async (_query: any, _parent: any, args: any) => {
      const { userId, defaultClassicMode } = args;

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
