import Image from "next/image";
import styles from "./page.module.css";
import SearchForm from "./SearchForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Image
          className={styles.logo}
          src="/github.png"
          alt="Github Logo"
          width={100}
          height={100}
          priority
        />
        <p style={{margin: "20px"}}>Lookup github users</p>
        <SearchForm />
      </div>
    </main>
  );
}
