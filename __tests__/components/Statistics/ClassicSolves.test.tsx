import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import "@testing-library/jest-dom";

import { ClassicSolves } from "../../../src/components/Statistics";
import { SOLVE_SESSIONS_FOR_USER } from "../../../src/graphql/queries";

const USER_ID = "12345687890";
const createdAt = new Date().toISOString();

const solve = (id: string, time: number, penalty = 0) => ({
  id,
  scramble: `R U R' U' ${id}`,
  time,
  penalty,
  puzzle: "3x3",
  createdAt,
  __typename: "Solve",
});

const sessionsQuery: MockedResponse = {
  request: { query: SOLVE_SESSIONS_FOR_USER, variables: { first: 10 } },
  result: {
    data: {
      solveSessionsForUser: {
        pageInfo: {
          startCursor: "a",
          endCursor: "a",
          hasPreviousPage: false,
          hasNextPage: false,
          __typename: "PageInfo",
        },
        edges: [
          {
            cursor: "a",
            node: {
              id: "a",
              size: 5,
              createdAt,
              // 10s, 12s (+2 = 14s), 11s, 20s, 9s
              solves: [
                solve("1", 10000),
                solve("2", 12000, 2000),
                solve("3", 11000),
                solve("4", 20000),
                solve("5", 9000),
              ],
              __typename: "SolveSession",
            },
            __typename: "QuerySolveSessionsForUserConnectionEdge",
          },
        ],
        __typename: "QuerySolveSessionsForUserConnection",
      },
    },
  },
};

const renderSessions = () =>
  render(
    <MockedProvider mocks={[sessionsQuery]}>
      <ClassicSolves userId={USER_ID} />
    </MockedProvider>,
  );

describe("ClassicSolves", () => {
  it("summarizes the session with penalties counted", async () => {
    renderSessions();

    // Drops 9s and 20s, then averages 10, 14 and 11
    expect(await screen.findByText("11:66")).toBeInTheDocument();
    expect(screen.getByText("9:00")).toBeInTheDocument();
    expect(screen.getByText("20:00")).toBeInTheDocument();
    expect(screen.getByText("5 solves")).toBeInTheDocument();
  });

  it("lists every solve when the session is opened", async () => {
    renderSessions();
    const toggle = await screen.findByRole("button", { expanded: false });

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("R U R' U' 4")).toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
    expect(screen.getByText("best")).toBeInTheDocument();
    expect(screen.getByText("worst")).toBeInTheDocument();
  });

  it("copies a solve's scramble when its row is clicked", async () => {
    const user = userEvent.setup();
    renderSessions();
    await user.click(await screen.findByRole("button", { expanded: false }));

    await user.click(screen.getByText("R U R' U' 4"));

    expect(await navigator.clipboard.readText()).toEqual("R U R' U' 4");
    expect(screen.getByText("Copied")).toBeInTheDocument();
  });
});
