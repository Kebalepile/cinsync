import React, { useContext, useRef, useEffect } from "react";
import styles from "@/styles/mp4player.module.css";
import MPFileContext from "@/contexts/media/context";
import { MediaPlayer, LoadMedia } from "@/components/mediaMethods";
import { mp4MediaSession } from "@/library/mediaSession";
import { BsFullscreen } from "react-icons/bs";
import { TbPictureInPictureOn } from "react-icons/tb";
import { ImVolumeIncrease, ImVolumeDecrease } from "react-icons/im";
import {
  IoSettings,
  IoPlayForwardOutline,
  IoPlayBackOutline,
} from "react-icons/io5";
import {
  play,
  volume,
  playBackRate,
  skip,
  autoPlay,
  pictureInPicture,
  fullScreen,
  mediaTrackTime,
} from "@/library/mediaControls";

export default () => {
  const { mediaFile, extn, LoadNextFile, LoadPreviousFile, AutoPlayFiles } =
    useContext(MPFileContext);

  const mediaRef = useRef(null),
    mediaTimeRef = useRef(null),
    intervalRef = useRef(null),
    autoPlayRef = useRef(null),
    currentTimeRef = useRef(null),
    titleRef = useRef(null),
    settingOptionsRef = useRef(null),
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
        let setUpDone = mp4MediaSession(mediaFile);
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

  const handletrackVideoTime = () => {
    try {
      let duration = mediaTrackTime(mediaRef.current.duration),
        currentTime = mediaTrackTime(mediaRef.current.currentTime);

      mediaTimeRef.current.style.width = `${(
        (Math.floor(mediaRef.current.currentTime) /
          Math.floor(mediaRef.current.duration)) *
        100
      ).toFixed(0)}%`;

      currentTimeRef.current.textContent = `${currentTime} / ${duration}`;
    } catch (error) {
      console.error(error);
    }
  };

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handletrackVideoTime, 1000);
  };
  const stopInterval = () => {
    clearInterval(intervalRef.current);
  };
  const DisplaySettingOptions = () => {
    let elem = settingOptionsRef.current;

    elem.style.display = elem.style.display === "none" ? "flex" : "none";
  };
  const setAutoPlay = () => {
    let elem = autoPlayRef.current;

    autoPlay();
    elem.style.color =
      elem.style.color === "rgb(241, 242, 243)" ? "gray" : "rgb(241, 242, 243)";
  };

  return (
    <>
      <section className={styles.mediaPlayer}>
        {MediaPlayer(extn, mediaFile, mediaRef)}

        <button
          className={styles.playpause}
          onClick={(e) => {
            play(mediaRef.current);
          }}
        >
          <div className={styles.triangle}></div>
        </button>
        <div
          className={styles.next}
          onClick={() => {
            LoadNextFile();
          }}
        ></div>
        <div
          className={styles.prev}
          onClick={() => {
            LoadPreviousFile();
          }}
        ></div>
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

        <div
          className={styles.fullscreen}
          onClick={() => fullScreen(mediaRef.current)}
        >
          <BsFullscreen />
        </div>

        <div ref={mediaTimeRef} className={styles.durationtrack}></div>

        <span className={styles.currentTime} ref={currentTimeRef}></span>
        <div className={styles.mediaTitle} ref={titleRef}></div>
        <div className={styles.settings} onClick={DisplaySettingOptions}>
          <IoSettings />
        </div>
        <div className={styles.settingOptions} ref={settingOptionsRef}>
          <ImVolumeIncrease onClick={() => volume(mediaRef.current, 0.1)} />

          <ImVolumeDecrease onClick={() => volume(mediaRef.current, -0.1)} />

          <IoPlayForwardOutline
            onClick={() => playBackRate(mediaRef.current, 0.5)}
          />

          <IoPlayBackOutline
            onClick={() => playBackRate(mediaRef.current, -0.5)}
          />
          <div
            onClick={setAutoPlay}
            ref={autoPlayRef}
            className={styles.autoPlayBtn}
          >
            auto
          </div>
          {document.pictureInPictureEnabled && (
            <TbPictureInPictureOn
              onClick={() => {
                pictureInPicture(mediaRef.current);
              }}
            />
          )}
        </div>
      </section>
    </>
  );
};
