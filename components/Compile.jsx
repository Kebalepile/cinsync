import React,{ useContext, Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MPFileContext from "@/contexts/media/context";
import {
  AiOutlineLoading,
  AiOutlineLoading3Quarters,
  AiOutlineFolderOpen,
} from "react-icons/ai";
import { SiVlcmediaplayer } from "react-icons/si";
import { CgPlayList } from "react-icons/cg";
import styles from "@/styles/compile.module.css";

export default () => {
  const [compile, setCompile] = useState(false); 
  const { mpFileNames, folderName, extn } = useContext(MPFileContext);
 const router = useRouter();
  useEffect(() => {
    folderName && extn && !mpFileNames && setCompile(!compile);
    folderName && extn && mpFileNames && router.push("/media");

  }, [mpFileNames, folderName, extn]);
  return (
    <Fragment>
      {compile && (
        <article className={styles.container}>
          <AiOutlineLoading3Quarters />
          <AiOutlineLoading />
          <h2>
            Compiling {extn?.slice(1)} Playlist... <br />{" "}
            <CgPlayList className={styles.playListIcon} />
          </h2>
        </article>
      )}
      {extn && !folderName && (
        <p className={styles.prompt}>
          <AiOutlineFolderOpen /> Select Folder inorder to play you're{" "}
          {extn?.slice(1)} files.
        </p>
      )}
      {!extn && (
        <p className={styles.prompt}>
          <SiVlcmediaplayer /> Select media type to play.
        </p>
      )}
    </Fragment>
  );
};
