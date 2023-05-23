function initiateMediaSession(fileDetails) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      ...fileDetails,
    });
    return true;
  }
  return false;
}
function getRandomArtwork() {
  try {
    let numOfImages = 7;
    let randomIndex = Math.floor(Math.random() * numOfImages) + 1;

    return `/assets/${randomIndex}.png`;
  } catch (error) {
    console.error(error);
  }
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
        src: getRandomArtwork(),
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: getRandomArtwork(),
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: getRandomArtwork(),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: getRandomArtwork(),
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: getRandomArtwork(),
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: getRandomArtwork(),
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
    artwork: [{ src: getRandomArtwork(), sizes: "256x256", type: "image/png" }],
  };
  return initiateMediaSession(fileDetails);
}

export { mp3MediaSession, mp4MediaSession };
