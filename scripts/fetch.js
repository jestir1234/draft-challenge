const SEED_ARTIST = "4dpARuHxo51G3z768sgnrY";

const fetchArtist = async ({ access_token, artistId }) => {
  let content = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: "Bearer " + access_token
    }
  });

  let contentJSON = await content.json();

  if (contentJSON.error) {
    authorize();
  }

  return contentJSON;
};

const fetchArtistTopTracks = async ({ access_token, artistId }) => {
  let content = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=us`,
    {
      headers: {
        Authorization: "Bearer " + access_token
      }
    }
  );

  let contentJSON = await content.json();

  if (contentJSON.error) {
    authorize();
  }

  return contentJSON;
};

const fetchRelatedArtist = async ({ access_token, artistId }) => {
  let content = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    {
      headers: {
        Authorization: "Bearer " + access_token
      }
    }
  );

  let contentJSON = await content.json();

  if (contentJSON.error) {
    authorize();
  }

  return contentJSON;
};

const getHashParams = () => {
  const hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};
