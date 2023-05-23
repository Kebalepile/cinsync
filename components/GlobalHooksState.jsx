import React, { useEffect, useContext } from "react";
import MPFileContext from "@/contexts/media/context";
export default function GlobalHooksState() {
  const { DefaultState } = useContext(MPFileContext);
  useEffect(() => {
    DefaultState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
