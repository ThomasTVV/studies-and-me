"use client";

import {redirect, useRouter} from "next/navigation";
import {useState} from "react";
import styles from "./page.module.css";
import SearchFormHint from "./SearchFormHint";

export default function SearchForm({
  showSubmitBtn = true,
  autoFocus = true,
}: {
  showSubmitBtn?: boolean;
  autoFocus?: boolean;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function search(event: React.SyntheticEvent) {
    event.preventDefault(); // prevent page refresh

    if (input.length == 0) {
      setError("No username provided.");
    } else {
      console.log("bør redirect!");
      const path = `/user/${input}`;
      router.push(path);
    }
  }

  return (
    <form onSubmit={search} className={styles.searchForms}>
      <div style={{position: "relative"}}>
        <input
          type="text"
          placeholder="Github username..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.searchField}
          autoFocus={autoFocus}
        />
        <SearchFormHint input={input} />
      </div>
      <br />
      {showSubmitBtn && (
        <button type="submit" className={styles.searchButton}>
          Show
        </button>
      )}
      {error != "" && (
        <p style={{color: "red", textAlign: "center", padding: 10}}>{error}</p>
      )}
    </form>
  );
}
