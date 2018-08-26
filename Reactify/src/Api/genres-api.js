export default class GenresApi {
  static getGenres() {
    return fetch('http://localhost:3000/genres')
      .then((response) => {
        return response.json();
      })
  }
}
