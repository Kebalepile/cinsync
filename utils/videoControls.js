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
  autoPlay == null
    ? localStorage.setItem("auto_play", JSON.stringify(false))
    : autoPlay
    ? localStorage.setItem("auto_play", JSON.stringify(false))
    : localStorage.setItem("auto_play", JSON.stringify(true));
}
function fullScreen(){}
function pictureInPicture(){}
function mediaTime(){}

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
  mediaTime
};
