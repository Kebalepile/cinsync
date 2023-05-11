import React, { useReducer } from "react";
import MPFileContext from "./context";
import reducer from "./reducer";
import {
  Folder_Handler,
  Media_Extension,
  File_Names,
  MP_File,
  Unique_Id,
  Default_State,
} from "../types";
import { fileNameSearch, mpFile, androidDefualtGlobalState } from "@/library/searchFiles";
function MPFileProvider({ children }) {
  const initialState = {
    extn: null,
    folderName: null,
    folderHandle: "",
    mpFileNames: null,
    mediaFile: null,
    uniqueId: null,
    filePresent: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    extn,
    folderName,
    folderHandle,
    mpFileNames,
    filePresent,
    mediaFile,
    uniqueId,
  } = state;

  /**
   * @description Rest Media Files global state to initalState.
   */
  const DefaultState = () => {
    // -----------------
    // For android End-Users.
    androidDefualtGlobalState()
    // ------------------
    const resetState = () =>
        dispatch({
          type: Default_State,
          payload: initialState,
        }),
      keys1 = Object.keys(initialState);
    
    if (keys1.length !== Object.keys(state)) {
      resetState();
    }
    for (let key of keys1) {
      if (initialState[key] !== state[key]) {
        resetState();
      }
    }
  };

  /**
   * @param {Object} handler
   * @description Sets folderName & folderHandle
   */
  const FileInfo = async (handler) => {
    dispatch({
      type: Folder_Handler,
      payload: {
        folderName: handler.name || "mobile",
        folderHandle: handler,
      },
    });
  };
  /**
   *
   * @param {HTMLElement} htmlElem
   * @description Sets type of media End-User will be working with.
   */
  const MediaType = (htmlElem) => {
    dispatch({
      type: Media_Extension,
      payload: { extn: htmlElem.target.getAttribute("data-extn") },
    });
  };
  /**
 
   * @description Search's for files with given file extension
   * in given folder and sub folders if any.
   */
  const SearchMPFileNames = async () => {
    let BST = await fileNameSearch(folderHandle, extn);
    dispatch({ type: File_Names, payload: { mpFileNames: BST } });
  };

  /**
   * @param {string} fileName
   * @description adds *.mp* file to media player.
   */
  const LoadFile = async (fileName, id) => {
    let mediaFile = await mpFile(fileName, folderHandle);

    dispatch({ type: MP_File, payload: { mediaFile, filePresent: true } });
    dispatch({ type: Unique_Id, payload: { uniqueId: id } });
  };

  const LoadNextFile = () => {
    try {
      let currentFileDetails = mpFileNames.getById(Number(uniqueId));
      if (currentFileDetails !== "Not available!") {
        let nextFileDetails = mpFileNames.next(currentFileDetails?.data),
          { name, id } = nextFileDetails;
        LoadFile(name, id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const LoadPreviousFile = () => {
    try {
      let currentFileDetails = mpFileNames.getById(Number(uniqueId));

      if (currentFileDetails !== "Not available") {
        let nextFileDetails = mpFileNames.prev(currentFileDetails?.data),
          { name, id } = nextFileDetails;
        LoadFile(name, id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const AutoPlayFiles = (autoPlay = true) => {
    if (autoPlay == null || autoPlay) LoadNextFile();
  };

  const MediaTypeOk = () => (extn ? true : false);
  const MediaExtension = () => extn;
  const FolderInfoAvailable = () => typeof folderHandle === "object";

  return (
    <MPFileContext.Provider
      value={{
        extn,
        mediaFile,
        folderName,
        mpFileNames,
        filePresent,
        folderHandle,
        LoadFile,
        FileInfo,
        MediaType,
        MediaTypeOk,
        LoadNextFile,
        DefaultState,
        AutoPlayFiles,
        MediaExtension,
        LoadPreviousFile,
        SearchMPFileNames,
        FolderInfoAvailable,
      }}
    >
      {children}
    </MPFileContext.Provider>
  );
}

export default MPFileProvider;
