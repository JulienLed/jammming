import Tracklist from "./Tracklist";

function Playlist(props) {
  const handlePlaylistInput = (e) => props.handlePlaylistName(e.target.value);

  return (
    <div className={props.className}>
      <p style={{ display: "inline", marginRight: "10px" }}>Playlist :</p>
      {console.log(props.playlistName)}
      <input
        style={{ display: "inline" }}
        value={props.playlistName}
        onChange={handlePlaylistInput}
      ></input>
      <Tracklist
        trackList={props.trackList}
        handleTrackList={props.handleTrackList}
      />
      <button>Add to Spotify</button>
      <button onClick={() => alert("lol")}>Connect to Spotify</button>
    </div>
  );
}

export default Playlist;
