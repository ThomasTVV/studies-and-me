"use client";

import {redirect, useRouter} from "next/navigation";
import {useState} from "react";
import styles from "./page.module.css";

export default function SearchForm() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function search(event: React.SyntheticEvent) {
    event.preventDefault(); // prevent page refresh

    if (input.length == 0) {
      setError("No username provided.");
    } else {
      console.log("bør redirect!");
      const path = `user/${input}`;
      router.push(path);
    }
  }

  return (
    <form onSubmit={search} className={styles.searchForms}>
      <input
        type="text"
        placeholder="Github username..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.searchField}
        autoFocus={true}
      />
      <br />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
      {error != "" && (
        <p style={{color: "red", textAlign: "center", padding: 10}}>{error}</p>
      )}
    </form>
  );
}
