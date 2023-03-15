// import React from "react";
import Link from "next/link";
import styles from "@/styles/nav.module.css";
export default () => {
  return (
    <nav className={styles.navigation}>
      <Link href="/">Home</Link>
      <Link href="/MPFileSearch">Mp file search</Link>
      <Link href="/about">About</Link>
    </nav>
  );
};
