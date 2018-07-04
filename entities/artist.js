class Artist {
  constructor(artist, relatedArtists, topTracks) {
    const DEFAULT_IMG_URL =
      "https://besteverawards.files.wordpress.com/2010/08/azn-kid-mullet.jpg";
    this.artist = artist;
    this.relatedArtists = relatedArtists;
    this.topTracks = topTracks;
    this.artistId = artist.id;
    this.artistTitle = artist.name;
    this.artistImg =
      (artist.images.length && artist.images[0].url) || DEFAULT_IMG_URL;
    this.spotify_url = artist.external_urls.spotify;
    this.followers = artist.followers.total.toLocaleString();
    this.container = document.getElementById("artist-block");
  }

  renderArtist() {
    load(this.artistId);
  }

  createRelatedArtist() {
    let relatedArtistsContainer = document.createElement("div");
    relatedArtistsContainer.className = "related-artist-container";
    relatedArtistsContainer.innerHTML = `
    <h3 class='related-artist-title'>${this.artistTitle}</h3>
    <img src=${this.artistImg} class='related-artist-img'/>
    `;
    relatedArtistsContainer.appendChild(this.createSeeBtn());
    return relatedArtistsContainer;
  }

  createSeeBtn() {
    let seeBtn = document.createElement("button");
    seeBtn.addEventListener("click", this.renderArtist.bind(this));
    seeBtn.innerHTML = "See";
    seeBtn.className = "related-artist-see-btn";
    return seeBtn;
  }

  renderRelatedArtistsBlock() {
    document.getElementById("related-artist-section").innerHTML = `
      <h2>Related Artists</h2>
      <div id="related-artists-group-container"></div>
    `;
    if (!this.relatedArtists.artists.length) {
      document.getElementById("related-artists-group-container").innerHTML = `
      <span>No related artists found.</span>
      `;
    } else {
      this.relatedArtists.artists
        .map(artist => new Artist(artist))
        .forEach(relatedArtist => {
          document
            .getElementById("related-artists-group-container")
            .appendChild(relatedArtist.createRelatedArtist());
        });
    }
  }

  renderTopTracksBlock() {
    document.getElementById("top-tracks-section").innerHTML = `
      <h2>Top Tracks</h2>
      <div id="artist-top-tracks-container"></div>
    `;

    this.topTracks.tracks.map(track => new Track(track)).forEach(track => {
      document
        .getElementById("artist-top-tracks-container")
        .appendChild(track.renderTrack());
    });
  }

  renderArtistBlock() {
    this.container.innerHTML = `
      <h1 id='artist-title'>${this.artist.name}</h1>
      <img id="artist-img" src="${this.artistImg}"/>
      <div class="artist-followers-container">
        <span>Followers:</span>
        <span id="artist-followers">${this.followers}</span>
      </div>
        <a id="artist-open-link" href="${this.spotify_url}">
          <button id="artist-open-button">OPEN</button>
        </a>
    `;
  }
}
