import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import "./App.css";

export const uriArr = [];

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

  //Obtenir le token
  const [token, setToken] = useState("");
  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&client_id=d883f247765048d18fd6a4451f472c78&client_secret=42fec827555a48a0be9bc8cf1c328e4e",
    })
      .then((res) => res.json())
      .then((data) => setToken(data.access_token));
  }, []);

  //Trouver, mettre en tableau et afficher le résultat de la recherche Spotify
  const [tracksArr, setTracksArr] = useState([]);
  const handleShowResults = (input) => {
    if (input) {
      fetch(`https://api.spotify.com/v1/search?q=${input}&type=track`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTracksArr(() => {
            return [
              data.tracks.items.map((obj) => {
                return {
                  id: obj.id,
                  name: obj.name,
                  artist: obj.artists[0].name,
                  album: obj.album.name,
                  uri: obj.uri,
                };
              }),
            ];
          });
          setShowresults(
            data.tracks.items.map((obj) => {
              return (
                <div className="gridSong" key={obj.id}>
                  <p
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {obj.name}
                  </p>
                  <p>{obj.artists[0].name}</p>
                  <p>{obj.album.name}</p>
                  <button onClick={(e) => handleTrackList(obj, e)}>+</button>
                </div>
              );
            })
          );
        });
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
