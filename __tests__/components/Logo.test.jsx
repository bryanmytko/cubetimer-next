import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import Logo from "../../components/Header/Logo";

describe("<Logo>", () => {
  it("renders the component", () => {
    const { container } = render(<Logo />);

    expect(container).toMatchSnapshot();
  });
});
