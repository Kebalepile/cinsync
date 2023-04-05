import React, { Fragment, useContext, useRef } from "react";
import MPFileContext from "@/contexts/media/context";
import sanitizeInput from "@/library/sanitizeInput";
export default () => {
  const { mpFileNames, LoadFile } = useContext(MPFileContext);

  const suggestionsRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    let res = mpFileNames.searchByName(
      sanitizeInput(e.target.querySelector('input[name="search"]').value)
    );
    handleSuggestions(res);
  };
  const handleInputChange = (e) => {
    if (e.target.value.length >= 3) {
      let res = mpFileNames.searchByName(sanitizeInput(e.target.value));

      handleSuggestions(res);
    } else {
      clearSuggestions();
    }
  };
  const handleSuggestions = (results) => {
    const elem = suggestionsRef.current;

    if (results.length) {
      elem.textContent = ``;
      for (let result of results) {
        let div = document.createElement("div");
        div.onclick = e => {
          LoadFile(
            e.target.getAttribute("data-name"),
            e.target.getAttribute("data-id")
          );
        }
        div.setAttribute('data-id',result.id)
        div.setAttribute('data-name',result.name)
        div.textContent = result.name;
        elem.appendChild(div);
      }
    } else {
      noSuchFileAlert()
    }
  };
  const clearSuggestions = () => {
    suggestionsRef.current.textContent = ``;
  };
  const noSuchFileAlert = () => {
    suggestionsRef.current.textContent = "No such media file!"
    setTimeout(() => {
      clearSuggestions()
    }, 1000)
  }
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
