export default class ArtistsApi {
  static getArtists() {
    return fetch('http://localhost:3000/artists')
      .then((response) => {
        return response.json();
      })
  }
}
