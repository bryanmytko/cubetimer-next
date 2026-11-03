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
});
