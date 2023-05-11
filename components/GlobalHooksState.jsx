import React, { useEffect, useContext } from "react";
import MPFileContext from "@/contexts/media/context";
export default () => {
  const { DefaultState } = useContext(MPFileContext);
  useEffect(() => {
    DefaultState();
  }, []);
};
