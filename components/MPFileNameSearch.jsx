import React, { Fragment, useContext, useRef } from "react";
import MPFileContext from "@/contexts/media/context";
export default () => {
    const {mpFileNames } = useContext(MPFileContext);
 
  const suggestionsRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    let res = mpFileNames.nameIncludes(
      e.target.querySelector('input[name="search"]').value
    );
    console.log(res);
  };
  const handleInputChange = (e) => {
    console.log(mpFileNames)
    if (e.target.value.length >= 3) {
      let res = mpFileNames.searchByName(sanitizeInput(e.target.value));

      handleSuggestions(res);
    } else {
      clearSuggestions();
    }
  };
  const handleSuggestions = (results) => {
    const elem = suggestionsRef.current;

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
        <article ref={suggestionsRef}></article>
      </form>
    </Fragment>
  );
};
