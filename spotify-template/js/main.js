class Main {
  constructor() {
    this.playlists;
    this.artists;
    this.friends;
    this.songs;
    this.user;
    this.leftsidebarPlaylists = $('.leftsidebar-userplaylists');
    this.createPlaylist = this.createPlaylist.bind(this);
    this.init();
  }

  getPlaylists() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/playlists')
        .then((response) => {
          return response.json();
        })
        .then((playlists) => {
          this.playlists = playlists;
          resolve();
        })
    });
  }

  getArtists() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/artists')
        .then((response) => {
          return response.json();
        })
        .then((artists) => {
          this.artists = artists;
          resolve();
        })
    });
  }

  getFriends() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/friends')
        .then((response) => {
          return response.json();
        })
        .then((friends) => {
          this.friends = friends;
          resolve();
        })
    });
  }

  getSongs() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/songs')
        .then((response) => {
          return response.json();
        })
        .then((songs) => {
          this.songs = songs;
          resolve();
        })
    });
  }

  getUser() {
    return new Promise((resolve) => {
      const userId = localStorage.getItem('userId');
      fetch(`http://localhost:3000/user/${userId}`)
        .then((response) => {
          return response.json();
        })
        .then((user) => {
            this.user = user;
            resolve();
          })
    })
  }

  createPlaylist() {
        let name = $('#newPlayListName').val();
        let description = $('#newPlayListDescription').val();
        let id = this.playlists[this.playlists.length - 1].id + 1;
        let followers = '1';
        let image = 'https://i.imgur.com/HAKs6OO.png';
        const data = { id, name, description, followers, image };
        if (name != '' & description != '') {
          fetch('http://localhost:3000/playlists', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(() => {
            this.user.playlists.push(id);
            fetch(`http://localhost:3000/user/${this.user.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.user),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then((response) => {
                this.appendPlaylists();
                console.log('Success:', response);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
          })
          .catch(error => console.error('Error:', error))
        }
        else {
          alert('Playlist name and/or description cannot be empty. Please fill both fields and try again.')
        }
  }

  appendPlaylists() {
    this.leftsidebarPlaylists.html("");
    let playlistName = '';
    this.getPlaylists().then(() => {
      this.user.playlists.forEach((userPlaylist) => {
        this.playlists.forEach((playlist) => {
          if (userPlaylist == playlist.id) {
            playlistName = `${playlist.name}`
          }
        })
        this.leftsidebarPlaylists.append(`<div>${playlistName}</div>`);
      })
    })
  }

  appendFriends() {
    let songString = '';
    let artistString = '';
    this.friends.forEach((friend) => {
      this.songs.forEach((song) => {
        if (friend.songs == song.id) {
          songString = `${song.name}`;
          this.artists.forEach((artist) => {
            if (song.artist == artist.id) {
              artistString = `${artist.name}`
            }
          })
        }
      })
      $('.rightsidebar').append(`<div class="rightsidebar-friendcontainer"><div class="rightsidebar-imgwrapper"><img src="${friend.image}" alt="Profile image"></div><div class="rightsidebar-wrapper"><a class="rightsidebar-friendsname" href="#FriendProfile">${friend.name}</a><a class="rightsidebar-friendnowplaying" href="#Song">${songString}</a><a class="rightsidebar-friendnowplayingartist" href="#Artist">${artistString}</a></div></div></div>`);
    })
  }

  init() {
    Promise.all([this.getPlaylists(), this.getArtists(), this.getFriends(), this.getSongs(), this.getUser()]).then(() => {
      this.appendPlaylists();
      this.appendFriends();
    });
    let playerInstance = new Player();
    $('.fa-play-circle').click(playerInstance.playAudio);
    $('.fa-volume-down').click(playerInstance.muteAudio);
    $('.fa-pause-circle').click(playerInstance.stopAudio);
    $('.fa-volume-off').click(playerInstance.unmuteAudio);
    $('.fa-volume-down').click(playerInstance.muteAudio);
    $('#volumeControl').on('input', playerInstance.setVolume);
    $('.progress').click(playerInstance.onBarClick);
    $('.fa-step-forward').click(playerInstance.nextSong);
    $('.fa-step-backward').click(playerInstance.previousSong);
    $('.newplaylist-window-footer-buttoncreate').click(this.createPlaylist);
  }
}

$(document).ready(() => {
  $('.leftsidebar-playlists, .rightsidebar').animate ({ opacity: 1 }, 'slow');
  new Main();
  localStorage.setItem('userId', 1);
});
