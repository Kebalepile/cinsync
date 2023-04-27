import React, { Fragment, useContext, useState } from "react";
import MPFileContext from "@/contexts/media/context";
import styles from "@/styles/mpfilenamesearch.module.css";
import sanitizeInput from "@/library/sanitizeInput";
import { MdCancel } from "react-icons/md";
export default () => {
  const { mpFileNames, LoadFile, extn } = useContext(MPFileContext);
  const [suggestions, setSuggestions] = useState([]);

  const flaggedQueries = (text) => {
    return /^.?(mp3|mp4)$/.test(text);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let queryString = e.target.querySelector('input[name="search"]').value;
    searchQuery(queryString);
  };
  const handleInputChange = (e) => {
    let queryString = e.target.value;
    searchQuery(queryString);
  };
  const searchQuery = (query) => {
    if (query.length >= 3 && !flaggedQueries(query)) {
      let results = mpFileNames.searchByName(sanitizeInput(query));
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };
  const removeSuggestions = (e) => {
    setSuggestions([]);
  };
  const selectClassName = (options) =>
    extn === ".mp3" ? options[0] : options[1];
  return (
    <Fragment>
      <form
        className={selectClassName([
          styles.searchNameMP3,
          styles.searchNameMP4,
        ])}
        onSubmit={handleSubmit}
      >
        <section className={styles.searchField}>
          <input
            type="text"
            name="search"
            minLength={3}
            onChange={handleInputChange}
            placeholder="type file name."
            required
          />
          <input type="submit" value="Go" />
        </section>
        {suggestions.length > 0 && (
          <article className={styles.matchList}>
            <button onClick={removeSuggestions} className={styles.cancelBtn}>
              <MdCancel />
            </button>
            {suggestions.map((result) => {
              return (
                <div
                  key={result.id}
                  onClick={() => {
                    LoadFile(result.name, result.id);
                  }}
                >
                  <p>{result.name}</p>
                </div>
              );
            })}
          </article>
        )}
      </form>
    </Fragment>
  );
};
