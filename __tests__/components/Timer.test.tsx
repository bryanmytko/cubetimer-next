import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Scrambler, { mockGenerate } from "../__mocks__/scrambler";
import Timer from "../../components/Timer/Timer";

jest.mock("../../lib/scrambler", () => Scrambler);

describe("<Timer>", () => {
  beforeEach(() => {
    Scrambler.mockClear();
    mockGenerate.mockClear();
  });

  it("renders the components", () => {
    const { container } = render(<Timer />);

    expect(container).toMatchSnapshot();
  });
});
