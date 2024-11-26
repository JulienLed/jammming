import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import Tracklist from "./Tracklist";
import Track from "./Track";

const tracksArr = [
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
  //Là ou est stocké l'input se SearchBar
  const [search, setSearch] = useState("");
  const handleSearch = (input) => setSearch(input);

  return (
    <>
      <SearchBar searchValue={search} handleSearch={handleSearch} />
      <SearchResults />
      <Playlist />
    </>
  );
}

export default App;

//Il faut encore utiliser 'search' pour itérer dans tracksArr. Utiliser map avec une condition pour le rendu dans SearchResults
