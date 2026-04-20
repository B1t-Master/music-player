const audio = document.getElementById("mainAudio");
const fileInput = document.getElementById("audioUpload");
const title = document.querySelector(".audio-title h2");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audio.src = url;
    title.textContent = file.name.replace(/\.[^/.]+$/, "");
    audio.load();
  }
});
