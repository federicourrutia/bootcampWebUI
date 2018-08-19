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

  fetchSongs() {
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

  fetchArtists() {
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

  fetchAlbums() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/albums')
        .then((response) => {
          return response.json();
        })
        .then((albums) => {
          this.albums = albums;
          resolve();
        })
    });
  }

  fetchPlaylists() {
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

  getSongs() {
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

  getArtists() {
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

  getAlbums() {
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

  getPlaylists() {
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
    Promise.all([this.fetchSongs(), this.fetchArtists(), this.fetchAlbums(), this.fetchPlaylists()]).then(() => {
    this.getSongs();
    this.getArtists();
    this.getAlbums();
    this.getPlaylists();
    });
  }
}

$(document).ready(() => {
  new SearchResults();
});
