const renderArtist = ({ artist, relatedArtists, topTracks }) => {
  let currentArtist = new Artist(artist, relatedArtists, topTracks);
  currentArtist.renderArtistBlock();
};

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

const load = (artistId = SEED_ARTIST) => {
  const params = getHashParams();

  const access_token =
    params.access_token || localStorage.getItem("access_token");
  localStorage.setItem("access_token", access_token);

  if (access_token && access_token !== "undefined") {
    try {
      Promise.all([
        fetchArtist({ access_token, artistId }),
        fetchRelatedArtist({ access_token, artistId }),
        fetchArtistTopTracks({ access_token, artistId })
      ]).then(data => {
        return renderArtist({
          artist: data[0],
          relatedArtists: data[1],
          topTracks: data[2]
        });
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    authorize();
  }
};

load();
