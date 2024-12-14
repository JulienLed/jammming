import styles from "./SearchResults.module.css";

function SearchResults(props) {
  return (
    <div className={props.className}>
      <p>SearchResults</p>
      <div className={styles.results}>{props.showResults}</div>
    </div>
  );
}

export default SearchResults;
