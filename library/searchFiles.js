/**
 *
 * @param {string} directoryPath
 * @param {string} extn
 * @returns search's for file name(s) of files with given extn in given directory path.
 */
export async function fileNameSearch(directoryPath, extn) {
  try{
    const names = [];
  for await (const fileHandle of directoryPath.values()) {
    if (fileHandle.kind === "file" && fileHandle.name.endsWith(extn)) {
      let file = await fileHandle.getFile();

      names.push(file.name);
    } else if (fileHandle.kind === "directory") {
      const subDirectoryPath = fileHandle;
      const subDirectoryMpFiles = await fileNameSearch(subDirectoryPath, extn);
      names.push(...subDirectoryMpFiles);
    }
  }
  return names;
  }catch (error) {
    console.error(error)
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
