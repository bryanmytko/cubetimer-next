import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Nav from "../../components/Header/Nav";

describe("<Nav>", () => {
  it("renders the component", () => {
    const { container } = render(<Nav />);

    expect(container).toMatchSnapshot();
  });

  it("displays the navigation items", () => {
    const nav = [
      { name: "Timer", url: "/" },
      { name: "Statistics", url: "statistics" },
      { name: "Profile", url: "profile" },
      { name: "Tutorials", url: "tutorials" },
      { name: "Login", url: "login" },
    ];
    render(<Nav t={(key) => key} />);

    nav.forEach((navItem) => {
      const link = screen.getByText(navItem.name);
      expect(link).toHaveAttribute("href", navItem.url);
    });
  });
});
