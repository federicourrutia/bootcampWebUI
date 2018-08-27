export default class PlaylistsApi {
  static getPlaylists() {
    return fetch('http://localhost:3000/playlists')
      .then((response) => {
        return response.json();
      })
  }

  static getPlaylistsByQuery(query) {
    return fetch(`http://localhost:3000/playlists?q=${query}`)
      .then((response) => {
        return response.json();
      })
  }
}
