// Initialize variables
var playlist = [];
var currentSong = 0;

// Initialize elements
var playlistContainer = document.querySelector(".playlist-container");
var audio = document.querySelector("#audio");
var albumCoverElement = document.querySelector(".album-cover");
var clearPlaylistButton = document.querySelector("#clear-playlist-button");

// Initialize event listeners
document.addEventListener("DOMContentLoaded", function () {
  loadPlaylistFromLocalStorage();
  displayPlaylist();
  loadSong(currentSong);
});

document.querySelector("#audio").addEventListener("ended", function () {
  nextSong();
});

document
  .querySelector("#local-file")
  .addEventListener("change", async function (e) {
    var files = e.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        var file = files[i];
        if (
          file.type === "audio/mp3" ||
          file.type === "audio/mpeg" ||
          file.type === "audio/flac"
        ) {
          playlist.push({
            title: file.name.split(".")[0],
            artist: "",
            file: URL.createObjectURL(file),
            cover: null,
          });
        }
      }
      displayPlaylist();
      loadSong(currentSong);

      // Save the playlist to local storage
      localStorage.setItem("playlist", JSON.stringify(playlist));

      // If no song is currently playing, load and play the new song
      if (audio.paused && playlist.length === 1) {
        loadSong(0);
        playSong();
      }
    }
  });
playlistContainer.addEventListener("click", function (event) {
  var songElement = event.target.closest(".song");
  if (songElement) {
    var index = songElement.dataset.index;
    loadSong(index);
    playSong();
  }
});

clearPlaylistButton.addEventListener("click", function (event) {
  clearPlaylist();
});

// Functions
function loadPlaylistFromLocalStorage() {
  var storedPlaylist = localStorage.getItem("playlist");
  if (storedPlaylist) {
    playlist = JSON.parse(storedPlaylist);
  }
}

function displayPlaylist() {
  playlistContainer.innerHTML = "";
  for (let i = 0; i < playlist.length; i++) {
    var song = playlist[i];
    var songElement = document.createElement("div");
    songElement.classList.add("song");
    songElement.dataset.index = i;
    if (i === currentSong) {
      songElement.classList.add("active");
    }
    var titleElement = document.createElement("div");
    titleElement.classList.add("title");
    titleElement.innerHTML = song.title;
    var artistElement = document.createElement("div");
    artistElement.classList.add("artist");
    artistElement.innerHTML = song.artist;
    songElement.appendChild(titleElement);
    songElement.appendChild(artistElement);
    playlistContainer.appendChild(songElement);
  }
}

async function loadSong(index) {
    if (currentSong !== index) {
      audio.currentTime = 0;
    }
    currentSong = index;
    if (playlist.length > 0) {
      var song = playlist[currentSong];
      var currentTime = audio.currentTime; // Store the current time
      if (!audio.paused) {
        pauseSong();
      }
      audio.src = song.file;
      var titleElement = document.querySelector(".song-title");
      titleElement.innerHTML = song.title;
      var artistElement = document.querySelector(".artist-name");
      artistElement.innerHTML = song.artist;
  
      jsmediatags.read(new Blob([song.file]), {
        // Create a Blob from the URL and pass it to jsmediatags
        onSuccess: function (tag) {
          var imageData = tag.tags.picture;
          if (imageData) {
            var base64String = btoa(
              String.fromCharCode.apply(null, new Uint8Array(imageData.data))
            );
            var imageUrl =
              "data:" + imageData.format + ";base64," + base64String;
            albumCoverElement.src = imageUrl;
          } else {
            albumCoverElement.src = "default_cover.jpg"; // Default cover image
          }
        },
        onError: function (error) {
          console.log("Error reading metadata:", error);
          albumCoverElement.src = "default-album-artwork.png"; // Default cover image
          artistElement.innerHTML = "Unknown Artist";
        },
      });
  
      audio.onloadedmetadata = function () {
        if (currentSong === index) {
          audio.currentTime = currentTime; // Set the current time to the stored value
        }
        playSong();
      };
    } else {
      audio.pause();
      audio.src = "";
      var titleElement = document.querySelector(".song-title");
      titleElement.innerHTML = "No songs in playlist";
      var artistElement = document.querySelector(".artist-name");
      artistElement.innerHTML = "";
      albumCoverElement.src = "";
    }
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

function addSongToPlaylist(song) {
  playlist.push(song);
  displayPlaylist();

  // If no song is currently playing, load and play the new song
  if (audio.paused && playlist.length === 1) {
    loadSong(0);
    playSong();
  }
}   

function clearPlaylist() {
  playlist = [];
  currentSong = 0;
  localStorage.removeItem("playlist");
  displayPlaylist();
  audio.pause();
  audio.src = "";

  // Clear the "Now Playing" field
  var titleElement = document.querySelector(".song-title");
  titleElement.innerHTML = "";
  var artistElement = document.querySelector(".artist-name");
  artistElement.innerHTML = "";
  albumCoverElement.src = "";
}
