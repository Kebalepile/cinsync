import React, { useContext } from "react";
import MPFileContext from "@/contexts/media/context";
import MP4Player from "@/components/MP4Player";
import MP3Player from "@/components/MP3Player";

export default function MPFilePlayer() {
  const { extn, filePresent } = useContext(MPFileContext);
  const mediaType = (extn) => {
    return extn === ".mp3" ? <MP3Player /> : <MP4Player />;
  };

  return <>{filePresent && mediaType(extn)}</>;
};
