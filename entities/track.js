class Track {
  constructor(track) {
    this.id = track.id;
    this.songTitle = track.name;
    this.previewUrl = track.preview_url;

    // Create audio iframe
    this.audio = document.createElement("iframe");
    this.audio.className = "iframe-container";
    this.audio.id = `audio-${this.id}`;

    // Create track container
    this.container = document.createElement("div");
    this.container.className = "track-container";
    this.container.innerHTML = `
      <span>${this.songTitle}</span>
    `;

    //Create play button
    this.playBtn = document.createElement("button");
    this.playBtn.innerHTML = "Play";
    this.playBtn.className = "play-button-paused";
    this.playBtn.id = `play-btn-${this.id}`;
    this.playBtn.addEventListener("click", this.playTrack.bind(this));

    // Append play button and iframe to track container
    this.container.appendChild(this.playBtn);
    this.container.appendChild(this.audio);
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
    const iframes = document.getElementsByTagName("iframe");
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
    return this.container;
  }
}
