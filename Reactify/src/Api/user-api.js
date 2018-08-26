export default class UserApi {
  static getUser() {
    return fetch('http://localhost:3000/user/1')
      .then((response) => {
        return response.json();
      })
  }
}
