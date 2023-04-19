import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/nav.module.css";
import LoadMPFiles from "@/components/LoadMPFiles";
import { SiPlayerfm, SiPlayerdotme } from "react-icons/si";
import { TbArrowRoundaboutRight } from "react-icons/tb";
export default () => {
  const router = useRouter(),
    currentPath = router.pathname;
  const isHome = /^\//.test(currentPath),
    isAbout = /^\/about/.test(currentPath),
    isFiles = /^\/files/.test(currentPath);
  return (
    <nav className={styles.navigation}>
      {isHome && (
        <Link
          title="logo"
          className={`${styles.logo} ${styles.center}`}
          href="/"
        >
          <SiPlayerdotme />
        </Link>
      )}
      {isFiles && (
        <div className={styles["mediafiles"]}>
          <LoadMPFiles />
        </div>
      )}
      {!isFiles && (
        <Link
          title="load media files"
          href="/files"
          className={styles["mediafiles"]}
        >
          <SiPlayerfm />
        </Link>
      )}

      {!isAbout && (
        <Link
          title="about"
          className={`${styles.about} ${styles.center}`}
          href="/about"
        >
          <TbArrowRoundaboutRight />
        </Link>
      )}
    </nav>
  );
};
