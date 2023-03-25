import {
  mediaEnded,
  contextMenu,
  fullScreenChange,
} from "../library/videoControls";

function MediaPlayer(mediaType, mediaFile, mediaRef) {
  let mediaSrc = URL.createObjectURL(
    new Blob([mediaFile], { type: mediaFile?.type })
  );

  switch (mediaType) {
    case ".mp3":
      return (
        <audio autoPlay ref={mediaRef} data-name={mediaFile?.name}>
          <source src={mediaSrc} type="audio/mp3" />
        </audio>
      );
    case ".mp4":
      return (
        <video
          autoPlay
          controlsList="nodownload noplaybackrate"
          ref={mediaRef}
          src={mediaSrc}
          data-name={mediaFile?.name}
          width={500}
          height={200}
        />
      );

    default:
      break;
  }
}

function LoadMedia(mediaType, mediaFile, mediaElement, autoplay) {
  mediaElement?.addEventListener("ended", (e) => {
    mediaEnded(e.target, mediaElement, autoplay);
  });
  mediaElement?.addEventListener("contextmenu", contextMenu);
  mediaElement?.addEventListener("fullscreenchange", fullScreenChange);
  switch (mediaType) {
    case ".mp3":
      let sourceElement = mediaElement.querySelector("source");
      sourceElement.src = createURL(mediaFile);
      mediaElement.load();
      break;
    case ".mp4":
      mediaElement.src = createURL(mediaFile);
      mediaElement.load();
      break;
    default:
      break;
  }
}
function createURL(mediaFile) {
  return URL.createObjectURL(new Blob([mediaFile], { type: mediaFile?.type }));
}
export { MediaPlayer, LoadMedia };
