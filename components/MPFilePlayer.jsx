import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MPFileContext from "@/contexts/media/context";
import MP4Player from "@/components/MP4Player";
import MP3Player from "@/components/MP3Player";

export default () => {
  const router = useRouter();
  const { extn, filePresent } = useContext(MPFileContext);
  useEffect(() => {
    if(!extn){
     
      router.replace("/")
    }
  },[extn])
  const mediaType = (extn) => {
    return extn === ".mp3" ? <MP3Player /> : <MP4Player />;
  };

  return <>{filePresent && mediaType(extn)}</>;
};
