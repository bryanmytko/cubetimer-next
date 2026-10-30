/**
 * @jest-environment node
 */
import { graphql } from "graphql";

import prisma from "../../src/lib/prismadb";
import { schema } from "../../src/graphql/schema";

jest.mock("../../src/lib/prismadb", () => ({
  __esModule: true,
  default: {
    solve: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    solveSession: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    settings: {
      upsert: jest.fn(),
      update: jest.fn(),
    },
  },
}));

const db = prisma as unknown as {
  solve: Record<string, jest.Mock>;
  solveSession: Record<string, jest.Mock>;
  settings: Record<string, jest.Mock>;
};

const ME = "me-123";

const run = (source: string, userId: string | null = ME) =>
  graphql({ schema, source, contextValue: { userId } });

const solveRow = { id: 7, puzzle: "3x3", scramble: "R U", time: 12000, penalty: 0 };

beforeEach(() => jest.clearAllMocks());

describe("GraphQL auth", () => {
  describe("when signed out", () => {
    it.each([
      ["solves", "{ solves(first: 5) { edges { node { id } } } }"],
      ["sessions", "{ solveSessionsForUser(first: 5) { edges { node { id } } } }"],
      ["settings", "{ settingsForUser { defaultClassicMode } }"],
      ["saving a solve", "mutation { createSolve(puzzle: \"3x3\", scramble: \"R\", time: 1) { id } }"],
      ["starting a session", "mutation { createSolveSession(size: 12) { id } }"],
      ["deleting a solve", "mutation { deleteSolve(id: \"7\") { id } }"],
      ["deleting a session", "mutation { deleteSolveSession(id: \"s1\") { id } }"],
      ["changing settings", "mutation { updateSettings(defaultClassicMode: true) { defaultClassicMode } }"],
    ])("refuses %s", async (_name, source) => {
      const result = await run(source, null);

      expect(result.errors?.[0].extensions.code).toEqual("UNAUTHENTICATED");
      Object.values(db).forEach((model) =>
        Object.values(model).forEach((fn) => expect(fn).not.toHaveBeenCalled()),
      );
    });
  });

  it("only reads the signed-in user's solves", async () => {
    db.solve.findMany.mockResolvedValue([]);

    await run("{ solves(first: 5) { edges { node { id } } } }");

    expect(db.solve.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: ME } }),
    );
  });

  it("only reads the signed-in user's sessions", async () => {
    db.solveSession.findMany.mockResolvedValue([]);

    await run("{ solveSessionsForUser(first: 5) { edges { node { id } } } }");

    expect(db.solveSession.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ userId: ME }) }),
    );
  });

  it("saves new solves to the signed-in user", async () => {
    db.solve.create.mockResolvedValue(solveRow);

    await run("mutation { createSolve(puzzle: \"3x3\", scramble: \"R U\", time: 12000) { id } }");

    expect(db.solve.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ userId: ME }) }),
    );
  });

  it("won't add a solve to someone else's session", async () => {
    db.solveSession.count.mockResolvedValue(0);

    const result = await run(
      "mutation { createSolve(puzzle: \"3x3\", scramble: \"R\", time: 1, solveSessionId: \"theirs\") { id } }",
    );

    expect(db.solveSession.count).toHaveBeenCalledWith({ where: { id: "theirs", userId: ME } });
    expect(result.errors?.[0].extensions.code).toEqual("NOT_FOUND");
    expect(db.solve.create).not.toHaveBeenCalled();
  });

  it("deletes the user's own solve", async () => {
    db.solve.count.mockResolvedValue(1);
    db.solve.delete.mockResolvedValue(solveRow);

    const result = await run("mutation { deleteSolve(id: \"7\") { id } }");

    expect(result.errors).toBeUndefined();
    expect(db.solve.count).toHaveBeenCalledWith({ where: { id: 7, userId: ME } });
    expect(db.solve.delete).toHaveBeenCalledWith({ where: { id: 7 } });
  });

  it("won't delete someone else's solve", async () => {
    db.solve.count.mockResolvedValue(0);

    const result = await run("mutation { deleteSolve(id: \"7\") { id } }");

    expect(result.errors?.[0].extensions.code).toEqual("NOT_FOUND");
    expect(db.solve.delete).not.toHaveBeenCalled();
  });

  it("won't delete someone else's session", async () => {
    db.solveSession.count.mockResolvedValue(0);

    const result = await run("mutation { deleteSolveSession(id: \"theirs\") { id } }");

    expect(db.solveSession.count).toHaveBeenCalledWith({ where: { id: "theirs", userId: ME } });
    expect(result.errors?.[0].extensions.code).toEqual("NOT_FOUND");
    expect(db.solveSession.delete).not.toHaveBeenCalled();
  });

  it("changes only the signed-in user's settings", async () => {
    db.settings.update.mockResolvedValue({ defaultClassicMode: true });

    await run("mutation { updateSettings(defaultClassicMode: true) { defaultClassicMode } }");

    expect(db.settings.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: ME } }),
    );
  });

  it("no longer accepts a userId from the request", async () => {
    const result = await run("{ solves(first: 5, userId: \"someone-else\") { edges { cursor } } }");

    expect(result.errors?.[0].message).toMatch(/Unknown argument "userId"/);
    expect(db.solve.findMany).not.toHaveBeenCalled();
  });

  it("has no way to look up other users", async () => {
    const result = await run("{ user { email } }");

    expect(result.errors?.[0].message).toMatch(/Cannot query field "user"/);
  });
});
