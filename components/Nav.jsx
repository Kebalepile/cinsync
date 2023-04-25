import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/nav.module.css";
import LoadMPFiles from "@/components/LoadMPFiles";
import { SiMusicbrainz } from "react-icons/si";

export default () => {
  const router = useRouter(),
    currentPath = router.pathname;
  const isHome = /^\/$/.test(currentPath);
  return (
    <nav className={styles.navigation}>
      <Link title="logo" className={`${styles.logo} ${styles.center}`} href="/">
        <SiMusicbrainz />
      </Link>

      {isHome && (
        <div className={styles["mediafiles"]}>
          <LoadMPFiles />
        </div>
      )}

      {isHome && (
        <Link
          title="about"
          className={`${styles.about} ${styles.center}`}
          href="/about"
        >
          about
        </Link>
      )}
    </nav>
  );
};
