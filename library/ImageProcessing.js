async function getMP4Image(file) {
  const video = document.createElement("video"),
    canvas = document.createElement("canvas");

  video.src = URL.createObjectURL(file);
  video.load();
  video.volume = 0;
  return new Promise((resolve, reject) => {
    video.addEventListener("loadedmetadata", () => {
      const timeInSeconds = video.duration * 0.5; // Get the time in seconds
      video.currentTime = timeInSeconds; // Set the current time of the video to the desired time
      video.play();

      // Wait for the video to reach the desired time
      video.addEventListener("timeupdate", () => {
        if (video.currentTime >= timeInSeconds) {
          video.pause();

          // Set the canvas dimensions to match the video dimensions
          canvas.width = 100;
          canvas.height = 200;

          // Draw the current frame of the video onto the canvas
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Extract the image data from the canvas as a base64 encoded PNG
          const imageData = canvas.toDataURL("image/png");
          resolve(imageData);
        }
      });
    });

    video.addEventListener("error", () => {
      reject(new Error("Could not load video."));
    });
  });
}

async function getMPFileImage(file) {
  let extension = file.name.split(".").pop().toLowerCase();
  try {
    if (extension === "mp4") {
      let imageSrc = await getMP4Image(file);
      return imageSrc;
    }
  } catch (error) {
    console.log(error);
  }
}
export { getMPFileImage };
