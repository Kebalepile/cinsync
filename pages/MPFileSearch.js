import { useState } from "react";

function Search() {
  const [folderPath, setFolderPath] = useState("");
  const [files, setFiles] = useState([]);

  const handleFolderPathChange = async () => {
    const folderHandle = await window.showDirectoryPicker();

    setFolderPath(folderHandle);
  };

  const handleSearch = async () => {
    const getMp3FilesInDirectory = async (directoryPath) => {
      const mp3Files = [];
      for await (const fileHandle of directoryPath.values()) {
        if (fileHandle.kind === "file" && fileHandle.name.endsWith(".mp3")) {
          // fileHandle
          //   .getFile()
          //   .then((file) => {
          //     console.log(file);
          //     let source = URL.createObjectURL(
          //       new Blob([file], { type: file.type })
          //     );
          //     setSources([...sources, source]);
          //   })
          //   .catch((error) => console.error(`Error getting file`, error));
          let file = await fileHandle.getFile();

          mp3Files.push(file);
        } else if (fileHandle.kind === "directory") {
          const subDirectoryPath = fileHandle;
          const subDirectoryMp3Files = await getMp3FilesInDirectory(
            subDirectoryPath
          );
          mp3Files.push(...subDirectoryMp3Files);
        }
      }
      return mp3Files;
    };

    const MPFiles = await getMp3FilesInDirectory(folderPath);
    setFiles(MPFiles);
  };
  const showMpFiles = () => {
    return files.map((file, index) => {
      return (
        <div key={index}>
          {file.name}
          <audio controls>
            <source src={URL.createObjectURL( new Blob([file], { type: file.type }))} type="audio/mp3" />
          </audio>
        </div>
      );
    });
  };
  return (
    <div>
      <label htmlFor="folder-path-input">Select a folder:</label>
      <button onClick={handleFolderPathChange}>Select Folder</button>
      <button onClick={handleSearch}>Search</button>

      <br />
      <br />
      {files.length ? showMpFiles() : ""}
    </div>
  );
}

export default Search;
