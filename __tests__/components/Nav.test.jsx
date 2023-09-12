import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";

import Nav from "../../src/components/Header/Nav";

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

describe("<Nav>", () => {
  it("renders the component", () => {
    const { container } = render(
      <MockedProvider>
        <Nav />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  // it("displays the navigation items", () => {
  //   const nav = [
  //     { name: "Timer", url: "/" },
  //     { name: "Statistics", url: "statistics" },
  //     { name: "Profile", url: "profile" },
  //     { name: "Tutorials", url: "tutorials" },
  //     { name: "Login", url: "login" },
  //   ];
  //   render(
  //     <SessionProvider>
  //       <Nav t={(key) => key} />
  //     </SessionProvider>
  //   );
  //
  //   nav.forEach((navItem) => {
  //     const link = screen.getByText(navItem.name);
  //     expect(link).toHaveAttribute("href", navItem.url);
  //   });
  // });
});
