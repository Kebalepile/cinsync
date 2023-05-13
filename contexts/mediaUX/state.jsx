import React, { useReducer } from "react";
import MediaUXContext from "./context";
import reducer from "./reducer";
import { PLAYING } from "../types";
import styles from "@/styles/mpplaylist.module.css";

export default function MediaUXProvider({ children }) {
  const initialState = {
    playing: null,
    iterator: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const DimIcon = () => {
    state.iterator?.next(true);

    const css_class = styles.isPlaying;
    const nodeList = document.querySelectorAll(`[class*="${css_class}"]`);

    Array.from(nodeList).forEach((node) => {
      const name = node.parentElement.getAttribute("data-name");

      if (name !== state.playing) {
        node.classList.forEach(
          (class_name) =>
            class_name.includes(css_class) && node.classList.remove(class_name)
        );
      }
    });
  };
  const MediaPlaying = (fileName) => {
    const iterator = illuminateIcon(Node(fileName))[Symbol.iterator]();
    iterator.next();
    dispatch({ type: PLAYING, payload: { playing: fileName, iterator } });
    return iterator;
  };

  const illuminateIcon = (elem) => ({
    [Symbol.iterator]: function* () {
      const css_class = styles.isPlaying;
      elem.classList.add(css_class);

      try {
        const done = yield;

        if (done) {
          elem.classList.forEach(
            (class_name) =>
              class_name.includes(css_class) &&
              elem.classList.remove(class_name)
          );
        }
      } catch (error) {
        // console.error(error)
      }
    },
  });
  const Node = (name) => {
    const css_class = "mp3Icon";
    try {
      const nodeList = document.querySelectorAll(`[data-name="${name}"]`);
      const iconElement = nodeList[1].querySelector(`[class*="${css_class}"]`);

      return iconElement;
    } catch (error) {
      // console.error(error);
    }
  };
  return (
    <MediaUXContext.Provider
      value={{
        MediaPlaying,
        DimIcon,
      }}
    >
      {children}
    </MediaUXContext.Provider>
  );
}
