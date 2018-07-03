const authorize = () => {
  var client_id = "454833ff2e1f41e7856ab20e780d0e68";
  var redirect_uri = "http://localhost:8888/";

  var scope = "user-read-private user-read-email";

  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

  window.location = url;
};
if (window.localStorage.getItem("access_token") === "undefined") {
  authorize();
}
