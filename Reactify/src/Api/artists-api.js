export default class ArtistsApi {
  static getArtists() {
    return fetch('http://localhost:3000/artists')
      .then((response) => {
        return response.json();
      })
  }

  static getArtistsByQuery(query) {
    return fetch(`http://localhost:3000/artists?q=${query}`)
      .then((response) => {
        return response.json();
      })
  }
}
