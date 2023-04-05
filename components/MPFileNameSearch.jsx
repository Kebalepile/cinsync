import React, { Fragment, useContext, useState } from "react";
import MPFileContext from "@/contexts/media/context";
import sanitizeInput from "@/library/sanitizeInput";
export default () => {
  const { mpFileNames, LoadFile } = useContext(MPFileContext);
  const [suggestions, setSuggestions] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let results = mpFileNames.searchByName(
      sanitizeInput(e.target.querySelector('input[name="search"]').value)
    );
    setSuggestions(results);
  };
  const handleInputChange = (e) => {
    if (e.target.value.length >= 3) {
      let results = mpFileNames.searchByName(sanitizeInput(e.target.value));
      setSuggestions(results);
    } else {
      setSuggestions([])
    }
  };
 
  return (
    <Fragment>
      <form id="search_file_name" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          minLength={3}
          onChange={handleInputChange}
          placeholder="type media file name."
          required
        />
        <input type="submit" value="Look" />
      
        {suggestions.map((result) => {
          return <div
            key={result.id}
            onClick={() => {
              LoadFile(result.name, result.id);
            }}
          >
            {result.name}
          </div>;
        })}
      </form>
    </Fragment>
  );
};
