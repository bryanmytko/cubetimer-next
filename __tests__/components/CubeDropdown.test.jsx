import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import CubeDropdown from "../../src/components/Timer/CubeDropdown";

describe("<CubeDropdown>", () => {
  it("renders the component", () => {
    const { container } = render(<CubeDropdown />);

    expect(container).toMatchSnapshot();
  });

  it("should correctly set default option", () => {
    render(<CubeDropdown />);

    expect(screen.getByRole("option", { name: "3x3" }).selected).toBe(true);
  });

  it("should display the correct number of options", () => {
    render(<CubeDropdown />);

    expect(screen.getAllByRole("option").length).toBe(4);
  });

  it("should allow user to change cube size", async () => {
    render(<CubeDropdown dispatch={() => {}} />);

    await userEvent.selectOptions(
      screen.getByTestId("select"),
      screen.getByText("4x4")
    );

    expect(screen.getByRole("option", { name: "4x4" }).selected).toBe(true);
  });
});
