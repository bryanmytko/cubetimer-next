import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

import Header from "../../src/components/Header/Header";

describe("<Header>", () => {
  it("renders the component", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
