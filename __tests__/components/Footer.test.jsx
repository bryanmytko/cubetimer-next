import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import { Footer } from "../../components/Footer";

describe("<Footer>", () => {
  it("renders the component", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });

  it("displays the correct copyright date", () => {
    render(<Footer />);
    const date = new Date().getFullYear();
    const re = new RegExp(date);

    expect(screen.getByText(re)).toBeInTheDocument();
  });
});
