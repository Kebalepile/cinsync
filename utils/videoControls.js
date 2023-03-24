function handleVolume(media, change) {
  const volume = Math.min(Math.max(media.volume + change, 0), 1);
  media.volume = volume;
}

function handlePlay(media) {
  media.paused ? media.play() : media.pause();
}

function handlePlayBackRate(media, change) {
  const playbackRate = Math.min(
    Math.max(media.playbackRate + change, 0.25),
    5.0
  );
  media.playbackRate = playbackRate;
}
function handleSkip(media, seconds, direction) {
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

function handleMediaEnded(element, media, autoPlayFiles, ms = 3000) {
  setTimeout(() => {
    autoPlayFiles(
      media.getAttribute("data-name"),
      JSON.parse(localStorage.getItem("auto_play"))
    );
    element.removeEventListener("ended", handleMediaEnded);
  }, ms);
}
function handleContextMenu(event) {
  event.preventDefault();
}
function handleAutoPlay() {
  const autoPlay = JSON.parse(localStorage.getItem("auto_play"));
  if (autoPlay === null) {
    localStorage.setItem("auto_play", JSON.stringify(false));
  } else {
    localStorage.setItem("auto_play", JSON.stringify(!autoPlay));
  }
}

function fullScreen() {}
function pictureInPicture() {}
function durationChange(mediaTime) {
  return formatTime(Math.floor(mediaTime));
}

function formatTime(time) {
  const hours = Math.floor(time / 3600),
    minutes = Math.floor((time - hours * 3600) / 60),
    seconds = time - hours * 3600 - minutes * 60;
  const displayNothing = "";
  return `${
    (hours && `${hours.toString().padStart(2, "0")}:`) || displayNothing
  }${
    (minutes && `${minutes.toString().padStart(2, "0")}:`) || displayNothing
  }${seconds.toString().padStart(2, "0")}`;
}

export {
  handleVolume,
  handlePlay,
  handlePlayBackRate,
  handleMediaEnded,
  handleContextMenu,
  handleSkip,
  handleAutoPlay,
  fullScreen,
  pictureInPicture,
  durationChange,
};
