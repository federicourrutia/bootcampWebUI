export default class Api {
  getPlaylists() {
    return fetch('http://localhost:3000/playlists')
      .then((response) => {
        return response.json();
      })
  }

  getArtists() {
    return fetch('http://localhost:3000/artists')
      .then((response) => {
        return response.json();
      })
  }

  getFriends() {
    return fetch('http://localhost:3000/friends')
      .then((response) => {
        return response.json();
      })
  }

  getSongs() {
    return fetch('http://localhost:3000/songs')
      .then((response) => {
        return response.json();
      })
  }

  getUser() {
    return fetch('http://localhost:3000/user/1')
      .then((response) => {
        return response.json();
      })
  }

  getAlbums() {
    return fetch('http://localhost:3000/albums')
      .then((response) => {
        return response.json();
      })
  }

  getAudio() {
    return fetch('http://localhost:3000/audios')
      .then((response) => {
        return response.json();
      })
  }

  getGenres() {
    return fetch('http://localhost:3000/genres')
      .then((response) => {
        return response.json();
      })
  }

  getData() {
    return Promise.all([this.getPlaylists(), this.getArtists(), this.getFriends(), this.getSongs(), this.getUser(), this.getAlbums(), this.getAudio(), this.getGenres()]);
  }
}
