import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  UpdatePromptProvider,
  useHoldUpdatePrompt,
} from "../../src/components/UpdatePrompt";
import { CHECK_EVERY_MS } from "../../src/components/UpdatePrompt/UpdatePrompt";

const PROMPT = /new version of Cubetimer/;

const serverBuild = (buildId: string) => {
  global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ buildId }) });
};

const Holder = ({ active }: { active: boolean }) => {
  useHoldUpdatePrompt(active);
  return null;
};

const renderPrompt = (hold = false) =>
  render(
    <UpdatePromptProvider>
      <Holder active={hold} />
    </UpdatePromptProvider>,
  );

const waitForCheck = () =>
  act(async () => {
    jest.advanceTimersByTime(CHECK_EVERY_MS);
  });

describe("UpdatePrompt", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.__NEXT_DATA__ = { buildId: "build-1" } as typeof window.__NEXT_DATA__;
  });

  afterEach(() => jest.useRealTimers());

  it("stays quiet while the server runs the same build", async () => {
    serverBuild("build-1");
    renderPrompt();

    await waitForCheck();

    expect(global.fetch).toHaveBeenCalledWith("/api/version", { cache: "no-store" });
    expect(screen.queryByText(PROMPT)).not.toBeInTheDocument();
  });

  it("offers a refresh once a new build is live", async () => {
    serverBuild("build-2");
    renderPrompt();

    await waitForCheck();

    expect(screen.getByText(PROMPT)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });

  it("checks when the tab comes back into view", async () => {
    serverBuild("build-2");
    renderPrompt();
    jest.advanceTimersByTime(2 * 60 * 1000);

    await act(async () => {
      fireEvent(document, new Event("visibilitychange"));
    });

    expect(screen.getByText(PROMPT)).toBeInTheDocument();
  });

  it("waits until nothing is holding it back", async () => {
    serverBuild("build-2");
    const { rerender } = renderPrompt(true);

    await waitForCheck();
    expect(screen.queryByText(PROMPT)).not.toBeInTheDocument();

    rerender(
      <UpdatePromptProvider>
        <Holder active={false} />
      </UpdatePromptProvider>,
    );
    expect(screen.getByText(PROMPT)).toBeInTheDocument();
  });

  it("goes away when dismissed", async () => {
    serverBuild("build-2");
    renderPrompt();
    await waitForCheck();

    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(screen.queryByText(PROMPT)).not.toBeInTheDocument();
  });
});
