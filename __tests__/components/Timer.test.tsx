import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";

import Scrambler, { mockGenerate } from "../__mocks__/scrambler";
import TimerContainer from "../../src/components/Timer/TimerContainer";

jest.mock("../../lib/scrambler", () => Scrambler);

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("<TimerContainer>", () => {
  beforeEach(() => {
    Scrambler.mockClear();
    mockGenerate.mockClear();
  });

  it("renders the components", () => {
    const { container } = render(
      <MockedProvider>
        <TimerContainer />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
