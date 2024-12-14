import styles from "./Track.module.css";

function Track(props) {
  return (
    <div>
      {props.trackList.map((track) => {
        return (
          <div key={track.id} className="gridSong">
            <p style={{ fontWeight: "bold" }}>{track.name}</p>
            <p>{track.artist}</p>
            <p>{track.album}</p>
            <button onClick={(e) => props.handleTrackList(track, e)}>-</button>
          </div>
        );
      })}
    </div>
  );
}

export default Track;
