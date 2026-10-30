import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { Prisma } from "@prisma/client";
import prisma from "../lib/prismadb";
import RelayPlugin from "@pothos/plugin-relay";
import { DateResolver } from "graphql-scalars";
import { GraphQLError } from "graphql";

export interface Context {
  userId: string | null;
}

// The signed-in user's id, or an UNAUTHENTICATED error
export const requireUser = (ctx: Context): string => {
  if (!ctx.userId) {
    throw new GraphQLError("You must be signed in.", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return ctx.userId;
};

export const notFound = (what: string) =>
  new GraphQLError(`${what} not found.`, { extensions: { code: "NOT_FOUND" } });

export const builder = new SchemaBuilder<{
  Context: Context;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
    // Read the schema from the generated types rather than the client, so
    // tests can swap the client out
    dmmf: Prisma.dmmf,
  },
});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({});

builder.addScalarType("Date", DateResolver, {});
