import React, { Fragment, useState, useEffect } from "react";
import styles from "@/styles/artwall.module.css";
import Image from "next/image";

export default () => {
  const 
    [imageIndex, setImageIndex] = useState(0),
    imagePaths = Object.values([
      require("@/assets/1.png"),
      require("@/assets/2.png"),
      require("@/assets/3.png"),
      require("@/assets/4.png"),
      require("@/assets/5.png"),
    ]);

  useEffect(() => {
    const interval = setInterval(() => {
      //will never exceed length nor be return negative number.
      let nextImageIndex = (imageIndex + 1) % imagePaths.length;

      setImageIndex(nextImageIndex);
     
    
    }, 60000); //change delay to 1 minute.
    return () => clearInterval(interval);
  }, [imageIndex]);

  return (
    <Fragment>
    <Image
        src={imagePaths[imageIndex]}
        width={100}
        height={100}
        className={styles.art_wall_image}
        alt="art wallpaper"
      />
    
    </Fragment>
  );
};

