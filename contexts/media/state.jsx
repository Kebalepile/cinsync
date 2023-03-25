import React, { useReducer } from "react";
import MPFileContext from "./context";
import reducer from "./reducer";
import { Folder_Handler, Media_Extension, File_Names, MP_File } from "../types";
import { fileNameSearch, mpFile } from "@/library/searchFiles";
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
    let mpFileNames = await fileNameSearch(folderHandle, extn);
    mpFileNames = [...new Set(mpFileNames)];
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
   * @param {String} current_file_name
   * @description Takes name of current file being used by End-User and finds next file by
   * incrementing ther current files index.
   */
  const LoadNextFile = (current_file_name) => {
    let curIndex = mpFileNames.findIndex((value) => value == current_file_name);
    let index = curIndex !== -1 ? curIndex + 1 : curIndex;
    index = index > mpFileNames.length - 1 ? mpFileNames.length - 1 : index;

    LoadFile(mpFileNames[index]);
  };
  /**
   *
   * @param {String} current_file_name
   * @description Takes name of current file being used by End-User and finds previous file by
   * decrementing ther current files index.
   */
  const LoadPreviousFile = (current_file_name) => {
    let curIndex = mpFileNames.findIndex((value) => value == current_file_name);
    let index = curIndex !== -1 ? curIndex - 1 : curIndex;
    index = index < 0 ? curIndex : index;

    LoadFile(mpFileNames[index]);
  };
  /**
   * @param {String} current_file_name
   * @description a wrapper around LoadNextFile method,
   * automatically loads next file once current_file_name file ends rendering.
   */
  const AutoPlayFiles = (current_file_name, autoPlay = true) => {
    if (autoPlay == null || autoPlay) LoadNextFile(current_file_name);
  };

  const MediaTypeOk = () => (extn ? true : false);
  const MediaExtension = () => extn;
  const FolderInfoAvailable = () => typeof folderHandle === "object";

  const SearchFileName = (name) => {
    try {
      if (mpFileNames.includes(name)) {
        // return a file present componet which displays files with name charectors
        // the include method isn't going to work as method would be search when end-user enter more than 3 charactors
        // something like string.includes might work.
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MPFileContext.Provider
      value={{
        extn,
        mediaFile,
        LoadFile,
        FileInfo,
        MediaType,
        folderName,
        mpFileNames,
        filePresent,
        folderHandle,
        MediaTypeOk,
        LoadNextFile,
        AutoPlayFiles,
        MediaExtension,
        SearchFileName,
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
