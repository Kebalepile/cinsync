import React, { useContext, useRef, useEffect } from "react";
import MPFileContext from "@/contexts/media/context";
import { MediaPlayer, LoadMedia } from "@/components/mediaMethods";
import {
  play,
  volume,
  playBackRate,
  skip,
  autoPlay,
  trackVideoTime,
  pictureInPicture,
  fullScreen,
} from "@/library/videoControls";

export default () => {
  const {
    mediaFile,
    extn,
    filePresent,
    LoadNextFile,
    LoadPreviousFile,
    AutoPlayFiles,
  } = useContext(MPFileContext);

  const mediaRef = useRef(null);
  const mediaTimeRef = useRef(null); // create a ref for the div element
  const intervalRef = useRef(null);

  useEffect(() => {
    if (mediaFile) {
      LoadMedia(extn, mediaFile, mediaRef.current, AutoPlayFiles);
      console.log(mediaFile.name);
    }
  }, [mediaFile]);

  const handletrackVideoTime = () => {
    const mediaTime = {
      duration: trackVideoTime(mediaRef.current.duration),
      currentTime: trackVideoTime(mediaRef.current.currentTime),
    };

    mediaTimeRef.current.textContent = `${mediaTime.currentTime} / ${
      mediaTime.duration || ""
    },`; // update the div element with the media time information
  };

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handletrackVideoTime, 1000);
  };
  const stopInterval = () => {
    clearInterval(intervalRef.current);
  };
  return (
    <>
      {filePresent && (
        <section>
          <h1>Media Player</h1>
          {MediaPlayer(extn, mediaFile, mediaRef)}
          <section className="controls">
            <button
              onClick={(e) => {
                play(mediaRef.current);
                // code below handles the displaying of
                // video.duration & currentTime to the DOM
                // replace it when developing the frontend.
                mediaFile.current?.paused ? stopInterval() : startInterval();
              }}
            >
              play/pause
            </button>
            <button
              onClick={() => {
                LoadNextFile();
              }}
            >
              next
            </button>
            <button
              onClick={() => {
                LoadPreviousFile();
              }}
            >
              prev
            </button>
            <button onClick={() => playBackRate(mediaRef.current, 0.5)}>
              increase speed
            </button>
            <button onClick={() => playBackRate(mediaRef.current, -0.5)}>
              decrease speed
            </button>
            <button onClick={() => skip(mediaRef.current, 10, "forward")}>
              skip forward
            </button>
            <button onClick={() => skip(mediaRef.current, 10, "backward")}>
              skip backward
            </button>
            <button onClick={() => volume(mediaRef.current, 0.1)}>
              volume +
            </button>
            <button onClick={() => volume(mediaRef.current, -0.1)}>
              volume -
            </button>
            <button onClick={autoPlay}>auto play</button>
            <button
              onClick={() => {
                fullScreen(mediaRef.current);
              }}
            >
              full screen
            </button>
            <button
              onClick={() => {
                pictureInPicture(mediaRef.current);
              }}
            >
              picture in picture
            </button>
            <div ref={mediaTimeRef}></div> // add a div element that will
            display the media time information
          </section>
        </section>
      )}
    </>
  );
};
