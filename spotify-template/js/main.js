class Main {
  constructor() {
    this.playlists;
    this.artists;
    this.friends;
    this.songs;
    this.user;
    this.leftsidebarUserPlaylists = $('.leftsidebar-userplaylists')
    this.createPlaylist = this.createPlaylist.bind(this);
    this.init();
  }

  createPlaylist() {
    this.api.getPlaylists().then((playlists) => {
      let name = $('#newPlayListName').val();
      let description = $('#newPlayListDescription').val();
      let id = playlists[playlists.length - 1].id + 1;
      let songs = [];
      let followers = '1';
      let image = 'https://i.imgur.com/HAKs6OO.png';
      let data = { id, name, description, songs, followers, image };
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
              .then(() => {
                this.appendPlaylists();
              })
              .catch((error) => {
                console.error('Error:', error);
              })
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
        else {
          alert('Playlist name and/or description cannot be empty. Please fill both fields and try again.');
        }
    });
  }

  appendPlaylists() {
    this.leftsidebarUserPlaylists.html("");
    let playlistName = '';
    this.api.getPlaylists().then((playlists) => {
      this.user.playlists.forEach((userPlaylist) => {
        playlists.forEach((playlist) => {
          if (userPlaylist == playlist.id) {
            playlistName = `${playlist.name}`
            if (playlistName.length > 15) {
            playlistName = `${playlistName.substring(0,15)}...`
            }
          }
        })
        this.leftsidebarUserPlaylists.append(`<div class="userplaylist">${playlistName}</div>`);
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
    this.api = new Api();
    this.api.getData().then((response) => {
      this.playlists = response[0];
      this.artists = response[1];
      this.friends = response[2];
      this.songs = response[3];
      this.user = response[4];
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
