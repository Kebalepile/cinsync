import React, { useContext, Fragment } from "react";
import MPFileContext from "@/contexts/media/context";
import MPFileNameSearch from "./MPFileNameSearch";
export default () => {
  const { LoadFile, mpFileNames,folderName,
    extn } = useContext(MPFileContext);

  const handleClick = async (e) => {
    LoadFile(
      e.target.getAttribute("data-name"),
      e.target.getAttribute("data-id")
    );
  };
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
    <Fragment>
      {mpFileNames && (
        <>
          <MPFileNameSearch />
         { MediaLocation(extn, folderName)}
          <article>
            <h1>Playlist below:</h1>
            {mpFileNames.inOrder().map((data) => {
              return (
                <div
                  key={data.id}
                  data-name={data.name}
                  data-id={data.id}
                  onClick={handleClick}
                >
                  {data.name}
                </div>
              );
            })}
          </article>
        </>
      )}
    </Fragment>
  );
};
