import Tracklist from "./Tracklist";

function Playlist(props) {
  return (
    <>
      {console.log(props.children)}
      <p>Playlist : ...</p>
      <Tracklist />
      <button>Add to Spotify</button>
    </>
  );
}

export default Playlist;
