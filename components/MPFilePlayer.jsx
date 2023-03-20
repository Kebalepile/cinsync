import React, { useState, useContext, useRef, useEffect } from "react";
import MPFileContext from "@/contexts/media/context";
export default () => {
  const { mediaFile, extn, filePresent } = useContext(MPFileContext);
  const [state, setState] = useState({
    mediaRef: useRef(null),
  });
  const { mediaRef } = state;

  useEffect(() => {
    if (mediaFile) {
      loadMedia(extn);
    }
  }, [mediaFile]);
  const handlePlay = () => {
    let media = mediaRef.current;
    media.paused ? media.play() : media.pause();
  };
  const loadMedia = (mediaType) => {
    console.log(mediaFile?.name);
    console.log(mediaRef.current.getAttribute("data-name"));
    switch (mediaType) {
      case ".mp3":
        let audio = mediaRef.current;

        let sourceElement = audio.querySelector("source");
        sourceElement.src = URL.createObjectURL(
          new Blob([mediaFile], { type: mediaFile?.type })
        );
        audio.load();
        break;
      case ".mp4":
        let video = mediaRef.current;
        video.src = URL.createObjectURL(
          new Blob([mediaFile], { type: mediaFile?.type })
        );
        video.load();
        break;
      default:
        break;
    }
  };
  const mediaPlayer = (mediaType) => {
    let mediaSrc = URL.createObjectURL(
      new Blob([mediaFile], { type: mediaFile?.type })
    );

    switch (mediaType) {
      case ".mp3":
        return (
          <audio autoPlay ref={mediaRef} data-name={mediaFile?.name}>
            <source src={mediaSrc} type="audio/mp3" />
          </audio>
        );
      case ".mp4":
        return (
          <video
            autoPlay
            ref={mediaRef}
            src={mediaSrc}
            data-name={mediaFile?.name}
            width={500}
            height={200}
          />
        );

      default:
        break;
    }
  };
  return (
    <>
      {filePresent && (
        <section>
          <h1>Media Player</h1>
          {mediaPlayer(extn)}
          <section className="controls">
            <button onClick={handlePlay}>play/pause</button>
          </section>
        </section>
      )}
    </>
  );
};
