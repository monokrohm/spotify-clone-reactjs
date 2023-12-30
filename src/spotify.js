const clientId = 'fe2e722b4b2a47c481f5510eb9ae8859';
const redirectUrl = 'https://spotify-clone-f2bbe.web.app/'; 

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-currently-playing user-modify-playback-state user-read-playback-state playlist-read-private user-follow-read user-read-recently-played user-top-read user-library-read user-read-private user-read-email';

// Data structure that manages the current active token, caching it in localStorage
export const currentToken = {
  get access_token() { return localStorage.getItem('access_token') || null; },
  get refresh_token() { return localStorage.getItem('refresh_token') || null; },
  get expires_in() { return localStorage.getItem('refresh_in') || null },
  get expires() { return localStorage.getItem('expires') || null },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_in', expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem('expires', expiry);
  }
};

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace('?', '');
  window.history.replaceState({}, document.title, updatedUrl);
}

// If we have a token, we're logged in, so fetch user data and render logged in template
// if (currentToken.access_token) {
//   const userData = await getUserData();
//   console.log(userData)
// }

// Otherwise we're not logged in
// if (!currentToken.access_token) {
//   redirectToSpotifyAuthorize()
// }

async function redirectToSpotifyAuthorize() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest('SHA-256', data);

  const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  window.localStorage.setItem('code_verifier', code_verifier);

  const authUrl = new URL(authorizationEndpoint)
  const params = {
    response_type: 'code',
    client_id: clientId,
    code_challenge_method: 'S256',
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
    scope: scope,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
async function getToken(code) {
  const code_verifier = localStorage.getItem('code_verifier');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

async function refreshToken() {
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token: currentToken.refresh_token
    }),
  });

  return await response.json();
}

export async function getUserData() {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

  if(response.status === 401){
    logoutClick();
  }

  return await response.json();
}

export async function getUserPlaylists() {
  try{
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
    });

    return await response.json();
  }catch(err){
    console.log("No data")
  }

}

export async function getPlayback() {
  try{
    const response = await fetch("https://api.spotify.com/v1/me/player", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
    });

    return await response.json();
  }catch(err){
    console.log("No track playing")
  }
}

export async function getCurrentTrack() {
  try{
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
    })

    return await response.json();
  }catch(err){
    console.log("No track playing")
  }
}

export async function getUserShows() {
  try{
    const response = await fetch("https://api.spotify.com/v1/me/shows?limit=15", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
    });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getRecentTrack() {
  try{
    const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=15", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getFollowedArtists() {
  try{
    const response = await fetch("https://api.spotify.com/v1/me/following?type=artist&limit=15", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getTopArtists() {
  try{
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=15", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getTopTracks() {
  try{
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=15", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getGenreRecommendations(id) {
  try{
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${id}&limit=10`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getMoreLike(id) {
  try{
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getFeaturedPlaylists() {
  try{
    const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists?limit=10", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getGenres() {
  try{
    const response = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getCategories() {
  try{
    const response = await fetch("https://api.spotify.com/v1/browse/categories?limit=50", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

export async function getArtists(ids) {
  try{
    const response = await fetch(`https://api.spotify.com/v1/artists?ids=${ids}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  }catch(err){
    console.log("No data")
  }
}

// Click handlers
export async function loginWithSpotifyClick() {
  await redirectToSpotifyAuthorize();
}

export async function logoutClick() {
  localStorage.clear();
  window.location.href = redirectUrl;
}

export async function refreshTokenClick() {
  const token = await refreshToken();
  currentToken.save(token);
  //console.log(currentToken.refresh_token)
}

export async function playClick() {
  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });
}

export async function pauseClick() {
  await fetch("https://api.spotify.com/v1/me/player/pause", {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });
}

export async function previousClick() {
  await fetch("https://api.spotify.com/v1/me/player/previous", {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });
}

export async function nextClick() {
  await fetch("https://api.spotify.com/v1/me/player/next", {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });
}

export async function shuffleClick(state) {
  await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`, {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });
}
