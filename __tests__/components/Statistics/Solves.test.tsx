import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import "@testing-library/jest-dom";

import { Solves } from "../../../src/components/Statistics";
import { SOLVES_FOR_USER } from "../../../src/graphql/queries";
import { DELETE_SOLVE } from "../../../src/graphql/mutations";
import { UNDO_MS } from "../../../src/components/Statistics/useUndoableDelete";

const USER_ID = "12345687890";

const solve = (id: string, time: number, createdAt: Date, penalty = 0) => ({
  cursor: id,
  node: {
    id,
    puzzle: "3x3",
    scramble: `R U R' U' ${id}`,
    time,
    penalty,
    createdAt: createdAt.toISOString(),
    __typename: "Solve",
  },
  __typename: "SolveEdge",
});

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

const solvesQuery: MockedResponse = {
  request: { query: SOLVES_FOR_USER, variables: { userId: USER_ID, first: 50 } },
  result: {
    data: {
      solves: {
        pageInfo: {
          startCursor: "3",
          endCursor: "1",
          hasPreviousPage: false,
          hasNextPage: false,
          __typename: "PageInfo",
        },
        edges: [
          solve("3", 12340, today, 2000),
          solve("2", 15660, today),
          solve("1", 9870, yesterday),
        ],
        __typename: "QuerySolvesConnection",
      },
    },
  },
};

const deleteMutation = (id: string): MockedResponse & { called: jest.Mock } => {
  const called = jest.fn(() => ({ data: { deleteSolve: { id, __typename: "Solve" } } }));
  return { request: { query: DELETE_SOLVE, variables: { id } }, result: called, called };
};

const renderSolves = (mocks: Array<MockedResponse>) =>
  render(
    <MockedProvider mocks={mocks}>
      <Solves userId={USER_ID} />
    </MockedProvider>,
  );

describe("Solves", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("groups solves by day and adds penalties to the time", async () => {
    renderSolves([solvesQuery]);

    const todayGroup = (await screen.findByText("Today")).closest("section")!;
    expect(within(todayGroup).getByText("2 solves")).toBeInTheDocument();
    expect(within(todayGroup).getByText("14:34")).toBeInTheDocument();
    expect(within(todayGroup).getByText("+2")).toBeInTheDocument();

    const yesterdayGroup = screen.getByText("Yesterday").closest("section")!;
    expect(within(yesterdayGroup).getByText("9:87")).toBeInTheDocument();
  });

  it("hides a deleted solve and only deletes it once the undo window passes", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const mutation = deleteMutation("2");
    renderSolves([solvesQuery, mutation]);

    await user.click((await screen.findAllByRole("button", { name: "Delete solve" }))[1]);

    expect(screen.queryByText("15:66")).not.toBeInTheDocument();
    expect(screen.getByText("Solve deleted")).toBeInTheDocument();
    expect(mutation.called).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(UNDO_MS);
    });

    await waitFor(() => expect(mutation.called).toHaveBeenCalled());
  });

  it("brings the solve back on undo without deleting it", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const mutation = deleteMutation("2");
    renderSolves([solvesQuery, mutation]);

    await user.click((await screen.findAllByRole("button", { name: "Delete solve" }))[1]);
    await user.click(screen.getByRole("button", { name: "Undo" }));

    await act(async () => {
      jest.advanceTimersByTime(UNDO_MS);
    });

    expect(screen.getByText("15:66")).toBeInTheDocument();
    expect(mutation.called).not.toHaveBeenCalled();
  });
});
