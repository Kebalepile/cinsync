import React, { useState, useContext, useRef, useEffect } from "react";
import MPFileContext from "@/contexts/media/context";
export default () => {
  const {
    mediaFile,
    extn,
    filePresent,
    LoadNextFile,
    LoadPreviousFile,
    EnableAutoPlay,
    AutoPlayFiles,
  } = useContext(MPFileContext);

  const mediaRef = useRef(null);
 
  useEffect(() => {
 console.log(mediaFile)
    if (mediaFile) {
      loadMedia(extn);
    
    }
  }, [mediaFile]);


  const handlePlay = () => {
    let media = mediaRef.current;
    media.paused ? media.play() : media.pause();
  };
  const handleMediaEnded = (e) => {
    AutoPlayFiles(mediaRef.current.getAttribute("data-name"));
    e.target.removeEventListener("ended", handleMediaEnded);
  };

  const handleSkip = (seconds, direction) => {
    const mediaElement = mediaRef.current;
    switch (direction) {
      case "forward":
        mediaElement.currentTime += seconds;
        break;
      case "backward":
        mediaElement.currentTime -= seconds;
        break;
      default:
        break;
    }
  };
  const handlePlayBackRate = (change) => {
    let media = mediaRef.current;
    media.playbackRate = Math.min(Math.max(media.playbackRate + change, 0.25), 5.0);
  };

  const loadMedia = (mediaType) => {
    let mediaElement = mediaRef.current;
    mediaElement.addEventListener("ended", handleMediaEnded);

    switch (mediaType) {
      case ".mp3":
        let sourceElement = mediaElement.querySelector("source");
        sourceElement.src = URL.createObjectURL(
          new Blob([mediaFile], { type: mediaFile?.type })
        );
        mediaElement.load();
        break;
      case ".mp4":
        mediaElement.src = URL.createObjectURL(
          new Blob([mediaFile], { type: mediaFile?.type })
        );
        mediaElement.load();
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
            <button
              onClick={() => {
                LoadNextFile(mediaRef.current.getAttribute("data-name"));
              }}
            >
              next
            </button>
            <button
              onClick={() => {
                LoadPreviousFile(mediaRef.current.getAttribute("data-name"));
              }}
            >
              prev
            </button>
            <button onClick={() => handlePlayBackRate(0.5)}>
              increase speed
            </button>
            <button onClick={() => handlePlayBackRate(-0.5)}>
              decrease speed
            </button>
            <button onClick={() => handleSkip(10, "forward")}>
              skip forward
            </button>
            <button onClick={() => handleSkip(10, "backward")}>
              skip backward
            </button>
            <button onClick={() => EnableAutoPlay()}>auto play</button>
          </section>
        </section>
      )}
    </>
  );
};
