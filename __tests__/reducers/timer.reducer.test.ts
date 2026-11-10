import Scrambler from "../__mocks__/scrambler";
import { TimerReducer } from "../../src/reducers/timer.reducer";
import { initialState } from "../../src/components/Timer/initialState";
import { TimerActionKind } from "../../src/types/timer";

jest.mock("../../src/lib/scrambler", () => Scrambler);

describe("SETTLE_CLASSIC_MODE", () => {
  it("sets the starting mode while it's still undecided", () => {
    const state = TimerReducer(initialState, {
      type: TimerActionKind.SETTLE_CLASSIC_MODE,
      enabled: true,
    });

    expect(state.classicModeEnabled).toBe(true);
  });

  it("keeps times already on the page", () => {
    const solveTimes = [{ time: 12000, penalty: 0 }];
    const state = TimerReducer(
      { ...initialState, solveTimes },
      { type: TimerActionKind.SETTLE_CLASSIC_MODE, enabled: false },
    );

    expect(state.solveTimes).toEqual(solveTimes);
  });

  it("leaves it alone once the user has picked a mode", () => {
    const picked = TimerReducer(initialState, { type: TimerActionKind.TOGGLE_CLASSIC_MODE });
    const state = TimerReducer(picked, {
      type: TimerActionKind.SETTLE_CLASSIC_MODE,
      enabled: false,
    });

    expect(state.classicModeEnabled).toBe(true);
  });

  it("lets the server correct a provisional mode from the cache", () => {
    const guessed = TimerReducer(initialState, {
      type: TimerActionKind.SETTLE_CLASSIC_MODE,
      enabled: true,
      provisional: true,
    });
    const state = TimerReducer(guessed, {
      type: TimerActionKind.SETTLE_CLASSIC_MODE,
      enabled: false,
    });

    expect(state.classicModeEnabled).toBe(false);
    expect(state.classicModeProvisional).toBe(false);
  });

  it("clears the times when a correction changes the mode", () => {
    const solveTimes = [{ time: 12000, penalty: 0 }];
    const state = TimerReducer(
      { ...initialState, classicModeEnabled: false, classicModeProvisional: true, solveTimes },
      { type: TimerActionKind.SETTLE_CLASSIC_MODE, enabled: true },
    );

    expect(state.solveTimes).toEqual([]);
  });

  it("keeps the times when the server agrees with the cache", () => {
    const solveTimes = [{ time: 12000, penalty: 0 }];
    const state = TimerReducer(
      { ...initialState, classicModeEnabled: false, classicModeProvisional: true, solveTimes },
      { type: TimerActionKind.SETTLE_CLASSIC_MODE, enabled: false },
    );

    expect(state.solveTimes).toEqual(solveTimes);
  });

  it("won't let the server undo a toggle made over a cached mode", () => {
    const guessed = TimerReducer(initialState, {
      type: TimerActionKind.SETTLE_CLASSIC_MODE,
      enabled: false,
      provisional: true,
    });
    const picked = TimerReducer(guessed, { type: TimerActionKind.TOGGLE_CLASSIC_MODE });
    const state = TimerReducer(picked, {
      type: TimerActionKind.SETTLE_CLASSIC_MODE,
      enabled: false,
    });

    expect(state.classicModeEnabled).toBe(true);
  });
});
