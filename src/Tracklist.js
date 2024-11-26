import Track from "./Track";
function Tracklist(props) {
  return (
    <div style={{ width: 150, height: 300, border: "1px solid black" }}>
      <p>Tracklist : </p>
      <Track />
    </div>
  );
}

export default Tracklist;
