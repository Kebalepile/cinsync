import { Tree } from "./binarySearchTree";
import { getMPFileImage } from "./ImageProcessing";

export function androidFileNameSearch() {
  try {
  } catch (error) {
    console.log("Android Error: ", error);
  }
}
export function androidMpFile(fileName) {
  try {
  } catch (error) {
    console.log("Android Error: ", error);
  }
}
/**
 *
 *
 * @param {string} directoryPath
 * @param {string} extn
 * @returns search's for file name(s) of files with given extn in given directory path.
 */
export async function fileNameSearch(directoryPath, extn, id = 1) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}
