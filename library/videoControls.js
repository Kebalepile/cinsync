import { formatTime } from "./time";
function volume(media, change) {
  const currentVolume = Math.min(Math.max(media.volume + change, 0), 1);
  media.volume = currentVolume;
}

function play(media) {
  media.paused ? media.play() : media.pause();
}

function playBackRate(media, change) {
  const currentPlaybBackRate = Math.min(
    Math.max(media.playbackRate + change, 0.25),
    5.0
  );
  media.playbackRate = currentPlaybBackRate;
}
function skip(media, seconds, direction) {
  switch (direction) {
    case "forward":
      media.currentTime += seconds;
      break;
    case "backward":
      media.currentTime -= seconds;
      break;
    default:
      break;
  }
}

function mediaEnded(element, media, autoPlayFiles, ms = 3000) {
  setTimeout(() => {
    autoPlayFiles(
      JSON.parse(localStorage.getItem("auto_play"))
    );
    element.removeEventListener("ended", mediaEnded);
  }, ms);
}
function contextMenu(event) {
  event.preventDefault();
}
function autoPlay() {
  const autoPlay = JSON.parse(localStorage.getItem("auto_play"));
  if (autoPlay === null) {
    localStorage.setItem("auto_play", JSON.stringify(false));
  } else {
    localStorage.setItem("auto_play", JSON.stringify(!autoPlay));
  }
}

function fullScreenChange(event) {
  let video = event.target;
  
  video.disablePictureInPicture = true;
  video.disableRemotePlayback = true;
}
function fullScreen(media) {
  try {
    if (media.nodeName == "VIDEO") {
      if (media.requestFullscreen) {
        media.requestFullscreen();
      } else if (media.webkitRequestFullscreen) {
        media.webkitRequestFullscreen(); //Safari
      } else if (media.msRequestFullscreen) {
        media.msRequestFullscreen(); //IE11
      }
    }
  } catch (error) {
    console.error(error);
  }
}
function pictureInPicture(media) {
  media.disablePictureInPicture = false;
  media.disableRemotePlayback = false;
  try {
    if (media.nodeName === "VIDEO") {
      if (media !== document.pictureInPictureElement) {
        media.requestPictureInPicture();
      } else {
        document.exitPictureInPicture();
      }
    }
  } catch (error) {
    console.error(error);
  }
}
function trackVideoTime(mediaTime) {
  return formatTime(Math.floor(mediaTime));
}

export {
  volume,
  play,
  playBackRate,
  mediaEnded,
  contextMenu,
  skip,
  autoPlay,
  fullScreen,
  pictureInPicture,
  trackVideoTime,
  fullScreenChange,
};
