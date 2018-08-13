class Main {
  constructor(parser) {
    this.parser = parser;
    this.init();
  }

  createPlaylist() {
    let playlistName = $('#newPlayListName').val();
    let playlistDescription = $('#newPlayListDescription').val();
    let playlistId = playLists[playLists.length - 1].id + 1;
    let playlist = new Playlist(playlistId, playlistName, playlistDescription, "", "");

    if (playlistName != '' & playlistDescription != '') {
      playLists.push(playlist);
      $('.leftsidebar-playlists').append(`<a href="#">${playlist.name}</a>`);
    }
  }

  appendPlaylists() {
    playLists.forEach((playlist) => {
      $('.leftsidebar-playlists').append(`<a href="#">${playlist.name}</a>`);
    });
  }

  appendFriends() {
    friends.forEach((friend) => {
      $('.rightsidebar').append(`<div class="rightsidebar-friendcontainer"><div class="rightsidebar-imgwrapper"><img src="img/profile.png" alt="Profile image"></div><div class="rightsidebar-wrapper"><a class="rightsidebar-friendsname" href="#FriendProfile">${friend.name} ${friend.lastname}</a><a class="rightsidebar-friendnowplaying" href="#Song">${this.parser.parseSongs(friend.songs)}</a><a class="rightsidebar-friendnowplayingartist" href="#Artist">${this.parser.parseArtists(friend.artists)}</a></div></div></div>`);
    });
  }

  init() {
    this.appendFriends();
    this.appendPlaylists();
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
  let parser = new Parser();
  new Main(parser);
});
