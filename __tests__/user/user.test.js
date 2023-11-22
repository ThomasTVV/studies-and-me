import {render, screen} from "@testing-library/react";
import User from "../../src/app/user/[username]/page";
import "@testing-library/jest-dom";

jest.mock("../../src/app/user/[username]/githubApi", () => ({
  getUser: () => {
    return {
      login: "thomastvv",
      followers: "42",
      created_at: "2019-03-21T12:12:10Z",
      avatar_url: "https://avatars.githubusercontent.com/u/48794323?v=4",
    };
  },
  getPublicCommits: () => null,
  getPublicRepos: () => null,
  getSearchHints: () => null,
}));

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("User", () => {
  it("renders page if user exists.", async () => {
    render(await User({params: {username: "thomastvv"}}));

    const title = screen.getByRole("heading", {name: /thomastvv/i});

    expect(title).toBeInTheDocument();
  });
});
