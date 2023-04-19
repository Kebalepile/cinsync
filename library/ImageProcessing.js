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

async function getMP3Image(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const mp3Data = reader.result,
        offset = findID3v2Offset(mp3Data);
      if (offset !== -1) {
        const imageData = extractID3v2ImageData(mp3Data, offset);
        if (imageData) {
          const base64String = btoa(
            new Uint8Array(imageData).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          resolve(`data:image/jpeg;base64,${base64String}`);
        } else {
          reject(new Error("No album art found."));
        }
      } else {
        reject(new Error("No ID3v2 metadata found."));
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

function findID3v2Offset(mp3Data) {
  const id3v2Header = "ID3";
  for (let i = 0; i < mp3Data.byteLength - id3v2Header.length; i++) {
    const header = String.fromCharCode.apply(
      null,
      new Uint8Array(mp3Data, i, id3v2Header.length)
    );
    if (header === id3v2Header) {
      return i;
    }
  }
  return -1;
}

function extractID3v2ImageData(mp3Data, offset) {
  const imageHeader = "APIC",
    imageDataStartOffset = offset + 10,
    imageDataEndOffset = mp3Data.byteLength;
  let imageDataOffset = imageDataStartOffset;
  while (imageDataOffset < imageDataEndOffset) {
    const frameHeader = String.fromCharCode.apply(
      null,
      new Uint8Array(mp3Data, imageDataOffset, imageHeader.length)
    );
    if (frameHeader === imageHeader) {
      const imageType = mp3Data[imageDataOffset + 11],
        mimeTypeStartOffset = imageDataOffset + 12,
        mimeTypeEndOffset = mp3Data.indexOf(0, mimeTypeStartOffset),
        imageDataStartOffset = mimeTypeEndOffset + 2;
      return mp3Data.slice(imageDataStartOffset);
    } else {
      const frameSize =
        (mp3Data[imageDataOffset + 4] << 21) +
        (mp3Data[imageDataOffset + 5] << 14) +
        (mp3Data[imageDataOffset + 6] << 7) +
        mp3Data[imageDataOffset + 7];
      imageDataOffset += frameSize + 10;
    }
  }
  return null;
}

async function getMPFileImage(file) {
  let extension = file.name.split(".").pop().toLowerCase();
  try {
    let imageSrc =
      extension == "mp3" ? await getMP3Image(file) : await getMP4Image(file);

    return imageSrc;
  } catch (error) {
    console.log(error);
  }
}
export { getMPFileImage };
