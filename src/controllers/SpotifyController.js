// import Spotify controller
import Spotify from 'spotify-web-api-js';

// exports
export const SpotifyWebApi = new Spotify();
export const spotifyParams = {
  refresh_token: ''
}
/// get new access token using refresh token and recalls the function which has been sent as a parameter
export const refreshAccessToken = (callback) => {
  // make call to /refresh_token route of backend
  fetch('http://localhost:3000/refresh_token', {
    method: 'get',
    headers: {
      'refresh_token': spotifyParams.refresh_token
    }
  })
    .then(data => data.json())
    // set new access token on parent Spotify object
    .then(access_token => {
      SpotifyWebApi.setAccessToken(access_token.access_token);
    })
    // continue with original function that requested the new access token
    .then(() => {
      if (typeof callback === "function") {
        callback();
      }
    });
}
/// get Spotify parameters from hash (string after hash in url)
export const getHashParams = () => {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  // eslint-disable-next-line 
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  // set access token
  if (hashParams.access_token) {
    localStorage.setItem('access_token', hashParams.access_token);
  }
  // set refresh token
  if (hashParams.refresh_token) {
    spotifyParams.refresh_token = hashParams.refresh_token;
    localStorage.setItem('refresh_token', hashParams.refresh_token);
  }
  return hashParams;
}
/// set spotify parameters using local storage
export const setSpotifyParameters = () => {
  SpotifyWebApi.setAccessToken(localStorage.getItem('access_token'));
  spotifyParams.refresh_token = localStorage.getItem('refresh_token')
}