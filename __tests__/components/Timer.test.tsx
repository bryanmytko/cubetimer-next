import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Timer from "../../components/Timer/Timer";

describe("<Timer>", () => {
  it("renders the components", () => {
    const { container } = render(<Timer />);

    expect(container).toMatchSnapshot();
  });
});
