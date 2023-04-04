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

// Ticketmaster.init({
//   apiKey: 'WuvIyt8Lt5KDtWFNhsvZieAxgi6Gqiuw'
// });

fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=WuvIyt8Lt5KDtWFNhsvZieAxgi6Gqiuw')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

  fetch('https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=WuvIyt8Lt5KDtWFNhsvZieAxgi6Gqiuw&keyword=ARTIST_NAME')
  .then(response => response.json())
  .then(data => {
    const artist = data._embedded.attractions[0]; // Get the first artist in the results
    console.log(artist.name);
    console.log(artist.url);
    console.log(artist.images[0].url); // Get the first image for the artist
  })
  .catch(error => {
    console.error(error);
  });

// Ticketmaster.discovery.event.find('music', {
//   countryCode: 'US',
//   city: 'New York'
// }).then(function(response) {
//   console.log(response);
// }).catch(function(error) {
//   console.error(error);
// });
