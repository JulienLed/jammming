function SearchBar(props) {
  const handleInput = (e) => props.handleSearch(e.target.value);

  return (
    <>
      <p>SearchBar</p>
      <input value={props.searchValue} onChange={handleInput} />
      <button>Search</button>
      {console.log(props.searchValue)}
    </>
  );
}

export default SearchBar;
