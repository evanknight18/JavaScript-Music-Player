// Initialize variables
let playlist = [];
let currentSong = 0;

// Initialize elements
const playlistContainer = document.querySelector(".playlist-container");
const audio = document.querySelector("#audio");
const albumCoverElement = document.querySelector(".album-cover");


// Initialize event listeners
document.addEventListener("DOMContentLoaded", function() {
  loadPlaylistFromLocalStorage();
  displayPlaylist();
  loadSong(currentSong);
});

document.querySelector("#audio").addEventListener("ended", function() {
  nextSong();
});

document.querySelector("#local-file").addEventListener("change", async function(e) {
    const files = e.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === "audio/mp3" || file.type === "audio/mpeg") {
          playlist.push({ title: file.name.split(".")[0], artist: "Local File", file: URL.createObjectURL(file), cover: null });
        }
      }
      displayPlaylist();
      loadSong(currentSong);
  
      // Save the playlist to local storage
      localStorage.setItem("playlist", JSON.stringify(playlist));
    }
  });

playlistContainer.addEventListener("click", function(event) {
  if (event.target.matches(".song")) {
    const index = event.target.dataset.index;
    loadSong(index);
    playSong();
  }
});

// Functions
function loadPlaylistFromLocalStorage() {
  const storedPlaylist = localStorage.getItem("playlist");
  if (storedPlaylist) {
    playlist = JSON.parse(storedPlaylist);
  }
}

function displayPlaylist() {
  playlistContainer.innerHTML = "";
  for (let i = 0; i < playlist.length; i++) {
    const song = playlist[i];
    const songElement = document.createElement("div");
    songElement.classList.add("song");
    songElement.dataset.index = i;
    if (i === currentSong) {
      songElement.classList.add("active");
    }
    const titleElement = document.createElement("div");
    titleElement.classList.add("title");
    titleElement.innerHTML = song.title;
    const artistElement = document.createElement("div");
    artistElement.classList.add("artist");
    artistElement.innerHTML = song.artist;
    songElement.appendChild(titleElement);
    songElement.appendChild(artistElement);
    playlistContainer.appendChild(songElement);
  }
}

function loadSong(index) {
  currentSong = index;
  const song = playlist[currentSong];
  audio.src = song.file;
  const titleElement = document.querySelector(".song-title");
  titleElement.innerHTML = song.title;
  const artistElement = document.querySelector(".artist-name");
  artistElement.innerHTML = song.artist;
  albumCoverElement.src = song.cover;
}

function playSong() {
  audio.play();
}

function pauseSong() {
  audio.pause();
}

function nextSong() {
  if (currentSong === playlist.length - 1) {
    currentSong = 0;
  } else {
    currentSong++;
  }
  loadSong(currentSong);
  playSong();
}

function prevSong() {
  if (currentSong === 0) {
    currentSong = playlist.length - 1;
  } else {
    currentSong--;
  }
  loadSong(currentSong);
  playSong();
}

