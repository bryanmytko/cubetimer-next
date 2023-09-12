import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import "@testing-library/jest-dom";

import Header from "../../src/components/Header/Header";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "",
    };
  },
}));

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

describe("<Header>", () => {
  it("renders the component", () => {
    const { container } = render(
      <MockedProvider>
        <Header />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
