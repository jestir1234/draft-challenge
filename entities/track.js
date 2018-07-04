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
