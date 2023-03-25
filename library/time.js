/***
 * @param {number} time
 * @description formats video.duration & video.currentTime into
 * readable time format for End-User.
 * @returns  Correctly formated time.
 */
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

export { formatTime };
