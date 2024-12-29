import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import "./App.css";
import getURL from "./getURL";
import getRefreshToken from "./GetReferesh";

export const uriArr = [];

function App() {
  //Là ou est stocké l'input de SearchBar
  const [search, setSearch] = useState("");
  const handleSearch = (input) => setSearch(input);

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
                  <button onClick={(e) => handleTrackList(e, obj)}>+</button>
                </div>
              );
            })
          );
        });
    } else {
      setShowresults(<div>No results</div>);
    }
  };
  //Là ou est stocké la trackList
  const [trackList, setTrackList] = useState([]);

  //fonction dans SearchResults et Track l'ajout ou retirer la track
  const handleTrackList = (e, track) => {
    //définition de la trackList
    if (e.target.innerText === "+") {
      setTrackList((prev) => {
        if (!prev.find((t) => t.id === track.id)) {
          return [...prev, track];
        }
        return prev;
      });
    } else if (e.target.innerText === "-") {
      setTrackList((prev) => {
        return prev
          ? prev.filter((remTrack) => remTrack.id !== track.id)
          : null;
      });
    }
  };

  //là ou est stocké le nom de la Playlist
  const [playlistName, setPlaylistName] = useState("");
  const handlePlaylistName = (input) => setPlaylistName(input);

  //Le post de la playlist
  const [userId, setUserId] = useState("");
  const handlePlaylistPost = () => {
    getRefreshToken();
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.id);
      });
  };
  ///////////////Problèmle car erreur 401. Le token semble ne plus être valide, même si j'arrive à chercher sur spotify, et que j'ai authoriser tout. Il faut régler ce problème pour obtnir l'ID de l'utilisateur
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
        handlePlaylistPost={handlePlaylistPost}
      />
    </div>
  );
}

export default App;
