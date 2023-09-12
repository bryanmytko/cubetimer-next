import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

import Logo from "../../src/components/Header/Logo";

describe("<Logo>", () => {
  it("renders the component", () => {
    const { container } = render(<Logo />);

    expect(container).toMatchSnapshot();
  });
});
