"use client";

import {useEffect, useRef, useState} from "react";
import styles from "./page.module.css";
import {getSearchHints} from "./user/[username]/githubApi";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default function SearchFormHint({input}: {input: string}) {
  const [searchhints, setSearchHints] = useState<React.JSX.Element[] | null>(
    null
  );

  const lastInputChangeTime = useRef<number>(0);
  const updateIntervalMS = 500;

  useEffect(() => {
    // we dont want to spam the server, so only update after user is idle for {updateIntervalMS} or more.
    function maybeUpdateHints() {
      const noUserActionIn1Second =
        Date.now() - lastInputChangeTime.current >= updateIntervalMS;
      if (noUserActionIn1Second) {
        getSearchHints(input).then((res) => {
          const hints = res.items.map((hint) => (
            <Link key={hint.id} href={`/user/${hint.login}`}>
              <li>
                {hint.login}{" "}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="xs"
                  color="#a0a1a3"
                />
              </li>
            </Link>
          ));
          setSearchHints(hints);
        });
      }
    }

    try {
      if (input.length > 0) {
        lastInputChangeTime.current = Date.now();
        setTimeout(() => {
          maybeUpdateHints();
        }, updateIntervalMS);
      }
    } catch (err) {
      console.log("SearcFormHint.tsx error:", err);
    }
  }, [input]);

  if (!searchhints) {
    return null;
  }

  return (
    <div className={styles.searchHintContainer}>
      <ul>{searchhints}</ul>
    </div>
  );
}
