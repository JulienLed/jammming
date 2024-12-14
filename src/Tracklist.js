import Track from "./Track";
import styles from "./Tracklist.module.css";

function Tracklist(props) {
  return (
    <div className={styles.tracklist}>
      <Track
        trackList={props.trackList}
        handleTrackList={props.handleTrackList}
      />
    </div>
  );
}

export default Tracklist;
