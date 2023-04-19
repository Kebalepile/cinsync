import React from "react";
import Nav from "./Nav";
import ArtWall from "@/components/ArtWall";
import styles from "@/styles/layout.module.css";
export default ({ children }) => {
  return (
    <div className={styles.main}>
      <Nav />
      <ArtWall />
      <main>{children}</main>
    </div>
  );
};
