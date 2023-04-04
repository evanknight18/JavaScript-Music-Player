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
