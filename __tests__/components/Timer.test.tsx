import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";

import Scrambler, { mockGenerate } from "../__mocks__/scrambler";
import Timer from "../../components/Timer/Timer";

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

describe("<Timer>", () => {
  beforeEach(() => {
    Scrambler.mockClear();
    mockGenerate.mockClear();
  });

  it("renders the components", () => {
    const { container } = render(
      <MockedProvider>
        <Timer />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
