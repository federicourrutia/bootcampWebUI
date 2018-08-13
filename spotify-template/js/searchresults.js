class SearchResults {
  constructor(parser) {
    this.queryParams = (new URL(window.location)).searchParams.get('q');
    // made query params regular expressions to perform case-insensitive matching
    this.queryParams = new RegExp(this.queryParams, 'i');
    this.contentSongs = $('.content-top');
    this.contentArtist = $('.content-search.artist');
    this.contentAlbums = $('.content-search.albums');
    this.contentPlaylists = $('.content-search.playlists');
    this.parser = parser;
    this.init();
	}
  
  getSongs() {
    let filteredSongs = songs.filter((song) => {
      return song.name.match(this.queryParams);
    });
    if (filteredSongs.length > 0) {
      filteredSongs.forEach((song) => {
		    this.contentSongs.append(`<div class="content-album"><p class="to-playlist"><i class="fas fa-plus"></i></p><p class="line-info">${song.name}</p><p class="line-info-responsive">${this.parser.parseArtists(song.artists)}</p><p class="line-info-responsive">${this.parser.parseAlbums(song.albums)}</p><p class="line-info center">${song.duration}</p> </div></div></div>`)
      });
    }
    else {
       this.contentSongs.append('<p>No matches found</p>')
    }
  }

  getArtists() {
    let filteredArtists = artists.filter((artist) => {
      return artist.name.match(this.queryParams);
    });
    if (filteredArtists.length > 0) {
      filteredArtists.forEach((artist) => {
        this.contentArtist.append(`<div class="artist"><img src="img/profile.png" alt="Artist photo"><div class="search-info"><p>${artist.name}</p></div></div>`)
      });
    }
    else {
      this.contentArtist.css('display','none');
    }
  }

  getAlbums() {
    let filteredAlbums = albums.filter((album) => {
      return album.name.match(this.queryParams);
    });
    if (filteredAlbums.length > 0) {
      filteredAlbums.forEach((album) => {
        this.contentAlbums.append(`<div class="album"><img src="img/profile.png" alt="Album image"><div class="search-info"><p>${album.name}</p><p>${this.parser.parseArtists(album.artists)}</p></div></div>`)
      });
    }
    else {
      this.contentAlbums.css('display','none');
    }
  }

  getPlaylists() {
    let filteredPlaylists = playLists.filter((playlist) => {
      return playlist.name.match(this.queryParams);
    });
    if (filteredPlaylists.length > 0) {
      filteredPlaylists.forEach((playlist) => {
        this.contentPlaylists.append(`<div class="playlist"><img src="img/profile.png" alt="Playlist image"><div class="search-info"><p>${playlist.name}</p><p>1.938.312 SUBS</p></div></div>`)
      });
    }
    else {
      this.contentPlaylists.css('display','none');
    }
  }

  init() {
    this.getSongs();
    this.getArtists();
    this.getAlbums();
    this.getPlaylists();
  }
}

$(document).ready(() => {
  let parser = new Parser();
  new SearchResults(parser);
});
