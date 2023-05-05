import React, { useContext, useRef, useEffect } from "react";
import styles from "@/styles/mp3player.module.css";
import MPFileContext from "@/contexts/media/context";
import { MediaPlayer, LoadMedia } from "@/components/mediaMethods";
import { play, skip, mediaTrackTime } from "@/library/mediaControls";
import { mp3MediaSession } from "@/library/mediaSession";
import { SiMusicbrainz } from "react-icons/si";
import { HiOutlinePlayPause } from "react-icons/hi2";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
export default () => {
  const { mediaFile, extn, LoadNextFile, LoadPreviousFile, AutoPlayFiles } =
    useContext(MPFileContext);

  const mediaRef = useRef(null),
    mediaTimeRef = useRef(null),
    intervalRef = useRef(null),
    currentTimeRef = useRef(null),
    titleRef = useRef(null),
    mediaSession = navigator.mediaSession;

  useEffect(() => {
    if (mediaFile) {
      LoadMedia(extn, mediaFile, mediaRef.current, AutoPlayFiles);
      mediaRef.current.ondurationchange = () => {
        startInterval();
      };
      mediaRef.current.onended = () => stopInterval();
      titleRef.current.textContent = mediaFile.name;
      try {
        let setUpDone = mp3MediaSession(mediaFile);
        if (setUpDone) {
          mediaSession.setActionHandler("play", () => play(mediaRef.current));
          mediaSession.setActionHandler("pause", () => play(mediaRef.current));
          mediaSession.setActionHandler("seekbackward", () =>
            skip(mediaRef.current, 10, "backward")
          );
          mediaSession.setActionHandler("seekforward", () =>
            skip(mediaRef.current, 10, "forward")
          );
          mediaSession.setActionHandler("nexttrack", LoadNextFile);
          mediaSession.setActionHandler("previoustrack", LoadPreviousFile);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [mediaFile]);

  const handleAudioTrackTime = () => {
    let duration = mediaTrackTime(mediaRef.current.duration),
      currentTime = mediaTrackTime(mediaRef.current.currentTime);

    mediaTimeRef.current.style.width = `${(
      (Math.floor(mediaRef.current.currentTime) /
        Math.floor(mediaRef.current.duration)) *
      100
    ).toFixed(0)}%`;

    currentTimeRef.current.textContent = `${currentTime} / ${duration}`;
  };

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleAudioTrackTime, 1000);
  };
  const stopInterval = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className={styles.container}>
      <section className={styles.mediaPlayer}>
        {MediaPlayer(extn, mediaFile, mediaRef)}
        <button
          className={styles.playpause}
          onClick={(e) => {
            play(mediaRef.current);
          }}
        >
          <HiOutlinePlayPause />
        </button>
        <button
          className={styles.next}
          onClick={() => {
            LoadNextFile();
          }}
        >
          <RxTrackNext />
        </button>
        <button
          className={styles.prev}
          onClick={() => {
            LoadPreviousFile();
          }}
        >
          <RxTrackPrevious />
        </button>
        <button
          className={styles.skipForward}
          onClick={() => skip(mediaRef.current, 10, "forward")}
        >
          10s
        </button>
        <button
          className={styles.skipBackward}
          onClick={() => skip(mediaRef.current, 10, "backward")}
        >
          10s
        </button>
        <div ref={mediaTimeRef} className={styles.durationtrack}></div>

        <span className={styles.currentTime} ref={currentTimeRef}></span>
        <div className={styles.mediaTitle} ref={titleRef}></div>

        <div className={styles.art}>
          <SiMusicbrainz />
        </div>
      </section>
    </div>
  );
};
