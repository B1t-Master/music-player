const audio = document.getElementById("mainAudio");
const fileInput = document.getElementById("audioUpload");
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const title = document.querySelector(".audio-title h2");
const playbackRange = document.getElementById("playbackRange");
const volumeRange = document.getElementById("volumeRange");
const currentTimeDisplay = document.getElementById("currentTime");
const durationTimeDisplay = document.getElementById("durationTime");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

function createEvents() {
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      audio.src = URL.createObjectURL(file);
      title.textContent = file.name.replace(/\.[^/.]+$/, "");
      audio.load();
    }
  });

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playIcon.classList.replace("bi-play-fill", "bi-pause-fill");
    } else {
      audio.pause();
      playIcon.classList.replace("bi-pause-fill", "bi-play-fill");
    }
  });

  volumeRange.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
  });

  playbackRange.addEventListener("input", (e) => {
    const seekTo = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTo;
  });

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    playbackRange.value = progress || 0;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("loadedmetadata", () => {
    durationTimeDisplay.textContent = formatTime(audio.duration);
  });

  nextButton.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  });

  previousButton.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  window.addEventListener("keydown", (e) => {
    if (
      document.activeElement.tagName === "INPUT" &&
      document.activeElement.type !== "range"
    ) {
      return;
    }
    //fast forwards not more than 10 seconds ahead using left and right arrow keys
    switch (e.key) {
      case "ArrowRight":
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        break;
      case "ArrowLeft":
        audio.currentTime = Math.max(0, audio.currentTime - 10);
        break;
    }
  });
}

createEvents();
