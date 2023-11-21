import {Octokit} from "octokit";
import type {User} from "./types";

export async function getUser(username: string): Promise<User> {
  const octokit = new Octokit();
  const user = await octokit.request("GET /users/{username}", {
    username: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  console.log("github user:", user.data);
  return user.data;
}

export async function getPublicRepos(username: string) {
  const octokit = new Octokit();
  const res = await octokit.request("GET /users/{username}/repos", {
    username: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return res.data;
}

export async function getPublicCommits(username: string) {
  const octokit = new Octokit();
  const res = await octokit.request("GET /search/commits", {
    q: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return res.data;
}
