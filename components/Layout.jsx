import React from "react";
import Nav from "./Nav";
import styles from "@/styles/layout.module.css";
export default ({ children }) => {
  return (
    <div className={styles.main}>
      <Nav />
      <main>{children}</main>
    </div>
  );
};
