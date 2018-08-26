export default class SongsApi {
  static getSongs() {
    return fetch('http://localhost:3000/songs')
      .then((response) => {
        return response.json();
      })
  }
}
