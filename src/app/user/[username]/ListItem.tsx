import styles from "../../page.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import type {PublicRepos, PublicCommits} from "./types";

export function RepoList({public_repos}: {public_repos: PublicRepos | null}) {
  return public_repos
    ? public_repos.map((repo) => (
        <ListItem
          key={repo.id}
          href={repo.svn_url}
          title={repo.name}
          desc={repo.description}
        />
      ))
    : null;
}

export function CommitList({
  public_commits,
}: {
  public_commits: PublicCommits | null;
}) {
  return public_commits
    ? public_commits.items
        ?.slice(0, 5)
        .map((commit) => (
          <ListItem
            key={commit.node_id}
            href={commit.html_url}
            title={commit.repository.name}
            desc={commit.commit.message}
          />
        ))
    : null;
}

function ListItem({
  href,
  title,
  desc,
}: {
  href: string | undefined;
  title: string;
  desc: string | null;
}) {
  return (
    <a href={href} target="_blank">
      <li>
        <span className={styles.bold}>{title} </span>
        <FontAwesomeIcon icon={faChevronRight} size="xs" color="#a0a1a3" />
        <ul>
          <li className={styles.ml30}>{desc}</li>
        </ul>
      </li>
    </a>
  );
}
