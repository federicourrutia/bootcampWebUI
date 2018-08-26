export default class AudioApi {
  static getAudio(i) {
    return fetch(`http://localhost:3000/audios/${i}`)
      .then((response) => {
        return response.json();
      })
  }
}
