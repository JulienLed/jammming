import styles from "./Track.module.css";

function Track(props) {
  return (
    <div>
      {props.trackList.map((track) => (
        <div key={track.id} className={styles.gridSong}>
          <p style={{ fontWeight: "bold" }}>{track.name}</p>
          <p>{track.artists[0].name}</p>
          <p>{track.album.name}</p>
          <button onClick={(e) => props.handleTrackList(e, track)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default Track;
