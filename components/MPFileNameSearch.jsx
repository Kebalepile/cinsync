import React, { Fragment, useContext, useState } from "react";
import MPFileContext from "@/contexts/media/context";
import styles from "@/styles/mpfilenamesearch.module.css";
import sanitizeInput from "@/library/sanitizeInput";
import { MdCancel } from "react-icons/md";
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
      setSuggestions([]);
    }
  };
  const handleCancel = (e) => {
    setSuggestions([]);
  };
  return (
    <Fragment>
      <form className={styles.searchName} onSubmit={handleSubmit}>
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
        <article className={styles.matchList}>
          <button onClick={handleCancel} className={styles.cancelBtn}>
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
      </form>
    </Fragment>
  );
};
