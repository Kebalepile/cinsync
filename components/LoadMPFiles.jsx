import React, { useEffect, useContext, useRef } from "react";
import MPFileContext from "@/contexts/media/context";
import styles from "@/styles/loadmpfiles.module.css";
import { FcOpenedFolder } from "react-icons/fc";
export default function LoadMPFiles() {
  const {
    FileInfo,
    MediaType,
    SearchMPFileNames,
    MediaTypeOk,
    FolderInfoAvailable,
    folderHandle,
    extn,
  } = useContext(MPFileContext);

  const folderRef = useRef(null);
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
      if ("showDirectoryPicker" in window) {
        const folderHandle = await window.showDirectoryPicker();
        if (typeof folderHandle === "object") {
          FileInfo(folderHandle);
        }
      } else {
        androidWedkitDirectory();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  function androidWedkitDirectory() {
    try {
      let fileInput = folderRef.current;

      fileInput.click();
      fileInput.addEventListener("change", () => {
        const filesList = fileInput.files;
        if (typeof filesList === "object") {
          FileInfo(filesList);
        }
      });
    } catch (error) {
      // console.log("Android Error: ", error);
    }
  }

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
            <FcOpenedFolder />
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              ref={folderRef}
            />
          </button>
        </section>
      )}
    </>
  );
};
