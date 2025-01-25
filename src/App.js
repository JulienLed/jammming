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

  //Là ou sont stockés les résultats de la recherche
  const [showResults, setShowresults] = useState("");

  //Obtenir le token
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState();
  const [timeExpire, setTimeExpire] = useState();
  const [code, setCode] = useState();
  const client_id = "d883f247765048d18fd6a4451f472c78";
  const client_secret = "42fec827555a48a0be9bc8cf1c328e4e";
  const redirect_uri = "http://localhost:3000";
  const scope =
    "user-read-private+user-read-email+playlist-modify-private+playlist-modify-public";
  const urlForToken = "https://accounts.spotify.com/api/token";
  const urlToAccessSpotify = "https://accounts.spotify.com/authorize?";

  const handleAccessSpotify = () => {
    //obtenir le code
    window.location.href = `${urlToAccessSpotify}response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;
  };

  useEffect(() => {
    //obtenir le refesh token
    setCode(() => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      return code;
    });
    fetch(urlForToken, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }).toString(),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setToken(jsonResponse.access_token);
        setTimeExpire(jsonResponse.expires_in);
        setRefreshToken(jsonResponse.refresh_token);
      });
  }, [code]);

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
  const [trackArrUris, setTrackArrUris] = useState([]);
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

  useEffect(() => {
    setTrackArrUris(trackList.map((track) => track.uri));
  }, [trackList]);

  //là ou est stocké le nom de la Playlist
  const [playlistName, setPlaylistName] = useState("");
  const handlePlaylistName = (input) => setPlaylistName(input);

  //Le post de la playlist
  const [userId, setUserId] = useState("");
  const [playlistID, setPlaylistID] = useState();
  const handlePlaylistPost = () => {
    //obtenir userId
    const urlToGetID = "https://api.spotify.com/v1/me";
    fetch(urlToGetID, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const user = jsonResponse.id;
        setUserId(jsonResponse.id);
        //créer la playlist
        const urlToCreatePlaylist = `https://api.spotify.com/v1/users/${user}/playlists`;
        fetch(urlToCreatePlaylist, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: playlistName,
            description: "test API Spotify",
          }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistIdDirect = jsonResponse.id;
            setPlaylistID(jsonResponse.id);
            //ajouter des tracks
            const urlToAddTrack = `https://api.spotify.com/v1/users/${user}/playlists/${playlistIdDirect}/tracks`;
            console.log(trackArrUris);
            fetch(urlToAddTrack, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                uris: trackArrUris,
              }),
            });
          });
      });
  };

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
        handleAccessSpotify={handleAccessSpotify}
      />
    </div>
  );
}

export default App;
