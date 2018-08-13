class Parser {

  parseArtists(artistsArray) {
    let finalString = '';
    artistsArray.forEach((artistArray) => {
      artists.forEach((artist) => {
        if (artistArray === artist.id) {
          finalString += `${artist.name}, `;
        }
      });
    });
    // remove extra comma
    finalString = finalString.substring(0, finalString.length - 2);
    return finalString;
  }

  parseAlbums(albumsArray) {
    let finalString = '';
    albumsArray.forEach((albumArray) => {
      albums.forEach((album) => {
        if (albumArray === album.id) {
          finalString += `${album.name}, `;
        }
      });
    });
    // remove extra comma
    finalString = finalString.substring(0, finalString.length - 2);
    return finalString;
  }

  parseSongs(songsArray) {
    let finalString = '';
    songsArray.forEach((songArray) => {
      songs.forEach((song) => {
        if (songArray === song.id) {
          finalString += song.name;
        }
      });
    });
    return finalString;
  }
}
