const getURL = () => {
  var client_id = "d883f247765048d18fd6a4451f472c78";
  var redirect_uri = "http://localhost:3000/";

  var state = Math.floor(Math.random() * 16);
  var scope = "user-read-private user-read-email";

  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  window.location.href = url;
};

export default getURL;
