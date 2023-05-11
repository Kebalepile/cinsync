import React, { useContext, Fragment, useEffect } from "react";
import styles from "@/styles/mpplaylist.module.css";
import MPFileContext from "@/contexts/media/context";
import Image from "next/image";
import { TbMoodSearch } from "react-icons/tb";
import { GiZigzagTune } from "react-icons/gi";
import MPFileNameSearch from "./MPFileNameSearch";

export default () => {
  const { LoadFile, mpFileNames, folderName, extn } = useContext(MPFileContext);

  useEffect(() => {
    if (mpFileNames) {
      let arr = mpFileNames.inOrder();
   
      if (arr.length > 0 && Boolean(arr[0])) {
        //AutoPlay first file if files found.
        LoadFile(arr[0]?.name, arr[0]?.id);
      }
    }
  }, [mpFileNames]);

  const handleClick = async (e) => {
    try {
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
    } catch (error) {
      // console.error(error);
    }
  };
  const selectOption = (options) => (extn === ".mp3" ? options[0] : options[1]);
  const mediaImage = (data) =>
    extn === ".mp3" ? (
      <>
        <GiZigzagTune className={styles.mp3Icon} />
        <p className={styles.name}>{data?.name}</p>
      </>
    ) : (
      <figure>
        <Image
          src={data?.imageSrc}
          alt="mp4 Icon"
          className={styles.mp4Icon}
          width={640}
          height={360}
        />
        <figcaption>{data?.name}</figcaption>
      </figure>
    );
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
    return fileNames.length > 0 && fileNames[0] ? (
      <>
        <details className={selectOption([styles.searchMp3, styles.searchMp4])}>
          <summary style={{ listStyle: "none", textAlign: "center" }}>
            Search <TbMoodSearch />
          </summary>
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
            try {
              return (
                <div
                  key={data?.id}
                  data-relative="parent"
                  data-name={data?.name}
                  data-id={data?.id}
                  onClick={handleClick}
                  className={`${selectOption([
                    styles.mp3MediaCard,
                    styles.mp4MediaCard,
                  ])}`}
                >
                  {mediaImage(data)}
                </div>
              );
            } catch (error) {
              // console.error(error);
            }
          })}
        </article>
      </>
    ) : (
      <p aria-readonly className={styles.message}>
        No {extn?.slice(1)} files from {folderName}, Try diffrent Folder.
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
