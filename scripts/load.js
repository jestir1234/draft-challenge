const load = (artistId = SEED_ARTIST) => {
  console.log("loading artist", artistId);
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
        console.log(data);
        return renderArtist({
          artist: data[0],
          relatedArtists: data[1],
          topTracks: data[2]
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
};

load();
