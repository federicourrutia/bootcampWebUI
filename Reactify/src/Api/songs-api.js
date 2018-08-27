export default class SongsApi {
  static getSongs() {
    return fetch('http://localhost:3000/songs')
      .then((response) => {
        return response.json();
      })
  }

  static getSongsByQuery(query) {
    return fetch(`http://localhost:3000/songs?q=${query}`)
      .then((response) => {
        return response.json();
      })
  }
}
