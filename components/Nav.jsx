import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/nav.module.css";
import LoadMPFiles from "@/components/LoadMPFiles";

export default () => {
  const router = useRouter(),
    currentPath = router.pathname;
    const isHome = /^\//.test(currentPath),
    isAbout = /^\/about/.test(currentPath),
    isFiles = /^\/files/.test(currentPath);
  return (
    <nav className={styles.navigation}>
      {isHome && <Link className={`${styles.logo} ${styles.center}`} href="/">
        Logo
      </Link>}
      {isFiles && (
        <div className={styles["mediafiles"]}>
          <LoadMPFiles />
        </div>
      )}
      {
        (!isFiles && <Link href="/files" className={styles["mediafiles"]}>media</Link>)}

      {
        (!isAbout && (
          <Link className={`${styles.about} ${styles.center}`} href="/about">
            About
          </Link>
        ))}
    </nav>
  );
};
