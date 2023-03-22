import React, { useContext, useRef, useEffect } from "react";
import MPFileContext from "@/contexts/media/context";
import { MediaPlayer, LoadMedia } from "@/components/mediaMethods";
import {
  handlePlay,
  handleVolume,
  handlePlayBackRate,
  handleSkip,
  handleAutoPlay
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

  useEffect(() => {
  
    if (mediaFile) {
      LoadMedia(extn,mediaFile, mediaRef.current, AutoPlayFiles);
    }
  }, [mediaFile]);
  
  return (
    <>
      {filePresent && (
        <section>
          <h1>Media Player</h1>
          {MediaPlayer(extn, mediaFile, mediaRef)}
          <section className="controls">
            <button onClick={e => {
              handlePlay(mediaRef.current)
            }}>play/pause</button>
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
            <button onClick={() => handlePlayBackRate(mediaRef.current,0.5)}>
              increase speed
            </button>
            <button onClick={() => handlePlayBackRate(mediaRef.current,-0.5)}>
              decrease speed
            </button>
            <button onClick={() => handleSkip(mediaRef.current,10, "forward")}>
              skip forward
            </button>
            <button onClick={() => handleSkip(mediaRef.current,10, "backward")}>
              skip backward
            </button>
            <button onClick={() => handleVolume(mediaRef.current,0.1)}>volume +</button>
            <button onClick={() => handleVolume(mediaRef.current,-0.1)}>volume -</button>
            <button onClick={handleAutoPlay}>auto play</button>
          </section>
        </section>
      )}
    </>
  );
};
