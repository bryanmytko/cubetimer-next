import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import { Footer } from "../../src/components/Footer";

describe("<Footer>", () => {
  it("renders the component", () => {
    // Pin the year so the snapshot doesn't break every January
    const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(2025);
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
    spy.mockRestore();
  });

  it("displays the correct copyright date", () => {
    render(<Footer />);
    const date = new Date().getFullYear();
    const re = new RegExp(date);

    expect(screen.getByText(re)).toBeInTheDocument();
  });
});
