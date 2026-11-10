jest.mock("nextjs-google-analytics", () => ({ event: jest.fn() }));

// The queue lives in the module, so each test gets a fresh copy, along with
// the mock it sends through
const loadAnalytics = async () => ({
  ...(await import("../../src/lib/analytics")),
  event: (await import("nextjs-google-analytics")).event as jest.Mock,
});

const solve = {
  puzzle: "3x3",
  penalty: "none" as const,
  inspection: false,
  classic_mode: false,
  signed_in: true,
};

const gtagWindow = window as unknown as { gtag?: () => void };

describe("track", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.clearAllMocks();
    delete gtagWindow.gtag;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("sends straight away once gtag is loaded", async () => {
    gtagWindow.gtag = jest.fn();
    const { event, track } = await loadAnalytics();

    track("solve_completed", solve);

    expect(event).toHaveBeenCalledWith("solve_completed", solve);
  });

  it("holds events until gtag loads, then sends them in order", async () => {
    const { event, track } = await loadAnalytics();

    track("sign_up", {});
    track("solve_completed", solve);
    expect(event).not.toHaveBeenCalled();

    gtagWindow.gtag = jest.fn();
    jest.advanceTimersByTime(500);

    expect(event.mock.calls.map(([name]) => name)).toEqual([
      "sign_up",
      "solve_completed",
    ]);
  });

  it("drops held events if gtag never loads", async () => {
    const { event, track } = await loadAnalytics();

    track("sign_up", {});
    jest.advanceTimersByTime(10 * 1000);
    gtagWindow.gtag = jest.fn();
    jest.advanceTimersByTime(10 * 1000);

    expect(event).not.toHaveBeenCalled();
  });

  it("never throws if sending fails", async () => {
    gtagWindow.gtag = jest.fn();
    const { event, track } = await loadAnalytics();
    event.mockImplementation(() => {
      throw new Error("blocked");
    });

    expect(() => track("coffee_click", {})).not.toThrow();
  });
});
