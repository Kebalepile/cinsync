import { Tree } from "./binarySearchTree";
import { getMPFileImage } from "./ImageProcessing";

const mediaFilesSymbol = Symbol("mediaFiles"),
  mediaFilesState = {
    [mediaFilesSymbol]: [],

    addMediaFiles(files) {
      const existingFiles = this[mediaFilesSymbol];

      Array.isArray(files)
        ? (this[mediaFilesSymbol] = [...new Set([...existingFiles, ...files])])
        : this[mediaFilesSymbol].push(files);
    },

    getMpFile(name) {
      const mediaFiles = this[mediaFilesSymbol];
      for (let i = 0; i < mediaFiles.length; i++) {
        if (mediaFiles[i].name === name) {
          return mediaFiles[i];
        }
      }
    },
  };
async function androidFileNameSearch(fileHandle, extn) {
  try {
    let targetedFiles = [];
    for (let k in fileHandle) {
      if (fileHandle[k]?.name?.endsWith(extn)) {
        let file = fileHandle[k];
        targetedFiles.push(file);
        Tree.insert({
          name: file.name,
          id: Math.max(1, (+k || 0) + 1),
          imageSrc: await getMPFileImage(file),
        });
      }
    }
    if (targetedFiles.length > 0) {
      mediaFilesState.addMediaFiles(targetedFiles);
    }
    return Tree;
  } catch (error) {
    console.log("Android Error: ", error);
  }
}

/**
 *
 *
 * @param {string} directoryPath
 * @param {string} extn
 * @returns a Binary Search Tree.
 */
export async function fileNameSearch(directoryPath, extn, id = 1) {
  try {
    if ("showDirectoryPicker" in window) {
      for await (const fileHandle of directoryPath.values()) {
        if (fileHandle.kind === "file" && fileHandle.name.endsWith(extn)) {
          let file = await fileHandle.getFile();
          typeof file === "object" &&
            file !== null &&
            Tree.insert({
              name: file.name,
              id: id++,
              imageSrc: await getMPFileImage(file),
            });
        } else if (fileHandle.kind === "directory") {
          const subDirectoryPath = fileHandle;
          fileNameSearch(subDirectoryPath, extn, id++);
        }
      }
    } else {
      return androidFileNameSearch(directoryPath, extn);
    }

    return Tree;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {string} name
 * @param {*} directoryPath
 * @description Search's for a file in given folderhandle direcotry & subdirectories if present.
 * @returns {*}
 */
export async function mpFile(name, directoryPath) {
  try {
    if ("showDirectoryPicker" in window) {
      for await (let fileHandle of directoryPath.values()) {
        if (fileHandle.kind == "file" && fileHandle.name == name) {
          let file = await fileHandle.getFile();

          return file;
        } else if (fileHandle.kind == "directory") {
          let subDirectoryPath = fileHandle;
          let subDirectoryFile = await mpFile(name, subDirectoryPath);

          if (subDirectoryFile) return subDirectoryFile;
        }
      }
    } else {
      let file = mediaFilesState.getMpFile(name);
    
      return file;
    }
  } catch (error) {
    console.error(error);
  }
}
