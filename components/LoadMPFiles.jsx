import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import MPFileContext from "@/contexts/media/context";
import styles from "@/styles/loadmpfiles.module.css";
import {FcOpenedFolder } from "react-icons/fc";
export default () => {
  const {
    FileInfo,
    MediaType,
    SearchMPFileNames,
    MediaTypeOk,
    FolderInfoAvailable,
    folderHandle,
    extn,
  } = useContext(MPFileContext);
  const router = useRouter();
  useEffect(() => {
    if (MediaTypeOk() && FolderInfoAvailable()) {
      SearchMPFileNames();
    }
  }, [extn, folderHandle]);
  /**
   * @param {object} e
   * @description Handles folder path changes.
   */
  const handleClick = async (e) => {
    try {
      const folderHandle = await window.showDirectoryPicker();
      typeof folderHandle === "object" &&
        FileInfo(folderHandle) &&
        router.push("/playlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className={styles.mpButtons}>
        <button
          aria-roledescription="click to choose mp3 file(s) in folder to be looked at next."
          data-extn=".mp3"
          onClick={(e) => {
            MediaType(e);
          }}
          className={`${styles.button} ${styles.mp3Button}`}
        >
          MP3
        </button>
        <button
          aria-roledescription="click to choose mp4 file(s) in folder to be looked at next."
          data-extn=".mp4"
          onClick={(e) => {
            MediaType(e);
          }}
          className={`${styles.button} ${styles.mp4Button}`}
        >
          MP4
        </button>
      </section>
      {extn && (
        <section
          aria-roledescription="a search form."
          id="search"
          className={styles.searchForm}
        >
          <button
            aria-roledescription="click in order to search device for folder you want to search for media."
            id="folder"
            onClick={handleClick}
            className={`${styles.button} ${styles.folderButton}`}
          >
            <FcOpenedFolder/>
          </button>
        </section>
      )}
    </>
  );
};