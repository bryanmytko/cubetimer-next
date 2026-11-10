import { render } from "@testing-library/react";

import Welcome from "../../src/pages/auth/welcome";
import { track } from "../../src/lib/analytics";

jest.mock("../../src/lib/analytics", () => ({ track: jest.fn() }));

const replace = jest.fn();
let query: Record<string, string> = {};

jest.mock("next/router", () => ({
  useRouter: () => ({ isReady: true, query, replace }),
}));

describe("<Welcome>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("counts the sign-up and continues to the callback", () => {
    query = { callbackUrl: `${window.location.origin}/solves?page=2` };
    render(<Welcome />);

    expect(track).toHaveBeenCalledWith("sign_up", {});
    expect(replace).toHaveBeenCalledWith("/solves?page=2");
  });

  it("goes home when there's no callback", () => {
    query = {};
    render(<Welcome />);

    expect(replace).toHaveBeenCalledWith("/");
  });

  it("never follows a callback to another site", () => {
    query = { callbackUrl: "https://evil.example/phish" };
    render(<Welcome />);

    expect(replace).toHaveBeenCalledWith("/");
  });

  it("treats a protocol-relative callback as another site", () => {
    query = { callbackUrl: "//evil.example/phish" };
    render(<Welcome />);

    expect(replace).toHaveBeenCalledWith("/");
  });
});
