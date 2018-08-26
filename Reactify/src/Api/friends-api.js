export default class FriendsApi {
  static getFriends() {
    return fetch('http://localhost:3000/friends')
      .then((response) => {
        return response.json();
      })
  }
}
