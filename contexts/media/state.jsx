import React, { useReducer } from "react";
import MPFileContext from "./context";
import reducer from "./reducer";
import { Folder_Handler, Media_Extension, File_Names, MP_File } from "../types";
import { fileNameSearch, mpFile } from "@/utils/searchFiles";
function MPFileProvider({ children }) {
  const initialState = {
    extn: null,
    folderName: null,
    folderHandle: "",
    mpFileNames: [],
    mediaFile: null,
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
  } = state;
  /**
   * @param {Object} handler
   * @description Sets folderName & folderHandle
   */
  const FileInfo = async (handler) => {
    dispatch({
      type: Folder_Handler,
      payload: {
        folderName: handler.name,
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
    const mpFileNames = await fileNameSearch(folderHandle, extn);

    dispatch({ type: File_Names, payload: { mpFileNames } });
  };

  /**
   * @param {string} fileName
   * @description adds *.mp* file to media player.
   */
  const LoadFile = async (fileName) => {
    let mediaFile = await mpFile(fileName, folderHandle);
    dispatch({ type: MP_File, payload: { mediaFile, filePresent: true } });
  };
  /**
   * 
   * @param {String} current 
   * @description Takes name of current file being used by End-User and finds next file by
   * incrementing ther current files index.
   */
 const LoadNextFile = (current) => {}
  /**
   * 
   * @param {String} current 
   * @description Takes name of current file being used by End-User and finds previous file by
   * decrementing ther current files index.
   */
 const loadPreviouseFile = (current) => {}
/**
 * @description automatically loads next file once current file ends rendering.
 */
 const autoPlayFiiles = () => {}
  const MediaTypeOk = () => (extn ? true : false);
  const MediaExtension = () => extn;
  const FolderInfoAvailable = () => typeof folderHandle === "object";
  return (
    <MPFileContext.Provider
      value={{
        FileInfo,
        MediaType,
        SearchMPFileNames,
        MediaTypeOk,
        MediaExtension,
        FolderInfoAvailable,
        LoadFile,
        extn,
        folderHandle,
        folderName,
        mpFileNames,
        filePresent,
        mediaFile,
      }}
    >
      {children}
    </MPFileContext.Provider>
  );
}

export default MPFileProvider;
