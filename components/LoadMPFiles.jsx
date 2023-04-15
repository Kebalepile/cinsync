import React, { useEffect, useContext } from "react";
import MPFileContext from "@/contexts/media/context";
import styles from "@/styles/loadmpfiles.module.css"

export default () => {
  const {
    FileInfo,
    MediaType,
    SearchMPFileNames,
    MediaTypeOk,
    FolderInfoAvailable,
    folderHandle,
    folderName,
    extn
  } = useContext(MPFileContext);

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
    const folderHandle = await window.showDirectoryPicker();
    FileInfo(folderHandle);
  };

  /**
   *
   * @param {string} extn
   * @param {string} folderName
   * @returns Is a jsx alert message, alerting End-User on type of media being displayed from which folder.
   */
  const SearchAlert = (extn, folderName) => {
    switch (extn) {
      case ".mp3":
        return (
          <p aria-readonly>
            playing {extn.slice(1)} files from {folderName} folder.
          </p>
        );
      case ".mp4":
        return (
          <p aria-readonly>
            playing {extn.slice(1)} files from {folderName} folder.
          </p>
        );
      default:
        break;
    }
  };

  return (
    <>
      <section>
      
        <button
          aria-roledescription="click to choose mp3 file(s) in folder to be looked at next."
          data-extn=".mp3"
          onClick={(e) => MediaType(e)}
          className={`${styles.button} ${styles.mp3Button}`}
        >
          MP3
        </button>
        <button
          aria-roledescription="click to choose mp4 file(s) in folder to be looked at next."
          data-extn=".mp4"
          onClick={(e) => MediaType(e)}
          className={`${styles.button} ${styles.mp4Button}`}
        >
          MP4
        </button>
      </section>
      {extn && (
        <section aria-roledescription="a search form." id="search" className={styles.searchForm}>
          <button
            aria-roledescription="click in order to search device for folder you want to search for media."
            id="folder"
            onClick={handleClick}
            className={`${styles.button} ${styles.folderButton}`}
          >
            Select Folder
          </button>
          {folderName && SearchAlert(extn, folderName)}
        </section>
      )}
      
    </>
  );
};
