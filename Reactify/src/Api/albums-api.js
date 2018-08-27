export default class AlbumsApi {
  static getAlbums() {
    return fetch('http://localhost:3000/albums')
      .then((response) => {
        return response.json();
      })
  }

  static getAlbumsByQuery(query) {
    return fetch(`http://localhost:3000/albums?q=${query}`)
      .then((response) => {
        return response.json();
      })
  }
}
