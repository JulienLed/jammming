import { tracksArr } from "./App";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const handleInput = (e) => props.handleSearch(e.target.value);

  return (
    <div className={props.className}>
      <p>SearchBar</p>
      <input
        className={styles.input}
        value={props.search}
        onChange={handleInput}
      />
      <button
        className={styles.button}
        onClick={() => {
          props.handleShowResults(props.search);
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
