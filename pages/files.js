import LoadMPFiles from "@/components/LoadMPFiles";
import MPFileList from "@/components/MPFileList";
import MPFilePlayer from "@/components/MPFilePlayer";
function file() {
  return (
    <>
      <LoadMPFiles />
      <MPFilePlayer />
      <MPFileList />
      
    </>
  );
}

export default file;
