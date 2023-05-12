import React, { useReducer } from "react";
import MediaUXContext from "./context";
import reducer from "./reducer";
import { PLAYING } from "../types";

export default function MediaUXProvider({ children }) {
  const initialState = {
    mediaPlaying: false,
    media_id: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const MediaPlaying = (fileName) => {
    console.log(fileName)
  };
  const IluminateIcon = () => {};
  return (
    <MediaUXContext.Provider
      value={{
        MediaPlaying,
      }}
    >
      {children}
    </MediaUXContext.Provider>
  );
}
