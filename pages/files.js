import MPFileSearch from "@/components/MPFileSearch";
import MPFileList from "@/components/MPFileList";
import MPFilePlayer from "@/components/MPFilePlayer";
function file() {
  return (
    <>
      <MPFileSearch />
      <MPFilePlayer />
      <MPFileList />
      
    </>
  );
}

export default file;
