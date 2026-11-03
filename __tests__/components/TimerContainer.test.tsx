import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import "@testing-library/jest-dom";

import Scrambler, { mockGenerate } from "../__mocks__/scrambler";
import TimerContainer from "../../src/components/Timer/TimerContainer";
import { TimerContext, TimerProvider } from "../../src/components/Timer/TimerContext";
import { SETTINGS_FOR_USER } from "../../src/graphql/queries/settingsForUser";
import { SOLVES_FOR_USER } from "../../src/graphql/queries";
import { TimerState } from "../../src/types/timer";

jest.mock("../../src/lib/scrambler", () => Scrambler);

jest.mock("next-auth/react", () => ({
  __esModule: true,
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { id: "12345687890" },
};

const signedIn = () =>
  (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
const signedOut = () =>
  (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });
const stillLoading = () =>
  (useSession as jest.Mock).mockReturnValue({ data: null, status: "loading" });

const settings = (defaultClassicMode: boolean): MockedResponse => ({
  request: { query: SETTINGS_FOR_USER },
  result: { data: { settingsForUser: { defaultClassicMode, __typename: "Settings" } } },
});

// The recent-solves list under the timer
const noSolves: MockedResponse = {
  request: { query: SOLVES_FOR_USER, variables: { first: 20 } },
  result: {
    data: {
      solves: {
        pageInfo: {
          startCursor: null,
          endCursor: null,
          hasPreviousPage: false,
          hasNextPage: false,
          __typename: "PageInfo",
        },
        edges: [],
        __typename: "QuerySolvesConnection",
      },
    },
  },
};

const settingsFail: MockedResponse = {
  request: { query: SETTINGS_FOR_USER },
  error: new Error("Network down"),
};

// Shows the timer state the container settles on, and whether it's timing
const Mode = () => {
  const timer = useContext(TimerContext) as TimerState;
  return (
    <>
      <p data-testid="mode">{String(timer.classicModeEnabled)}</p>
      <p data-testid="timing">{String(timer.ready || timer.running)}</p>
    </>
  );
};

const renderTimer = (mocks: Array<MockedResponse> = []) =>
  render(
    <MockedProvider mocks={mocks}>
      <TimerProvider>
        <TimerContainer />
        <Mode />
      </TimerProvider>
    </MockedProvider>,
  );

const mode = () => screen.getByTestId("mode").textContent;
const timing = () => screen.getByTestId("timing").textContent;

// Press and release space. Keys lock for 60ms after each press.
const pressSpace = () =>
  act(async () => {
    fireEvent.keyDown(window, { key: " " });
    fireEvent.keyUp(window, { key: " " });
    await new Promise((resolve) => setTimeout(resolve, 80));
  });

describe("<TimerContainer>", () => {
  beforeEach(() => {
    Scrambler.mockClear();
    mockGenerate.mockClear();
    jest.clearAllMocks();
  });

  it("shows the timer straight away while the session is still loading", () => {
    stillLoading();
    const { container } = renderTimer();

    expect(container.querySelector("svg")).not.toBeInTheDocument();
    expect(container.querySelector(".col-span-5")).toBeInTheDocument();
    expect(mode()).toEqual("undefined");
  });

  it("settles on regular mode for signed-out visitors", async () => {
    signedOut();
    renderTimer();

    await waitFor(() => expect(mode()).toEqual("false"));
  });

  it("starts in Classic Mode when the user's setting says so", async () => {
    signedIn();
    renderTimer([settings(true)]);

    await waitFor(() => expect(mode()).toEqual("true"));
  });

  it("starts in regular mode when the setting is off", async () => {
    signedIn();
    renderTimer([settings(false), noSolves]);

    await waitFor(() => expect(mode()).toEqual("false"));
  });

  it("falls back to regular mode if settings can't load", async () => {
    signedIn();
    renderTimer([settingsFail, noSolves]);

    await waitFor(() => expect(mode()).toEqual("false"));
  });

  it("won't start a solve while settings are loading", async () => {
    stillLoading();
    renderTimer();

    await pressSpace();

    expect(timing()).toEqual("false");
  });

  it("starts once the mode has settled", async () => {
    signedOut();
    renderTimer();
    await waitFor(() => expect(mode()).toEqual("false"));

    await pressSpace();

    expect(timing()).toEqual("true");
  });
});
