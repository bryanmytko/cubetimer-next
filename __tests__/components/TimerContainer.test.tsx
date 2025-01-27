import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";

import Scrambler, { mockGenerate } from "../__mocks__/scrambler";
import TimerContainer from "../../src/components/Timer/TimerContainer";
import { TimerProvider } from "../../src/components/Timer/TimerContext";
import { SOLVES_FOR_USER } from "../../src/graphql/queries/solvesForUser";

jest.mock("../../src/lib/scrambler", () => Scrambler);

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin", id: "12345687890" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

const mocks = [
  {
    request: {
      query: SOLVES_FOR_USER,
      variables: { userId: "12345687890", first: 20 },
    },
    result: {
      data: {
        solves: {
          pageInfo: {
            startCursor: "R1BDOk46MTczNzc=",
            endCursor: "R1BDOk46MTczNTg=",
            hasPreviousPage: false,
            hasNextPage: true,
            __typename: "PageInfo",
          },
          edges: [
            {
              cursor: "R1BDOk46MTczNzc=",
              node: {
                id: "17377",
                puzzle: "3x3",
                scramble:
                  "F D2 F2 U' B D' R F D2 R2 F' L B L' D' L' U R' U2 L B",
                time: 14760,
                penalty: 0,
                createdAt: "2025-01-27",
                __typename: "Solve",
              },
              __typename: "QuerySolvesConnectionEdge",
            },
            {
              cursor: "R1BDOk46MTczNzY=",
              node: {
                id: "17376",
                puzzle: "3x3",
                scramble:
                  "R B' R' B L' B' D B2 R U2 B U L D2 B2 L2 F L2 B' U2 F'",
                time: 20040,
                penalty: 0,
                createdAt: "2025-01-27",
                __typename: "Solve",
              },
              __typename: "QuerySolvesConnectionEdge",
            },
          ],
          __typename: "QuerySolvesConnection",
        },
      },
    },
  },
];

describe("<TimerContainer>", () => {
  beforeEach(() => {
    Scrambler.mockClear();
    mockGenerate.mockClear();
  });

  it("renders the components", async () => {    
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <TimerProvider>
          <TimerContainer />
        </TimerProvider>
      </MockedProvider>
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
