const renderArtist = ({ artist, relatedArtists, topTracks }) => {
  // Render Artist Block
  document.getElementById("artist-title").innerHTML = artist.name;
  document.getElementById("artist-img").src = artist.images[1].url;
  document.getElementById(
    "artist-followers"
  ).innerHTML = artist.followers.total.toLocaleString();
  document.getElementById("artist-open-link").href =
    artist.external_urls.spotify;

  // Render Related Artist Block
  // Clear current related artists and render related artists if there are any, otherwise render a message.
  document.getElementById("related-artists-group-container").innerHTML = "";
  if (!relatedArtists.artists.length) {
    let message = document.createElement("span");
    message.innerHTML = "No Related Artists";
    document
      .getElementById("related-artists-group-container")
      .appendChild(message);
  } else {
    renderRelatedArtists(relatedArtists).forEach(relatedArtist => {
      document
        .getElementById("related-artists-group-container")
        .appendChild(relatedArtist.renderRelatedArtist());
    });
  }

  // Render Top Tracks
  document.getElementById("artist-top-tracks-container").innerHTML = "";
  renderTopTracks(topTracks).forEach(track => {
    document
      .getElementById("artist-top-tracks-container")
      .appendChild(track.renderTrack());
  });
};

const renderRelatedArtists = ({ artists }) => {
  return artists.map(artist => {
    return new Artist(artist);
  });
};

const renderTopTracks = ({ tracks }) => {
  return tracks.map(track => {
    return new Track(track);
  });
};

class Artist {
  constructor(artist) {
    this.artist = artist;
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
}

class Track {
  constructor(track) {
    this.id = track.id;
    this.songTitle = track.name;
    this.previewUrl = track.preview_url;
    this.audio = document.createElement("iframe");
    this.container = document.createElement("div");
    this.playBtn = document.createElement("button");
  }

  playTrack() {
    this.clearOtherAudio();
    if (this.playBtn.className === "play-button-active") {
      this.audio.src = "";
      this.playBtn.innerHTML = "Play";
      this.playBtn.className = "play-button-paused";
    } else {
      this.audio.src = this.previewUrl;
      this.playBtn.innerHTML = "Stop";
      this.playBtn.className = "play-button-active";
    }
  }

  clearOtherAudio() {
    let iframes = document.getElementsByTagName("iframe");
    for (let i = 0; i < iframes.length; i++) {
      if (iframes[i].id !== `${this.audio.id}`) {
        iframes[i].src = "";
        iframes[i].innerHTML = "Play";
        let playBtn = document.getElementById(
          `play-btn-${iframes[i].id.replace("audio-", "")}`
        );
        playBtn.className = "play-button-paused";
      }
    }
  }

  renderTrack() {
    this.container.className = "track-container";
    this.audio.className = "iframe-container";
    this.audio.id = `audio-${this.id}`;

    this.container.innerHTML = `
      <span>${this.songTitle}</span>
    `;

    this.playBtn.innerHTML = "Play";
    this.playBtn.className = "play-button-paused";
    this.playBtn.id = `play-btn-${this.id}`;

    this.playBtn.addEventListener("click", this.playTrack.bind(this));

    this.container.appendChild(this.playBtn);
    this.container.appendChild(this.audio);
    return this.container;
  }
}
