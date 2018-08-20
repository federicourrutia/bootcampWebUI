class SearchResults {
  constructor() {
    this.queryParams = (new URL(window.location)).searchParams.get('q');
    // made query params regular expressions to perform case-insensitive matching
    this.queryParams = new RegExp(this.queryParams, 'i');
    this.contentSongs = $('.content-top');
    this.contentArtist = $('.content-search.artist');
    this.contentAlbums = $('.content-search.albums');
    this.contentPlaylists = $('.content-search.playlists');
    this.songs;
    this.artists;
    this.albums;
    this.playlists;
    this.init();
	}

  renderSongs() {
    let artistString = '';
    let albumString = '';
    let filteredSongs = this.songs.filter((song) => {
      return song.name.match(this.queryParams);
    });
    if (filteredSongs.length > 0) {
      filteredSongs.forEach((song) => {
        this.artists.forEach((artist) => {
          song.artist.forEach((songArtist) => {
            if (songArtist === artist.id) {
              artistString += `${artist.name}, `;
            }
          })
        });
        this.albums.forEach((album) => {
          if (song.albums == album.id) {
            albumString = `${album.name}`;
          }
        });
        this.contentSongs.append(`<div class="content-album"><p class="to-playlist"><i class="fas fa-plus"></i></p><p class="line-info">${song.name}</p><p class="line-info-responsive">${artistString.substring(0, artistString.length - 2)}</p><p class="line-info-responsive">${albumString}</p><p class="line-info center">${song.duration}</p> </div></div></div>`)
        artistString = '';
      });
    }
    else {
      this.contentSongs.append('<p>No matches found</p>')
    }
  }

  renderArtists() {
    let filteredArtists = this.artists.filter((artist) => {
      return artist.name.match(this.queryParams);
    });
    if (filteredArtists.length > 0) {
      filteredArtists.forEach((artist) => {
        this.contentArtist.append(`<div class="artist"><img src="${artist.image}" alt="Artist photo"><div class="search-info"><p>${artist.name}</p></div></div>`)
      });
    }
    else {
      this.contentArtist.css('display','none');
    }
  }

  renderAlbums() {
    let artistString = '';
    let filteredAlbums = this.albums.filter((album) => {
      return album.name.match(this.queryParams);
    });
    if (filteredAlbums.length > 0) {
      filteredAlbums.forEach((album) => {
        this.artists.forEach((artist) => {
          if (album.artist == artist.id) {
            artistString = `${artist.name}`;
          }
        });
        this.contentAlbums.append(`<div class="album"><img src="img/profile.png" alt="Album image"><div class="search-info"><p>${album.name}</p><p>${artistString}</p></div></div>`)
      });
    }
    else {
      this.contentAlbums.css('display','none');
    }
  }

  renderPlaylists() {
    let filteredPlaylists = this.playlists.filter((playlist) => {
      return playlist.name.match(this.queryParams);
    });
    if (filteredPlaylists.length > 0) {
      filteredPlaylists.forEach((playlist) => {
        this.contentPlaylists.append(`<div class="playlist"><img src="${playlist.image}" alt="Playlist image"><div class="search-info"><p>${playlist.name}</p><p>${playlist.followers} followers</p></div></div>`)
      });
    }
    else {
      this.contentPlaylists.css('display','none');
    }
  }

  init() {
    this.api = new Api();
    this.api.getData().then((response) => {
      this.playlists = response[0];
      this.artists = response[1];
      this.friends = response[2];
      this.songs = response[3];
      this.user = response[4];
      this.albums = response[5];
      this.renderSongs();
      this.renderArtists();
      this.renderAlbums();
      this.renderPlaylists();
    });
  }
}

$(document).ready(() => {
  new SearchResults();
});
