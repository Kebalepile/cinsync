import React, { useContext, useRef, useEffect } from "react";
import MPFileContext from "@/contexts/media/context";
import { MediaPlayer, LoadMedia } from "@/components/mediaMethods";
import {
  handlePlay,
  handleVolume,
  handlePlayBackRate,
  handleSkip,
  handleAutoPlay,
  durationChange,
} from "@/utils/videoControls";

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
    }
  }, [mediaFile]);

  const handleDurationChange = () => {
    const mediaTime = {
      duration: durationChange(mediaRef.current.duration),
      currentTime: durationChange(mediaRef.current.currentTime),
    };
    // console.log(mediaTime);
    mediaTimeRef.current.textContent = `Duration: ${mediaTime.duration}, Current Time: ${mediaTime.currentTime}`; // update the div element with the media time information
  };

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleDurationChange, 1000);
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
                handlePlay(mediaRef.current);
                mediaFile.current?.paused ?
                stopInterval():
                startInterval()
              }}
            >
              play/pause
            </button>
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
            <button onClick={() => handlePlayBackRate(mediaRef.current, 0.5)}>
              increase speed
            </button>
            <button onClick={() => handlePlayBackRate(mediaRef.current, -0.5)}>
              decrease speed
            </button>
            <button onClick={() => handleSkip(mediaRef.current, 10, "forward")}>
              skip forward
            </button>
            <button
              onClick={() => handleSkip(mediaRef.current, 10, "backward")}
            >
              skip backward
            </button>
            <button onClick={() => handleVolume(mediaRef.current, 0.1)}>
              volume +
            </button>
            <button onClick={() => handleVolume(mediaRef.current, -0.1)}>
              volume -
            </button>
            <button onClick={handleAutoPlay}>auto play</button>
            <button onClick={handleDurationChange}>media time</button>
            <div ref={mediaTimeRef}></div> // add a div element that will
            display the media time information
          </section>
        </section>
      )}
    </>
  );
};
