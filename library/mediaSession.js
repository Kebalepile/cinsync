function initiateMediaSession(fileDetails) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      ...fileDetails,
    });
    return true;
  }
  return false;
}

/**
 * @param {object} mediaFile
 * @description creates metadata for media to be controlled via MediaSession API.
 * @returns refined mediaDetails Object to be used as metadata
 *  for mediaSession.
 */
function mp3MediaSession(mediaFile) {
  let fileDetails = {
    title: mediaFile.name,
    artist: undefined,
    album: undefined,
    artwork: [
      {
        src: "/assets/5.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/assets/5.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/assets/5.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/5.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/assets/5.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/assets/5.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
  return initiateMediaSession(fileDetails);
}
function mp4MediaSession(mediaFile) {
  let fileDetails = {
    title: mediaFile.name,
    artist: undefined,
    album: undefined,
    artwork: [{ src: "/assets/3.png", sizes: "256x256", type: "image/png" }],
  };
  return initiateMediaSession(fileDetails);
}
export { mp3MediaSession, mp4MediaSession };
