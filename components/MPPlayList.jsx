import React, { useContext, Fragment } from "react";
import styles from "@/styles/mpplaylist.module.css";
import MPFileContext from "@/contexts/media/context";
import Image from "next/image";
import mp3Icon from "@/assests/mp3.png";

import MPFileNameSearch from "./MPFileNameSearch";
export default () => {
  const { LoadFile, mpFileNames, folderName, extn } = useContext(MPFileContext);

  const handleClick = async (e) => {
    e.target.getAttribute("data-relative") == "parent" &&
      LoadFile(
        e.target.getAttribute("data-name"),
        e.target.getAttribute("data-id")
      );
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    e.target.parentNode.dispatchEvent(clickEvent);
  };
  const selectOption = (options) => (extn === ".mp3" ? options[0] : options[1]);
  /**
   *
   * @param {string} extn
   * @param {string} folderName
   * @returns Is a jsx alert message, alerting End-User on type of media being displayed from which folder.
   */
  const MediaLocation = (extn, folderName) => {
    switch (extn) {
      case ".mp3":
        return (
          <p aria-readonly>
            {extn.slice(1)} files from {folderName}
          </p>
        );
      case ".mp4":
        return (
          <p aria-readonly>
            {extn.slice(1)} files from {folderName}
          </p>
        );
      default:
        break;
    }
  };
  const showFileNames = () => {
    let fileNames = mpFileNames.inOrder();
    return fileNames.length > 0 ? (
      <>
        <details className={styles.search}>
          <summary>Search</summary>
          <MPFileNameSearch />
        </details>
        <article
          className={`${selectOption([styles.mp3List, styles.mp4List])}`}
        >
          <header>
            {MediaLocation(extn, folderName)}
            <br />
            <hr />
          </header>

          {mpFileNames.inOrder().map((data) => {
            return (
              <div
                key={data.id}
                data-relative="parent"
                data-name={data.name}
                data-id={data.id}
                onClick={handleClick}
                className={`${selectOption([
                  styles.mp3MediaCard,
                  styles.mp4MediaCard,
                ])}`}
                
              >
                <Image
                  src={data.imageSrc || mp3Icon}
                  alt={selectOption(["mp3 Icon", "mp4 Icon"])}
                  className={selectOption([styles.mp3Icon, styles.mp4Icon])}
                  width={640}
                  height={360}
                />
                {/* <p className={styles.name}>{data.name}</p> */}
              </div>
            );
          })}
        </article>
      </>
    ) : (
      <p aria-readonly>
        No {extn.slice(1)} files from {folderName}, Try diffrent Folder.
      </p>
    );
  };
  return (
    <Fragment>
      {mpFileNames && (
        <>
          {showFileNames()}
          <br />
        </>
      )}
    </Fragment>
  );
};
