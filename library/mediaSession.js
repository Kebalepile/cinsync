import artwork from "@/assets/5.png";
function initiateMediaSession(mediaFile) {
  let fileDetails = mediaDetails(mediaFile);
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      ...fileDetails,
    });
    return true;
  }
  return false
}

/**
 *
 * @param {object} mediaFile
 * @description creates metadata for media to be controlled via MediaSession API.
 * @returns refined mediaDetails Object to be used as metadata
 *  for mediaSession.
 */
function mediaDetails(mediaFile) {
  return {
    title: mediaFile.name,
    artist: undefined,
    album: undefined,
    artwork: [
      {
        src: artwork,
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: artwork,
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: artwork,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: artwork,
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: artwork,
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: artwork,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

export { initiateMediaSession, mediaDetails };
