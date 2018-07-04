class Artist {
  constructor(artist, relatedArtists, topTracks) {
    this.artist = artist;
    this.relatedArtists = relatedArtists;
    this.topTracks = topTracks;
    this.artistId = artist.id;
    this.artistTitle = artist.name;
    this.artistImg = artist.images[1].url;
    this.followers = artist.followers.total.toLocaleString();
    this.container = document.createElement("div");
  }

  renderArtist() {
    load(this.artistId);
  }

  renderRelatedArtist() {
    this.container.className = "related-artist-container";
    this.container.innerHTML = `
    <h3 class='related-artist-title'>${this.artistTitle}</h3>
    <img src=${this.artistImg} class='related-artist-img'/>
    `;

    let seeBtn = document.createElement("button");
    seeBtn.addEventListener("click", this.renderArtist.bind(this));
    seeBtn.innerHTML = "See";
    seeBtn.className = "related-artist-see-btn";
    this.container.appendChild(seeBtn);
    return this.container;
  }

  renderArtistBlock() {
    // Render Artist Block
    document.getElementById("artist-title").innerHTML = this.artist.name;
    document.getElementById("artist-img").src = this.artist.images[1].url;
    document.getElementById(
      "artist-followers"
    ).innerHTML = this.artist.followers.total.toLocaleString();
    document.getElementById(
      "artist-open-link"
    ).href = this.artist.external_urls.spotify;

    // Render Related Artist Block
    // Clear current related artists and render related artists if there are any, otherwise render a message.
    document.getElementById("related-artists-group-container").innerHTML = "";
    if (!this.relatedArtists.artists.length) {
      let message = document.createElement("span");
      message.innerHTML = "No Related Artists";
      document
        .getElementById("related-artists-group-container")
        .appendChild(message);
    } else {
      this.relatedArtists.artists
        .map(artist => new Artist(artist))
        .forEach(relatedArtist => {
          document
            .getElementById("related-artists-group-container")
            .appendChild(relatedArtist.renderRelatedArtist());
        });
    }

    // Render Top Tracks
    document.getElementById("artist-top-tracks-container").innerHTML = "";
    this.topTracks.tracks.map(track => new Track(track)).forEach(track => {
      document
        .getElementById("artist-top-tracks-container")
        .appendChild(track.renderTrack());
    });
  }
}
