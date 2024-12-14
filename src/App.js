import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import "./App.css";

export const tracksArr = [
  {
    id: 1,
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
  },
  { id: 2, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
  { id: 3, name: "Shape of You", artist: "Ed Sheeran", album: "÷" },
  {
    id: 4,
    name: "Uptown Funk",
    artist: "Mark Ronson feat. Bruno Mars",
    album: "Uptown Special",
  },
  {
    id: 5,
    name: "Don't Start Now",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
  },
  {
    id: 6,
    name: "Rockstar",
    artist: "Post Malone",
    album: "Hollywood's Bleeding",
  },
  { id: 7, name: "Someone Like You", artist: "Adele", album: "21" },
  {
    id: 8,
    name: "Stay",
    artist: "Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
  },
  { id: 9, name: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR" },
  {
    id: 10,
    name: "Sunflower",
    artist: "Post Malone & Swae Lee",
    album: "Spider-Man: Into the Spider-Verse (Soundtrack)",
  },
];

function App() {
  //Là ou est stocké l'input de SearchBar
  const [search, setSearch] = useState("");
  const handleSearch = (input) => setSearch(input);

  //Là ou est stocké la trackList
  const [trackList, setTrackList] = useState([]);

  const handleTrackList = (track, e) => {
    if (e.target.innerText === "+") {
      setTrackList((prev) => {
        if (!prev.some((el) => el.id === track.id)) {
          return [...prev, track];
        } else {
          return [...prev];
        }
      });
    } else if (e.target.innerText === "-") {
      setTrackList((prev) => prev.filter((el) => el.id !== track.id));
    }
  };

  //Là ou sont stockés les résultats de la recherche
  const [showResults, setShowresults] = useState("");
  const handleShowResults = (arr, input) => {
    if (input) {
      setShowresults(
        arr.map((obj) =>
          obj.name.includes(input) ? (
            <div className="gridSong" key={obj.id}>
              <p style={{ fontWeight: "bold" }}>{obj.name}</p>
              <p>{obj.artist}</p>
              <p>{obj.album}</p>
              <button onClick={(e) => handleTrackList(obj, e)}>+</button>
            </div>
          ) : null
        )
      );
    } else {
      setShowresults(<div>No results</div>);
    }
  };

  //là ou est stocké le nom de la Playlist
  const [playlistName, setPlaylistName] = useState("");
  const handlePlaylistName = (input) => setPlaylistName(input);

  return (
    <div className="grid">
      <SearchBar
        className="searchBar"
        search={search}
        handleSearch={handleSearch}
        handleShowResults={handleShowResults}
      />
      <SearchResults
        className="searchResults"
        search={search}
        showResults={showResults}
      />
      <Playlist
        className="playlist"
        playlistName={playlistName}
        handlePlaylistName={handlePlaylistName}
        trackList={trackList}
        handleTrackList={handleTrackList}
      />
    </div>
  );
}

export default App;
