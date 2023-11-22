import Image from "next/image";
import styles from "../../page.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import {CommitList, RepoList} from "./ListItem";
import {getUser, getPublicRepos, getPublicCommits} from "./githubApi";
import type {User, PublicRepos, PublicCommits} from "./types";
import SearchForm from "@/app/SearchForm";

export default async function User({params}: any) {
  let user: User | null = null;
  let public_repos: PublicRepos | null = null;
  let public_commits: PublicCommits | null = null;
  let error: any = null;

  if (params?.username) {
    try {
      const promises: Promise<any>[] = [];
      promises.push(getUser(params.username));
      promises.push(getPublicRepos(params.username));
      promises.push(getPublicCommits(params.username));

      [user, public_repos, public_commits] = await Promise.all(promises);
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      }
    }
  } else {
    error = "No username in request.";
  }

  if (error || !user) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <p style={{margin: "20px"}}>
            {error}
            <br />
            Did you type a valid username?
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <SearchForm showSubmitBtn={false} autoFocus={false} />
      <div className={styles.description} style={{width: 1100}}>
        <Image
          className={styles.logo}
          src={user.avatar_url}
          alt="Github Logo"
          width={100}
          height={100}
          priority
        />
        <h1 style={{margin: 20}}>{user.login}</h1>
        <p>
          <FontAwesomeIcon icon={faUsers} /> {user.followers} followers,
          following {user.following}&nbsp;&nbsp; - &nbsp;&nbsp;
          <FontAwesomeIcon icon={faCalendarDays} /> Member since{" "}
          {user.created_at.split("T")[0]}
        </p>
        <div className={styles.userInfoContainer}>
          <div className={styles.width40p}>
            <h2>Public Repositories:</h2>
            <br />
            <ul className={styles.infoList}>
              <RepoList public_repos={public_repos} />
            </ul>
          </div>
          <div className={styles.width40p}>
            <h2>Last Public Commits:</h2>
            <br />
            <ul className={styles.infoList}>
              <CommitList public_commits={public_commits} />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
