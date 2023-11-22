import {render, screen} from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {waitFor} from "@testing-library/react";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Home", () => {
  it("renders a description", () => {
    render(<Home />);

    const desc = screen.getByText(/lookup github users/i);

    expect(desc).toBeInTheDocument();
  });

  it("Show error if submit button is clicked without user input", async () => {
    render(<Home />);

    const btn = screen.getByRole("button", {name: /search/i});
    userEvent.click(btn);

    await waitFor(() => {
      const error = screen.getByText(/no username provided\./i);
      expect(error).toBeInTheDocument();
    });
  });
});
