import { useState, useEffect, useRef } from "react";

function MPFileSearch() {
  const [folderPath, setFolderPath] = useState("");
  const [folderName, setFolderName] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [source, setSource] = useState(null);
  const handleFolderPathChange = async () => {
    const folderHandle = await window.showDirectoryPicker();
    setFolderName(folderHandle.name);
    setFolderPath(folderHandle);
  };
  useEffect(() => {
    if (source) {
      console.log(source);
      let audio = audioRef.current;
      console.log(audio?.currentSrc)
      if (audio?.currentSrc) {
        let sourceElement = audio.querySelector("source");
        sourceElement.src = source;
        audio.load();
      }
    }
  }, [source]);
  const audioRef = useRef(null);

  const handlePlay = () => {
    let audio = audioRef.current;
    audio.paused ? audio.play() : audio.pause();
  };
  const handleSearch = async () => {
    const getMpFilesInDirectory = async (directoryPath, extn) => {
      const mpFiles = [];
      for await (const fileHandle of directoryPath.values()) {
        if (fileHandle.kind === "file" && fileHandle.name.endsWith(extn)) {
          let file = await fileHandle.getFile();

          mpFiles.push(file.name);
        } else if (fileHandle.kind === "directory") {
          const subDirectoryPath = fileHandle;
          const subDirectoryMpFiles = await getMpFilesInDirectory(
            subDirectoryPath,
            extn
          );
          mpFiles.push(...subDirectoryMpFiles);
        }
      }
      return mpFiles;
    };

    const MPFiles = await getMpFilesInDirectory(folderPath, ".mp3");
    setFileNames(MPFiles);
  };
  const getMPFile = async (name, directoryPath) => {
    try {
      for await (let fileHandle of directoryPath.values()) {
        if (fileHandle.kind == "file" && fileHandle.name == name) {
          let file = await fileHandle.getFile();

          return file;
        } else if (fileHandle.kind == "directory") {
          let subDirectoryPath = fileHandle;
          let subDirectoryFile = await getMPFile(name, subDirectoryPath);

          if (subDirectoryFile) return subDirectoryFile;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const showMpFiles = () => {
    const handleClick = async (e) => {
      let file = await getMPFile(
        e.target.getAttribute("data-name"),
        folderPath
      );
      setSource(URL.createObjectURL(new Blob([file], { type: file.type })));
    };
    return fileNames.map((name, index) => {
      return (
        <div key={index} onClick={handleClick} data-name={name}>
          {name}
        </div>
      );
    });
  };
  return (
    <div>
      {source && (
        <section>
          <audio ref={audioRef} autoPlay>
            <source src={source} type="audio/mp3" />
          </audio>
          <button onClick={handlePlay}>Play</button>
        </section>
      )}
      <label htmlFor="folder-path-input">Select a folder:</label>
      <button onClick={handleFolderPathChange}>Folder</button>
      {folderName && <h3>Watching : {folderName}</h3>}
      <button onClick={handleSearch}>Search</button>

      {fileNames.length ? showMpFiles() : ""}
    </div>
  );
}

export default MPFileSearch;
