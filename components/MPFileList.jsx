import React, { useContext } from "react";
import MPFileContext from "@/contexts/media/context";

export default () => {
  const { LoadFile, mpFileNames } = useContext(MPFileContext);

  const handleClick = async (e) => {

    LoadFile(e.target.getAttribute("data-name"), e.target.getAttribute("data-id"));
  };
  return (
    <>
      {mpFileNames && (
        <article>
          <h1>Playlist below:</h1>
          {mpFileNames.inOrder().map((data) => {
            return (
              <div key={data.id} data-name={data.name} data-id={data.id} onClick={handleClick}>
                {data.name}
              </div>
            );
          })}
        </article>
      )}
    </>
  );
};
