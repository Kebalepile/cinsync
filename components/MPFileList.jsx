import React, { useContext } from "react";
import MPFileContext from "@/contexts/media/context";

export default () => {
  const { LoadFile, mpFileNames } = useContext(MPFileContext);

  const handleClick = async (e) => {
    console.log(e.target.getAttribute("data-name"))
    LoadFile(e.target.getAttribute("data-name"));
  };
  return (
    <>
      {mpFileNames.length > 0 && (
        <article>
          <h1>Playlist below:</h1>
          {mpFileNames.map((name, index) => {
            return (
              <div key={index} data-name={name} onClick={handleClick}>
                {name}
              </div>
            );
          })}
        </article>
      )}
    </>
  );
};
