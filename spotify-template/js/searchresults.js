class SearchResults {
  constructor() {
    this.queryParams = (new URL(window.location)).searchParams.get('q');
    // made query params regular expressions to perform case-insensitive matching
    this.queryParams = new RegExp(this.queryParams, 'i');
    this.contentSongs = $('.content-top');
    this.contentArtist = $('.content-search.artist');
    this.contentAlbums = $('.content-search.albums');
    this.contentPlaylists = $('.content-search.playlists');
    this.init();
	}

  getSongs() {
    let artistString = '';
    let albumString = '';
    fetch('http://localhost:3000/songs')
      .then((response) => {
        return response.json();
      })
      .then((songs) => {
        let filteredSongs = songs.filter((song) => {
          return song.name.match(this.queryParams);
        });
          if (filteredSongs.length > 0) {
            fetch('http://localhost:3000/artists')
              .then((response) => {
                return response.json();
              })
              .then((artists) => {
                fetch('http://localhost:3000/albums')
                  .then((response) => {
                    return response.json();
                  })
                  .then((albums) => {
                    filteredSongs.forEach((song) => {
                      artists.forEach((artist) => {
                        song.artist.forEach((songArtist) => {
                          if (songArtist === artist.id) {
                            artistString += `${artist.name}, `;
                          }
                        })
                      });
                      albums.forEach((album) => {
                        if (song.albums == album.id) {
                          albumString = `${album.name}`;
                        }
                      });
                      this.contentSongs.append(`<div class="content-album"><p class="to-playlist"><i class="fas fa-plus"></i></p><p class="line-info">${song.name}</p><p class="line-info-responsive">${artistString.substring(0, artistString.length - 2)}</p><p class="line-info-responsive">${albumString}</p><p class="line-info center">${song.duration}</p> </div></div></div>`)
                      artistString = '';
                    });
                  });
              });
          }
          else {
            this.contentSongs.append('<p>No matches found</p>')
          }
      });
  };

  getArtists() {
    fetch('http://localhost:3000/artists')
      .then((response) => {
        return response.json();
      })
      .then((artists) => {
        let filteredArtists = artists.filter((artist) => {
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
      })
    }

  getAlbums() {
    let artistString = '';
    fetch('http://localhost:3000/albums')
      .then((response) => {
        return response.json();
      })
      .then((albums) => {
        let filteredAlbums = albums.filter((album) => {
          return album.name.match(this.queryParams);
        });
        if (filteredAlbums.length > 0) {
          fetch('http://localhost:3000/artists')
            .then((response) => {
              return response.json();
            })
            .then((artists) => {
              filteredAlbums.forEach((album) => {
                artists.forEach((artist) => {
                  if (album.artist == artist.id) {
                    artistString = `${artist.name}`;
                  }
                });
            this.contentAlbums.append(`<div class="album"><img src="img/profile.png" alt="Album image"><div class="search-info"><p>${album.name}</p><p>${artistString}</p></div></div>`)
            });
          })
        }
        else {
          this.contentAlbums.css('display','none');
        }
      })
    }

  getPlaylists() {
    fetch('http://localhost:3000/playlists')
      .then((response) => {
        return response.json();
      })
      .then((playlist) => {
        let filteredPlaylists = playlist.filter((playlist) => {
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
      })
    }

  init() {
    this.getSongs();
    this.getArtists();
    this.getAlbums();
    this.getPlaylists();
  }
}

$(document).ready(() => {
  new SearchResults();
});
