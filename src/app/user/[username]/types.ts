import {Endpoints} from "@octokit/types";

export type User = Endpoints["GET /users/{username}"]["response"]["data"];
export type PublicRepos =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];
export type PublicCommits =
  Endpoints["GET /search/commits"]["response"]["data"];
export type SearchHints = Endpoints["GET /search/users"]["response"]["data"];
