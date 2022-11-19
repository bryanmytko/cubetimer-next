import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CubeDropdown from "../components/Timer/CubeDropdown";

it("allows the user to change the cube size", () => {
  const { container } = render(<CubeDropdown />);
  expect(container).toMatchSnapshot();
});
