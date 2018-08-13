class Main {
  constructor() {
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

  init() {
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
  new Main();
});
