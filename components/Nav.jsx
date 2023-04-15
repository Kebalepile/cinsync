
import Link from "next/link";
import styles from "@/styles/nav.module.css";
import LoadMPFiles from "@/components/LoadMPFiles"
export default () => {
  
  return (
    <nav className={styles.navigation}>
      <Link className={`${styles.logo} ${styles.center}`} href="/">Logo</Link>
      <div id={styles["media-type"]}>
        <LoadMPFiles/>
      </div>
      {/* <Link href="/files">Mp file search</Link> */}
      
      <Link className={`${styles.about} ${styles.center}`} href="/about">About</Link>
    </nav>
  );
};
