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

const timerTree = (mocks: Array<MockedResponse>) => (
  <MockedProvider mocks={mocks}>
    <TimerProvider>
      <TimerContainer />
      <Mode />
    </TimerProvider>
  </MockedProvider>
);

const renderTimer = (mocks: Array<MockedResponse> = []) => render(timerTree(mocks));

const CACHE_KEY = "cubetimer:settings";
const cache = (defaultClassicMode: boolean) =>
  window.localStorage.setItem(CACHE_KEY, JSON.stringify({ defaultClassicMode }));
const cached = () => JSON.parse(window.localStorage.getItem(CACHE_KEY) || "null");

// Lets pending queries answer
const settle = () => act(() => new Promise((resolve) => setTimeout(resolve, 50)));

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
    window.localStorage.clear();
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

  describe("with settings from an earlier visit", () => {
    it("starts in the cached mode without waiting for the server", async () => {
      cache(true);
      stillLoading();
      renderTimer();

      await waitFor(() => expect(mode()).toEqual("true"));
      await pressSpace();

      expect(timing()).toEqual("true");
    });

    it("switches to what the server says if the cache was out of date", async () => {
      cache(true);
      stillLoading();
      const mocks = [settings(false), noSolves];
      const { rerender } = renderTimer(mocks);
      await waitFor(() => expect(mode()).toEqual("true"));

      signedIn();
      rerender(timerTree(mocks));

      await waitFor(() => expect(mode()).toEqual("false"));
      expect(cached()).toEqual({ defaultClassicMode: false });
    });

    it("corrects to regular mode for a visitor who signed out", async () => {
      cache(true);
      signedOut();
      renderTimer();

      await waitFor(() => expect(mode()).toEqual("false"));
      expect(cached()).toEqual({ defaultClassicMode: false });
    });

    it("keeps the mode once they've started timing", async () => {
      cache(true);
      stillLoading();
      const mocks = [settings(false), noSolves];
      const { rerender } = renderTimer(mocks);
      await waitFor(() => expect(mode()).toEqual("true"));
      await pressSpace();

      signedIn();
      rerender(timerTree(mocks));
      await settle();

      // Stop, then reject the time, so they're between solves again
      await pressSpace();
      await act(async () => {
        fireEvent.keyUp(window, { key: "Escape" });
        await new Promise((resolve) => setTimeout(resolve, 80));
      });
      await settle();

      expect(timing()).toEqual("false");
      expect(mode()).toEqual("true");
    });

    it("keeps the cached mode if settings can't load", async () => {
      cache(true);
      signedIn();
      renderTimer([settingsFail]);
      await settle();

      expect(mode()).toEqual("true");
      expect(cached()).toEqual({ defaultClassicMode: true });
    });
  });

  it("remembers the server's settings for next time", async () => {
    signedIn();
    renderTimer([settings(true)]);

    await waitFor(() => expect(cached()).toEqual({ defaultClassicMode: true }));
  });

  it("ignores a cache it can't read", async () => {
    window.localStorage.setItem(CACHE_KEY, "{not json");
    stillLoading();
    renderTimer();
    await settle();

    expect(mode()).toEqual("undefined");
  });
});
