import React, { useContext, useEffect } from "react";
import MPPlayList from "@/components/MPPlayList";
import MPFilePlayer from "@/components/MPFilePlayer";
import { useRouter } from "next/router";
import MPFileContext from "@/contexts/media/context";
function Media() {
  const { folderName } = useContext(MPFileContext);
  const router = useRouter();
  useEffect(() => {
    if (!folderName) {
      router.replace("/");
    }
  }, [folderName]);
  return (
    <>
      <MPFilePlayer />
      <MPPlayList />
    </>
  );
}

export default Media;
