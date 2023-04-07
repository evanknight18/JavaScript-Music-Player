const clientId = '0fa6dcd1849c4db4ba3af4fa55006faf'; // replace with your client ID
const redirectUri = 'http://localhost:5500'; // replace with your redirect URI
const accessToken = 'BQC09_fStrV-8jHt5MfzS1JH2f2tpl6ru8U0N9OW-tbKtg7bHLKZfumHAlcP0al-DbVkniKn8X4SdyDq7JvU84gWJqxeVIbHdK_lAHW6vgWL4A0MwIKB'; // replace with your access token
const artistId = '0epOFNiUfyON9EYx7Tpr6V'; // replace with the artist ID

const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'user-library-read',
  'user-top-read',
  'user-follow-read',
  'user-read-playback-state',
  'user-modify-playback-state'
];

const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes.join(' '))}`;

function login() {
  window.location = authorizeUrl;
}

function handleRedirect() {
  const accessToken = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {}).access_token;

  if (accessToken) {
    console.log('Access token:', accessToken);
    initializePlayer(accessToken);
  }
}

async function initializePlayer(token) {
  const player = new Spotify.Player({
    name: 'My Web Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Get the first track URI from the response
      const trackUri = data.tracks[0].uri;

      // Play the track using the Spotify Web Playback SDK
      player.play(trackUri)
        .then(() => {
          console.log('Track started');
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
}

window.onload = handleRedirect;

