import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import "@testing-library/jest-dom";

import Settings from "../../src/pages/settings";
import { SETTINGS_FOR_USER } from "../../src/graphql/queries/settingsForUser";
import { UPDATE_SETTINGS } from "../../src/graphql/mutations/updateSettings";

const USER_ID = "12345687890";

jest.mock("next/router", () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  return {
    __esModule: true,
    ...originalModule,
    signOut: jest.fn(),
    useSession: jest.fn(() => ({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { id: "12345687890", name: "Ada", email: "ada@example.com" },
      },
      status: "authenticated",
    })),
  };
});

const settingsQuery = (defaultClassicMode: boolean): MockedResponse => ({
  request: { query: SETTINGS_FOR_USER, variables: { userId: USER_ID } },
  result: { data: { settingsForUser: { defaultClassicMode, __typename: "Settings" } } },
});

const updateMutation = (defaultClassicMode: boolean, fail = false): MockedResponse => ({
  request: { query: UPDATE_SETTINGS, variables: { userId: USER_ID, defaultClassicMode } },
  ...(fail
    ? { error: new Error("Network down") }
    : { result: { data: { updateSettings: { defaultClassicMode, __typename: "Settings" } } } }),
});

const renderSettings = (mocks: Array<MockedResponse>) =>
  render(
    <MockedProvider mocks={mocks}>
      <Settings />
    </MockedProvider>,
  );

describe("Settings page", () => {
  it("shows who is signed in", async () => {
    renderSettings([settingsQuery(false)]);
    expect(await screen.findByText("Ada")).toBeInTheDocument();
    expect(screen.getByText(/ada@example.com/)).toBeInTheDocument();
  });

  it("shows the saved Classic Mode setting", async () => {
    renderSettings([settingsQuery(true)]);
    await waitFor(() =>
      expect(screen.getByRole("switch", { name: "Start in Classic Mode" })).toHaveAttribute(
        "aria-checked",
        "true",
      ),
    );
  });

  it("saves when Classic Mode is switched on", async () => {
    renderSettings([settingsQuery(false), updateMutation(true)]);
    const toggle = await screen.findByRole("switch", { name: "Start in Classic Mode" });

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(await screen.findByText("Saved")).toBeInTheDocument();
  });

  it("switches back and says so when saving fails", async () => {
    renderSettings([settingsQuery(false), updateMutation(true, true)]);
    const toggle = await screen.findByRole("switch", { name: "Start in Classic Mode" });

    await userEvent.click(toggle);

    expect(await screen.findByText(/Couldn't save/)).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});
