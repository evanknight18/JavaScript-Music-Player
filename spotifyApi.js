const accessToken = 'access_token_here';

// Fetch the currently playing track
fetch('https://api.spotify.com/v1/me/player/currently-playing', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
})
  .then(response => response.json())
  .then(data => {
    // Extract the album cover URL
    const albumCoverUrl = data.item.album.images[0].url;

    // Update the img src attribute
    const albumCoverImg = document.querySelector('.album-cover');
    albumCoverImg.src = albumCoverUrl;
  })
  .catch(error => {
    console.error('Error fetching the currently playing track:', error);
  });
